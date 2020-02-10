import axios from 'axios';
import url from '../ngrok';

const initialState = [];

const GET_USER_SCORES = 'GET_USER_SCORES';

const getUserScores = scores => ({type: GET_USER_SCORES, scores});

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

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER_SCORES:
      return action.scores;
    default:
      return state;
  }
}
