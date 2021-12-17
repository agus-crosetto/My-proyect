export default {
    // All Account
    TransactionTypes(state){
        return state.Results.results;
    },

    //si existe una cuenta
    hasTransactionTypes(state){
        return state.Results.results && state.Results.results.length > 0;
    },

    //Cuenta del total
    TransactionTotal(state){
        return state.Results.total;
    }
};