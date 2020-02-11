import axios from 'axios';
import url from '../ngrok';

const initialState = [];

const SET_SCORES = 'SET_SCORES';

const setScores = scores => ({type: SET_SCORES, scores});

export const fetchScores = gameId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`${url}/api/score/game/${gameId}`);
      dispatch(setScores(data));
    } catch (err) {
      console.error(err);
    }
  };
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_SCORES:
      return action.scores;
    default:
      return state;
  }
}
