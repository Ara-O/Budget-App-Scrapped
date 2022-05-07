<template>
    <div class="section-right-bottom">
        <h3>Upcoming Bills</h3>
        <hr>
        <!-- Upcoming bills section -->
        <span class="expenses-and-income-section_item" v-for="bill in bills">
        <h5 :title="bill.description">{{bill.description}}</h5>
        <h5>$ {{bill.income}}</h5>
      </span>
      </div>
</template>

<script>
export default {
    props: ["bills"],
}
</script>

<style scoped>
  .section-right-bottom {
    height: 460px;
    border-radius: 6px;
    display: flex;
    background-color: #6c7173;
    border-radius: 6px;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    padding: 40px 10px 25px 10px;
    overflow: auto;
  }

.section-right-bottom h3{
  font-weight: 300;
  font-size: 16.3px;
  color: white;
}

hr{
  background-color: white;
width: 53px;
margin: 15px 0px 24px;
border-radius: 15px;
}

.expenses-and-income-section_item h5 {
  font-weight: 300;
  color: white;
  font-size: 13.5px;
}

.expenses-and-income-section_item h5:first-child{
    font-weight: 300;
    width: 94px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}

.expenses-and-income-section_item {
      display: flex;
    grid-column-gap: 35px;
    column-gap: 10px;
    color: white;
    margin-bottom: 18px;
    width: 170px;
    justify-content: space-around;
}

</style>