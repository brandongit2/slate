import { useReducer } from 'react';

import styles from './ActionList.module.scss';
import { ActionModify } from '../../defs/contentManager';
import { Content } from '../../defs/global';

export default function ActionListModify<T extends Content>({
    action
}: {
    action: ActionModify<T>;
}) {
    const [isOpen, toggleOpen] = useReducer((state) => !state, false);

    let changedFields = [];
    for (let key of Object.keys(action.from)) {
        // @ts-ignore
        if (action.from[key] !== action.to[key])
            changedFields.push({
                key,
                // @ts-ignore
                from: action.from[key],
                // @ts-ignore
                to: action.to[key]
            });
    }

    return (
        <div>
            <p className={styles['action-list__entry']}>
                <b style={{ color: '#0051ce' }}>modify</b>{' '}
                <b>{action.to.name}</b>{' '}
                <a onClick={toggleOpen}>
                    ({isOpen ? 'click to close' : 'click for info'})
                </a>
            </p>
            {isOpen ? (
                <ul style={{ margin: '0px', paddingLeft: '1rem' }}>
                    {changedFields.map(({ key, from, to }) => (
                        <li
                            className={styles['action-list__entry']}
                            style={{
                                listStyleType: "'>'",
                                paddingLeft: '0.5rem'
                            }}
                        >
                            changed <b>{key}</b> from <b>{from}</b> to{' '}
                            <b>{to}</b>
                        </li>
                    ))}
                </ul>
            ) : null}
        </div>
    );
}
