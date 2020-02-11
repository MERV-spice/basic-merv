import axios from 'axios';
import url from '../ngrok';

const initialState = [];

//action type
const GET_CLUES = 'GET_CLUES';

//action creator
const getClues = clues => {
  return {
    type: GET_CLUES,
    clues
  };
};

//reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CLUES:
      return action.clues;
    default:
      return state;
  }
};

//thunk
export const fetchClues = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`${url}/api/clues`);
      dispatch(getClues(data));
    } catch (err) {
      console.error(err);
    }
  };
};
