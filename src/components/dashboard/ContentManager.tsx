import { v4 as uuidv4 } from 'uuid';

import styles from './ContentManager.module.scss';
import ContentManagerSubject from './ContentManagerSubject';
import { ContentManagerContext } from '../../contexts/contentManager';
import { Root, Subject } from '../../defs/global';
import { useReorder } from '../../hooks/contentManager';
import { useContext } from 'react';

export default function ContentManager() {
    const {
        loadedContent,
        addObject,
        moveObjectDown,
        moveObjectUp
    } = useContext(ContentManagerContext);

    const { elRef, startReorder, updateYPositions } = useReorder(
        moveObjectDown,
        moveObjectUp
    );

    let root = loadedContent.find(({ type }) => type === 'root') as Root;

    return (
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
    );
}
