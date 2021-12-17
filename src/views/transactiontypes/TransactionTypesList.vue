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
                        <h1>Transaction Types List</h1>
                    </div>
                    <div class="col-3 align-self-center">
                        <transaction-types-search @search-data="searchData"></transaction-types-search>
                    </div>
                </div>
            </div>
            <base-card>
                <base-button link type="button" :to="linkButtonRegistration" @click="showButtonActiveAddAccount"> Add New Transaction Type </base-button>
                <transaction-type-add v-if="buttonActive" @save-data="saveData"></transaction-type-add>
            </base-card>
            <base-card>
                <div class="row">
                    <div class="col-3 align-self-center">
                        <base-button @click="loadTransactionTypes">All / Refresh List</base-button> 
                    </div>
                    <div class="col-6 align-self-center">
                        <div class="container2"> 
                            <h4>Total Transaction Types:  {{TotalTransactionTypes}}</h4>
                        </div>
                    </div>
                    <div class="col-3 align-self-center">
                        <form class="row g-2" @submit.prevent="searchFilter(searchField)">
                            <div>
                                <input type="text" class="form-control" id="inputTransactionTypes" placeholder="Short / Full Name Transaction Type"  v-model.trim="searchField" required>
                            </div>
                         </form>
                    </div>
                </div>
                <div v-if="isLoading">
                    <base-spinner></base-spinner>
                </div>
                <ul v-else-if="hasAccounts">
                    <transaction-type-table></transaction-type-table>        
                </ul>
                <h3 v-else> No account types Found.</h3>
            </base-card>
        </section>
    </div>
</template>


<script>

import TransactionTypeAdd from '../../components/transactionTypes/TransactionTypesAdd.vue';
import TransactionTypesSearch from '../../components/transactionTypes/TransactionTypesSearch.vue';
import TransactionTypeTable from '../../components/transactionTypes/TransactionTypesTable.vue';

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
    TransactionTypeAdd,
    TransactionTypesSearch,
    TransactionTypeTable
  },
  created(){
    this.loadTransactionTypes();
  },
  methods:{
    handleError(){
      this.error = null;
    },
    searchData(data){
      this.$store.dispatch('transactionTypes/searchTransactionTypeId', data);
    },
    showButtonActiveAddAccount(){
      this.buttonActive = !this.buttonActive;
        this.$router.replace({path: '/transaction-types'});
    },
    saveData(data){
      this.$store.dispatch('transactionTypes/addTransactionTypes', data);
      this.buttonActive = false;
      this.loadTransactionTypes();
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
    searchFilter(data){
      this.$store.dispatch('transactionTypes/searchTransactionTypesName', data);
    },
    },
  computed: {
        TotalTransactionTypes(){
          return this.$store.getters['transactionTypes/TransactionTotal']
        },
        hasAccounts(){
            return !this.isLoading && this.$store.getters['transactionTypes/hasTransactionTypes'];
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