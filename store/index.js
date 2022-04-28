export const state = () => ({
    userIsSignedIn: false
})

export const mutations = {
    changeSignedInState(state) {
        state.userIsSignedIn = true;
    }
}
