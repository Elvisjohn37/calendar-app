import "regenerator-runtime/runtime";

export let getTasks = async (api, callback) => {
    try {
        const response = await api.get('/tasks');
        callback(response);
    } catch(err) {
        console.log(err)
    }
}

export let getStates = async (api, callback) => {
    try {
        const response = await api.get('/states');
        callback(response);
    } catch(err) {
        console.log(err)
    }
}

export let getTask = async (api, id, callback) => {
    try {
        const response = await api.get(`/tasks/${id}`);
        callback(response);
    } catch(err) {
        console.log(err)
    }
}


export let updateTask = async ({ api, id, task, success, error }) => {
    await api.put(`/tasks/${id}`, task)
        .then(response => {
            success(response);
        }).catch(err => {
            error(err);
        });
}

export let addTask = async ({ api, task, success, error }) => {
    await api.post(`/tasks`, task)
        .then(response => {
            success(response);
        }).catch(err => {
            error(err);
        });
}

export let deleteTask = async (api, id, callback) => {
    try {
        const response = await api.delete(`/tasks/${id}`);
        callback(response);
    } catch(err) {
        console.log(err)
    }
}
