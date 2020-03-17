import React, { useReducer, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { GlobalProvider, initialGlobal } from '../providers';
import globalReducer from '../reducers/global.reducer';
import useAPI from '../hooks/useAPI';
import { getJwt } from '../api/auth.api';
import url from '../api/endpoints.json';

import { GlobalStyle } from './AppStyles';
import Navbar from './Navbar/Navbar';
import Login from './Auth/Login';
import Signup from './Auth/Signup';
import Home from './Home/Home';
import Feed from './Feed/Feed';
import NewPost from './NewPost/NewPost';
import Profile from './Profile/Profile';
import EditProfile from './Profile/EditProfile';

function App(): null | JSX.Element {
  const [global, dispatch] = useReducer(globalReducer, initialGlobal);
  const { res, setRes, isLoading, callAPI } = useAPI();

  useEffect(() => {
    if (!global.user && getJwt()) {
      callAPI({ method: 'GET', url: url.users + '/me' });
    }
  }, []);

  if (res && !isLoading) {
    dispatch({ type: 'login', payload: res.data });
    setRes(null);
  }

  return (
    <GlobalProvider value={{ global, dispatch }}>
      <GlobalStyle />
      <Navbar />
      {global.user ? (
        <Switch>
          <Route path='/profile/:id' component={Profile} />
          <Route path='/edit-profile' component={EditProfile} />
          <Route path='/feed' component={Feed} />
          <Route path='/new-post' component={NewPost} />
          <Route path='/' exact component={Home} />
        </Switch>
      ) : (
        <Switch>
          <Route path='/profile/:id' component={Profile} />
          <Route path='/feed' component={Feed} />
          <Route path='/login' component={Login} />
          <Route path='/signup' component={Signup} />
          <Route path='/' exact component={Home} />
        </Switch>
      )}
    </GlobalProvider>
  );
}

export default App;
