import {combineReducers} from 'redux';
import auth from './auth';
import reservation from './reservation';

const rootReducer = combineReducers({
  auth,
  reservation,
});

export default rootReducer;
