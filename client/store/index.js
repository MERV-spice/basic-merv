import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import user from './user';
import games from './games';
import scores from './scores';

const reducer = combineReducers({
<<<<<<< HEAD
  user: user,
  games: games,
  scores: scores,
=======
	user: user,
	games: games
>>>>>>> e8e78997e3bdb9b8e1c17bb31b409634e0bb10a5
});

const middleware = applyMiddleware(
  thunkMiddleware,
//  createLogger({ collapsed: true })
);

const store = createStore(reducer, middleware);

export default store;
export * from './user';
