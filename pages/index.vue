<template>
<main>
  <h3>Main page</h3>
</main>
</template>

<script>
export default {
  name: 'IndexPage',

  //! Does check for whether user is signed in later 
  mounted(){
    if(!this.$store.state.userIsSignedIn){
      this.$router.push("/signup");
    }
  }
  
}
</script>

<style scoped>
@import url("~/assets/styles.css")
</style>