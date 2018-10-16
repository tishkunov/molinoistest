import { combineReducers } from "redux";
import dashboard from "./dashboard";
import news from './news'


const rootReducer = combineReducers({
	news
})

export default rootReducer;