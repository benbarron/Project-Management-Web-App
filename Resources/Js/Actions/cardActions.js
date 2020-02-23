import axios from 'axios';
import {
  CREATE_CARD,
  DELETE_CARD,
  LOADING_CARDS,
  CARDS_LOADED,
  CARD_UPDATED
} from './types';
import { tokenConfig } from './authActions';

export const loadCards = () => (dispatch, getState) => {
  dispatch({
    type: LOADING_CARDS
  });

  axios
    .get('/api/cards', tokenConfig(getState))
    .then(res => {
      dispatch({
        type: CARDS_LOADED,
        payload: res.data.cards
      });
    })
    .catch(err => console.log(err));
};

export const deleteCard = id => (dispatch, getState) => {
  axios
    .delete(`/api/cards/${id}`, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: DELETE_CARD,
        payload: getState().cards.cards.filter(card => card._id !== id)
      });
    })
    .catch(err => console.log(err));
};

export const createCard = (newCard, errCatch, success) => (
  dispatch,
  getState
) => {
  //find max sort value and set new sort value to one higher
  const cards = getState().cards.cards;
  let max = 0;

  if (cards.length > 0) {
    cards.forEach(function(card) {
      if (card.sortValue > max) {
        max = card.sortValue;
      }
    });
  }

  const sortValue = max + 1;

  newCard['sortValue'] = sortValue;

  axios
    .post('/api/cards', newCard, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: CREATE_CARD,
        payload: [...getState().cards.cards, res.data.card]
      });
      success();
    })
    .catch(err => errCatch(err.response.data.msg));
};

export const updateCardName = (id, name) => (dispatch, getState) => {
  axios
    .put(`/api/cards/${id}`, { name }, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: CARD_UPDATED,
        payload: [
          res.data.card,
          ...getState().cards.cards.filter(card => card._id !== id)
        ]
      });
    })
    .catch(err => console.log(err));
};
