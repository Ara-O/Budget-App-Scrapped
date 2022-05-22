<template>
  <div class="add-expenses-section">
    <div>
      <h3>Welcome {{ userName }} - Add Expense or Income</h3>
      <!-- <h6 style="color: white; font-weight: 300; margin-top: 4px">
        Note: If income is an expense, input a negative number
      </h6> -->
    </div>
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
        name="Amount"
        class="input-income"
        :class="{ error: errorMatch['income-error'] }"
        placeholder="Amount"
        v-model="entryData.amount"
      />

      <select
        class="input-budget-under"
        :class="{
          'input-active': entryData.saveAs !== 'Save As',
          error: errorMatch['save-as-error'],
        }"
        v-model="entryData.saveAs"
      >
        <option value="Save As" selected disabled hidden>Save As</option>
        <option value="Income">Income</option>
        <option value="Expense">Expense</option>
        <option value="Upcoming Bills">Upcoming Bills</option>
      </select>

      <select
        class="input-budget-under"
        :class="{
          error: errorMatch['add-to-error'],
          'input-active': entryData.addTo !== 'Add To',
        }"
        v-model="entryData.addTo"
        v-if="entryData.saveAs === 'Income'"
      >
        <option
          :value="budgetItem"
          v-for="(budgetItem, index) in budgetItems"
          :selected="budgetItem === 'Add To'"
          :disabled="index === 0"
        >
          {{ budgetItem }}
        </option>
      </select>

      <!-- Send button -->
      <button
        class="add-expenses"
        :class="{ 'add-expenses-succesful': alert }"
        @click="submitEntry"
      >
        <img
          src="https://cdn.onlinewebfonts.com/svg/img_84809.png"
          alt="Add expenses icon"
        />
      </button>
    </article>
  </div>
</template>

<script>
import { getDatabase, ref, push, onValue, set } from "firebase/database";

export default {
  props: ["userName"],
  emits: ["successfulEntry"],
  data() {
    return {
      budgetItems: this.$store.state.budgetItems,

      entryData: {
        description: "",
        amount: null,
        saveAs: "Save As",
        addTo: "Add To",
      },

      errorMatch: {
        "description-error": false,
        "amount-error": false,
        "save-as-error": false,
        "add-to": false,
      },

      alert: false,
      messageForAlert: "",
    };
  },

  methods: {
    successfulEntry() {
      this.alert = true;
      (this.entryData = {
        description: "",
        amount: null,
        saveAs: "Save As",
        addTo: "Add To",
      }),
        // Updating the index.vue
        this.$emit("successfulEntry");
      window.setTimeout(() => {
        this.alert = false;
      }, 2000);
    },

    updateCurrentIncome() {
      // const db = getDatabase();
      // const uid = this.$store.state.userID;
      // const _this = this;
      // const userData = ref(
      //   db,
      //   "users/" + uid + "/userGoals/usersCurrentIncome"
      // );
      // let newCurrentIncome;
      // onValue(userData, (snapshot) => {
      //   const data = snapshot.val();
      //   newCurrentIncome = data + Number(_this.entryData.amount);
      // });

      // set(
      //   ref(db, "users/" + uid + "/userGoals/usersCurrentIncome"),
      //   newCurrentIncome
      // );
    },

    validateEntry() {
      if (this.entryData.description === "") {
        this.errorMatch["description-error"] = true;
        return false;
      } else {
        this.errorMatch["description-error"] = false;
      }

      if (this.entryData.amount === null) {
        this.errorMatch["amount-error"] = true;
        return false;
      } else {
        this.errorMatch["amount-error"] = false;
      }

      if (
        this.entryData.addTo === "Add To" &&
        this.entryData.saveAs === "Income"
      ) {
        this.errorMatch["add-to-error"] = true;
        return false;
      } else {
        this.errorMatch["add-to-error"] = false;
      }

      if (this.entryData.saveAs === "Save As") {
        this.errorMatch["add-to-error"] = true;
        return false;
      } else {
        this.errorMatch["add-to-error"] = false;
      }

      return true;
    },

    submitEntry() {
      if (this.validateEntry()) {
        if (this.entryData.saveAs === "Income") {
          this.entryData.amount = Math.abs(this.entryData.amount);
        } else if (this.entryData.saveAs === "Expense") {
          this.entryData.addTo = "Expenses Incurred";
          this.entryData.amount > 0
            ? (this.entryData.amount = `-${this.entryData.amount}`)
            : 0;
        } else if (this.entryData.saveAs === "Upcoming Bills") {
          this.entryData.amount = Math.abs(this.entryData.amount);
          this.entryData.addTo = "Upcoming Bills";
        }

        console.log(this.entryData);

        const db = getDatabase();
        let uid = this.$store.state.userID;
        let _this = this;
        push(ref(db, "users/" + uid + "/entries/records"), _this.entryData);
        this.updateCurrentIncome();

        this.successfulEntry();
      }
    },
  },
};
</script>

<!-- <style scoped>
@import url("~/assets/styles.css");
</style> -->

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
  width: 54px;
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
.add-expenses-succesful {
  background: rgb(85 132 92);
}
</style>