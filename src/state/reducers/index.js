import { combineReducers } from 'redux';
import taskReducer from './taskReducer';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['task']
}

const rootReducer = combineReducers({
    task: taskReducer
});

// let reducers = combineReducers({
//     task: taskReducer
// });

export default persistReducer(persistConfig, rootReducer);