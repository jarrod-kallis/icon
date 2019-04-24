import React from 'react';
import ReactDOM from 'react-dom';
import jwtDecode from 'jwt-decode';

import './index.css';

import setAuthorisationToken from './utils/setAuthorisationToken';
import { setCurrentUser } from './actions/authActions';
import configureStore from './configureStore';
import App from './components/App';
import { TOKEN_NAME } from './constants';

const store = configureStore();

if (localStorage[TOKEN_NAME]) {
  setAuthorisationToken(localStorage[TOKEN_NAME]);
  store.dispatch(setCurrentUser(jwtDecode(localStorage[TOKEN_NAME])));
}

ReactDOM.render(<App store={store} />, document.getElementById('root'));
