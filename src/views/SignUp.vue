<template>
  <div class="c-std-form-container">
    <h1>Sign up for today,i</h1>
    <form class="c-std-form" @submit.prevent="signUpSubmit" novalidate>
      <fieldset>
        <input type="text" v-model="user.firstName" placeholder="First name*" />
      </fieldset>

      <fieldset>
        <input type="text" v-model="user.lastName" placeholder="Last Name*" />
      </fieldset>

      <fieldset>
        <input type="email" v-model="user.email" placeholder="Email*" />
      </fieldset>

      <fieldset>
        <input type="password" v-model="user.password" placeholder="Password*" />
      </fieldset>

      <button type="submit">Submit</button>
    </form>

    <div v-if="message" class="message">{{ message }}</div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import {
  REGISTER_USER,
} from '@/store/types';

export default {
  data() {
    return {
      user: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      },
      message: '',
    };
  },
  methods: {
    ...mapActions({
      registerUser: REGISTER_USER,
    }),
    async signUpSubmit() {
      this.message = '';
      if (!this.user.firstName) {
        this.message = 'First Name is not allowed to be empty';
        return;
      }

      if (!this.user.lastName) {
        this.message = 'Last Name is not allowed to be empty';
        return;
      }

      if (!this.user.email) {
        this.message = 'Email is not allowed to be empty';
        return;
      }

      if (this.user.email.length < 5) {
        this.message = 'Email length must be at least 5 characters long';
        return;
      }

      if (!this.validEmail(this.user.email)) {
        this.message = 'Email must be a valid email';
      }

      if (this.user.password.length < 6) {
        this.message = 'Password length must be at least 6 characters long';
        return;
      }

      if (!this.message) this.message = await this.registerUser(this.user);
    },
    validEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
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
