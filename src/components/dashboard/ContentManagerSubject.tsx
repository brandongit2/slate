import {motion, useDragControls} from 'framer-motion';
import {
    useContext,
    useEffect,
    useLayoutEffect,
    useReducer,
    useRef
} from 'react';
import {v4 as uuidv4} from 'uuid';

import styles from './ContentManagerSubject.module.scss';
import ContentManagerSubjectContent from './ContentManagerSubjectContent';
import {ContentManagerContext} from '../../contexts/contentManager';
import {Content, Subject} from '../../defs/content';
import {getLastElement} from '../../misc/util';

export default function ContentManagerSubject({
    subject,
    isReordering,
    startReorder,
    updateYPositions
}: {
    subject: Subject;
    isReordering: boolean;
    startReorder?: (evt: MouseEvent, object: Content) => void;
    updateYPositions?: (force?: boolean) => void;
}) {
    const {
        user,
        fns: {addObject, removeObject}
    } = useContext(ContentManagerContext);

    const [isOpen, toggleIsOpen] = useReducer((state) => !state, false);
    const dragControls = useDragControls();
    const subjectEl = useRef(null);
    const reorderButton = useRef(null);

    useEffect(() => {
        subjectEl.current.style.setProperty(
            '--accent-color',
            `#${subject.color}`
        );
    }, []);
    if (updateYPositions) useLayoutEffect(updateYPositions);

    useEffect(() => {
        updateYPositions(true);
    }, [isOpen]);

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
            layoutId={subject.uuid}
            transition={{ease: 'easeInOut', duration: isReordering ? 0.2 : 0}}
            drag="y"
            dragControls={dragControls}
            onDragStart={(evt, info) => {
                // Prevent dragging unless event target is reorder button
                // https://github.com/framer/motion/issues/363#issuecomment-621355442
                if (evt.target !== reorderButton.current) {
                    (dragControls as any).componentControls.forEach(
                        (entry: any) => {
                            entry.stop(evt, info);
                        }
                    );
                    return;
                }

                if (startReorder) {
                    if (isOpen) toggleIsOpen();
                    startReorder(evt as MouseEvent, subject);
                }
            }}
            className={styles.subject}
            ref={subjectEl}
        >
            <button onClick={toggleIsOpen}>
                <span
                    className={`material-icons-sharp ${
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
                <span className="material-icons-sharp">create</span>
            </button>
            <button>
                <span
                    className="material-icons-sharp"
                    onClick={() => removeObject(subject, subject.parent)}
                >
                    delete
                </span>
            </button>
            <span
                className="material-icons-sharp"
                style={{cursor: 'ns-resize', margin: '0px -2px'}}
                ref={reorderButton}
            >
                drag_indicator
            </span>
            <div
                className={`${styles.expansion} ${
                    isOpen ? '' : styles.collapsed
                }`}
            >
                <div className={styles['add-content']}>
                    <button
                        className={styles['add-content--button']}
                        style={{marginRight: '0.5rem'}}
                        onClick={() => {
                            addFolder(
                                subject.uuid,
                                getLastElement(subject.children) || '0'
                            );
                        }}
                    >
                        add folder
                    </button>
                    <button
                        className={styles['add-content--button']}
                        onClick={() => {
                            addArticle(
                                subject.uuid,
                                subject.children[subject.children.length - 1] ||
                                    '0'
                            );
                        }}
                    >
                        add article
                    </button>
                </div>
                <div className={styles.children}>
                    <ContentManagerSubjectContent
                        content={subject.children}
                        isOpen={isOpen}
                    />
                </div>
            </div>
        </motion.div>
    );
}
