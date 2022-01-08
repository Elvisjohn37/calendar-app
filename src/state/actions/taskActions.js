
export const setTaskLists = (taskLists) => {
    return (dispatch) => {
        dispatch({
            type: "SET_TASKS_LISTS",
            value: taskLists
        });
    }
}

export const setTaskList = (taskList) => {
    return (dispatch) => {
        dispatch({
            type: "SET_TASKS_LIST",
            value: taskList
        });
    }
}

export const setTaskState = (status) => {
    return (dispatch) => {
        dispatch({
            type: "SET_TASKS_STATE",
            value: status
        });
    }
}

export const addTask = (task) => {
    return (dispatch) => {
        dispatch({
            type: "ADD_TASK",
            value: task
        });
    }
}

export const removeTask = (taskId) => {
    return (dispatch) => {
        dispatch({
            type: "REMOVE_TASK",
            value: taskId
        });
    }
}

export const updateTask = (task) => {
    return (dispatch) => {
        dispatch({
            type: "UPDATE_TASK",
            value: task
        });
    }
}
