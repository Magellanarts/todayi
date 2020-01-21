<template>
  <div>
    <form @submit.prevent novalidate>
      <input type="email" v-model="email" />
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
    };
  },
};
</script>
