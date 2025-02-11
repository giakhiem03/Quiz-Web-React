import { combineReducers } from "redux";
import userReducer from "./userRedeucer";

const rootReducer = combineReducers({
    user: userReducer,
});

export default rootReducer;
