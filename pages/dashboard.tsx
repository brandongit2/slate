import { useAuth0 } from '@auth0/auth0-react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ContentManager from '../components/dashboard/ContentManager';

import styles from './dashboard.module.scss';
import { apiLocation } from '../config.json';
import {
    Folder,
    Subject,
    Article,
    SubjectWithChildren,
    FolderWithChildren
} from '../defs/global';
import { Action, Actions, Directory } from '../defs/dashboard';
import ActionList from '../components/dashboard/ActionList';

export default function Dashboard({
    subjects
}: {
    subjects: Array<Subject | SubjectWithChildren>;
}) {
    const {
        isAuthenticated,
        isLoading,
        loginWithRedirect,
        logout,
        user
    } = useAuth0();

    const [contents, setContents] = useState(subjects);
    const [actions, setActions] = useState([]);

    function addAction(action: Action) {
        let actionsCopy = actions.slice(); // Clone array
        actionsCopy.push(action);
        setActions(actionsCopy);
    }

    function removeAction(action: Action) {
        let idx = actions.findIndex((testAction) => testAction === action);
        let actionsCopy = actions.slice(); // Clone array
        actionsCopy.splice(idx, 1);
        setActions(actionsCopy);
    }

    let subjectsCopy = JSON.parse(JSON.stringify(contents)) as Array<
        Subject | SubjectWithChildren
    >;

    function addObject(object: Subject | Folder | Article, to: Directory) {
        addAction({ uuid: uuidv4(), type: Actions.ADD, object, to });

        // i.e., to === ['root']
        if (to.length === 1) {
            if (object.type === 'subject') {
                if (subjectsCopy.find(({ name }) => object.name === name))
                    throw new Error(
                        `A subject already exists with name ${object.name}.`
                    );

                subjectsCopy.push(object);

                setContents(subjectsCopy);
                return;
            } else {
                throw new Error('Can only add subjects to root.');
            }
        }

        let objectNotSubject = object as Folder | Article;

        let subject = subjectsCopy.find(({ name }) => to[1] === name);
        if (!subject.hasOwnProperty('children'))
            throw new Error(
                `Subject ${subject.name} has not yet loaded its children.`
            );
        let subjectWithChildren = subject as SubjectWithChildren;

        // Iterate `to` until we've found the specified parent object, then push the new child to that object.
        let parent: Folder | FolderWithChildren;
        let parentWithChildren: FolderWithChildren;
        for (let folder of to.slice(1)) {
            parent = subjectWithChildren.children.find(
                (child) => child.type === 'folder' && child.name === folder
            ) as Folder | FolderWithChildren;
            if (!parent.hasOwnProperty('children'))
                throw new Error(
                    `Folder ${parent.name} has not yet loaded its children.`
                );

            parentWithChildren = parent as FolderWithChildren;
        }
        parentWithChildren.children.push(objectNotSubject);

        setContents(subjectsCopy);
    }

    function removeObject(object: Subject | Folder | Article, from: Directory) {
        if (from.length === 1) {
            console.log(`removing ${object}`);
            let idx = subjectsCopy.findIndex(
                ({ name }) =>
                    name ===
                    (object.type === 'article' ? object.title : object.name)
            );
            if (idx === -1)
                throw new Error(`No subject exists with name ${object}`);

            if (subjectsCopy[idx].hasOwnProperty('_id')) {
                addAction({
                    uuid: uuidv4(),
                    type: Actions.REMOVE,
                    object,
                    from
                });
            } else {
                removeAction(
                    actions.find(
                        (action) =>
                            action.type === Actions.ADD &&
                            (action.object.type === 'article'
                                ? action.object.title
                                : action.object.name) ===
                                (object.type === 'article'
                                    ? object.title
                                    : object.name)
                    )
                );
            }
            subjectsCopy.splice(idx, 1);

            setContents(subjectsCopy);
        }
    }

    if (isLoading) {
        return <div>loading...</div>;
    } else {
        if (isAuthenticated) {
            return (
                <div className={styles.root}>
                    <Head>
                        <title>Slate Dashboard</title>
                    </Head>
                    <style jsx global>{`
                        @font-face {
                            src: url('/RobotoMono-VariableFont_wght.ttf');
                            font-family: 'Roboto Mono';
                            font-weight: 100 700;
                        }
                    `}</style>
                    <header className={styles.header}>
                        <img
                            src="/logotype-dashboard.svg"
                            className={styles['header__logo']}
                        />
                        <span>
                            currently logged in as{' '}
                            <b>{user.name.toLowerCase()}</b>.{' '}
                            <a
                                onClick={() => {
                                    logout();
                                }}
                            >
                                log out
                            </a>
                        </span>
                    </header>
                    <div className={styles['content-manager']}>
                        <ContentManager
                            contents={contents}
                            addObject={addObject}
                            removeObject={removeObject}
                        />
                    </div>
                    <div className={styles['action-list']}>
                        <ActionList actions={actions} />
                    </div>
                    <div className={styles['control-panel']}>
                        <button
                            className={styles['control-panel__button']}
                            style={{
                                marginRight: '0.5rem'
                            }}
                        >
                            <span className="material-icons">undo</span>
                        </button>
                        <button className={styles['control-panel__button']}>
                            <span className="material-icons">redo</span>
                        </button>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    not logged in. click{' '}
                    <a
                        onClick={() => {
                            loginWithRedirect({
                                redirectUri: `http://localhost:3000/dashboard`
                            });
                        }}
                    >
                        here
                    </a>{' '}
                    to log in.
                </div>
            );
        }
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    return {
        props: {
            subjects: await (
                await fetch(
                    `${apiLocation}/content/all-subjects?hyphenate={"description":1}`
                )
            ).json()
        }
    };
};
