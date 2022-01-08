import React from 'react';
import styles from './TaskCard.module.scss';
import classnames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';

let TaskCard = ({ className, task }) => {

    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    let status;
    
    state.task.status.forEach(item => {
        if(item.id == task.stateId) {
            status = item.stateName;
        }
    });
    return(
        <div className={ classnames(styles["c-task-card"], className) }>
            <div className={ classnames(styles["c-task-card-name"]) }>
                { task.taskName }
            </div>
            <div className={ classnames(styles["c-task-card-content"]) }>
                <div className={ classnames(styles["c-task-card-state"]) }>
                    <div className={ classnames(styles["c-task-card-state-" + status]) }>
                        { status }
                    </div>
                </div>
                <span className={ classnames(styles["c-task-card-date"]) }>
                    { task.date }
                </span>
            </div>
        </div>
    );
}
export default TaskCard;