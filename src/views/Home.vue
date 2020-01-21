<template>
  <div id="home">
    <welcome />
  </div>
</template>

<script>
// @ is an alias to /src
import Welcome from '@/components/Welcome.vue';

export default {
  name: 'home',
  components: {
    Welcome,
  },
};
</script>

<style lang="scss" scoped>
#home {
  padding: 20px;
  text-align: center;
  background: #406e8e;
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  padding-top: 10%;
  justify-content: center;
}
</style>
