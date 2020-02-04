import axios from 'axios';
import url from '../ngrok';
import {resetGame} from './games';

const SIGN_UP = 'SIGN_UP';
const GET_USER = 'GET_USER';
const SET_GAME = 'SET_GAME';

const signUp = user => ({type: SIGN_UP, user});
const getUser = user => ({type: GET_USER, user});
const setGame = game => ({type: SET_GAME, game});
export const signUpUser = user => {
  return async dispatch => {
    try {
<<<<<<< HEAD
      const res = await axios.post(
        `https://${ngrokUrl}.ngrok.io/api/users/signup`,
        user
      );
      return dispatch(signUp(res.data));
=======
      const res = await axios.post(`${url}/api/users/signup`, user);
      dispatch(signUp(res.data));
>>>>>>> e8e78997e3bdb9b8e1c17bb31b409634e0bb10a5
    } catch (err) {
      console.log(err);
    }
  };
};

export const auth = (email, password) => async dispatch => {
  let res;
  try {
    res = await axios.post(`${url}/api/auth/login`, {
      email,
      password,
      login: 'login'
    });
  } catch (authError) {
    return dispatch(getUser({error: authError}));
  }

  try {
    dispatch(getUser(res.data));
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr);
  }
};

export const joinGame = (gameId, userId) => async dispatch => {
<<<<<<< HEAD
    try {
	// console.log(gameId, userId);
	const { data } = await axios.put(`https://${ngrokUrl}.ngrok.io/api/users/joingame`, {
	    gameId,
	    userId
	});
	return dispatch(setGame(data));
    } catch (err) {
	console.error(err);
    }
=======
  try {
    console.log(gameId, userId);
    const {data} = await axios.put(`${url}/api/users/joingame`, {
      gameId,
      userId
    });
    dispatch(setGame(data));
    dispatch(resetGame(data));
  } catch (err) {
    console.error(err);
  }
>>>>>>> e8e78997e3bdb9b8e1c17bb31b409634e0bb10a5
};

export default function(state = {}, action) {
  switch (action.type) {
    case SIGN_UP:
      return action.user;
    case GET_USER:
      return action.user;
    case SET_GAME:
      return {...state, game: action.game, currentClue: 0};
    default:
      return state;
  }
}
