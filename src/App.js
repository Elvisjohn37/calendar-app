import React from 'react';
import classnames from 'classnames';
import styles from './App.module.scss';
import Button from './components/Button.js';
import TextField from './components/TextField.js';
import Dropdown from './components/Dropdown.js';
import TaskCard from './components/TaskCard.js';
import TaskList from './pages/TaskList.js';
import TaskListForm from './pages/TaskListForm.js';
import TaskListInfo from './pages/TaskListInfo.js';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

let App = () => {

    const submit = () => {
        alert();
    }
    

    return(
        <Router>
            <div
                className={ classnames(styles["c-container"]) }
            >
                <Switch>
                    <Route exact path="/">
                        <TaskList />
                    </Route>
                    <Route path="/task-list-form">
                        <TaskListForm />
                    </Route>
                    <Route path="/task-list-info/:id">
                        <TaskListInfo />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;