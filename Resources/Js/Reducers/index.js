import { combineReducers } from 'redux';
import authReducer from './authReducer';
import boardReducer from './boardReducer';
import cardReducer from './cardReducer';
import todoReducer from './todoReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  boards: boardReducer,
  cards: cardReducer,
  todos: todoReducer
});

export default rootReducer;
