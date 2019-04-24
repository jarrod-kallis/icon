import isEmpty from 'lodash/isEmpty';

import { SET_CURRENT_USER } from '../constants';

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: isEmpty(action.user) === false,
        user: action.user
      };
    default:
      return state;
  }
}
