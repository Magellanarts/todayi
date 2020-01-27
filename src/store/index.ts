import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import {
  REGISTER_USER,
  LOGIN_USER,
  AUTH_SUCCESS,
  LOGOUT_USER,
  LOGOUT,
} from './types';

require('dotenv').config();

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    signedIn: !!localStorage.getItem('auth-token'),
    user: { firstName: '', lastName: '' },
    token: localStorage.getItem('auth-token') || '',
  },
  mutations: {
    [AUTH_SUCCESS]: (state, { token, user }) => {
      state.signedIn = true;
      state.token = token;
      state.user.firstName = user.firstName;
      state.user.lastName = user.lastName;
    },
    [LOGOUT]: (state) => {
      state.signedIn = false;
      state.token = '';
      state.user.firstName = '';
      state.user.lastName = '';
    },
  },
  actions: {
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
  },
  modules: {},
});
