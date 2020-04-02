import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';
axios.defaults.headers.common['x-auth-token'] = localStorage.getItem('jwt');

export default axios;
