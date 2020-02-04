import axios from 'axios';
import url from '../ngrok';

const initialState = [];

const SET_GAMES = 'SET_GAMES';
<<<<<<< HEAD
const ADD_GAME = 'ADD_GAME';

const setGames = games => ({ type: SET_GAMES, games });
const addGame = game => ({type: ADD_GAME, game});
=======
const RESET_GAME = 'RESET_GAME';

const setGames = games => ({type: SET_GAMES, games});
export const resetGame = game => ({type: RESET_GAME, game});
>>>>>>> e8e78997e3bdb9b8e1c17bb31b409634e0bb10a5

export const fetchGames = () => {
  return async dispatch => {
    try {
<<<<<<< HEAD
      const { data } = await axios.get(
        `https://${ngrokUrl}.ngrok.io/api/games`
      );
      return dispatch(setGames(data));
=======
      const {data} = await axios.get(`${url}/api/games`);
      dispatch(setGames(data));
>>>>>>> e8e78997e3bdb9b8e1c17bb31b409634e0bb10a5
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
<<<<<<< HEAD
    case ADD_GAME: 
      return [...state, action.game];
=======
    case RESET_GAME:
      for (let i = 0; i < state.length; i++) {
        if (state[i].id === action.game.id) {
          const newState = [...state];
          newState.splice(i, 1, action.game);
          return newState;
        }
      }
>>>>>>> e8e78997e3bdb9b8e1c17bb31b409634e0bb10a5
    default:
      return state;
  }
}
