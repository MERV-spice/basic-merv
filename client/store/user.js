import axios from 'axios';
import ngrokUrl from '../ngrok';

const SIGN_UP = 'SIGN_UP';

const signUp = user => ({ type: SIGN_UP, user });

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

export default function(state = {}, action) {
  switch (action.type) {
    case SIGN_UP:
      return action.user;
    default:
      return state;
  }
}
