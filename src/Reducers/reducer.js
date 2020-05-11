import {combineReducers} from 'redux';
import checkForToken from './auth';
import usersList from './users'

export default combineReducers({
    checkForToken:checkForToken,
    users:usersList
})
