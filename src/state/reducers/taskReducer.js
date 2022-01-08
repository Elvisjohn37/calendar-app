

let reducer = (state = { tasks: [], status: [] }, action) => {
    switch(action.type) {
        case "SET_TASKS_LISTS":
            return { ...state, tasks: action.value } 
        case "SET_TASKS_LIST":
            return { ...state, tasks: [...state.tasks, action.value] } 
        case "SET_TASKS_STATE":
            return {
                ...state,
                status: action.value
            };
        case "ADD_TASK":
            return { 
                ...state,
                tasks: [
                    ...state.tasks,
                    action.value
                ]
            }
        case "REMOVE_TASK":
            return {
                ...state,
                tasks: state.tasks.filter(item => item.id != action.value)
            }
        case "UPDATE_TASK":
            return {
                ...state,
                tasks: state.tasks.map(item => {
                    return item.id == action.value.id ? action.value : item;
                })
            }
        default: 
            return { tasks: [], status: [] };

    }
}

export default reducer;