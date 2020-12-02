import { useReducer } from 'react';

import ContentManagerArticle from './ContentManagerArticle';
import styles from './ContentManagerFolder.module.scss';
import { Content, Folder } from '../../defs/global';

export default function ContentManagerFolder({
    contents,
    folder,
    loadContent
}: {
    contents: Content[];
    folder: Folder;
    loadContent: (uuid: string) => void;
}) {
    const [isOpen, toggleIsOpen] = useReducer((state) => !state, false);

    return (
        <div className={`${styles.folder} ${isOpen ? '' : styles.collapsed}`}>
            <div className={styles['folder--label']}>
                <div
                    style={{
                        placeSelf: 'stretch',
                        display: 'flex',
                        placeContent: 'center'
                    }}
                >
                    <button onClick={toggleIsOpen}>
                        <span
                            className={`material-icons ${
                                styles['folder--expand-button']
                            } ${isOpen ? styles.open : ''}`}
                        >
                            chevron_right
                        </span>
                    </button>
                </div>
                <div>{folder.name}</div>
            </div>
            <div className={styles['folder--rule']} />
            <div className={styles['folder__children']}>
                {folder.children.map((uuid) => {
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
