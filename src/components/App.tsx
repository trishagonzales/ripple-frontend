import React, { useReducer, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { GlobalProvider, initialGlobal } from '../providers';
import globalReducer from '../reducers/global.reducer';
import useHttp from '../hooks/useHttp';
import { getUserData } from '../api/api';
import { getJwt } from '../api/auth';

import { GlobalStyle } from './GlobalStyle';
import Navbar from './Navbar';
import { Login, Signup } from './Auth';
import Home from './Home';
import Feed from './Feed';
import Post from './Post/Post';
import NewPost from './Post/NewPost';
import Profile from './Profile';
import EditProfile from './EditProfile';
import Settings from './Settings';
import Footer from './Footer';
import { ForgotPassword, ResetPassword } from './Password';

function App(): null | JSX.Element {
  const [global, dispatch] = useReducer(globalReducer, initialGlobal);
  const { res, loading, callAPI } = useHttp();

  useEffect(() => {
    if (!global.user && getJwt()) callAPI({ asyncFunction: getUserData });
  }, [global.user, callAPI]);

  useEffect(() => {
    if (res && !loading) dispatch({ type: 'login', payload: res.data });
  }, [res, loading]);

  return (
    <GlobalProvider value={{ global, dispatch }}>
      <GlobalStyle />
      <Navbar />
      {global.user ? (
        <Switch>
          <Route path='/settings' component={Settings} />
          <Route path='/profile/:id' component={Profile} />
          <Route path='/edit-profile' component={EditProfile} />
          <Route path='/post/:id' component={Post} />
          <Route path='/edit-post/:id' render={(props) => <Post editting={true} {...props} />} />
          <Route path='/feed' component={Feed} />
          <Route path='/new-post' component={NewPost} />
          <Route path='/' exact component={Home} />
        </Switch>
      ) : (
        <Switch>
          <Route path='/post/:id' component={Post} />
          <Route path='/profile/:id' component={Profile} />
          <Route path='/feed' component={Feed} />
          <Route path='/reset-password/:token' component={ResetPassword} />
          <Route path='/forgot-password' component={ForgotPassword} />
          <Route path='/login' component={Login} />
          <Route path='/signup' component={Signup} />
          <Route path='/' exact component={Home} />
        </Switch>
      )}
      <Footer />
    </GlobalProvider>
  );
}

export default App;
