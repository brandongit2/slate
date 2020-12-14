import {motion, useDragControls} from 'framer-motion';
import {
    useContext,
    useEffect,
    useLayoutEffect,
    useReducer,
    useRef,
    useState
} from 'react';
import {v4 as uuidv4} from 'uuid';

import ContentManagerArticle from './ContentManagerArticle';
import styles from './ContentManagerFolder.module.scss';
import {ContentManagerContext} from '../../contexts/contentManager';
import {Article, Folder} from '../../defs/content';
import {getLastElement} from '../../misc/util';

export default function ContentManagerFolder({
    folder,
    isReordering,
    startReorder,
    updateYPositions,
    editMode
}: {
    folder: Folder;
    isReordering: boolean;
    startReorder: (evt: MouseEvent, content: Folder | Article) => void;
    updateYPositions: (force?: boolean) => void;
    editMode?: boolean;
}) {
    const {
        user,
        loadedContent,
        loadContent,
        fns: {addObject, removeObject, modifyObject}
    } = useContext(ContentManagerContext);
    const reorderButton = useRef(null);
    const dragControls = useDragControls();

    const [isOpen, toggleIsOpen] = useReducer((state) => !state, false);
    const [editing, toggleEditing] = useReducer((state) => !state, editMode);

    const [selected, setSelected] = useState(false);
    const [name, setName] = useState(folder.name);

    useEffect(() => {
        setName(folder.name);
    }, [folder]);
    useLayoutEffect(updateYPositions);
    useLayoutEffect(() => {
        updateYPositions(true);
    }, [isOpen]);

    function saveEdit() {
        toggleEditing();
        modifyObject(folder, {...folder, name});
    }

    function removeSelf() {
        removeObject(folder, folder.parent);
    }

    function addFolder(parentUuid: string, after: string) {
        addObject(
            {
                uuid: uuidv4(),
                type: 'folder',
                name: uuidv4(),
                children: []
            },
            parentUuid,
            after
        );
    }

    function addArticle(parentUuid: string, after: string) {
        addObject(
            {
                uuid: uuidv4(),
                type: 'article',
                name: uuidv4(),
                author: user.name.toLowerCase(),
                content: '',
                children: []
            },
            parentUuid,
            after
        );
    }

    return (
        <motion.div
            className={`folder ${styles.folder} ${
                isOpen ? '' : styles.collapsed
            } ${selected ? styles.selected : ''}`}
            layoutId={folder.uuid}
            transition={{ease: 'easeInOut', duration: isReordering ? 0.2 : 0}}
            drag
            dragControls={dragControls}
            onDragStart={(evt, info) => {
                setSelected(true);

                // Prevent dragging unless event target is reorder button
                // https://github.com/framer/motion/issues/363#issuecomment-621355442
                if (evt.target !== reorderButton.current) {
                    (dragControls as any).componentControls.forEach(
                        (entry: any) => {
                            entry.stop(evt, info);
                        }
                    );
                    setSelected(false);
                    return;
                }

                if (startReorder) {
                    if (isOpen) toggleIsOpen();
                    startReorder(evt as MouseEvent, folder);
                }
            }}
            onDragEnd={() => {
                setSelected(false);
            }}
        >
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
                            className={`material-icons-sharp ${
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
                            <button
                                onClick={() => {
                                    addFolder(
                                        folder.uuid,
                                        getLastElement(folder.children) || '0'
                                    );
                                }}
                            >
                                <span className="material-icons-sharp">
                                    create_new_folder
                                </span>
                            </button>
                            <button
                                onClick={() => {
                                    addArticle(
                                        folder.uuid,
                                        getLastElement(folder.children) || '0'
                                    );
                                }}
                            >
                                <span className="material-icons-sharp">
                                    description
                                </span>
                            </button>
                            <button onClick={toggleEditing}>
                                <span className="material-icons-sharp">
                                    create
                                </span>
                            </button>
                            <button>
                                <span className="material-icons-sharp">
                                    content_copy
                                </span>
                            </button>
                            <button onClick={removeSelf}>
                                <span className="material-icons-sharp">
                                    delete
                                </span>
                            </button>
                            <button>
                                <span
                                    className="material-icons-sharp"
                                    style={{cursor: 'move'}}
                                    ref={reorderButton}
                                >
                                    drag_indicator
                                </span>
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
                            <ContentManagerFolder
                                key={uuid}
                                folder={content}
                                isReordering={isReordering}
                                startReorder={startReorder}
                                updateYPositions={updateYPositions}
                            />
                        );
                    } else if (content.type === 'article') {
                        return (
                            <ContentManagerArticle
                                key={uuid}
                                article={content}
                                isReordering={isReordering}
                                startReorder={startReorder}
                                updateYPositions={updateYPositions}
                            />
                        );
                    }
                })}
            </div>
        </motion.div>
    );
}
