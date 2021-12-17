export default {
    loadAccounts(state, payload){
        state.accountResults = payload
    },
    searchAccountsId(state, payload){
        state.accountResults = payload
    },
    searchAccountsName(state, payload){
        state.accountResults = payload
    },
};