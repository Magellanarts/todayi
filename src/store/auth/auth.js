import authActions from './actions';
import authMutations from './mutations';

const state = {
  signedIn: !!localStorage.getItem('auth-token'),
  token: localStorage.getItem('auth-token') || '',
};

export default {
  state,
  actions: authActions,
  mutations: authMutations,
};
