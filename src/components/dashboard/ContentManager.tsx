import { AnimateSharedLayout } from 'framer-motion';
import {
    MutableRefObject,
    useContext,
    useEffect,
    useRef,
    useState
} from 'react';
import { createPortal } from 'react-dom';
import { v4 as uuidv4 } from 'uuid';

import styles from './ContentManager.module.scss';
import ContentManagerSubject from './ContentManagerSubject';
import { ContentManagerContext } from '../../contexts/contentManager';
import { Root, Subject } from '../../defs/global';
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
        elementPositions = temp;
    }
    useEffect(updateYPositions, []);

    function startReorder(
        evt: React.MouseEvent<HTMLSpanElement, MouseEvent>,
        uuid: string
    ) {
        setIsReordering(true);

        let prevMousePos = sortedIndex(elementPositions, evt.clientY) - 1;

        function handleMouseMove(evt: MouseEvent) {
            let curMousePos = sortedIndex(elementPositions, evt.clientY) - 1;
            if (curMousePos !== prevMousePos) {
                if (curMousePos - prevMousePos === 1) {
                    moveObjectDown(uuid);
                } else if (curMousePos - prevMousePos === -1) {
                    moveObjectUp(uuid);
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
                <button
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
                </button>
                <div style={{ height: '3rem' }} />
            </div>
        </AnimateSharedLayout>
    );
}