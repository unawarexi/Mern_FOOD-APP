import {combineReducers} from "redux"
import userReducer from "./UserReducer"
import alertReducer from './AlertReducer.jsx';
import productReducer from './ProductReducer.jsx';


const myReducers = combineReducers({
    user : userReducer,
    alert: alertReducer,
    products: productReducer,

})

export default myReducers;