<template>
  <main>
    <section class="section-left">
      <AddExpenses :userName = "usersName" @successfulEntry="getRecordsData"></AddExpenses>
      <AllExpenses :entries="userEntries"></AllExpenses>
    </section>

    <section class="section-right">
      <div class="section-right-top">
        <div class="current-income-section" :class="{'current-income-section_negative': usersCurrentIncome < 0}">
          <h3>Current Income</h3>
          <h2>${{ usersCurrentIncome }}</h2>
        </div>
      </div>
      <AllBills :bills="userBills"></AllBills>
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
      usersName: "",
      userBills: []
    };
  },

  methods: {
    getRecordsData() {
      this.userEntries = [];
      this.userBills = [];
      let _this = this;
      getUserData(this).then((val) => {
        _this.usersCurrentIncome = val.userGoals.usersCurrentIncome;
        _this.usersName = val.username
        for(const id in val.entries.records){
          _this.userEntries.push(val.entries.records[id])
        }
        
        for(const id in val.entries.upcomingBills){
          _this.userBills.push(val.entries.upcomingBills[id])
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