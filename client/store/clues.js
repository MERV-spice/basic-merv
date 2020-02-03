import axios from 'axios'

// Constants
export const GET_CLUES = 'GET_CLUES'

//Action Creators
export const getClues = clues => ({type: GET_CLUES, clues})

//Thunk Creators
//Add arguments for user ID to filter clues
export const fetchClues = () => async dispatch => {
  try {
    const {data} = await axios.get(
      `/api/clues`
    )
    dispatch(getClues(data))
  } catch (err) {
    console.log(err)
  }
}

//Reducer
export default (state = [], action) => {
  switch (action.type) {
    case GET_CLUES:
      return action.clues
    default:
      return state
  }
}
