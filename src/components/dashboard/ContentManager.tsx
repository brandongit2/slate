import {MutableRefObject, useContext, useEffect, useRef, useState} from 'react';
import {v4 as uuidv4} from 'uuid';

import styles from './ContentManager.module.scss';
import ContentManagerSubject from './ContentManagerSubject';
import {ContentManagerContext} from '../../contexts/contentManager';
import {Content, Root, Subject} from '../../defs/content';
import {convertRemToPixels, sortedIndex} from '../../misc/util';

let elementPositions = [] as number[];

export default function ContentManager() {
    const {
        loadedContent,
        fns: {addObject, moveObjectDown, moveObjectUp}
    } = useContext(ContentManagerContext);

    const [isReordering, setIsReordering] = useState(false);
    const elRef = useRef(null);

    function updateYPositions(force = false) {
        if ((!elRef.current || isReordering) && !force) return;

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

    function startReorder(evt: React.MouseEvent, object: Content) {
        setIsReordering(true);

        let prevMousePos = sortedIndex(elementPositions, evt.clientY);

        function handleMouseMove(evt: MouseEvent) {
            let curMousePos = sortedIndex(elementPositions, evt.clientY);
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

    function addSubject() {
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
    }

    let root = loadedContent.find(({type}) => type === 'root') as Root;

    return (
        <div className={styles['content-manager']}>
            <h1>content management</h1>
            <div style={{display: 'contents'}} ref={elRef}>
                {root.children.map((uuid) => (
                    <ContentManagerSubject
                        key={uuid}
                        subject={
                            loadedContent.find(
                                ({uuid: testUuid}) => testUuid === uuid
                            ) as Subject
                        }
                        updateYPositions={updateYPositions}
                        startReorder={startReorder}
                    />
                ))}
            </div>
            <button className={styles['add-subject']} onClick={addSubject}>
                <span className="material-icons-sharp">add</span>
                <p style={{justifySelf: 'start'}}>add a new subject</p>
            </button>
            <div style={{height: '3rem'}} />
        </div>
    );
}
