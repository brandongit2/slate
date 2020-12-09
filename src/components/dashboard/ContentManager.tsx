import { AnimateSharedLayout, motion } from 'framer-motion';
import {
    MutableRefObject,
    useContext,
    useEffect,
    useRef,
    useState
} from 'react';
import { v4 as uuidv4 } from 'uuid';

import styles from './ContentManager.module.scss';
import ContentManagerSubject from './ContentManagerSubject';
import { ContentManagerContext } from '../../contexts/contentManager';
import { Content, Root, Subject } from '../../defs/global';
import { convertRemToPixels, sortedIndex } from '../../misc/util';

let elementPositions = [] as number[];

export default function ContentManager({
    contentManagerRef
}: {
    contentManagerRef: MutableRefObject<any>;
}) {
    const {
        loadedContent,
        addObject,
        moveObjectDown,
        moveObjectUp
    } = useContext(ContentManagerContext);

    const [isReordering, setIsReordering] = useState(false);
    const elRef = useRef(null);

    function updateYPositions() {
        if (!elRef.current || isReordering) return;

        elementPositions = [];
        for (let child of elRef.current.childNodes) {
            let boundingBox = child.getBoundingClientRect();
            elementPositions.push(boundingBox.top, boundingBox.bottom);
        }
        elementPositions.pop();
        elementPositions.sort();

        if (elementPositions.length === 0) {
            elementPositions = [-100];
            return;
        }

        let temp = [
            elementPositions[0] - 0.5 * convertRemToPixels(1)
        ] as number[];
        for (let i = 1; i < elementPositions.length - 1; i += 2) {
            temp.push((elementPositions[i] + elementPositions[i + 1]) / 2);
        }
        temp.push(
            elementPositions[elementPositions.length - 1] +
                0.5 * convertRemToPixels(1)
        );
        elementPositions = temp.slice(1, temp.length - 1);
    }
    useEffect(updateYPositions, []);

    function startReorder(evt: MouseEvent, object: Content) {
        setIsReordering(true);

        let prevMousePos = sortedIndex(elementPositions, evt.clientY);
        let yOffset =
            evt.clientY - (evt.target as any).getBoundingClientRect().top;

        function handleMouseMove(evt: MouseEvent) {
            let curMousePos = sortedIndex(
                elementPositions,
                evt.clientY - yOffset
            );
            if (curMousePos !== prevMousePos) {
                if (curMousePos - prevMousePos === 1) {
                    moveObjectDown(object);
                } else if (curMousePos - prevMousePos === -1) {
                    moveObjectUp(object);
                }
                prevMousePos = curMousePos;
            }
        }

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', () => {
            window.removeEventListener('mousemove', handleMouseMove);
            setIsReordering(false);
        });
    }

    let root = loadedContent.find(({ type }) => type === 'root') as Root;

    return (
        <AnimateSharedLayout>
            <div className={styles['content-manager']}>
                <h1>content management</h1>
                <div style={{ display: 'contents' }} ref={elRef}>
                    {root.children.map((uuid) => (
                        <ContentManagerSubject
                            key={uuid}
                            subject={
                                loadedContent.find(
                                    ({ uuid: testUuid }) => testUuid === uuid
                                ) as Subject
                            }
                            contentManagerRef={contentManagerRef}
                            updateYPositions={updateYPositions}
                            startReorder={startReorder}
                        />
                    ))}
                </div>
                <motion.button
                    layout
                    transition={{ ease: 'easeInOut', duration: 0.2 }}
                    className={styles['add-subject']}
                    onClick={() => {
                        addObject(
                            {
                                uuid: uuidv4(),
                                type: 'subject',
                                name: uuidv4(),
                                description: 'test',
                                color: 'ffffff',
                                children: []
                            },
                            root.uuid,
                            root.children[root.children.length - 1] || '0'
                        );
                    }}
                >
                    <span className="material-icons">add</span>
                    <p style={{ justifySelf: 'start' }}>add a new subject</p>
                </motion.button>
                <div style={{ height: '3rem' }} />
            </div>
        </AnimateSharedLayout>
    );
}
