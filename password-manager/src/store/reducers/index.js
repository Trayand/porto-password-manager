import { combineReducers } from 'redux';
import UserReducer from './UserReducer'
import PasswordReducer from './PasswordReducer'

export default combineReducers({
    user: UserReducer,
    passwords: PasswordReducer
})