<template>
  <div class="c-std-form-container">
    <h1>Log In</h1>
    <form class="c-std-form" @submit.prevent="signUpSubmit" novalidate>

      <fieldset>
        <input type="email" v-model="user.email" placeholder="Email*" />
      </fieldset>

      <fieldset>
        <input type="password" v-model="user.password" placeholder="Password*" />
      </fieldset>

      <button type="submit">Submit</button>
    </form>

    <div v-if="message" class="message">{{ message }}</div>

    <loading v-if="waiting" />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import {
  LOGIN_USER,
} from '@/store/types';

import Loading from '@/components/Loading.vue';
import router from '../router';

export default {
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
      message: '',
      waiting: false,
    };
  },
  components: {
    Loading,
  },
  methods: {
    ...mapActions({
      registerUser: LOGIN_USER,
    }),
    async signUpSubmit() {
      this.message = '';

      if (!this.user.email) {
        this.message = 'Email is not allowed to be empty';
        return;
      }
      this.waiting = true;
      if (!this.message) this.message = await this.registerUser(this.user);
      this.waiting = false;
      if (this.message === 'success') router.push({ name: 'home' });
    },
  },
};
</script>

<style lang="scss">
.message {
  padding: 2rem 0;
  color: #66d7d1;
}
</style>
