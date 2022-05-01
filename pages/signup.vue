<template>
  <main class="page-bg">
    <component :is="currentComponent" @continue.once="moveOn"></component>
  </main>
</template>

<script>
export default {
  data() {
    return {
      currentComponent: "StartSavingMoney",
    };
  },

  methods: {
    moveOn() {
      this.currentComponent = "SignUserIn";
    },
  },
};
</script>

<style>
@import url("~/assets/styles.css");
</style>