import axios from 'axios';

const token = localStorage.getItem('auth-token');

// set axios auth-token header
if (token) {
  axios.defaults.headers.common['auth-token'] = token;
}
