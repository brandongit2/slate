import { v4 as uuidv4 } from 'uuid';

import styles from './ContentManager.module.scss';
import ContentManagerSubject from './ContentManagerSubject';
import { ContentManagerContext } from '../../contexts/contentManager';
import { Root, Subject } from '../../defs/global';
import { sortedIndex } from '../../misc/util';
import { useContext } from 'react';

let yCoords = [] as number[];

export default function ContentManager() {
    const { loadedContent, addObject } = useContext(ContentManagerContext);

    function reportYCoords(uuid: string, top: number, bottom: number) {
        yCoords.splice(sortedIndex(yCoords, top), 0, top);
        yCoords.splice(sortedIndex(yCoords, bottom), 0, bottom);
    }

    let root = loadedContent.find(({ type }) => type === 'root') as Root;

    return (
        <div className={styles['content-manager']}>
            <h1>content management</h1>
            {root.children.map((uuid) => (
                <ContentManagerSubject
                    key={uuid}
                    subject={
                        loadedContent.find(
                            ({ uuid: testUuid }) => testUuid === uuid
                        ) as Subject
                    }
                    reportYCoords={reportYCoords}
                />
            ))}
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
                        root.children[root.children.length - 1]
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
