import Vue from 'vue';
import axios from 'axios';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

require('@/assets/sass/_base.scss');

const token = localStorage.getItem('auth-token');

if (token) {
  axios.defaults.headers.common['auth-token'] = token;
}

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
