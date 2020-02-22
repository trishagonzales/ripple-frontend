import React, { useReducer } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';
import { GlobalStateProvider, initialGlobalState } from '../providers';
import globalStateReducer from '../reducers/globalState.reducer';

import { GlobalStyle } from './AppStyles';
import Navbar from './Navbar/Navbar';
import Login from './Auth/Login';
import Signup from './Auth/Signup';
import Home from './Home/Home';
import Feed from './Feed/Feed';

function App() {
  const [globalState, dispatch] = useReducer(globalStateReducer, initialGlobalState);

  return (
    <ToastProvider placement='top-center' autoDismiss={true} transitionDuration={100}>
      <GlobalStateProvider value={{ globalState, dispatch }}>
        <GlobalStyle />
        <Navbar />
        {globalState.user ? (
          <Switch></Switch>
        ) : (
          <Switch>
            <Route path='/feed' component={Feed} />
            <Route path='/login' component={Login} />
            <Route path='/signup' component={Signup} />
            <Route path='/' exact component={Home} />
          </Switch>
        )}
      </GlobalStateProvider>
    </ToastProvider>
  );
}

export default App;
