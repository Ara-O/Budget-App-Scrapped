<template>
  <main>
    <section class="one">
      <div class="current-income-section">
        <h3>Current Income</h3>
        <br />
        <h2>$59</h2>
      </div>
    </section>
    <section class="two">
      <div class="add-expenses-section">
        <h3>Add Expense/Income</h3>
        <div class="add-expenses-section_inputs">
        <input type="text" name="Income" class="input-income" placeholder="Description"/>
        <input type="text" name="Income" class="input-income-2" placeholder="Income"/>
        <button>Input</button>
        </div>
      </div>
    </section>
    <section class="three">
      <h3>three</h3>
    </section>
    <section class="four">
      <h3>four</h3>
    </section>
    <section class="five">
      <h3>five</h3>
    </section>
  </main>
</template>

<script>
import { userIsSignedIn, getUserData } from "~/services/firebaseService.js";
import BaseIncomeRangeSelector from "../components/Base/BaseIncomeRangeSelector.vue";
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
    components: { BaseIncomeRangeSelector }
};
</script>

<style scoped>
@import url("~/assets/styles.css");
h3 {
  font-family: "Poppins";
}

main {
  display: grid;
  grid-template-columns: 1fr 1.4fr 1fr;
  grid-template-rows: 23% 77%;
  grid-template-areas:
    "currentIncomeBox inputTransactionBox piggyBank"
    "expensesBox sectionBudgetBox .";
  align-items: start;
  justify-items: end;
  padding-top: 51px;
}

.one {
  grid-area: currentIncomeBox;
}
.two {
  grid-area: inputTransactionBox;
}
.three {
  grid-area: piggyBank;
  background: pink;
}
.four {
  grid-area: expensesBox;
  background: white;
}
.five {
  grid-area: sectionBudgetBox;
  background: lemonchiffon;
}

main > div {
  background: pink;
  width: 400px;
  height: 400px;
}

.current-income-section {
  height: 159px;
  width: 251px;
  border-radius: 10px;
  background-color: #86a68b;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.current-income-section h3,
.add-expenses-section h3 {
  color: white;
  font-weight: 300;
  font-size: 17px;
}
.current-income-section h2 {
  color: white;
  font-weight: 400;
}

.add-expenses-section {
  height: 159px;
  width: 535px;
  border-radius: 7px;
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
    column-gap: 11px;
}

.input-income, .input-income-2 {
    height: 59px;
    border-radius: 7px;
    font-size: 17px;
    width: 225px;
    border: none;
    color: white;
    box-sizing: border-box;
    background: #8b8b8b;
    padding-left: 25px;
    font-weight: 300;
}

.input-income-2{
  width: 160px
}
</style>