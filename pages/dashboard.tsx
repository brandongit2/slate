import { useAuth0 } from '@auth0/auth0-react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ContentManager from '../components/dashboard/ContentManager';

import styles from './dashboard.module.scss';
import { apiLocation } from '../config.json';
import { Subject, Content } from '../defs/global';
import { Action, Actions } from '../defs/dashboard';
import ActionList from '../components/dashboard/ActionList';

export default function Dashboard({ subjects }: { subjects: Subject[] }) {
    const {
        isAuthenticated,
        isLoading,
        loginWithRedirect,
        logout,
        user
    } = useAuth0();

    const [loadedContent, setLoadedContent] = useState(subjects as Content[]);
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

    function addObject(object: Content, to: string) {
        addAction({ uuid: uuidv4(), type: Actions.ADD, object, to });

        let loadedContentCopy = loadedContent.slice();
        loadedContentCopy.push(object);

        if (to !== 'root') {
            let parent = loadedContentCopy.find(
                (content) => content.uuid === to
            );
            if (parent.type === 'article')
                throw new Error('Articles cannot have children.');
            parent.children.push(object.uuid);
        }

        setLoadedContent(loadedContentCopy);
    }

    function removeObject(object: Content, from: string) {
        addAction({ uuid: uuidv4(), type: Actions.REMOVE, object, from });

        let loadedContentCopy = loadedContent.slice();
        let idx = loadedContentCopy.findIndex(
            (content) => content.uuid === object.uuid
        );
        loadedContentCopy.splice(idx, 1);

        if (from !== 'root') {
            let parent = loadedContentCopy.find(
                (content) => content.uuid === from
            );
            if (parent.type === 'article') throw new Error('Invalid parent.');
            idx = parent.children.findIndex((uuid) => uuid === object.uuid);
            parent.children.splice(idx, 1);
        }

        setLoadedContent(loadedContentCopy);
    }

    async function loadContent(uuid: string) {
        let loadedContentCopy = loadedContent.slice();
        loadedContentCopy.push(
            await (await fetch(`${apiLocation}/content/data/${uuid}`)).json()
        );
        setLoadedContent(loadedContentCopy);
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
                            contents={loadedContent}
                            addObject={addObject}
                            removeObject={removeObject}
                            loadContent={loadContent}
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
