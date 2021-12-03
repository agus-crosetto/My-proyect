import { createRouter, createWebHistory } from 'vue-router'

import AccountDetails from './views/accounts/AccountDetails.vue';
import AccountsList from './views/accounts/AccountsList.vue';
import AddAccount from './views/accounts/AddAccount.vue';
import EditAccount from './views/accounts/EditAccount.vue';
import AddAccountTypes from './views/accounttypes/AddAccountTypes.vue';

import AccountTypesList from './views/accounttypes/AccountTypesList.vue';

import TransactionsList from './views/transactions/TransactionsList.vue';
import AddTransaction from './views/transactions/AddTransaction.vue';

import TransactionTypesList from './views/transactiontypes/TransactionTypesList.vue';
import AddTransactionTypes from './views/transactiontypes/AddTransactionTypes.vue';

import NotFound from './views/NotFound.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
  { path: '/accounts', component: AccountsList, children:[
    { path: 'addaccount', component: AddAccount },
  ]},
  { path: '/accounts/:id', component: AccountDetails, children:[
    { path: 'editaccount', component: EditAccount },
  ] },
  { path: '/typesaccount', component: AccountTypesList, children:[
    { path: 'addaccounttypes', component: AddAccountTypes },
  ] },

  { path: '/transactions', component: TransactionsList, children:[
    { path: 'addtransaction', component: AddTransaction },
  ] },
  { path: '/typestransaction', component: TransactionTypesList, children:[
    { path: 'addtransactiontypes', component: AddTransactionTypes },
  ] },
  
  { path: '/', redirect: '/accounts'},
  { path: '/notFound(.*)', component: NotFound }
  
]


})

export default router
