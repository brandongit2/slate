import {useAuth0} from '@auth0/auth0-react';
import {GetStaticProps} from 'next';
import Head from 'next/head';

import styles from './dashboard.module.scss';
import {apiLocation} from '../config.json';
import ActionList from '../components/dashboard/ActionList';
import ContentManager from '../components/dashboard/ContentManager';
import {ContentManagerContext} from '../contexts/contentManager';
import {Root} from '../defs/content';
import {useContentManager} from '../hooks/contentManager';

export default function Dashboard({root}: {root: Root}) {
    const {
        isAuthenticated,
        isLoading,
        loginWithRedirect,
        logout,
        user
    } = useAuth0();

    const {
        undoStack,
        actions,
        loadedContent,
        undo,
        redo,
        addObject,
        removeObject,
        modifyObject,
        moveObjectDown,
        moveObjectUp,
        loadContent
    } = useContentManager(root);

    if (isLoading) {
        return <div>loading...</div>;
    } else {
        if (isAuthenticated) {
            return (
                <ContentManagerContext.Provider
                    value={{
                        user,
                        actions,
                        loadedContent,
                        loadContent,
                        fns: {
                            addObject,
                            removeObject,
                            modifyObject,
                            moveObjectDown,
                            moveObjectUp
                        }
                    }}
                >
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
                            <ContentManager />
                        </div>
                        <div className={styles['action-list']}>
                            <ActionList />
                        </div>
                        <div className={styles['control-panel']}>
                            <button
                                className={styles['control-panel__button']}
                                style={{
                                    marginRight: '0.5rem'
                                }}
                                onClick={undo}
                                disabled={actions.length === 0}
                            >
                                <span className="material-icons-sharp">
                                    undo
                                </span>
                            </button>
                            <button
                                className={styles['control-panel__button']}
                                onClick={redo}
                                disabled={undoStack.length === 0}
                            >
                                <span className="material-icons-sharp">
                                    redo
                                </span>
                            </button>
                        </div>
                    </div>
                </ContentManagerContext.Provider>
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

export const getStaticProps: GetStaticProps = async () => {
    let root = await (
        await fetch(`${apiLocation}/content/root?hyphenate={"description":1}`)
    ).json();

    return {
        props: {
            root
        }
    };
};
