<template>
  <section class="range-section">
    <h5>$</h5>
    <input type="number" v-model="startingIncome" :style="{width: calculateInputWidth}" placeholder="0">
    <!-- <div class="range-arrows">
      <img src="~/assets/images/triangle.png" alt="Up arrow" class="up-arrow" />
      <img src="~/assets/images/triangle.png" alt="Up arrow" class="down-arrow" />
    </div> -->
  </section>
</template>

<script>
export default {
  data() {
    return {
      startingIncome: "",
    };
  },

  computed: {
    calculateInputWidth(){
      if(this.startingIncome == '')
        return `30px`;

      return `${this.startingIncome.length * 30}px`
    }
  }
};
</script>

<style scoped>
.range-section {
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 5px;
}

.range-section > input {
  font-size: 43px;
  font-weight: 600;
  color: #333333;
  max-width: 150px;
  border-width: 0px 0px 2px 0px;
  text-align: center;
  outline: none;
  border-color: #989898;
  font-family: 'Poppins'
}

.range-section > h5{
    font-weight: 600;
    font-size: 45px;
    color: #333333;
    margin-top: -3px
}

.range-arrows{
    display: none;
    flex-direction: column;
    row-gap: 7px;
}

.up-arrow, .down-arrow {
  width: 14px;
  cursor: pointer;
  filter: opacity(0.6);
}

.up-arrow:hover, .down-arrow:hover{
  filter: opacity(1);
}

.down-arrow{
  transform: rotate(180deg)
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

::placeholder{
  color: #545454
}

</style>