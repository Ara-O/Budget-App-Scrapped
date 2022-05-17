<template>
  <main class="page-bg">
    <component :is="currentComponent" @continue.once="moveOn"></component>
  </main>
</template>

<script>
export default {
  head(){
    return{
      title: "Sign up"
    }
  },

  data() {
    return {
      currentComponent: "StartSavingMoney",
    };
  },

  methods: {
    moveOn() {
      this.currentComponent = "RegisterUser";
    },
  },
};
</script>

<style>
@import url("~/assets/styles.css");
</style>