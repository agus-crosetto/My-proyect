<template>
  <div>
    <base-dialog :show="!!error" title="An error ocurred!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <div class="container">
        <div class="row">
          <div class="col-3 align-self-start">
          </div>
          <div class="col-6 align-self-center">
            <h1>Transaction List</h1>
          </div>
          <div class="col-3 align-self-center">
            <transaction-search @search-data="searchData"></transaction-search>
          </div>
        </div>
      </div>
      <base-card>
        <base-button link type="button" :to="linkButtonRegistration" @click="showButtonActiveAddAccount"> Add New Transaction </base-button>
        <transaction-add v-if="buttonActive" @save-data="saveData"></transaction-add>
      </base-card>
      <base-card>
        <div class="row">
          <div class="col-3 align-self-center">
            <base-button @click="loadTransactions && loadTransactionTypes">All / Refresh List</base-button> 
          </div>
          <div class="col-6 align-self-center">
            <div class="container2"> 
              <h4>Total Transactions:  {{TotalTransactions}}</h4>
            </div>
          </div>
          <div class="col-3 align-self-center">
            <form class="row g-2" @submit.prevent="searchFilter(searchField)">
              <div>
                <input type="text" class="form-control" id="inputAccount" placeholder="Reference"  v-model.trim="searchField" required>
              </div>
            </form>
          </div>
        </div>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <ul v-else-if="hasAccounts">
          <transaction-table></transaction-table>
        </ul>
        <h3 v-else> No account Found.</h3>
      </base-card>
    </section>
  </div>
</template>


<script>

import TransactionAdd from '../../components/transactions/TransactionAdd.vue';
import TransactionSearch from '../../components/transactions/TransactionSearch.vue';
import TransactionTable from '../../components/transactions/TransactionTable.vue';

export default {
  data(){
    return{
      isLoading: false,
      error: null,
      buttonActive: false,
      linkButtonRegistration: '',
      searchField: '',
    };
  },

  components: {
    TransactionAdd,
    TransactionSearch,
    TransactionTable
  },
  methods:{
    searchFilter(data){
      this.$store.dispatch('transactions/searchTransactionReference', data);
    },
    showButtonActiveAddAccount(){
      this.buttonActive = !this.buttonActive;
        this.$router.replace({path: '/transactions'});
      },
    saveData(data){
      this.$store.dispatch('transactions/addTransaction', data);
      this.buttonActive = false;
      this.loadTransactions();
    },
    searchData(data){
      this.$store.dispatch('transactions/searchTransactionId', data);
    },
    async loadTransactions(){
      this.loadTransactionTypes();
      this.isLoading = true;
      try {
        await this.$store.dispatch('transactions/loadTransaction');
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
    handleError(){
      this.error = null;
    }
    },
    created(){
      this.loadTransactionTypes();
      this.loadTransactions();
    },
  computed: {
        TotalTransactions(){
          return this.$store.getters['transactions/transactionsTotal']
        },
        hasAccounts(){
            return !this.isLoading && this.$store.getters['transactions/hasTransactions'];
        },
    },
}
</script>


<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 1rem;
}

.controls {
  display: flex;
  justify-content: space-between;
}
.container {
  border-radius: 12px;
  box-shadow: 0 5px 0px rgba(0, 0, 0, 0.30);
  padding: 1rem;
  margin: 0rem auto;
  max-width: 100%;
  position: relative;
}
.container2 {
border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  margin: 2rem auto;
  max-width: 90%;
}

</style>