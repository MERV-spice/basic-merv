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
      return dispatch(getGameUserScore(data[0]));
    } catch (err) {
      console.error(err);
    }
  };
};

export const addScoreThunk = (userId, gameId, score, itemsFound) => {
  return async dispatch => {
    try {
      const reqObject = {userId, gameId, score, itemsFound};
      const {data} = await axios.put(`${url}/api/score/`, reqObject);
      return dispatch(addScore(data));
    } catch (err) {
      console.error(err);
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
