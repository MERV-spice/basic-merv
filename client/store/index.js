import {createStore, combineReducers, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import user from './user';
import games from './games';
import clues from './clues';

const reducer = combineReducers({
  user: user,
  games: games,
  clues: clues
});

const middleware = applyMiddleware(
  thunkMiddleware
  //  createLogger({ collapsed: true })
);

const store = createStore(reducer, middleware);

export default store;
export * from './user';
