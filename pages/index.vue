<template>
<main>
  <h3>banana</h3>
</main>
</template>

<script>
export default {
  name: 'IndexPage',

  //routing immediately to signup page 
  //! Does check for whether user is signed in later 
  mounted(){
    this.$router.push("/signup")
  }
}
</script>

<style scoped>
@import url("~/assets/styles.css")
</style>