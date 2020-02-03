import axios from 'axios';
import ngrokUrl from '../ngrok';

const SIGN_UP = 'SIGN_UP';
const GET_USER = 'GET_USER';

const signUp = user => ({ type: SIGN_UP, user });
const getUser = user => ({ type: GET_USER, user });

export const signUpUser = user => {
  return async dispatch => {
    try {
      const res = await axios.post(
        `https://${ngrokUrl}.ngrok.io/api/users/signup`,
        user
      );
      dispatch(signUp(res.data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const auth = (email, password) => async dispatch => {
  let res;
  try {
    res = await axios.post(`https://${ngrokUrl}.ngrok.io/api/auth/login`, {
      email,
      password,
      login: 'login',
    });
  } catch (authError) {
    return dispatch(getUser({ error: authError }));
  }

  try {
    dispatch(getUser(res.data));
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr);
  }
};

export default function(state = {}, action) {
  switch (action.type) {
    case SIGN_UP:
      return action.user;
    case GET_USER:
      return action.user;
    default:
      return state;
  }
}
