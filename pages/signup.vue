<template>
  <main class="page-bg">
    <component :is="currentComponent" @continue="moveOn"></component>
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
      if(this.currentComponent === "SignUserIn"){
        //Checking if user is signed in
        if(this.$store.state.userIsSignedIn){
          this.$router.push("/")
        }
      }

      this.currentComponent = "SignUserIn";

    },
  },
};
</script>

<style>
@import url("~/assets/styles.css");
</style>