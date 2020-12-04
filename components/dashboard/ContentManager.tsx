import { v4 as uuidv4 } from 'uuid';

import styles from './ContentManager.module.scss';
import { Content, IncompleteContent, Root, Subject } from '../../defs/global';
import ContentManagerSubject from './ContentManagerSubject';

export default function ContentManager({
    contents,
    addObject,
    removeObject,
    modifyObject,
    loadContent
}: {
    contents: Array<Content>;
    addObject: (object: IncompleteContent, to: string, after: string) => void;
    removeObject: (object: Content, from: string) => void;
    modifyObject: <T extends Content>(from: T, to: T) => void;
    loadContent: (uuid: string) => void;
}) {
    let root = contents.find(({ type }) => type === 'root') as Root;

    return (
        <div className={styles['content-manager']}>
            <h1>content management</h1>
            {root.children.map((uuid) => (
                <ContentManagerSubject
                    contents={contents}
                    subject={
                        contents.find(
                            ({ uuid: testUuid }) => testUuid === uuid
                        ) as Subject
                    }
                    removeObject={removeObject}
                    modifyObject={modifyObject}
                    loadContent={loadContent}
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
