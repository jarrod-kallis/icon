import React from 'react';
import { Provider } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './Home';
import LoginPage from './login/LoginPage';
import NavigationBar from './NavigationBar';

const App = ({ store }) => (
  <Provider store={store}>
    <div className="container">
      <ReduxToastr
        timeOut={5000}
        newestOnTop={false}
        preventDuplicates={true}
        position="top-left"
        transitionIn="fadeIn"
        transitionOut="fadeOut"
        progressBar
      />

      <Router>
        <header>
          <NavigationBar />
        </header>
        <main>
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/login' exact component={LoginPage} />
          </Switch>
        </main>
      </Router>
    </div>
  </Provider>
);

export default App;
