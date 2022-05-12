<template>
  <article>
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
            min="0"
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
          <input
            type="number"
            min="0"
            :value="extra"
            disabled
            class="extra-input"
          />
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
// import { getUserBudgetPlan } from '../services/firebaseService';
import {
  storeUserBudgetPlan,
  retrieveUserBudgetPlan,
} from "../services/firebaseService";

export default {
  props: ["entries", "entriesChanged"],
  data() {
    return {
      budgetItems: [
        { name: "Entertainment", budget: 0 },
        { name: "College", budget: 0 },
        { name: "Food", budget: 0 },
      ],
      incomeLimit: 0,
      leeway: 0,
      budgetError: false,
      budgetSuccess: false,
      extra: 0,
    };
  },

  watch: {
    entriesChanged() {
      console.log("entries have cahnged, but this time...its good :)");
      let entriesLength = this.entries.length;
      const budgetItemIndex = this.budgetItems.findIndex(
        (data) => data.name === this.entries[entriesLength - 1].saveAs
      );
      this.budgetItems[budgetItemIndex].budget += Number(
        this.entries[entriesLength - 1].income
      );
    },
  },

  methods: {
    loadIncomeLeeway() {
      //get and store the leeway
      this.calculateBudgetMax(this.$store.state.usersCurrentIncome);
      this.calculateExtraIncome();
    },

    calculateExtraIncome() {
      this.extra = this.leeway;
    },

    calculateBudgetMax(incomeLimit) {
      //Adding all the items in the budget store
      let leeway = this.budgetItems.reduce(
        (total, curr) => Number(curr.budget) + total,
        0
      );
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
  },
  mounted() {
    retrieveUserBudgetPlan(this)
      .then((data) => {
        this.budgetItems = data;
        this.loadIncomeLeeway();
        console.log("success");
      })
      .catch((err) => console.log(err));
  },
  components: { BaseButton },
};
</script>

<style scoped>
article {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  grid-row-gap: 17px;
  row-gap: 33px;
  align-items: center;
  width: 455px;
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