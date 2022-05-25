<template>
  <article class="plan-budget-article">
    <div
      class="plan-budget-items-section_item"
      v-for="budgetItem in budgetItems"
    >
      <div class="plan-budget-items-section_item--indicator"></div>
      <div style="display: flex; flex-direction: column">
        <h5>{{ budgetItem.name }}</h5>
        <span>
          <span style="margin-top: 7px; font-size: 16px">$ </span>
          <input
            type="number"
            :max="leeway"
            v-model.number="budgetItem.budget"
            @input="loadIncomeLeeway"
            placeholder="0"
          />
        </span>
      </div>
    </div>

    <div class="plan-budget-items-section_item">
      <div class="plan-budget-items-section_item--indicator"></div>
      <div style="display: flex; flex-direction: column">
        <h5>Extras</h5>
        <span>
          <span style="margin-top: 7px; font-size: 16px">$ </span>
          <input type="number" :value="extra" disabled class="extra-input" />
        </span>
      </div>
    </div>
    <BaseButton
      class="plan-budget-save-btn"
      :class="{ 'btn-error': budgetError, 'btn-success': budgetSuccess }"
      @click="saveBudget"
      >Save</BaseButton
    >
  </article>
</template>

<script>
import BaseButton from "./Base/BaseButton.vue";
import { getUserData } from "../services/firebaseService";
import {
  storeUserBudgetPlan,
  retrieveUserBudgetPlan,
} from "../services/firebaseService";

export default {
  // !We want - If User selects income, we show them the save Under bar. If they choose expense, we show them the Take from bar
  //If what they want to take out from is too small, ask them if they want to get money from extras
  props: ["entries", "entriesChanged"],
  data() {
    return {
      budgetItems: [],
      incomeLimit: 0,
      leeway: 0,
      budgetError: false,
      budgetSuccess: false,
      extra: 0,
    };
  },

  watch: {
    // If user adds another expense
    entriesChanged() {
      console.log("entries have changed = ", this.entries);
       let entriesLength = this.entries.length;
       const budgetItemIndex = this.budgetItems.findIndex(
         (data) => data.name === this.entries[entriesLength - 1].addTo
       );

       console.log(this.budgetItems)
       this.budgetItems[budgetItemIndex].budget += Number(
         this.entries[entriesLength - 1].amount
       );

      this.loadIncomeLeeway();

       storeUserBudgetPlan(this, this.budgetItems).then((data) => {
         console.log("okay so, the data has been stored");
       });

       retrieveUserBudgetPlan(this).then((data) => {
         console.log("retrieved budget plan: ", data);
     });

      //   // making sure individual budget items cant be less than 0
      //   this.budgetItems[budgetItemIndex].budget < 0
      //     ? (this.budgetItems[budgetItemIndex].budget = 0)
      //     : (this.budgetItems[budgetItemIndex].budget += this.leeway);

      //   //checking to make sure that if the current income is less than 0, all the budget items will be 0
      //   if (this.$store.state.usersCurrentIncome < 0) {
      //     this.budgetItems.forEach((item) => (item.budget = 0));
      //   }

      // storeUserBudgetPlan(this, this.budgetItems).then((res) => {
      //   this.budgetSuccess = true;
      //   setInterval(() => {
      //     this.budgetSuccess = false;
      //   }, 3000);
      // });
    },
  },

  methods: {
    loadIncomeLeeway() {
      //get and store the leeway
      this.calculateBudgetMax(this.$store.state.usersCurrentIncome);
      this.calculateExtraIncome();
    },

    calculateExtraIncome() {
      if (this.leeway > 0) {
        this.extra = this.leeway;
      } else {
        this.extra = 0;
      }
    },

    calculateBudgetMax(incomeLimit) {
      //Adding all the items in the budget store
      let leeway = this.budgetItems.reduce(
        (total, curr) => Number(curr.budget) + total,
        0
      );
      console.log("leeway - ", leeway)
      leeway = incomeLimit - leeway;
      this.leeway = leeway;
    },

    saveBudget() {
      if (this.leeway < 0) {
        this.budgetError = true;

        setInterval(() => {
          this.budgetError = false;
        }, 3000);
      } else {
        storeUserBudgetPlan(this, this.budgetItems).then((res) => {
          this.budgetSuccess = true;
          setInterval(() => {
            this.budgetSuccess = false;
          }, 3000);
        });
      }
    },

    generateBudgetItems() {
      let budgetItem = [];
      let budget = this.$store.state.budgetItems;
      budget.forEach((item) => {
        budgetItem.push({ name: item, budget: 0 });
      });

      this.budgetItems = budgetItem;
    },
  },

  computed: {},
  mounted() {
    retrieveUserBudgetPlan(this)
      .then((data) => {
        console.log(data);
         this.budgetItems = data
        this.loadIncomeLeeway();
      })
      .catch((err) => {
        this.generateBudgetItems();
        console.log("there is no data");
      });
  },
  components: { BaseButton },
};
</script>



<style scoped>
article {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  row-gap: 27px;
  align-items: center;
  width: 455px;
}
.plan-budget-items-section_item {
  height: 93px;
  width: 195px;
  background: white;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px 22px 15px 15px;
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

.extra-input {
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

.plan-budget-save-btn {
  position: absolute;
  bottom: 19px;
  right: 27px;
  width: 86px;
  box-shadow: 0px 1px 1px #3c3c3c;
  background: #768b79;
}

.btn-error {
  background: rgba(181, 20, 20, 0.659);
}

.btn-success {
  background: #468c5f;
}
</style>
