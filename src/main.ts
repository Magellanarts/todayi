import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

/**  import base styles */
require('@/assets/sass/_base.scss');


/**  start up functions */
require('@/startup.js');

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
