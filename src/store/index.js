import {createStore} from 'redux'
import rootReducer from "../reducers"

// create redux store
const store = createStore(rootReducer)

export default store