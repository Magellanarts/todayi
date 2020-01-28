
import {
  AUTH_SUCCESS,
  LOGOUT,
} from '@/store/types';

export default {
  [AUTH_SUCCESS]: (state, { token, user }) => {
    state.signedIn = true;
    state.token = token;
  },
  [LOGOUT]: (state) => {
    state.signedIn = false;
    state.token = '';
  },
};
