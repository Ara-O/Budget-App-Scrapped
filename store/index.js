export const state = () => ({
    userIsSignedIn: false,
    userID: '',
    userGoals: {},
    usersCurrentIncome: 0,
    budgetItems: [
        "Add To",
        "Entertainment",
        "College",
        "Food",
        "Utilities",
        "Savings",
      ],
})

export const mutations = {
    changeSignedInState(state) {
        state.userIsSignedIn = true;
    },
    changeUserIDState(state, uid) {
        state.userID = uid;
    },
    changeUserGoals(state, userGoals) {
        state.userGoals = userGoals;
    },

    changeUsersCurrentIncome(state, usersIncome){
        state.usersCurrentIncome= usersIncome
    }
}