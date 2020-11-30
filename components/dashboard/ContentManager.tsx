import { v4 as uuidv4 } from 'uuid';

import styles from './ContentManager.module.scss';
import {
    Subject,
    SubjectWithChildren,
    Folder,
    Article
} from '../../defs/global';
import { Directory } from '../../defs/dashboard';

export default function ContentManager({
    contents,
    addObject
}: {
    contents: Array<Subject | SubjectWithChildren>;
    addObject: (object: Subject | Folder | Article, to: Directory) => void;
}) {
    return (
        <div className={styles['content-manager']}>
            <h1>content management</h1>
            {contents.map((subject) => (
                <div
                    key={subject.name}
                    className={styles['content-manager__subject']}
                    style={{
                        color: `#${subject.color}`
                    }}
                >
                    <span className="material-icons">chevron_right</span>
                    <p className={styles['content-manager__subject__info']}>
                        <span
                            className={
                                styles['content-manager__subject__info__title']
                            }
                            style={{
                                background: `#${subject.color}`
                            }}
                        >
                            {subject.name}
                        </span>
                        <div
                            className={
                                styles[
                                    'content-manager__subject__info__description'
                                ]
                            }
                        />
                        {subject.description}
                    </p>
                    <span className="material-icons">create</span>
                    <span className="material-icons">reorder</span>
                </div>
            ))}
            <div
                className={`${styles['content-manager__subject']} ${styles['content-manager__add-subject']}`}
                onClick={() => {
                    addObject(
                        {
                            type: 'subject',
                            name: uuidv4(),
                            description: 'test',
                            color: '000000'
                        },
                        ['root']
                    );
                }}
            >
                <span className="material-icons">add</span>
                <p style={{ justifySelf: 'start' }}>add a new subject</p>
            </div>
            <div style={{ height: '3rem' }} />
        </div>
    );
}
