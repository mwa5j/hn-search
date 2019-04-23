import {ADD_RESULT} from '../constants'

const initialState = {
    results: [],
}

// reducer to reassign state array values to new results
function rootReducer(state = initialState, action){
    if(action.type === ADD_RESULT){
        return Object.assign({}, state, {
            results: action.payload
        })
    }
    return state
}

export default rootReducer