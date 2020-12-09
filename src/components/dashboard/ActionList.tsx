import styles from './ActionList.module.scss';
import ActionListModify from './ActionListModify';
import { ContentManagerContext } from '../../contexts/contentManager';
import { Actions } from '../../defs/contentManager';
import { useContext } from 'react';

export default function ActionList() {
    const { actions } = useContext(ContentManagerContext);

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
                                {action.object.type} <b>{action.object.name}</b>
                            </p>
                        );
                    }
                    case Actions.REMOVE: {
                        return (
                            <p
                                key={action.uuid}
                                className={styles['action-list__entry']}
                            >
                                <b style={{ color: '#aa0301' }}>remove</b>{' '}
                                {action.object.type} <b>{action.object.name}</b>
                            </p>
                        );
                    }
                    case Actions.MODIFY: {
                        return (
                            <ActionListModify
                                key={action.uuid}
                                action={action}
                            />
                        );
                    }
                    case Actions.MOVE_UP: {
                        return (
                            <p
                                key={action.uuid}
                                className={styles['action-list__entry']}
                            >
                                {action.item}
                            </p>
                        );
                    }
                    default: {
                        return (
                            <p
                                key={action.uuid}
                                className={styles['action-list__entry']}
                            >
                                unknown action
                            </p>
                        );
                    }
                }
            })}
        </div>
    );
}
