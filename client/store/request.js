import axios from 'axios';
import url from '../ngrok';

const initialState = {
  sent: [],
  received: []
};

const SET_REQUESTS = 'SET_REQUESTS';
const ADD_REQUEST = 'ADD_REQUEST';
const DELETE_REQUEST = 'DELETE_REQUEST';

const addRequest = (request, sent) => ({type: ADD_REQUEST, request, sent});
const setRequests = requests => ({type: SET_REQUESTS, requests});
export const deleteRequest = reqId => ({type: DELETE_REQUEST, reqId});

export const fetchRequests = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`${url}/api/users/requests`);
      dispatch(setRequests(data));
    } catch (err) {
      console.error(err);
    }
  };
};

export const makeRequest = (type, userId) => {
  return async dispatch => {
    try {
      const {data} = await axios.post(`${url}/api/users/request`, {
        type: 'friendRequest',
        userId
      });
      await axios.post(`${url}/api/notification`, {
        message: 'You got a friend request!',
        type: 'friendRequest',
        userId
      });
      dispatch(addRequest(data, true));
    } catch (err) {
      console.error(err);
    }
  };
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_REQUESTS:
      return action.requests;
    case ADD_REQUEST:
      if (action.sent) return {...state, sent: [...state.sent, action.request]};
      return {...state, received: [...state.received, action.request]};
    case DELETE_REQUEST:
      return {
        ...state,
        received: state.received.filter(req => req.id !== action.reqId)
      };
    default:
      return state;
  }
}
