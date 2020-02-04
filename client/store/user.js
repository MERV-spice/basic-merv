import axios from 'axios';
import url from '../ngrok';
import {resetGame} from './games';

const SIGN_UP = 'SIGN_UP';
const GET_USER = 'GET_USER';
const SET_GAME = 'SET_GAME';
const CLUE_PLUS = 'CLUE_PLUS';

const signUp = user => ({type: SIGN_UP, user});
const getUser = user => ({type: GET_USER, user});
const setGame = game => ({type: SET_GAME, game});
const cluePlus = user => ({type: CLUE_PLUS, user});

export const signUpUser = user => {
  return async dispatch => {
    try {
      const res = await axios.post(`${url}/api/users/signup`, user);
      dispatch(signUp(res.data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const currentCluePlus = user => {
  return async dispatch => {
    try {
      const {data} = await axios.post(
        `https://${ngrokUrl}.ngrok.io/api/users/clue`
      );
      dispatch(cluePlus(data));
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
