import { createRouter, createWebHistory } from 'vue-router'

import AccountsList from './views/accounts/AccountsList.vue';
import AccountDetails from './views/accounts/AccountDetails.vue';

import AccountTypesList from './views/accounttypes/AccountTypesList.vue';
import AccountTypeDetails from './views/accounttypes/AccountTypeDetails.vue';


import TransactionsList from './views/transactions/TransactionsList.vue';
import TransactionDetails from './views/transactions/TransactionDetails.vue';

import TransactionTypesList from './views/transactiontypes/TransactionTypesList.vue';
import TransactionTypeDetails from './views/transactiontypes/TransactionTypeDetails.vue';


import NotFound from './views/NotFound.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
  { path: '/accounts', component: AccountsList, props: true},
  { path: '/accounts/:id', component: AccountDetails, props: true, },

  { path: '/account-types', component: AccountTypesList, props: true},
  { path: '/account-types/:id', component: AccountTypeDetails, props: true},

  { path: '/transactions', component: TransactionsList, props: true },
  { path: '/transactions/:id', component: TransactionDetails, props: true},

  { path: '/transaction-types', component: TransactionTypesList, props: true},
  { path: '/transaction-types/:id', component: TransactionTypeDetails, props: true},
  
  { path: '/', redirect: '/accounts'}, 
  { path: '/notFound(.*)', component: NotFound }
  
]


})

export default router
