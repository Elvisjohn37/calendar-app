import React, { useEffect, useState } from 'react';
import styles from './TaskListInfo.module.scss';
import classnames from 'classnames';
import Button from './../components/Button';
import TextField from './../components/TextField';
import Dropdown from './../components/Dropdown';
import FormGroup from './../components/FormGroup';
import api from './../api/index';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from './../state/actions/index';
import { Link, useParams, useHistory } from "react-router-dom";
import "regenerator-runtime/runtime";
import { getStates, getTask, updateTask, deleteTask } from './../api/requests';

let TaskListInfo = ({ match }) => {
    
    const [task, setTask] = useState({});
    const [taskStates, setTaskStates] = useState([]);

    const { id } = useParams();
    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    const { setTaskList, setTaskState } = bindActionCreators(actionCreators, dispatch);

    let history = useHistory();
    
    let isTaskExist = state.task.tasks.filter(item => item.id == id).length > 0;
    let hasStatus = state.task.status.length > 0;

    useEffect(() => {
        !isTaskExist && getTask(api, id, response => setTaskList(response.data));
        !hasStatus && getStates(api, response => setTaskState(response.data));

        getStates(api, response => setTaskStates(response.data));
    }, []);

    useEffect(() => {
        state.task.tasks.forEach(item => {
            item.id == id && setTask(item);
        });
    }, [isTaskExist]);
    

    const handleTaskName = value => {
        setTask({
            ...task,
            taskName: value
        });
    }

    const handleDate = value => {
        setTask({
            ...task,
            date: value
        });
    }

    const handleUpdate = () => {
        updateTask({
            api,
            id,
            task,
            success: () => history.goBack(),
            error: () => console.log("error")
        });
    }
    
    const handleStatus = value => {
        setTask({
            ...task,
            stateId: value
        });
    }

    const handleDelete = () => {
        deleteTask(api, id, response => history.goBack());
    }

    return(
        <div className={ classnames(styles['c-task-list-info'], styles.container) }>
            <div className={ classnames(styles['c-task-list-info-header']) }>
                <div className={ classnames(styles['c-task-list-info-header-button-container']) }>
                    <Button 
                        onClick={() => history.goBack()}
                        text="BACK"
                        className={ classnames(styles['c-task-list-info-button-filter']) }
                    />
                </div>
                <div className={ classnames(styles['c-task-list-info-header-text']) }>
                    <h1>{ task.taskName }</h1>
                </div>
                <div></div>
            </div>
            <div className={ classnames(styles['c-task-list-info-content']) }>
               <form 
                onSubmit={event => {
                    event.preventDefault();
                }} 
                className={styles['c-task-list-info-container']}
            >
                    <FormGroup className={styles['c-task-list-info-form-group']}>
                        <TextField 
                            name="taskName"
                            className={styles['c-task-list-info-text-field']} 
                            value={task.taskName}
                            onChange={handleTaskName}
                        />
                    </FormGroup>
                    <FormGroup className={styles['c-task-list-info-form-group']}>
                        <TextField 
                            name="date"
                            className={styles['c-task-list-info-text-field']} 
                            value={task.date}
                            onChange={handleDate}
                        />
                    </FormGroup>
                    {
                        task.stateId != undefined && (

                            <FormGroup className={styles['c-task-list-info-form-group']}>
                                <Dropdown 
                                    className={styles['c-task-list-info-dropdown']} 
                                    stateId={task.stateId}
                                    items={taskStates}
                                    onChange={handleStatus}
                                />
                            </FormGroup>

                        )
                    }
                     <FormGroup 
                        className={
                            classnames(
                                styles['c-task-list-info-form-group'], 
                                styles['c-task-list-info-form-group-action']
                            )
                        }
                    >
                        <Button 
                            className={classnames(styles['c-task-list-info-delete-button'])}
                            text="DELETE" 
                            onClick={handleDelete}
                            buttonType="secondary"
                        />
                        <Button 
                            className={classnames(styles['c-task-list-info-update-button'])}
                            text="UPDATE" 
                            onClick={handleUpdate}
                        />
                    </FormGroup>
                </form>
            </div>
        </div>
    );
}

export default TaskListInfo;