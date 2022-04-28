<template>
        <div class="arrange-sign-up">
            <h3 class="arrange-sign-up_title">Let's start saving up money</h3>
            <div class="horizontal-link"></div>
            <h5>How much do you currently have?</h5>
            <IncomeRangeSelector @emit-user-input="storeUserCurrentIncome"></IncomeRangeSelector>
            <h5>How much do you want to save?</h5>
            <IncomeRangeSelector @emit-user-input="storeUserDesiredIncome"></IncomeRangeSelector>
            <BaseButton class="base-button" @click="continueToNextSection">Continue</BaseButton>
        </div>
</template>


<script>
import IncomeRangeSelector from "./Base/BaseIncomeRangeSelector.vue"
import BaseButton from "./Base/BaseButton.vue";
export default {
    emits: ["continue"],

    components: { IncomeRangeSelector, BaseButton },

    head() {
        return {
            title: "Budget-app sign-up page"
        };
    },
    
    data(){
        return {
            usersCurrentIncome: 0,
            usersDesiredIncome: 0,
        }
    },

    methods: {
        storeUserCurrentIncome(data){
            this.usersCurrentIncome = Number(data);
        },

        storeUserDesiredIncome(data){
            this.usersDesiredIncome = Number(data);
        },

        continueToNextSection(){
            this.$emit("continue")
        }
    }
}
</script>


<style scoped>
@import url("~/assets/signup.css");
</style>