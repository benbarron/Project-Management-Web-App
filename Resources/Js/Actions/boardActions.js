import axios from 'axios';

import {
  LOADING_BOARDS,
  BOARDS_LOADED,
  BOARD_DELETED,
  BOARD_CREATED,
  CLEAR_BOARDS,
  BOARD_UPDATED,
  BOARD_CLONED,
  CLONING_BOARD
} from './types';

import { tokenConfig } from './authActions';

export const loadBoards = () => (dispatch, getState) => {
  dispatch({ type: LOADING_BOARDS });

  axios
    .get('/api/boards', tokenConfig(getState))
    .then(res => {
      dispatch({
        type: BOARDS_LOADED,
        payload: res.data.boards
      });
    })
    .catch(err => console.log(err));
};

export const cloneBoard = id => (dispatch, getState) => {
  dispatch({
    type: CLONING_BOARD
  });
  axios
    .post(`/api/boards/clone/${id}`, {}, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: BOARD_CLONED,
        payload: {
          boards: [...getState().boards.boards, res.data.board],
          cards: [...getState().cards.cards, ...res.data.cards],
          todos: [...getState().todos.todos, ...res.data.todos]
        }
      });
    })
    .catch(err => console.log(err));
};

export const deleteBoard = id => (dispatch, getState) => {
  axios
    .delete(`/api/boards/${id}`, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: BOARD_DELETED,
        payload: getState().boards.boards.filter(board => board._id !== id)
      });
    })
    .catch(err => console.log(err.response.data.msg));
};

export const updateBoard = ({ name, description, id }, errCatch, success) => (
  dispatch,
  getState
) => {
  axios
    .put(`/api/boards/${id}`, { name, description }, tokenConfig(getState))
    .then(res => {
      var newBoardArr = [
        ...getState().boards.boards.filter(board => board._id !== id),
        res.data.board
      ];

      newBoardArr = newBoardArr.sort((a, b) => {
        if (a.sortValue > b.sortValue) {
          return 1;
        } else {
          return -1;
        }
      });

      dispatch({
        type: BOARD_UPDATED,
        payload: newBoardArr
      });

      success();
    })
    .catch(err => errCatch(err.response.data.msg));
};

export const setBackground = ({ id, bg }) => (dispatch, getState) => {
  axios
    .put(`/api/boards/bg/${id}`, { bg }, tokenConfig(getState))
    .then(res => {
      var newBoardArr = [
        ...getState().boards.boards.filter(board => board._id !== id),
        res.data.board
      ];

      newBoardArr = newBoardArr.sort((a, b) => {
        if (a.sortValue > b.sortValue) {
          return 1;
        } else {
          return -1;
        }
      });

      dispatch({
        type: BOARD_UPDATED,
        payload: newBoardArr
      });
    })
    .catch(err => console.log(err));
};

export const createBoard = ({ name, description, type }, errCatch, success) => (
  dispatch,
  getState
) => {
  return new Promise((resolve, reject) => {
    //loop through boards and find max sortValue and set new sortvalue higher
    const boards = getState().boards.boards;
    let max = 0;

    if (boards.length > 0) {
      boards.forEach(function(board) {
        if (board.sortValue > max) {
          max = board.sortValue;
        }
      });
    }

    const sortValue = max + 1;
    const bg = '';

    const newItem = {
      name,
      bg,
      description,
      type,
      sortValue
    };

    axios
      .post('/api/boards', newItem, tokenConfig(getState))
      .then(res => {
        dispatch({
          type: BOARD_CREATED,
          payload: [...getState().boards.boards, res.data.board]
        });

        resolve();
      })
      .catch(err => reject(err.response.data.msg)); //
  });
};

export const addMember = id => (dispatch, getState) => {
  console.log(id);
};

export const clearBoards = () => (dispatch, getState) => {
  dispatch({
    type: CLEAR_BOARDS,
    payload: []
  });
};
