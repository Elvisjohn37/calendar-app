import React, { useEffect, useState } from 'react';
import styles from './TaskListForm.module.scss';
import classnames from 'classnames';
import Button from './../components/Button';
import TextField from './../components/TextField';
import Dropdown from './../components/Dropdown';
import FormGroup from './../components/FormGroup';
import api from './../api/index';
import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import "regenerator-runtime/runtime";
import { getStates, addTask } from './../api/requests';

let TaskListForm = () => {
    
    const [task, setTask] = useState({});
    const [taskStates, setTaskStates] = useState([]);
    const state = useSelector((state) => state);
    let hasStatus = state.task.status.length > 0;

    let history = useHistory();

    useEffect(() => {
        !hasStatus && getStates(api, response => setTaskState(response.data));

        getStates(api, response => setTaskStates(response.data));
    }, []);

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

    const handleStatus = value => {
        setTask({
            ...task,
            stateId: value
        });
    }

    const handleAdd = () => {
        let data = task;
        if(!task.stateId) {
            data = { ...task, stateId: taskStates[0].id }
        }
        console.log(data)
        if(data.taskName != null && data.date != null) {
            addTask({
                api,
                task: data,
                success: response => history.goBack(),
                error: response => console.log("error")
            });
        }
    }

    return(
        <div className={ classnames(styles['c-task-list-form'], styles.container) }>
            <div className={ classnames(styles['c-task-list-form-header']) }>
                <div className={ classnames(styles['c-task-list-form-header-button-container']) }>
                    <Button 
                        onClick={() => history.goBack()}
                        text="BACK"
                        className={ classnames(styles['c-task-list-form-button-filter']) }
                    />
                </div>
                <div className={ classnames(styles['c-task-list-form-header-text']) }>
                    <h1>CREATE</h1>
                </div>
                <div></div>
            </div>
            <div className={ classnames(styles['c-task-list-form-content']) }>
               <form 
                onSubmit={event => {
                    event.preventDefault();
                }} 
                className={styles['c-task-list-form-container']}
            >
                    <FormGroup className={styles['c-task-list-form-form-group']}>
                        <TextField 
                            name="taskName"
                            className={styles['c-task-list-form-text-field']} 
                            onChange={handleTaskName}
                            required
                        />
                    </FormGroup>
                    <FormGroup className={styles['c-task-list-form-form-group']}>
                        <TextField 
                            name="date"
                            className={styles['c-task-list-form-text-field']} 
                            onChange={handleDate}
                            required
                        />
                    </FormGroup>
                    {
                        taskStates.length > 0 && (

                            <FormGroup className={styles['c-task-list-form-form-group']}>
                                <Dropdown 
                                    className={styles['c-task-list-form-dropdown']} 
                                    items={taskStates}
                                    onChange={handleStatus}
                                />
                            </FormGroup>

                        )
                    }
                     <FormGroup 
                        className={
                            classnames(
                                styles['c-task-list-form-form-group'], 
                                styles['c-task-list-form-form-group-action']
                            )
                        }
                    >
                        <Button 
                            className={classnames(styles['c-task-list-form-update-button'])}
                            text="ADD" 
                            onClick={handleAdd}
                        />
                    </FormGroup>
                </form>
            </div>
        </div>
    );
}

export default TaskListForm;