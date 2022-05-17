<template>
  <div class="arrange-sign-up">
    <h3 class="arrange-sign-up_title">Sign up to save your data!</h3>
    <div class="horizontal-link"></div>
    <label for="username">Username:</label>
    <input type="text" id="username" v-model="username" />
    <label for="email-address">Email Address:</label>
    <input type="email" id="email-address" v-model="email" />
    <label for="password">Password:</label>
    <input type="password" id="password" v-model="password" />
    <br />
    <base-button class="base-button" @click="validateInput"
      >Continue</base-button
    >
  </div>
</template>

<script>
import { registerUser } from "../services/firebaseService";
export default {
  data() {
    return {
      email: "ba@gmail.com",
      password: "eeeeeee",
      username: "potato",
    };
  },

  emits: ["continue"],

  methods: {
    validateInput() {
      if (
        this.email.trim() === "" ||
        this.password.trim() === "" ||
        this.username.trim() === ""
      ) {
        console.log("one empty");
      } else {
        this.continueToNextSection();
      }
    },

    continueToNextSection() {
      registerUser(this.username, this.email, this.password, this);
    },
  },
};
</script>
<style>
@import url("~/assets/signup.css");
</style>