import {ADD_RESULT} from '../constants'

// action to update state with search result
export function addResult(payload) {
    return({
        type: ADD_RESULT,
        payload: payload
    })
}