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
    addObject,
    removeObject
}: {
    contents: Array<Subject | SubjectWithChildren>;
    addObject: (object: Subject | Folder | Article, to: Directory) => void;
    removeObject: (object: Subject | Folder | Article, from: Directory) => void;
}) {
    return (
        <div className={styles['content-manager']}>
            <h1>content management</h1>
            {contents.map((subject) => (
                <div
                    key={subject.name}
                    className={styles.subject}
                    style={{
                        color: `#${subject.color}`
                    }}
                >
                    <span className="material-icons">chevron_right</span>
                    <p className={styles['subject__info']}>
                        <span
                            className={styles['subject__info--title']}
                            style={{
                                background: `#${subject.color}`
                            }}
                        >
                            {subject.name}
                        </span>
                        <div className={styles['subject__info--description']} />
                        {subject.description}
                    </p>
                    <span className="material-icons">create</span>
                    <span
                        className="material-icons"
                        onClick={() => removeObject(subject, ['root'])}
                    >
                        delete
                    </span>
                    <span className="material-icons">reorder</span>
                </div>
            ))}
            <button
                className={`${styles['subject']} ${styles['subject--add-subject']}`}
                onClick={() => {
                    addObject(
                        {
                            type: 'subject',
                            name: uuidv4(),
                            description: 'test',
                            color: 'ffffff'
                        },
                        ['root']
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
