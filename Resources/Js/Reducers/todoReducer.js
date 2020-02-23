import {
  CREATE_TODO,
  DELETE_TODO,
  LOADING_TODOS,
  TODOS_LOADED,
  TODO_UPDATED,
  ITEM_MOVED,
  ITEM_MOVING,
  SET_ITEM_DRAGGING,
  BOARD_CLONED
} from '../Actions/types';

const initialState = {
  todos: [],
  isLoading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_TODO:
      return {
        ...state,
        todos: action.payload.todos
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: action.payload.todos
      };
    case TODOS_LOADED:
      return {
        ...state,
        todos: action.payload.todos,
        isLoading: false
      };
    case LOADING_TODOS:
      return {
        ...state,
        isLoading: true
      };
    case TODO_UPDATED:
      return {
        ...state,
        todos: action.payload.todos
      };

    case ITEM_MOVED:
      return {
        ...state,
        todos: action.payload
      };
    case BOARD_CLONED:
      return {
        ...state,
        todos: action.payload.todos
      };
    case ITEM_MOVING:
      return {
        ...state
      };

    default:
      return state;
  }
}
