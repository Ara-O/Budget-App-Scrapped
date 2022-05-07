<template>
  <div class="add-expenses-section">
    <h3>Add Expense/Income</h3>
    <article class="add-expenses-section_inputs">
      <input
        type="text"
        name="Description"
        class="input-description"
        :class="{ error: errorMatch['description-error'] }"
        placeholder="Description"
        v-model="entryData.description"
      />
      <input
        type="number"
        name="Income"
        class="input-income"
        :class="{ error: errorMatch['income-error'] }"
        placeholder="Income"
        v-model="entryData.income"
      />
      <select
        type="number"
        name="Income"
        class="input-budget-under"
        :class="{
          'input-active': selectedBudgetUnderClass,
          error: errorMatch['budget-under-error'],
        }"
        placeholder="Income"
        v-model="entryData.budgetUnder"
      >
        <option value="Budget Under" selected disabled hidden>
          Budget Under
        </option>
        <option value="Income">Income</option>
        <option value="Expenses">Expenses</option>
        <option value="Upcoming Bills">Upcoming Bills</option>
      </select>
      <select
        type="number"
        name="Income"
        class="input-budget-under"
        :class="{
          'input-active': selectedSaveAsClass,
          error: errorMatch['save-as-error'],
        }"
        placeholder="Income"
        v-model="entryData.saveAs"
      >
        <option
          v-for="budgetItem in budgetItems"
          :disabled="budgetItem === 'Save As'"
          :selected="budgetItem === 'Save As'"
          :value="budgetItem"
        >
          {{ budgetItem }}
        </option>
      </select>

      <!-- Send button -->
      <button class="add-expenses" :class="{'add-expenses-succesful': alert}" @click="submitEntry">
        <img
          src="https://cdn.onlinewebfonts.com/svg/img_84809.png"
          alt="Add expenses icon"
        />
      </button>
    </article>
    <!-- <div class="alert" :class="{ 'alert-active': alert }" v-if="alert">
      <h3>{{ messageForAlert }}</h3>
    </div> -->
  </div>
</template>

<script>
import { getDatabase, ref, push } from "firebase/database";
export default {
  data() {
    return {
      budgetItems: ["Save As", "Entertainment", "College", "Rent", "Other"],
      entryData: {
        description: "Bob",
        income: 30,
        budgetUnder: "Expenses",
        saveAs: "College",
      },

      errorMatch: {
        "description-error": false,
        "income-error": false,
        "budget-under-error": false,
        "save-as-error": false,
      },

      alert: false,
      messageForAlert: ""
    };
  },

  computed: {
    selectedBudgetUnderClass() {
      if (this.entryData.budgetUnder === "Budget Under") {
        return false;
      } else {
        return true;
      }
    },

    selectedSaveAsClass() {
      if (this.entryData.saveAs === "Save As") {
        return false;
      } else {
        return true;
      }
    },
  },

  methods: {
    successfulEntry() {
      this.alert = true;
      window.setTimeout(()=>{
        this.alert = false;
      }, 2000)
    },

    validateEntry() {
      if (this.entryData.description === "") {
        this.errorMatch["description-error"] = true;
        return false;
      } else {
        this.errorMatch["description-error"] = false;
      }

      if (this.entryData.income === null) {
        this.errorMatch["income-error"] = true;
        return false;
      } else {
        this.errorMatch["income-error"] = false;
      }

      if (this.entryData.budgetUnder === "Budget Under") {
        this.errorMatch["budget-under-error"] = true;
        return false;
      } else {
        this.errorMatch["budget-under-error"] = false;
      }

      if (this.entryData.saveAs === "Save As") {
        this.errorMatch["save-as-error"] = true;
        return false;
      } else {
        this.errorMatch["save-as-error"] = false;
      }

      return true;
    },

    submitEntry() {
      if (this.validateEntry()) {
        const db = getDatabase();
        let uid = this.$store.state.userID;
        let _this = this;
        push(ref(db, "users/" + uid + "/entries"), _this.entryData);

        this.successfulEntry();
      }
    },
  },
};
</script>

<style scoped>
@import url("~/assets/styles.css");
</style>

<style scoped>
.add-expenses-section {
  height: 160px;
  width: auto;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  padding: 16px 26px;
  flex-direction: column;
  row-gap: 20px;
  background: rgba(108, 108, 108, 0.52941);
  border-radius: 6px;
}
.add-expenses-section_inputs {
  display: flex;
  column-gap: 13px;
}

.input-description,
.input-income,
.input-budget-under {
  height: 47px;
  border-radius: 7px;
  font-size: 14.5px;
  width: 225px;
  border: none;
  color: white;
  box-sizing: border-box;
  background: #8b8b8b;
  padding-left: 25px;
  font-weight: 300;
  padding-right: 20px;
  transition: all 200ms linear;
}

.input-description:hover,
.input-income:hover,
.input-budget-under:hover {
  box-shadow: 0px 2px 2px #474747;
}

.input-income {
  width: 160px;
}

.input-budget-under {
  width: 200px;
  color: rgb(209, 209, 209);
}

.add-expenses {
  width: 57px;
  border-radius: 7px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background: #86a68bab;
  transition: all 200ms linear;
}

.add-expenses:hover {
  box-shadow: 0px 2px 2px #474747;
}

.add-expenses img {
  width: 22px;
  filter: invert(1) brightness(1);
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

::placeholder {
  color: rgb(209, 209, 209);
}

select {
  -webkit-appearance: none;
  -moz-appearance: none;
}
.add-expenses-section h3 {
  color: white;
  font-weight: 300;
  font-size: 15.3px;
}

.input-active {
  color: white;
}

.error {
  box-shadow: 1px 1px 2px 0px #380505, 0px 0px 2px gray;
}
.add-expenses-succesful{
  background: rgb(85 132 92);
}
</style>