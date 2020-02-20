import React, { useReducer } from 'react';
import { Route, Switch } from 'react-router-dom';
import { UserProvider } from '../providers';
import userReducer from '../reducers/user.reducer';

import { GlobalStyle } from './Styles';
import Navbar from './Navbar/Navbar';
import Login from './Auth/Login';
import Signup from './Auth/Signup';
import Home from './Home/Home';
import Feed from './Feed/Feed';

function App() {
  const [user, dispatch] = useReducer(userReducer, null);

  return (
    <UserProvider value={{ user, dispatch }}>
      <GlobalStyle />
      <Navbar />
      {user ? (
        <Switch>
          <Route path='/feed' component={Feed} />
        </Switch>
      ) : (
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/signup' component={Signup} />
          <Route path='/' exact component={Home} />
        </Switch>
      )}
    </UserProvider>
  );
}

export default App;
