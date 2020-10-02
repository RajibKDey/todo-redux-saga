import { ACTION_TYPES } from "../../../constants";

const initialState = {
  loading: false,
  success: false,
  message: "",
  data: [],
  error: false,
  code: false,
};

export default function createToDoReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.CREATE_TODO_STARTED:
      return {
        ...state,
        loading: true,
      };
    case ACTION_TYPES.CREATE_TODO_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload.success,
        data: action.payload.data,
        message: action.payload.message,
        code: true,
      };
    case ACTION_TYPES.CREATE_TODO_RESET:
      return {
        ...state,
        code: false,
      };
    case ACTION_TYPES.DELETE_TODO_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        success: action.payload.success,
        message: action.payload.message,
      };
    default:
      return state;
  }
}
