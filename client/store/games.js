import axios from 'axios';
import url from '../ngrok';

const initialState = [];

const SET_GAMES = 'SET_GAMES';
const ADD_GAME = 'ADD_GAME';
const RESET_GAME = 'RESET_GAME';

const addGame = game => ({type: ADD_GAME, game});
const setGames = games => ({type: SET_GAMES, games});
export const resetGame = game => ({type: RESET_GAME, game});

export const fetchGames = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`${url}/api/games`);
      dispatch(setGames(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const addGameThunk = game => {
  return async dispatch => {
    try {
      const {data} = await axios.post(`${url}/api/games`, game);
      return dispatch(addGame(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_GAMES:
      return action.games;
    case ADD_GAME:
      return [...state, action.game];
    case RESET_GAME:
      for (let i = 0; i < state.length; i++) {
        if (state[i].id === action.game.id) {
          const newState = [...state];
          newState.splice(i, 1, action.game);
          return newState;
        }
      }
    default:
      return state;
  }
}
