import axios from 'axios';
import url from '../ngrok';

const initialState = {};

const GET_GAME_USER_SCORE = 'GET_GAME_USER_SCORE';
const ADD_SCORE = 'ADD_SCORE';

const getGameUserScore = score => ({type: GET_GAME_USER_SCORE, score});
const addScore = score => ({type: ADD_SCORE, score});

export const fetchGameUserScore = (userId, gameId) => {
  return async dispatch => {
    try {
      const {data} = await axios.get(
        `${url}/api/score/gameUser/${userId}/${gameId}`
      );
      return dispatch(getGameUserScore(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const addScoreThunk = (userId, gameId, score) => {
  console.log('in add score thunk', userId, gameId, score);
  return async dispatch => {
    try {
      const reqObject = {userId, gameId, score};
      const {data} = await axios.put(`${url}/api/score/`, reqObject);
      return dispatch(addScore(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_GAME_USER_SCORE:
      return action.score;
    case ADD_SCORE:
      return action.score;
    default:
      return state;
  }
}
