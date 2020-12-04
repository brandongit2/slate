import {
    useContext,
    useEffect,
    useLayoutEffect,
    useReducer,
    useRef
} from 'react';

import styles from './ContentManagerSubject.module.scss';
import ContentManagerArticle from './ContentManagerArticle';
import ContentManagerFolder from './ContentManagerFolder';
import { ContentManagerContext } from '../../contexts/contentManager';
import { Subject } from '../../defs/global';

export default function ContentManagerSubject({
    subject,
    reportYCoords
}: {
    subject: Subject;
    reportYCoords: (uuid: string, top: number, bottom: number) => void;
}) {
    const { loadedContent, removeObject, loadContent } = useContext(
        ContentManagerContext
    );

    const [isOpen, toggleIsOpen] = useReducer((state) => !state, false);
    const subjectEl = useRef(null);

    useEffect(() => {
        subjectEl.current.style.setProperty(
            '--accent-color',
            `#${subject.color}`
        );
    }, []);

    useLayoutEffect(() => {});

    return (
        <div key={subject.name} className={styles.subject} ref={subjectEl}>
            <button onClick={toggleIsOpen}>
                <span
                    className={`material-icons ${
                        styles['subject--expand-button']
                    } ${isOpen ? styles.open : ''}`}
                >
                    chevron_right
                </span>
            </button>
            <p
                className={styles.info}
                style={{
                    color: `#${subject.color}`
                }}
            >
                <span
                    className={styles['info--title']}
                    style={{
                        background: `#${subject.color}`
                    }}
                >
                    {subject.name}
                </span>
                <span
                    style={{
                        width: '0.5rem',
                        display: 'inline-block'
                    }}
                />
                {subject.description}
            </p>
            <button>
                <span className="material-icons">create</span>
            </button>
            <button>
                <span
                    className="material-icons"
                    onClick={() =>
                        removeObject(
                            subject,
                            loadedContent.find(({ type }) => type === 'root')
                                .uuid
                        )
                    }
                >
                    delete
                </span>
            </button>
            <span className="material-icons">reorder</span>
            <div
                className={`${styles.expansion} ${
                    isOpen ? '' : styles.collapsed
                }`}
            >
                <div className={styles['add-content']}>
                    <button
                        className={styles['add-content--button']}
                        style={{ marginRight: '0.5rem' }}
                    >
                        add folder
                    </button>
                    <button className={styles['add-content--button']}>
                        add article
                    </button>
                </div>
                <div className={styles.children}>
                    {subject.children.map((uuid) => {
                        let content = loadedContent.find(
                            (c) => c.uuid === uuid
                        );
                        if (typeof content === 'undefined') {
                            if (isOpen) loadContent(uuid);
                            return null;
                        } else if (content.type === 'folder') {
                            return (
                                <ContentManagerFolder
                                    key={uuid}
                                    folder={content}
                                />
                            );
                        } else if (content.type === 'article') {
                            return (
                                <ContentManagerArticle
                                    key={uuid}
                                    article={content}
                                />
                            );
                        }
                    })}
                </div>
            </div>
        </div>
    );
}
