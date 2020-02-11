import axios from 'axios';
import url from '../ngrok';
import {fetchGames} from './games';
import {fetchRequests, deleteRequest} from './request';
import {AsyncStorage} from 'react-native';
import {Notifications} from 'expo';

const SIGN_UP = 'SIGN_UP';
const GET_USER = 'GET_USER';
const SET_GAME = 'SET_GAME';
const CLUE_PLUS = 'CLUE_PLUS';
const CLUE_RESET = 'CLUE_RESET';
const NEW_FRIEND = 'NEW_FRIEND';

const signUp = user => ({type: SIGN_UP, user});
const getUser = user => ({type: GET_USER, user});
const setGame = game => ({type: SET_GAME, game});
const cluePlus = () => ({type: CLUE_PLUS});
const clueReset = () => ({type: CLUE_RESET});
export const newFriend = user => ({type: NEW_FRIEND, user});

export const addFriend = (reqId, userId) => {
  return async dispatch => {
    try {
      const {data} = await axios.post(`${url}/api/users/addFriend`, {
        reqId,
        userId
      });
      dispatch(newFriend(data));
      dispatch(deleteRequest(reqId));
    } catch (err) {
      console.error(err);
    }
  };
};

export const signUpUser = user => {
  return async dispatch => {
    try {
      const res = await axios.post(`${url}/api/users/signup`, user);
      dispatch(signUp(res.data));
    } catch (err) {
      console.error(err);
    }
  };
};

export const currentCluePlus = user => {
  return async dispatch => {
    try {
      const {status} = await axios.post(`${url}/api/users/clue`, user);
      if (status === 202) {
        dispatch(cluePlus());
      }
    } catch (err) {
      console.error(err);
    }
  };
};

export const currentClueReset = user => {
  return async dispatch => {
    try {
      const {status} = await axios.post(`${url}/api/users/reset`, user);
      if (status === 202) {
        dispatch(clueReset());
      }
    } catch (err) {
      console.error(err);
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
    await AsyncStorage.setItem('email', email);
    await AsyncStorage.setItem('password', password);
  } catch (authError) {
    return dispatch(getUser({error: authError}));
  }

  try {
    dispatch(getUser(res.data));
    const token = await Notifications.getExpoPushTokenAsync();
    await axios.put(`${url}/api/notification`, {value: token});
    dispatch(fetchRequests());
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr);
  }
};

export const joinGame = (gameId, userId) => async dispatch => {
  try {
    const {data} = await axios.put(`${url}/api/users/joingame`, {
      gameId,
      userId
    });
    dispatch(setGame(data));
    dispatch(fetchGames());
  } catch (err) {
    console.error(err);
  }
};

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case SIGN_UP:
      return action.user;
    case GET_USER:
      return action.user;
    case SET_GAME:
      return {...state, game: action.game, currentClue: 0};
    case CLUE_PLUS:
      return {...state, currentClue: state.currentClue + 1};
    case CLUE_RESET:
      return {...state, currentClue: 0};
    case NEW_FRIEND:
      return {...state, Friend: [...state.Friend, action.user]};
    default:
      return state;
  }
}
