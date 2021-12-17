export default {
    // All Account
    transactions(state){
        return state.Results.results;
    },

    //si existe una cuenta
    hasTransactions(state){
        return state.Results.results && state.Results.results.length > 0;
    },

    //Cuenta del total
    transactionsTotal(state){
        return state.Results.total;
    }
};