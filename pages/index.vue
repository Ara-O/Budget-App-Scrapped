<template>
  <main>
    <section class="section-left">
      <AddExpenses :userName = "usersName" @successfulEntry="getData"></AddExpenses>
    <!-- !PROPS NOT GETTING PASSED -->
      <AllExpenses :entries="userEntries"></AllExpenses>
    </section>

    <section class="section-right">
      <div class="section-right-top">
        <div class="current-income-section" :class="{'current-income-section_negative': usersCurrentIncome < 0}">
          <h3>Current Income</h3>
          <h2>${{ usersCurrentIncome }}</h2>
        </div>
      </div>
      <div class="section-right-bottom">
        <h3>helo</h3>
      </div>
    </section>
  </main>
</template>

<script>
import {
  userIsSignedIn,
  getUserData,
} from "~/services/firebaseService.js";
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
    return {
      usersCurrentIncome: "",
      userEntries: [],
      usersName: ""
    };
  },

  methods: {
    getData() {
      this.userEntries = [];
      let _this = this;
      getUserData(this).then((val) => {
        _this.usersCurrentIncome = val.userGoals.usersCurrentIncome;
        _this.usersName = val.username
        for(const id in val.entries){
          _this.userEntries.push(val.entries[id])
        }
      });
    },
  },

  created() {
    userIsSignedIn(this);
  },
  components: { BaseIncomeRangeSelector, AddExpenses },
};
</script>

<style scoped>
@import url("~/assets/styles.css");
</style>

<style scoped>
@import url("../assets/index.css");
</style>