export default {
    // All Account
    accounts(state){
        return state.accountResults.results;
    },

    //si existe una cuenta
    hasAccounts(state){
        return state.accountResults.results && state.accountResults.results.length > 0;
    },

    //Cuenta del total
    accountTotal(state){
        return state.accountResults.total;
    }
};