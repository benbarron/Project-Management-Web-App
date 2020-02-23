import {
  BOARDS_LOADED,
  LOADING_BOARDS,
  BOARD_DELETED,
  BOARD_CREATED,
  CLEAR_BOARDS,
  BOARD_MOVED,
  BOARDS_SORTED,
  BOARD_UPDATED,
  BOARD_CLONED,
  CLONING_BOARD
} from '../Actions/types';

const initialState = {
  boards: [],
  isLoading: false,
  cloning: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_BOARDS:
      return {
        ...state,
        isLoading: true
      };
    case BOARDS_LOADED:
      return {
        ...state,
        isLoading: false,
        boards: action.payload
      };
    case BOARD_DELETED:
      return {
        ...state,
        boardDeleted: true,
        boards: action.payload
      };
    case BOARD_CREATED:
      return {
        ...state,
        boards: action.payload
      };
    case BOARD_UPDATED: {
      return {
        ...state,
        boards: action.payload
      };
    }
    case CLEAR_BOARDS:
      return {
        ...state,
        boards: [],
        newBoard: null
      };
    case BOARD_MOVED:
      return {
        ...state,
        boards: action.payload
      };
    case BOARDS_SORTED:
      return {
        ...state,
        boards: action.payload
      };
    case BOARD_CLONED:
      return {
        ...state,
        boards: action.payload.boards,
        cloning: false
      };
    case CLONING_BOARD: {
      return {
        ...state,
        cloning: true
      };
    }
    default:
      return state;
  }
}
