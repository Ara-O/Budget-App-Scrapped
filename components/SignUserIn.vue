<template>
  <div class="arrange-sign-up">
    <h3 class="arrange-sign-up_title">Sign up to save your data!</h3>
    <div class="horizontal-link"></div>
    <label for="full-name">Full Name:</label>
    <input type="text" id="full-name">
    <label for="email-address">Email Address:</label>
    <input type="email" id="email-address">
    <label for="password">Password:</label>
    <input type="password" id="password">
    <br>
    <base-button class="base-button" @click="continueToNextSection">Continue</base-button>
  </div>
</template>

<script>
export default {
    emits: ["continue"],
    methods: {
        continueToNextSection(){
            this.$emit("continue");
            this.$store.commit("changeSignedInState");
        }
    }
}
</script>
<style>
@import url("~/assets/signup.css");
</style>