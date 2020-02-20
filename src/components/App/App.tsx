import React, { useReducer } from 'react';
import { Route, Switch } from 'react-router-dom';
import userReducer from '../../reducers/user.reducer';

import { GlobalStyle } from './Styles';
import Login from '../Auth/Login';
import Signup from '../Auth/Signup';

function App() {
  const [user, dispatch] = useReducer(userReducer, null);

  return (
    <>
      <GlobalStyle />
      {user ? (
        <Switch>
          <Route to='/feed' component={} />
          <Route to='/new-post' component={} />
        </Switch>
      ) : (
        <Switch>
          <Route to='/login' component={Login} />
          <Route to='/signup' component={Signup} />
          <Route to='/' exact component={} />
        </Switch>
      )}
    </>
  );
}

export default App;
