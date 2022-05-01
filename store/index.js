export const state = () => ({
    userIsSignedIn: false,
    userID: '',
    userGoals: {},
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
}