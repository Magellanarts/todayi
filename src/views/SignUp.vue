<template>
  <div class="form-container">
    <h1>Sign up for today,i</h1>
    <form class="c-std-form" @submit.prevent="signUpSubmit" novalidate>
      <fieldset>
        <input type="text" v-model="firstName" placeholder="First name*" />
      </fieldset>

      <fieldset>
        <input type="text" v-model="lastName" placeholder="Last Name*" />
      </fieldset>

      <fieldset>
        <input type="email" v-model="email" placeholder="Email*" />
      </fieldset>

      <fieldset>
        <input type="password" v-model="password" placeholder="Password*" />
      </fieldset>

      <button type="submit">Submit</button>
    </form>

    <div v-if="errors" class="errors">{{ errors }}</div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      errors: '',
    };
  },
  methods: {
    signUpSubmit() {
      axios
        .post('http://localhost:3000/api/auth/register', {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
        })
        .then((response) => {})
        .catch((error) => {
          this.errors = error.response.data;
        });
    },
  },
};
</script>

<style lang="scss">
.form-container {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding-top: 10%;
}
.c-std-form {
  font-family: 'Crete Round', serif;
  fieldset {
    margin-bottom: 2rem;

    input[type='text'],
    input[type='email'],
    input[type='password'] {
      width: 300px;
      background: none;
      border: none;
      -webkit-appearance: none;
      border-bottom: 1px dashed #8ea8c3;
      outline: none;
      color: #fff;
      font-size: 1rem;

      &::placeholder {
        color: #fff;
      }
    }
  }
}

.errors {
  padding: 2rem 0;
  color: #66d7d1;
}
</style>
