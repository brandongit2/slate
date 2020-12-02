import { useReducer } from 'react';

import styles from './ContentManagerSubject.module.scss';
import ContentManagerArticle from './ContentManagerArticle';
import ContentManagerFolder from './ContentManagerFolder';
import { Content, Subject } from '../../defs/global';

export default function ContentManagerSubject({
    contents,
    subject,
    removeObject,
    loadContent
}: {
    contents: Array<Content>;
    subject: Subject;
    removeObject: (object: Content, from: string) => void;
    loadContent: (uuid: string) => void;
}) {
    const [isOpen, toggleIsOpen] = useReducer((state) => !state, false);

    return (
        <div key={subject.name} className={styles.subject}>
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
                className={styles['subject__info']}
                style={{
                    color: `#${subject.color}`
                }}
            >
                <span
                    className={styles['subject__info--title']}
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
            <span className="material-icons">create</span>
            <button>
                <span
                    className="material-icons"
                    onClick={() => removeObject(subject, 'root')}
                >
                    delete
                </span>
            </button>
            <span className="material-icons">reorder</span>
            <div
                className={`${styles['subject__children']} ${
                    isOpen ? '' : styles.collapsed
                }`}
            >
                {subject.children.map((uuid) => {
                    let content = contents.find((c) => c.uuid === uuid);
                    if (typeof content === 'undefined') {
                        loadContent(uuid);
                        return null;
                    } else if (content.type === 'folder') {
                        return (
                            <ContentManagerFolder
                                key={uuid}
                                contents={contents}
                                folder={content}
                                loadContent={loadContent}
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
    );
}
