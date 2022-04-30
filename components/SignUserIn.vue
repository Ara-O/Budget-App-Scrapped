<template>
  <div class="arrange-sign-up">
    <h3 class="arrange-sign-up_title">Sign up to save your data!</h3>
    <div class="horizontal-link"></div>
    <label for="full-name">Full Name:</label>
    <input type="text" id="full-name" v-model="username" />
    <label for="email-address">Email Address:</label>
    <input type="email" id="email-address" v-model="email" />
    <label for="password">Password:</label>
    <input type="password" id="password" v-model="password" />
    <br />
    <base-button class="base-button" @click="continueToNextSection"
      >Continue</base-button
    >
  </div>
</template>

<script>
import { registerUser } from "../services/firebaseService";
export default {
  head() {
    return {
      title: "Budget-app sign-up page",
    };
  },

  data() {
    return {
      email: "ba@gmail.com",
      password: "eeeeeee",
      username: "potato",
    };
  },

  emits: ["continue"],

  methods: {
    continueToNextSection() {
      registerUser(this.username, this.email, this.password, this);
    },
  },
};
</script>
<style>
@import url("~/assets/signup.css");
</style>