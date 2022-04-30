<template>
<main>
  <h3>Main page</h3>
</main>
</template>

<script>
import {userIsSignedIn} from "~/services/firebaseService.js";
export default {
  name: 'IndexPage',

  mounted(){
    console.log("youre in home now")
    userIsSignedIn(this)
  }
  
}
</script>

<style scoped>
@import url("~/assets/styles.css")
</style>