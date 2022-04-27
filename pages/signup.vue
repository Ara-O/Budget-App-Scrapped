<template>
    <main class="page-bg">
        <div class="arrange-sign-up">
            <h3 class="arrange-sign-up_title">Let's start saving up money</h3>
            <div class="horizontal-link"></div>
            <h5>How much do you currently have?</h5>
            <IncomeRangeSelector></IncomeRangeSelector>
            <h5>How much do you want to save?</h5>
            <IncomeRangeSelector></IncomeRangeSelector>
            <BaseButton class="base-button">Continue</BaseButton>
        </div>
    </main>
</template>

<script>
import IncomeRangeSelector from "../components/IncomeRangeSelector.vue"
import BaseButton from "../components/BaseButton.vue";
export default {
    head() {
        return {
            title: "Budget app sign-up page"
        };
    },
    data() {
        return {};
    },
    components: { IncomeRangeSelector, BaseButton }
}
</script>

<style scoped>
@import url("~/assets/styles.css");
@import url("~/assets/signup.css");
</style>