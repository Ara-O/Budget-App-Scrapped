<template>
<div class="arrange-sign-up" style="padding: 50px 0px 50px 0px; width: 468px">
    <h3 class="arrange-sign-up_title">Log in!</h3>
    <hr class="horizontal-link-hr">
    <label for="email-address">Email Address:</label>
    <input type="email" id="email-address" v-model="email" />
    <label for="password">Password:</label>
    <input type="password" id="password" v-model="password" />
    <nuxtLink to="/signup"><h5 class="already-has-account">I don't have an account</h5></nuxtLink>
    <br />
    <base-button class="base-button" @click="logIn"
      >Log In</base-button
    >
</div>
</template>

<script>
import {logUserIn} from "../services/firebaseService"
export default {
data(){
        return {
            email: '',
            password: ''
        }
    },

    methods: {
        logIn(){
            logUserIn(this.email, this.password).then((res)=> {
                this.$router.push("/")
            })
    }
    }
}
</script>


<style scoped>
@import url("../assets/signup.css")
</style>

<style scoped>
.base-button{
    height: 40px;
    border-width: 0px;
    border-radius: 5px;
    background-color: #468c5f;
    width: 101px;
}
</style>