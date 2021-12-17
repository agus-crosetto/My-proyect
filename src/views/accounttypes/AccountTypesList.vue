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
          <h1>Account Types List</h1>
        </div>
        <div class="col-3 align-self-center">
          <account-types-search @search-data="searchData"></account-types-search>
        </div>
      </div>
    </div>
    <base-card>
      <base-button link type="button" :to="linkButtonRegistration" @click="showButtonActiveAddAccount"> Add New Account </base-button>
      <account-type-add v-if="buttonActive" @save-data="saveData"></account-type-add>
    </base-card>
    <base-card>
      <div class="row">
        <div class="col-3 align-self-center">
          <base-button @click="loadAccountTypes">All / Refresh List</base-button> 
        </div>
        <div class="col-6 align-self-center">
          <div class="container2"> 
            <h4>Total Account:  {{TotalAccount}}</h4>
          </div>
        </div>
        <div class="col-3 align-self-center">
          <form class="row g-2" @submit.prevent="searchFilter(searchField)">
            <div>
              <input type="text" class="form-control" id="inputAccount" placeholder="Short / Full Name Account Type"  v-model.trim="searchField" required>
            </div>
          </form>
        </div>
      </div>
      <div v-if="isLoading">
        <base-spinner></base-spinner>
      </div>
      <ul v-else-if="hasAccounts">
        <account-type-table></account-type-table>        
      </ul>
      <h3 v-else> No account types Found.</h3>
    </base-card>
  </section>
</div>
</template>


<script>

import AccountTypeAdd from '../../components/accountTypes/AccountTypeAdd.vue';
import AccountTypesSearch from '../../components/accountTypes/AccountTypesSearch.vue';
import AccountTypeTable from '../../components/accountTypes/AccountTypeTable.vue';

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
    AccountTypeAdd,
    AccountTypesSearch,
    AccountTypeTable
  },
  created(){
    this.loadAccountTypes();
  },
  methods:{
    handleError(){
      this.error = null;
    },
    searchData(data){
      this.$store.dispatch('accountTypes/searchAccountTypeId', data);
    },
    showButtonActiveAddAccount(){
      this.buttonActive = !this.buttonActive;
        this.$router.replace({path: '/account-types'});
    },
    saveData(data){
      this.$store.dispatch('accountTypes/addAccountTypes', data);
      this.buttonActive = false;
      this.loadAccountTypes();
    },
    async loadAccountTypes(){
      this.isLoading = true;
      try {
        await this.$store.dispatch('accountTypes/loadAccountTypes');
      } catch (error) {
          this.error = error.message || 'Something went wrong!'
        }
      this.isLoading = false;
    },
    searchFilter(data){
      this.$store.dispatch('accountTypes/searchAccountTypesName', data);
    },
    },
  computed: {
        TotalAccount(){
          return this.$store.getters['accountTypes/accountTotal']
        },
        hasAccounts(){
            return !this.isLoading && this.$store.getters['accountTypes/hasAccountTypes'];
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