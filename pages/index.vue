<template>
  <main>
    <section class="one">
      <h3>one</h3>
    </section>
    <section class="two">
      <h3>two</h3>
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
      getUserData(this);
    },
  },

  mounted() {
    userIsSignedIn(this);
  },
};
</script>

<style scoped>
@import url("~/assets/styles.css");
h3{
  color: pink;
}

main{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 35% 65%;
  grid-template-areas: 
  "currentIncomeBox inputTransactionBox piggyBank"
  "expensesBox sectionBudgetBox .";
}

.one{
  grid-area: currentIncomeBox;
  background: goldenrod
}
.two{
  grid-area: inputTransactionBox;
  background: green;
}
.three{
  grid-area: piggyBank;
  background: pink;
}
.four{
  grid-area: expensesBox;
  background: white;
}
.five{
  grid-area: sectionBudgetBox;
  background: lemonchiffon;
}

main > div{
  background: pink;
  width: 400px;
  height: 400px
}
</style>