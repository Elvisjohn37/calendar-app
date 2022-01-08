import React, { useEffect, useState } from 'react'; 
import styles from './TaskList.module.scss';
import classnames from 'classnames';
import Button from './../components/Button';
import ToggleOption from './../components/ToggleOption';
import TaskCard from './../components/TaskCard';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from './../state/actions/index';
import api from './../api/index';
import "regenerator-runtime/runtime";
import { getTasks, getStates } from './../api/requests';
import { Link } from "react-router-dom";

let TaskList = () => {

    const state = useSelector((state) => state);
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const [filteredStatusId, setFilteredStatusId] = useState(null);
    const [tasks, setTasks] = useState([]);
    const dispatch = useDispatch();

    const { setTaskLists, setTaskState } = bindActionCreators(actionCreators, dispatch);
    

    useEffect(() => {
        getTasks(api, response => {
            setTaskLists(response.data);
            setTasks(response.data);
        });
        getStates(api, response => setTaskState(response.data));
    }, []);

    useEffect(() => {
        if(filteredStatusId != 0) {
            setTasks(state.task.tasks.filter(item => item.stateId == filteredStatusId));
        } else {
            setTasks(state.task.tasks);
        }
    }, [filteredStatusId]);
    
    let filterByStatus = () => {
        console.log(state);
    }

    let handleFilterButton = () => {
        setIsFilterVisible(!isFilterVisible);
    }

    let handleSelectStatus = event => {
        console.log(event.target.value);
        setFilteredStatusId(event.target.value);
    }

    return(
        <div className={ classnames(styles['c-task-list']) }>
            <div className={ classnames(styles['c-task-list-header']) }>
                <div></div>
                <div className={ classnames(styles['c-task-list-header-text']) }>
                    <h1>CALENDAR APP</h1>
                </div>
                <div className={ classnames(styles['c-task-list-header-button-container']) }>
                    <Button 
                        onClick={filterByStatus}
                        text="FILTER"
                        className={ classnames(styles['c-task-list-button-filter']) }
                        ToggleOption={<ToggleOption 
                            isFilterVisible={isFilterVisible} 
                            status={ state.task.status } 
                            onClick={handleSelectStatus}
                            defaultItem = "Show all"
                        />}
                        onClick={handleFilterButton}
                    />
                </div>
            </div>
            <div className={ classnames(styles['c-task-list-content']) }>
                <div 
                    className={ classnames(styles['c-task-list-container']) }
                    >
                    {
                        tasks.map((item, index) => {
                            console.log(item)
                            return(
                                <Link 
                                    key={index}
                                    to={ `/task-list-info/${item.id}` }
                                >
                                    <TaskCard 
                                        className={ classnames(styles['c-task-list-task-card']) }
                                        task={item}
                                    />
                                </Link>    
                            )
                        })
                    }
                    <Link
                        to={ `/task-list-form` }
                        className={classnames(styles['c-task-list-task-link'])}
                    >
                        <Button 
                            className={classnames(styles['c-task-list-task-add-button'])}
                            text="ADD" 
                        />
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default TaskList;
