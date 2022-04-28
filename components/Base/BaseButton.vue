<template>
  <button @click="click"><slot></slot></button>
</template>

<script>
export default {
  emits: ["click"],

  methods: {
    click(){
      this.$emit("click")
    }
  }
}
</script>

<style scoped>
button {
  /* position: absolute; */
  /* bottom: 25px; */
  color: white;
  /* right: 36px; */
  height: 43px;
  border-width: 0px;
  border-radius: 5px;
  background-color: #468c5f;
  width: 110px;
  box-shadow: -1px 1px 3px rgb(92 92 92 / 25%),
    2px -2px 4px rgb(201 201 201 / 0%);
  cursor: pointer;
  transition: all 200ms ease-in-out;
}

button:hover{
  transform: translate(-1px, 1px);
}
</style>