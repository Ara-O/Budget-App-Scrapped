<template>
  <div class="arrange-sign-up">
    <h3 class="arrange-sign-up_title">Sign up to save your data!</h3>
    <div class="horizontal-link"></div>
    <label for="full-name">Full Name:</label>
    <input type="text" id="full-name">
    <label for="email-address">Email Address:</label>
    <input type="email" id="email-address" v-model="email">
    <label for="password">Password:</label>
    <input type="password" id="password" v-model="password">
    <br>
    <base-button class="base-button" @click="continueToNextSection">Continue</base-button>
  </div>
</template>

<script>
import firebaseService from "~/services/firebaseService.js";
export default {
   head() {
        return {
            title: "Budget-app sign-up page"
        };
    },

    data(){
      return{
        email: "",
        password: ""
      }
    },
    
    emits: ["continue"],
    methods: {
        continueToNextSection(){
            firebaseService(this.email, this.password);
            this.$emit("continue");
            this.$store.commit("changeSignedInState");
            this.$router.push("/")
        }
    }
}
</script>
<style>
@import url("~/assets/signup.css");
</style>