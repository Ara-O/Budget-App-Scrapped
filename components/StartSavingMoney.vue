<template>
        <div class="arrange-sign-up arrange-sign-up-one">
            <h3 class="arrange-sign-up_title">Let's start saving up money</h3>
            <hr class="horizontal-link-hr">
            <h5>How much do you currently have?</h5>
            <IncomeRangeSelector @emit-user-input="storeUserCurrentIncome"></IncomeRangeSelector>
            <h5>How much do you want to save?</h5>
            <IncomeRangeSelector @emit-user-input="storeUserDesiredIncome"></IncomeRangeSelector>
            <BaseButton class="base-button" @click="continueToNextSection">Continue</BaseButton>
            <nuxtLink to="/login"><h5 class="already-has-account">I already have an account</h5></nuxtLink>
        </div>
</template> 


<script>
import IncomeRangeSelector from "./Base/BaseIncomeRangeSelector.vue"
import BaseButton from "./Base/BaseButton.vue";
export default {
    emits: ["continue"],

    components: { IncomeRangeSelector, BaseButton },
    
    data(){
        return {
            userGoals: {
                usersCurrentIncome: 0,
                usersDesiredIncome: 0,
            }
        }
    },

    methods: {
        storeUserCurrentIncome(data){
            this.userGoals.usersCurrentIncome = Number(data);
        },

        storeUserDesiredIncome(data){
            this.userGoals.usersDesiredIncome = Number(data);
        },

        continueToNextSection(){
            this.$emit("continue");
            this.$store.commit("changeUserGoals", this.userGoals);
        }
    }
}
</script>


<style scoped>
@import url("~/assets/signup.css");
</style>