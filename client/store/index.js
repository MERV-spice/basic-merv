import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import user from './user';
import clue from './clue'

const reducer = combineReducers({
<<<<<<< HEAD
	user: user,
	clue: clue
=======
    user: user,
    games: games,
>>>>>>> e9dae8d034fee314ed7b0055ffeb4f02449e6c2b
});

const middleware = applyMiddleware(
  thunkMiddleware,
  createLogger({ collapsed: true })
);

const store = createStore(reducer, middleware);

export default store;
