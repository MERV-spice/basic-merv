import axios from 'axios';
import url from '../ngrok';

const initialState = {};

//action type
const GET_CLUE = 'GET_CLUE';

//action creator
const getClue = clue => {
  return {
    type: GET_CLUE,
    clue
  };
};

//reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CLUE:
      return action.clue;
    default:
      return state;
  }
};

//thunk
export const fetchClue = clueId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`${url}/api/clue/${clueId}`);
      dispatch(getClue(data));
    } catch (err) {
      console.log(err);
    }
  };
};
