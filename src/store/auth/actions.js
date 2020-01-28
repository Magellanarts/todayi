import axios from 'axios';
import {
  REGISTER_USER,
  LOGIN_USER,
  LOGOUT_USER,
  AUTH_SUCCESS,
  LOGOUT,

} from '@/store/types';

require('dotenv').config();

export default {
  [REGISTER_USER]: ({ commit, dispatch }, user) => new Promise((resolve, reject) => {
    // submit to server to register user
    axios
      .post(`${process.env.VUE_APP_SERVER_URL}auth/register`, {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
      })
      .then((response) => {
        // user has been successfully added
        // now log them in
        // resolve(response);
        dispatch(LOGIN_USER, user);
      })
      .catch((error) => {
        resolve(error.response.data);
      });
  }),
  [LOGIN_USER]: ({ commit }, user) => new Promise((resolve, reject) => {
    // submit to server to log in user
    axios
      .post(`${process.env.VUE_APP_SERVER_URL}auth/login`, {
        email: user.email,
        password: user.password,
      })
      .then((response) => {
        const { token } = response.data;
        // user has been successfully logged in
        // store auth-token in localstorage
        localStorage.setItem('auth-token', token);
        // save token in axios headers
        axios.defaults.headers.common['auth-token'] = token;
        // store auth-token in vuex
        commit(AUTH_SUCCESS, { token, user });
        resolve('success');
      })
      .catch((error) => {
        resolve(error.response.data);
      });
  }),
  [LOGOUT_USER]: ({ commit }) => new Promise((resolve) => {
    localStorage.removeItem('auth-token');
    delete axios.defaults.headers.common['auth-token'];
    commit(LOGOUT);
    resolve();
  }),
};
