import { combineReducers } from 'redux';
import auth from './auth/reducer';
import app from './app/reducer';
import event from './event/reducer';
import donation from './donation/reducer'

export default combineReducers({
    auth,
    app,
    event,
    donation
});