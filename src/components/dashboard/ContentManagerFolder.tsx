import {useContext, useEffect, useReducer, useState} from 'react';

import ContentManagerArticle from './ContentManagerArticle';
import styles from './ContentManagerFolder.module.scss';
import {ContentManagerContext} from '../../contexts/contentManager';
import {Folder} from '../../defs/global';

export default function ContentManagerFolder({
    folder,
    editMode
}: {
    folder: Folder;
    editMode?: boolean;
}) {
    const {loadedContent, removeObject, modifyObject, loadContent} = useContext(
        ContentManagerContext
    );

    const [isOpen, toggleIsOpen] = useReducer((state) => !state, false);
    const [editing, toggleEditing] = useReducer((state) => !state, editMode);

    const [name, setName] = useState(folder.name);

    useEffect(() => {
        setName(folder.name);
    }, [folder]);

    function saveEdit() {
        toggleEditing();
        modifyObject(folder, {...folder, name});
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
                    let content = loadedContent.find((c) => c.uuid === uuid);
                    if (typeof content === 'undefined') {
                        if (isOpen) loadContent(uuid);
                        return null;
                    } else if (content.type === 'folder') {
                        return (
                            <ContentManagerFolder key={uuid} folder={content} />
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
