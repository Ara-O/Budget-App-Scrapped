<template>
  <main>
    <section class="section-left">
      <AddExpenses></AddExpenses>
      <div class="plan-budget-section">
        <div class="expenses-and-income-section">
          <h3>Expenses and Income</h3>
          <br />
          <span class="expenses-and-income-section_item">
            <h5>Spent money at Walmart</h5>
            <h5>$500</h5>
          </span>
          <span class="expenses-and-income-section_item">
            <h5>Spent money at Walmart</h5>
            <h5>$500</h5>
          </span>
        </div>
        <div class="plan-budget-items-section">
          <h3>banan</h3>
        </div>
      </div>
    </section>

    <section class="section-right">
      <div class="section-right-top">
        <div class="current-income-section">
          <h3>Current Income</h3>
          <h2>$59</h2>
        </div>
      </div>
      <div class="section-right-bottom">
        <h3>helo</h3>
      </div>
    </section>
  </main>
</template>

<script>
import { userIsSignedIn, getUserData } from "~/services/firebaseService.js";
import BaseIncomeRangeSelector from "../components/Base/BaseIncomeRangeSelector.vue";
import AddExpenses from "../components/AddExpenses.vue";
export default {
  name: "IndexPage",
  head() {
    return {
      title: "Budget App",
      meta: [
        {
          name: "Budget app",
          content: "Save money and plan for the future",
        },
      ],
    };
  },

  data() {
    return {};
  },

  methods: {
    getData() {
      getUserData(this).then((val) => {
        console.log("boy", val);
      });
    },
  },
  mounted() {
    userIsSignedIn(this);
  },
  components: { BaseIncomeRangeSelector, AddExpenses },
};
</script>

<style scoped>
@import url("~/assets/styles.css");
</style>

<style scoped>
@import url("../assets/index.css")
</style>