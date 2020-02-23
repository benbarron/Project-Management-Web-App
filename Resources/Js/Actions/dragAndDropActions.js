import { ITEM_MOVED, CARD_MOVED } from './types';
import axios from 'axios';
import { tokenConfig } from './authActions';

export const moveItem = result => (dispatch, getState) => {
  if (!result.destination) {
    return;
  }

  // get values from result object
  var position = result.destination.index;
  var cardId = result.destination.droppableId;
  var itemId = result.draggableId;

  var todo = getState().todos.todos.filter(todo => todo._id === itemId)[0];

  var todos = getState()
    .todos.todos.filter(todo => todo._id !== itemId)
    .filter(todo => todo.parentCard === cardId);

  var otherTodos = getState()
    .todos.todos.filter(todo => todo._id !== itemId)
    .filter(todo => todo.parentCard !== cardId);

  if (cardId !== todo.parentCard) {
    todo.parentCard = cardId;
  }

  todos.splice(position, 0, todo);

  for (var i = 0; i < todos.length; i++) {
    todos[i].sortValue = i;
  }

  var combinedTodos = [...todos, ...otherTodos];

  dispatch({
    type: ITEM_MOVED,
    payload: combinedTodos
  });

  var arr = [];

  for (var i = 0; i < todos.length; i++) {
    arr.push({
      sortValue: todos[i].sortValue,
      todoId: todos[i]._id
    });
  }

  const body = {
    itemId,
    cardId,
    arr
  };

  axios
    .post(`/api/dnd/move-item`, body, tokenConfig(getState))
    .then(res => {})
    .catch(err => console.log(err));
};

export const reorderCards = result => (dispatch, getState) => {
  var position = result.destination.index;
  var boardId = result.destination.droppableId;
  var cardId = result.draggableId;

  const card = getState().cards.cards.filter(card => card._id === cardId)[0];

  const cards = getState()
    .cards.cards.filter(card => card._id !== cardId)
    .filter(card => card.parentBoard === boardId);

  cards.splice(position, 0, card);

  for (var i = 0; i < cards.length; i++) {
    cards[i].sortValue = i;
  }

  dispatch({
    type: CARD_MOVED,
    payload: cards
  });

  let arr = [];

  for (let i = 0; i < cards.length; i++) {
    arr.push({
      sortValue: cards[i].sortValue,
      cardId: cards[i]._id
    });
  }

  axios
    .post('/api/dnd/reorder-cards', { arr }, tokenConfig(getState))
    .then(res => {})
    .catch(err => console.log(err));
};
