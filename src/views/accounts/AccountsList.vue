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
          <h1>Accounts List</h1>
        </div>
        <div class="col-3 align-self-center">
          <account-search @search-data="searchData"></account-search>
        </div>
      </div>
    </div>

    <base-card>
    <base-button link type="button" :to="linkButtonRegistration" @click="showButtonActiveAddAccount"> Add New Account </base-button>
    <account-add v-if="buttonActive" @save-data="saveData"></account-add>
     </base-card>
     <base-card>

        <div class="row">
          <div class="col-3 align-self-center">
            <base-button @click="loadAccounts">All / Refresh List</base-button> 
          </div>
          <div class="col-6 align-self-center">
          <div class="container2"> 
            <h4>Total Account:  {{TotalAccount}}</h4>
          </div>
          </div>
          <div class="col-3 align-self-center">
          <form class="row g-2" @submit.prevent="searchFilter(searchField)">
            <div>
              <input type="text" class="form-control" id="inputAccount" placeholder="Short / Full Name Account"  v-model.trim="searchField" required>
            </div>
          </form>
        </div>
      </div>
     
           <div v-if="isLoading">
             <base-spinner></base-spinner>
           </div>
    <ul v-else-if="hasAccounts">
        <account-table></account-table>
    </ul>
      <h3 v-else> No account Found.</h3>
    </base-card>
    </section>
</div>
</template>


<script>

import AccountAdd from '../../components/accounts/AccountAdd.vue';
import AccountSearch from '../../components/accounts/AccountSearch.vue';
import AccountTable from '../../components/accounts/AccountTable.vue';

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
    AccountAdd,
    AccountSearch,
    AccountTable
  },
  methods:{
    searchFilter(data){
      this.$store.dispatch('accounts/searchAccountsName', data);
    },
    showButtonActiveAddAccount(){
      this.buttonActive = !this.buttonActive;
        this.$router.replace({path: '/accounts'});
      },
    saveData(data){
      this.$store.dispatch('accounts/addAccount', data);
      this.buttonActive = false;
      this.loadAccounts();
    },
    searchData(data){
      this.$store.dispatch('accounts/searchAccountsId', data);
    },
    async loadAccounts(){
      this.loadAccountTypes();
      this.isLoading = true;
      try {
        await this.$store.dispatch('accounts/loadAccounts');
      } catch (error) {
        this.error = error.message || 'Something went wrong!'
      }
      this.isLoading = false;
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
    handleError(){
      this.error = null;
    }
    },
    created(){
      this.loadAccountTypes();
      this.loadAccounts();
    },
  computed: {
        TotalAccount(){
          return this.$store.getters['accounts/accountTotal']
        },
        hasAccounts(){
            return !this.isLoading && this.$store.getters['accounts/hasAccounts'];
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
