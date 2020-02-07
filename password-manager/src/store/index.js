import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import { thunk } from './middlewares'
import UserReducer from './reducers/UserReducer'
import PasswordReducer from './reducers/PasswordReducer'


const rootReducter = combineReducers({
    user: UserReducer,
    passwords: PasswordReducer
})
const store = createStore(
    rootReducter,
    composeWithDevTools(
        applyMiddleware(thunk),
        // other store enhancers if any
    )
)

export default store