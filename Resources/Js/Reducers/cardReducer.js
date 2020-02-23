import {
  CREATE_CARD,
  DELETE_CARD,
  LOADING_CARDS,
  CARDS_LOADED,
  CARD_UPDATED,
  CARD_MOVED,
  BOARD_CLONED
} from '../Actions/types';

const initialState = {
  cards: [],
  isLoading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_CARD:
      return {
        ...state,
        cards: action.payload
      };
    case DELETE_CARD:
      return {
        ...state,
        cards: action.payload
      };
    case CARDS_LOADED:
      return {
        ...state,
        cards: action.payload,
        isLoading: false
      };
    case LOADING_CARDS:
      return {
        ...state,
        isLoading: true
      };
    case CARD_UPDATED:
      return {
        ...state,
        cards: action.payload
      };
    case BOARD_CLONED:
      return {
        ...state,
        cards: action.payload.cards
      };
    case CARD_MOVED:
      return {
        ...state,
        cards: action.payload
      };
    default:
      return state;
  }
}
