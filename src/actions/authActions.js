import axios from 'axios';
import jwtDecode from 'jwt-decode';

import setAuthorisationToken from '../utils/setAuthorisationToken';
import { TOKEN_NAME, SET_CURRENT_USER } from '../constants';

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}

export function login(data) {
  return dispatch => {
    return axios.post('/api/auth', data)
      .then(response => {
        const token = response.data.token;

        localStorage.setItem(TOKEN_NAME, token);
        setAuthorisationToken(token);

        dispatch(setCurrentUser(jwtDecode(token)));
      });
  };
}

export function logout() {
  return dispatch => {
    localStorage.removeItem(TOKEN_NAME);
    setAuthorisationToken(false);
    dispatch(setCurrentUser({}));
  };
}
