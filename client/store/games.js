import axios from 'axios';
import ngrokUrl from '../ngrok';

const initialState = [];

const SET_GAMES = 'SET_GAMES';

const setGames = games => ({ type: SET_GAMES, games });

export const fetchGames = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get(
        `https://${ngrokUrl}.ngrok.io/api/games`
      );
      dispatch(setGames(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_GAMES:
      return action.games;
    default:
      return state;
  }
}
