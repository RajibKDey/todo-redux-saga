import { ACTION_TYPES, SAGA_ACTIONS } from "../../../constants";

export const createToDo = (data) => ({
  type: SAGA_ACTIONS.CREATE_TODO,
  payload: data,
});

export const deleteToDo = (data) => ({
  type: SAGA_ACTIONS.DELETE_TODO,
  payload: data,
});

export const resetToDo = () => ({
  type: ACTION_TYPES.CREATE_TODO_RESET,
});
