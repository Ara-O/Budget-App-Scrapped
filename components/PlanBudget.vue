<template>
  <article>
    <div
      class="plan-budget-items-section_item"
      v-for="budgetItem in budgetItems"
    >
      <div class="plan-budget-items-section_item--indicator" @click="loadPage"></div>
      <div style="display: flex; flex-direction: column">
        <h5>{{ budgetItem.name }}</h5>
        <span>
          <span style="margin-top: 7px; font-size: 16px">$ </span>
          <input
            type="number"
            min="0"
            :max="leeway"
            v-model="budgetItem.budget"
            @focus="loadPage"
          />
        </span>
      </div>
    </div>
  </article>
</template>

<script>
// import { getUserData } from '../services/firebaseService';

export default {
  data() {
    return {
      budgetItems: [
        { name: "Entertainment", budget: 0 },
        { name: "College", budget: 10 },
        { name: "Food", budget: 50 },
      ],
      incomeLimit: 0,
      leeway: 0
    };
  },

  methods: {
    loadPage() {
      //get user data
      console.log(this.$store.state.usersCurrentIncome)
    },

    calculateBudgetMax(incomeLimit){
      console.log("Income limit", incomeLimit)
       //Adding all the items in the budget store
      let leeway = this.budgetItems.reduce(
        (total, curr) => Number(curr.budget) + total,
        0
      );
      leeway = incomeLimit - leeway;
      console.log("leeway: ", leeway);
      this.leeway = leeway
    }
  },

  mounted(){
    console.log("plan budget")
    console.log(this.$store.state.usersCurrentIncome)
  }
};
</script>

<style scoped>
article {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  row-gap: 30px;
}
.plan-budget-items-section_item {
  height: 100px;
  width: auto;
  background: white;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px 22px;
  box-sizing: border-box;
  column-gap: 26px;
}

.plan-budget-items-section_item--indicator {
  height: 68px;
  width: 61px;
  background: rgba(134, 166, 139, 0.67059);
  border-radius: 4px;
}

.plan-budget-items-section_item input {
  width: 47px;
  border-width: 0px 0px 2px 0px;
  outline: none;
  font-family: "Poppins";
}
.plan-budget-items-section_item h5 {
  font-weight: 400;
}

::-webkit-inner-spin-button {
  display: none;
}
</style>