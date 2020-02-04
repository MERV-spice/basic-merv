import axios from 'axios';
import ngrokUrl from '../ngrok';

const initialState = [];

const SET_GAMES = 'SET_GAMES';
const ADD_GAME = 'ADD_GAME';

const setGames = games => ({ type: SET_GAMES, games });
const addGame = game => ({type: ADD_GAME, game});

export const fetchGames = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get(
        `https://${ngrokUrl}.ngrok.io/api/games`
      );
      return dispatch(setGames(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const addGameThunk = (game) => {
  return async dispatch => {
    try {
      const { data } = await axios.post(
        `https://${ngrokUrl}.ngrok.io/api/games`, game
      );
      return dispatch(addGame(data));
    } catch (err) {
      console.log(err)
    }
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_GAMES:
      return action.games;
    case ADD_GAME: 
      return [...state, action.game];
    default:
      return state;
  }
}
