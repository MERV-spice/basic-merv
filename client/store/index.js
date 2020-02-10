import {createStore, combineReducers, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import user from './user';
import games from './games';
import clues from './clues';
import scores from './scores';
import requests from './request';
import userScores from './userScores';
import gameUserScore from './gameUserScore';

const reducer = combineReducers({
  user,
  games,
  clues,
  scores,
  requests,
  userScores,
  gameUserScore
});

const middleware = applyMiddleware(
  thunkMiddleware
  //  createLogger({ collapsed: true })
);

const store = createStore(reducer, middleware);

export default store;
export * from './user';
