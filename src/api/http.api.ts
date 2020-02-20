import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3001/api';

axios.defaults.headers.common['x-auth-token'] = localStorage.getItem('jwt');

axios.interceptors.response.use(undefined, error => {
  const expectedError =
    error.response && error.response.status >= 400 && error.response.status < 500;

  if (!expectedError) alert('Unexpected error occurred.');

  Promise.reject(error.response);
});

export default axios;
