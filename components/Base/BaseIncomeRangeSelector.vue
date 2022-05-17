<template>
  <section class="range-section">
    <h5 class="range-section_dollar_sign">$</h5>
    <input
      type="number"
      v-model.num="userInput"
      :style="{ width: calculateInputWidth }"
      placeholder="0"
      @input="validate"
      ref="userInput"
    />
  </section>
</template>

<script>
export default {
  emits: ["emit-user-input"],

  data() {
    return {
      userInput: "",
      accurateData: true,
    };
  },

  methods: {
    validate() {
      if(this.userInput.trim()=== ''){
        this.$emit("emit-user-input", "0");
      }else{
        this.$emit("emit-user-input", this.userInput);
      }
    },
  },

  computed: {
    calculateInputWidth() {
      if (this.userInput.length == "") return `30px`;

      return `${this.userInput.length * 30}px`;
    },
  },

  mounted() {
    let invalidChars = ["-", "+", "e"];

    document.querySelector("input").addEventListener("keydown", function (e) {
      if (invalidChars.includes(e.key)) {
        e.preventDefault();
      }
    });
  },
};
</script>

<style scoped>
@import url("../../assets/base_income_selector.css");
</style>

<style scoped>
@import url("../../assets/signup.css");
</style>