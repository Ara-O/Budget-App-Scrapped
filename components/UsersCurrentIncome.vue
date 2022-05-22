<template>
      <div
          class="current-income-section"
          :class="{ 'current-income-section_negative': usersCurrentIncome < 0 }"
        >
          <h3>Current Income</h3>
          <h2>${{ usersCurrentIncome }}</h2>
        </div>
</template>

<script>
export default {
    props: ["usersCurrentIncome"]
}
</script>

<style scoped>
@import url("~/assets/styles.css");
</style>

