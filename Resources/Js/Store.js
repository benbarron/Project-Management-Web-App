import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './Reducers';

const initialState = {};

const middleware = [thunk];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const Store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleware))
);

// const store = createStore(rootReducer, initialState, compose(
//   applyMiddleware(...middleware),
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// ));

export default Store;
