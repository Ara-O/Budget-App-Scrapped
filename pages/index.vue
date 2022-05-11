<template>
  <main>
    <section class="section-left">
      <AddExpenses
        :userName="usersName"
        @successfulEntry="getRecordsData"
      ></AddExpenses>
      <AllExpenses :entries="userEntries" v-if="userDataLoaded"></AllExpenses>
    </section>

    <section class="section-right">
      <div class="section-right-top">
        <div
          class="current-income-section"
          :class="{ 'current-income-section_negative': usersCurrentIncome < 0 }"
        >
          <h3>Current Income</h3>
          <h2>${{ usersCurrentIncome }}</h2>
        </div>
      </div>
      <AllBills :bills="userBills"></AllBills>
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
    return {
      usersCurrentIncome: "",
      userEntries: [],
      usersName: "",
      userBills: [],
      userDataLoaded: false
    };
  },

    watch: {
      usersCurrentIncome(){
        this.$store.commit("changeUsersCurrentIncome", this.usersCurrentIncome);
      }
    },

  methods: {
    getRecordsData() {
      this.userEntries = [];
      this.userBills = [];
      let _this = this;
      getUserData(this).then((val) => {
        _this.usersCurrentIncome = val.userGoals.usersCurrentIncome;
        _this.usersName = val.username;
        _this.$store.commit("changeUsersCurrentIncome", _this.usersCurrentIncome);
        //Check if theres a current record
        if (val?.entries?.records) {
          if (Object.keys(val.entries.records).length > 0) {
            for (const id in val.entries.records) {
              _this.userEntries.push(val.entries.records[id]);
            }
          }

          for (const id in val.entries.upcomingBills) {
            _this.userBills.push(val.entries.upcomingBills[id]);
          }
        }

        //Only set the user data loaded to true when getRecordsData has retrieved all the data
        this.userDataLoaded = true;
      });
    },
  },

  mounted() {
    console.log("index")
    userIsSignedIn(this).then((val)=> {
      if(val){
        this.getRecordsData();
      }
    });
  
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