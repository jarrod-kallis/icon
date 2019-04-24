import { combineReducers } from 'redux';
import { reducer as toastrReducer } from 'react-redux-toastr';

import auth from './reducers/auth';
import environments from './reducers/environments';

export default combineReducers({
  auth,
  environments,
  toastr: toastrReducer
});
