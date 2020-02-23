import axios from 'axios';
import {
  CREATE_TODO,
  DELETE_TODO,
  LOADING_TODOS,
  TODOS_LOADED,
  TODO_UPDATED
} from './types';
import { tokenConfig } from './authActions';

export const loadTodos = () => (dispatch, getState) => {
  dispatch({
    type: LOADING_TODOS
  });

  axios
    .get('/api/todos', tokenConfig(getState))
    .then(res => {
      dispatch({
        type: TODOS_LOADED,
        payload: {
          todos: res.data.todos
        }
      });
    })
    .catch(err => console.log(err));
};

export const saveItem = todo => (dispatch, getState) => {
  const { id } = todo;

  axios
    .put(`/api/todos/${id}`, todo, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: TODO_UPDATED,
        payload: {
          todos: [
            ...getState().todos.todos.filter(todo => todo._id !== id),
            res.data.todo
          ]
        }
      });
    })
    .catch(err => console.log(err));
};

export const deleteTodo = (id, cb) => (dispatch, getState) => {
  axios
    .delete(`/api/todos/delete/${id}`, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: DELETE_TODO,
        payload: {
          todos: getState().todos.todos.filter(todo => todo._id !== id)
        }
      });
      cb();
    })
    .catch(err => console.log(err));
};

export const createTodo = newTodo => (dispatch, getState) => {
  const todos = getState().todos.todos;

  let max = 0;

  if (todos.length > 0) {
    todos.forEach(function(todo) {
      if (todo.sortValue > max) {
        max = todo.sortValue;
      }
    });
  }

  const sortValue = max + 1;

  newTodo['sortValue'] = sortValue;

  axios
    .post('/api/todos', newTodo, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: CREATE_TODO,
        payload: {
          todos: [...getState().todos.todos, res.data.todo]
        }
      });
    })
    .catch(err => console.log(err));
};
