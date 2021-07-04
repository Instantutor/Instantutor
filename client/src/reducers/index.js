import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import search from './search';
import user_requests from './user_requests';


export default combineReducers({
    alert,
    auth,
    profile,
    search,
    user_requests
});