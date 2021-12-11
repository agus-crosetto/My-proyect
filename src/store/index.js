import { createStore } from 'vuex'

import accountsModule from './modules/accounts/index.js';
import accountTypesModule from './modules/accounttypes/index.js';
import transactionsModule from './modules/transactions/index.js';
import transactionTypesModule from './modules/transactiontypes/index.js';


const store = createStore({
  modules: {
    accounts: accountsModule,
    accountTypes: accountTypesModule,
    transactions: transactionsModule,
    transactionTypes: transactionTypesModule
  }
});

export default store;