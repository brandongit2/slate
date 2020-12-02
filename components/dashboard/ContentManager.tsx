import { v4 as uuidv4 } from 'uuid';

import styles from './ContentManager.module.scss';
import { Content, Subject } from '../../defs/global';
import ContentManagerSubject from './ContentManagerSubject';

export default function ContentManager({
    contents,
    addObject,
    removeObject,
    loadContent
}: {
    contents: Array<Content>;
    addObject: (object: Content, to: string) => void;
    removeObject: (object: Content, from: string) => void;
    loadContent: (uuid: string) => void;
}) {
    return (
        <div className={styles['content-manager']}>
            <h1>content management</h1>
            {contents
                .filter((content) => content.type === 'subject')
                .map((subject: Subject) => (
                    <ContentManagerSubject
                        contents={contents}
                        subject={subject}
                        removeObject={removeObject}
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
                        'root'
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
