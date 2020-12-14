import {motion, useDragControls} from 'framer-motion';
import {useContext, useLayoutEffect, useRef, useState} from 'react';

import styles from './ContentManagerArticle.module.scss';
import {ContentManagerContext} from '../../contexts/contentManager';
import {Article, Folder} from '../../defs/content';

export default function ContentManagerArticle({
    article,
    isReordering,
    startReorder,
    updateYPositions
}: {
    article: Article;
    isReordering: boolean;
    startReorder: (evt: MouseEvent, content: Folder | Article) => void;
    updateYPositions: () => void;
}) {
    const {
        fns: {removeObject}
    } = useContext(ContentManagerContext);
    const reorderButton = useRef(null);
    const dragControls = useDragControls();

    const [selected, setSelected] = useState(false);

    useLayoutEffect(updateYPositions);

    function removeSelf() {
        removeObject(article, article.parent);
    }

    return (
        <motion.div
            className={`article ${styles.article} ${
                selected ? styles.selected : ''
            }`}
            layoutId={article.uuid}
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
                    startReorder(evt as MouseEvent, article);
                }
            }}
            onDragEnd={() => {
                setSelected(false);
            }}
        >
            <p className={styles['article__label']}>
                <span className={styles['label--name']}>{article.name}</span>{' '}
                <span className={styles['label--author']}>
                    by {article.author}
                </span>
            </p>
            <div className={styles['article__controls']}>
                <button>
                    <span className="material-icons-sharp">create</span>
                </button>
                <button>
                    <span className="material-icons-sharp">content_copy</span>
                </button>
                <button onClick={removeSelf}>
                    <span className="material-icons-sharp">delete</span>
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
            </div>
        </motion.div>
    );
}
