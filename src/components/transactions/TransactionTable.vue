<template>
    <table class="table table-striped table-hover table-bordered">
           <thead>
             <tr>
               <th scope="col">ID</th>
               <th scope="col">Reference</th>
               <th scope="col">Date</th>
               <th scope="col">Transaction Type ID</th>
               <th scope="col">Fee</th>
               <th scope="col">Account ID</th>
               <th scope="col">Amount</th>
               <th scope="col">Amount + Fee</th>
               <th scope="col">Details</th>
             </tr>
           </thead>


           <tr v-for="account in filteredAccounts" :key="account.id">
               <th scope="col">{{ account.id }}</th>
               <td scope="col">{{ account.reference }}</td>
               <td scope="col">{{ account.date }}</td>
               <td scope="col" :model="transactionName(account.typeId)">{{ account.typeId }} - {{ TransactionNameForId.shortName }} </td>
               <td scope="col" >{{ TransactionNameForId.sign }} </td>
               <td scope="col" :model="accountName(account.accountId)">{{account.accountId}} - {{ AccountNameForId.shortName }} </td>
               <td scope="col">{{ account.amount }}</td>
               <td scope="col" :model="calculateFee(account.amount, TransactionNameForId.sign)">{{ CalculateAmountFee }}</td>
               <td scope="col">
               <base-button link :to="'/transactions' + '/' + account.id" :id="account.id">View Details</base-button>
               </td>
           </tr>
         </table>
</template>

<script>

export default {
  props:['id'],
  data(){
    return{
      AccountNameForId: '',
      TransactionNameForId: '',
      CalculateAmountFee: null,

    };
  },
  methods:{
  async loadTransactions(){
      this.isLoading = true;
      try { if(this.id != undefined){
        const data = this.id;
        await this.$store.dispatch('transactions/searchTransactionAccountId', data);
      } else {
          await this.$store.dispatch('transactions/loadTransaction');
        }
      } catch (error) {
        this.error = error.message || 'Something went wrong!'
      }
      this.isLoading = false;
    },
    async loadTransactionTypes(){
      this.isLoading = true;
      try {
        await this.$store.dispatch('transactionTypes/loadTransactionTypes');
      } catch (error) {
          this.error = error.message || 'Something went wrong!'
        }
      this.isLoading = false;
    },
    transactionName(data){
      const id = data + '' ;
      this.TransactionNameForId = this.$store.getters['transactionTypes/TransactionTypes'].find(accc => accc.id === id);
    },
    accountName(data){
      const id = data + '';
      this.AccountNameForId = this.$store.getters['accounts/accounts'].find(acc => acc.id === id);
    },
    calculateFee(amount, sign){
      if(sign === 1){
        this.CalculateAmountFee = amount;
      } else {
        this.CalculateAmountFee = amount + 20;
      }
    },
  },
    created(){
      this.loadTransactionTypes();
      this.loadTransactions();
    },
  computed: {
    filteredAccounts(){
      return this.$store.getters['transactions/transactions'];
    },
    },
}
</script>
// this.selectedAccount = this.$store.getters['accounts/accounts'].find(acc => acc.id === this.id);