export default {
    // All Account
    accountTypes(state){
        return state.accountTypesResults.results;
    },

    //si existe una cuenta
    hasAccountTypes(state){
        return state.accountTypesResults.results && state.accountTypesResults.results.length > 0;
    },

    //Cuenta del total
    accountTotal(state){
        return state.accountTypesResults.total;
    }
};