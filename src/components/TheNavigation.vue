<template>
  <div>
    <nav>
      <li>
        <router-link to="/">Home</router-link>
      </li>
      <li v-if="!signedIn">
        <router-link to="/log-in">Log In</router-link>
      </li>
      <li v-if="signedIn">
        <button @click="logout">Log Out</button>
      </li>
      <li v-if="!signedIn">
        <router-link to="/sign-up">Sign Up</router-link>
      </li>
    </nav>
  </div>
</template>


<script>
import { mapState, mapActions } from 'vuex';
import { LOGOUT_USER } from '@/store/types';

export default {
  methods: {
    ...mapActions({
      logout: LOGOUT_USER,
    }),
  },
  computed: mapState({
    signedIn: state => state.auth.signedIn,
  }),
};
</script>

<style lang="scss" scoped>
nav {
  padding: 1.5rem 5%;

  display: flex;
  justify-content: flex-end;

  li {
    &:not(:last-child) {
      margin-right: 2rem;
    }

    a,button {
      font-family: 'Crete Round', serif;
      color: #fff;
      text-decoration: none;
      -webkit-appearance: none;
      background: none;
      border: none;
      font-size: 1rem;
      padding: 0;
      line-height: 1;
      cursor: pointer;
      outline: none;
    }
  }
}
</style>
