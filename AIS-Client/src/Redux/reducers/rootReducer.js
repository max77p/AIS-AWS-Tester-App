import { combineReducers } from 'redux';
import simpleReducer from './simpleReducer';


const rootReducer= combineReducers({
    sr:simpleReducer
})

export default rootReducer;