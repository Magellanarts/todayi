<template>
  <div>
    <nav>
      <li>Log In</li>
      <li>Sign Up</li>
    </nav>
  </div>
</template>


<style lang="scss" scoped>
nav {
  padding: 1.5rem 5%;
  background: #406e8e;
  color: #fff;
  display: flex;
  justify-content: flex-end;

  li {
    &:not(:last-child) {
      margin-right: 2rem;
    }
  }
}
</style>
