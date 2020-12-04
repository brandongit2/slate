import { useEffect, useReducer, useState } from 'react';

import ContentManagerArticle from './ContentManagerArticle';
import styles from './ContentManagerFolder.module.scss';
import { Content, Folder } from '../../defs/global';

export default function ContentManagerFolder({
    contents,
    folder,
    removeObject,
    modifyObject,
    loadContent,
    editMode
}: {
    contents: Content[];
    folder: Folder;
    removeObject: (object: Content, from: string) => void;
    modifyObject: <T extends Content>(from: T, to: T) => void;
    loadContent: (uuid: string) => void;
    editMode?: boolean;
}) {
    const [isOpen, toggleIsOpen] = useReducer((state) => !state, false);
    const [editing, toggleEditing] = useReducer((state) => !state, editMode);

    const [name, setName] = useState(folder.name);

    useEffect(() => {
        setName(folder.name);
    }, [folder]);

    function saveEdit() {
        toggleEditing();
        modifyObject(folder, { ...folder, name });
    }

    function removeSelf() {
        removeObject(folder, folder.parent);
    }

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
                <div
                    style={{
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center'
                    }}
                >
                    {editing ? (
                        <input
                            className={styles['folder--name--editing']}
                            type="text"
                            value={name}
                            onChange={(evt) => {
                                setName(evt.target.value);
                            }}
                        />
                    ) : (
                        <span className={styles['folder--name']}>
                            {folder.name}
                        </span>
                    )}
                </div>
                {editing ? (
                    <div className={styles['folder--save-button']}>
                        <button onClick={saveEdit}>save</button>
                    </div>
                ) : (
                    <div className={styles['folder__controls']}>
                        <>
                            <button onClick={toggleEditing}>
                                <span className="material-icons">create</span>
                            </button>
                            <button onClick={removeSelf}>
                                <span className="material-icons">delete</span>
                            </button>
                            <button>
                                <span className="material-icons">reorder</span>
                            </button>
                        </>
                    </div>
                )}
            </div>
            <div className={styles['folder--rule']} />
            <div className={styles['folder__children']}>
                {folder.children.map((uuid) => {
                    let content = contents.find((c) => c.uuid === uuid);
                    if (typeof content === 'undefined') {
                        if (isOpen) loadContent(uuid);
                        return null;
                    } else if (content.type === 'folder') {
                        return (
                            <ContentManagerFolder
                                key={uuid}
                                contents={contents}
                                folder={content}
                                removeObject={removeObject}
                                modifyObject={modifyObject}
                                loadContent={loadContent}
                            />
                        );
                    } else if (content.type === 'article') {
                        return (
                            <ContentManagerArticle
                                key={uuid}
                                article={content}
                                removeObject={removeObject}
                            />
                        );
                    }
                })}
            </div>
        </div>
    );
}
