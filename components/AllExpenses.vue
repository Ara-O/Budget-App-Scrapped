<template>
  <div class="plan-budget-section">
    <div class="expenses-and-income-section">
      <h3>Expenses and Income</h3>
      <hr />
      <span class="expenses-and-income-section_item" v-for="entry in entries">
        <h5 :title="entry.description">{{entry.description}}</h5>
        <h5>$ {{entry.income}}</h5>
      </span>
    </div>
    <div class="plan-budget-items-section">
      <h3>banan</h3>
    </div>
  </div>
</template>

<script>
export default {
  props: ["entries"],

  data(){
    return{
      userEntries: {}
    }
  },

  mounted() {
   this.userEntries = this.entries
  },
};
</script>

<style scoped>
.plan-budget-items-section {
  background: #6c6c6c87;
  width: 583px;
  display: flex;
  border-radius: 6px;
  justify-content: center;
  align-items: center;
}

.plan-budget-section {
  display: flex;
  width: auto;
  height: 460px;
  justify-content: space-between;
}

.expenses-and-income-section {
  background-color: #6c7173;
  border-radius: 6px;
  display: flex;
  width: 321px;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  padding: 40px 10px 25px 10px;
  overflow: auto;
}

.expenses-and-income-section::-webkit-scrollbar {
  width: 10px;               /* width of the entire scrollbar */
 
 /* roundness of the scroll thumb */
}

.expenses-and-income-section::-webkit-scrollbar-track {
  background: none;    
    /* color of the tracking area */
}

.expenses-and-income-section::-webkit-scrollbar-thumb {
  background-color: #393B3A;    /* color of the scroll thumb */
  border-radius: 20px;   
  border: solid 2px #6c7173;
}

.expenses-and-income-section h3 {
  font-weight: 300;
  font-size: 16.3px;
  color: white;
}

.expenses-and-income-section_item {
  display: flex;
  column-gap: 35px;
  color: white;
  margin-bottom: 18px;
  width: 230px;
  justify-content: space-around;
}

.expenses-and-income-section_item h5 {
  font-weight: 300;
  font-size: 13.5px;
}

.expenses-and-income-section_item h5:first-child{
    font-weight: 300;
    width: 141px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}

hr{
      background-color: white;
    width: 53px;
    margin: 15px 0px 24px;
    border-radius: 15px;
}
</style>