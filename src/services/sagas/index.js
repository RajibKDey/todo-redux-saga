import { all } from "redux-saga/effects";
import { watchCreateToDoList, watchDeleteToDoList } from "../createToDo/saga";

export default function* rootSaga() {
  yield all([watchCreateToDoList(), watchDeleteToDoList()]);
}
