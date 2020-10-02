import { put, takeLatest, select } from "redux-saga/effects";
import { ACTION_TYPES, SAGA_ACTIONS } from "../../../constants";

function* workCreateToDoList(action) {
  yield put({ type: ACTION_TYPES.CREATE_TODO_STARTED });
  try {
    let resultData = yield select((state) => state.todo.data);
    resultData = [...resultData, action.payload];
    let payload = {
      message: "Todo added successfully",
      success: true,
      data: resultData,
    };
    yield put({
      type: ACTION_TYPES.CREATE_TODO_SUCCESS,
      payload: payload,
    });
  } catch (err) {
    console.log(err);
  }
}

function* workDeleteToDoList(action) {
  try {
    let resultData = yield select((state) => state.todo.data);
    console.log("data lol", resultData);
    let updatedToDo = [];
    resultData.forEach((row) => {
      if (row.id !== action.payload) {
        updatedToDo.push(row);
      }
    });
    console.log("data", updatedToDo);
    let payload = {
      message: "Todo deleted successfully",
      success: true,
      data: updatedToDo,
    };
    yield put({
      type: ACTION_TYPES.DELETE_TODO,
      payload: payload,
    });
  } catch (err) {
    console.log(err);
  }
}

export function* watchCreateToDoList() {
  yield takeLatest(SAGA_ACTIONS.CREATE_TODO, workCreateToDoList);
}

export function* watchDeleteToDoList() {
  yield takeLatest(SAGA_ACTIONS.DELETE_TODO, workDeleteToDoList);
}
