import styles from './ActionList.module.scss';
import { Action, Actions } from '../../defs/dashboard';

export default function ActionList({ actions }: { actions: Action[] }) {
    return (
        <div className={styles['action-list']}>
            <h1 style={{ marginBottom: '1rem' }}>queued actions</h1>
            {actions.map((action) => {
                switch (action.type) {
                    case Actions.ADD: {
                        return (
                            <p
                                key={action.uuid}
                                className={styles['action-list__entry']}
                            >
                                <b style={{ color: '#117b00' }}>add</b>{' '}
                                {action.object.type}{' '}
                                <u>
                                    {action.object.type === 'article'
                                        ? action.object.title
                                        : action.object.name}
                                </u>
                            </p>
                        );
                    }
                    default: {
                        return <p key={action.uuid}>unknown action</p>;
                    }
                }
            })}
        </div>
    );
}
