import axios from 'axios';

const initialState = []

//action type
const ADD_CLUE = 'ADD_CLUE'; 

//action creator
const addClue = newClue => {
    return {
        type: ADD_CLUE, 
        newClue
    };
};

//reducer
export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_CLUE:
            return action.newClue;
        default: 
            return state;
    }
};

//thunk
export const newClueThunk = (newClueObj) => {
    return async dispatch => {
        try {
            const { data } = await axios.post(
                '/api/clues', 
                newClueObj
            );
            return dispatch(addClue(data));
        } catch (err) {
            console.log(err)
        }
    };
};