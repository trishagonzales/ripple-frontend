import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { ToastProvider } from 'react-toast-notifications';
import theme from './theme';
import App from './components/App';
import 'font-awesome/css/font-awesome.min.css';
import 'pretty-checkbox/dist/pretty-checkbox.min.css';

ReactDOM.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <ToastProvider
        placement='top-center'
        autoDismiss={true}
        autoDismissTimeout={4000}
        transitionDuration={100}
      >
        <App />
      </ToastProvider>
    </ThemeProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
