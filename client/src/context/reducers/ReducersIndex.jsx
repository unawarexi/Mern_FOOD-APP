import {combineReducers} from "redux"
import userReducer from "./UserReducer"
import alertReducer from './AlertReducer.jsx';

const myReducers = combineReducers({
    user : userReducer,
    alert: alertReducer
})

export default myReducers;