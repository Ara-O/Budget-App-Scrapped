<template>
  <main class="page-bg">
    <LogInUser></LogInUser>
  </main>
</template>

<script>
import LogInUser from "../components/LogInUser.vue";
export default {
  head() {
    return {
      title: "Log In",
    };
  },
  methods: {
    moveOn() {
      // Continue to index
    },
  },
  components: { LogInUser },
};
</script>

<style>
@import url("~/assets/styles.css");
</style>