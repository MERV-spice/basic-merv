import axios from 'axios';
import url from '../ngrok';

const initialState = [];

const SET_SCORES = 'SET_SCORES';
const GET_USER_SCORES = 'GET_USER_SCORES';
const GET_GAME_USER_SCORE = 'GET_GAME_USER_SCORE';
const ADD_SCORE = 'ADD_SCORE';

const setScores = scores => ({type: SET_SCORES, scores});
const getUserScores = scores => ({type: GET_USER_SCORES, scores});
const getGameUserScore = score => ({type: GET_GAME_USER_SCORE, score});
const addScore = score => ({type: ADD_SCORE, score});

export const fetchScores = gameId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`${url}/api/score/game/${gameId}`);
      dispatch(setScores(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchUserScores = userId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`${url}/api/score/user/${userId}`);
      dispatch(getUserScores(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchGameUserScore = (userId, gameId) => {
  return async dispatch => {
    try {
      const {data} = await axios.get(
        `${url}/api/score/gameUser/${userId}/${gameId}`
      );
      dispatch(getGameUserScore(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const addScoreThunk = (userId, gameId, score) => {
  return async dispatch => {
    try {
      const reqObject = {userId, gameId, score};
      const {data} = await axios.put(`${url}/api/score/`, reqObject);
      dispatch(addScore(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_SCORES:
      return action.scores;
    case GET_USER_SCORES:
      return action.scores;
    case GET_GAME_USER_SCORE:
      return action.score;
    case ADD_SCORE:
      return [...state, action.score];
    default:
      return state;
  }
}
