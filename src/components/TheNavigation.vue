<template>
  <div>
    <nav>
      <li>
        <router-link to="/">Home</router-link>
      </li>
      <li>
        <router-link to="/log-in">Log In</router-link>
      </li>
      <li>
        <router-link to="/sign-up">Sign Up</router-link>
      </li>
    </nav>
  </div>
</template>


<style lang="scss" scoped>
nav {
  padding: 1.5rem 5%;

  display: flex;
  justify-content: flex-end;

  li {
    &:not(:last-child) {
      margin-right: 2rem;
    }

    a {
      color: #fff;
      text-decoration: none;
    }
  }
}
</style>
