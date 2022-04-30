export const state = () => ({
    userIsSignedIn: false,
    userID: ''
})

export const mutations = {
    changeSignedInState(state) {
        state.userIsSignedIn = true;
    },
    changeUserIDState(state, uid) {
        state.userID = uid;
    },
}