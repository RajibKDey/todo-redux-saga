import { combineReducers } from "redux";
import createToDoReducer from "../createToDo/reducer";

const rootReducer = combineReducers({
  todo: createToDoReducer,
});

export default rootReducer;
