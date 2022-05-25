<template>
  <main>
    <section class="section-left">
      <AddExpenses
        :userName="usersName"
        @successfulEntry="getRecordsData"
      ></AddExpenses>
      <AllExpenses :entries="userEntries" :entriesChanged="userEntriesChanged" :usersCurrentIncome="usersCurrentIncome" v-if="userDataLoaded" ></AllExpenses>
      <div v-else class="plan-budget-section"></div>
    </section>

    <section class="section-right">
      <div class="section-right-top">
      <UsersCurrentIncome :usersCurrentIncome="usersCurrentIncome"></UsersCurrentIncome>
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
      usersCurrentIncome: 0,
      usersCurrentIncome_generated: 0,
      userEntries: [],
      usersName: "",
      userBills: [],
      userDataLoaded: false,
      userEntriesChanged: false,
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
              //Only showing expenses and income and storing the bills in the userBills array
              if(val.entries.records[id].saveAs !== "Upcoming Bills"){
                // User income that is generated from the expenses and the income
                _this.usersCurrentIncome_generated += Number(val.entries.records[id].amount);
                 _this.userEntries.push(val.entries.records[id]);
              } else {
                 _this.userBills.push(val.entries.records[id]);
              }
              // The generated income is added to the user's initial income
              _this.usersCurrentIncome +=  _this.usersCurrentIncome_generated;
              _this.usersCurrentIncome_generated = 0;
            }
          }
        }

        //Only set the user data loaded to true when getRecordsData has retrieved all the data
         this.userDataLoaded = true;
         this.userEntriesChanged = !this.userEntriesChanged;
      });
    },
  },

  mounted() {
    console.log("index")
    userIsSignedIn(this).then((val)=> {
      if(val){
        this.getRecordsData();
      }else{
        console.log("no user found")
      }
    });
  
  },
  components: { BaseIncomeRangeSelector, AddExpenses },
};
</script>

<style scoped>
@import url("../assets/styles.css");
</style>
