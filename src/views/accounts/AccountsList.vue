<template>
<div>
  <section>
    
    <div class="container">
      <div class="row">
        <div class="col-3 align-self-start">
        </div>
        <div class="col-6 align-self-center">
          <h1>Account List</h1>
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
            <base-button @click="loadAccounts">Refresh List</base-button> 
          </div>
          <div class="col-4 align-self-center">
          <div class="container2"> 
            <h4>Total Account:</h4><h5>{{TotalAccount}}</h5>
          </div>
          </div>
          <div class="col-5 align-self-center">
          <form class="row g-2">
            <div class="col-auto">
              <input type="text" class="form-control" id="inputAccount" placeholder="Name Account">
            </div>
            <div class="col-auto">
              <base-button link type="submit">Filter for Name</base-button>
            </div>
          </form>
        </div>
      </div>
     

    <ul v-if="hasAccounts">
         <table class="table table-striped table-hover table-bordered">
           <thead>
             <tr>
               <th scope="col">ID</th>
               <th scope="col">Short Name</th>
               <th scope="col">Full Name</th>
               <th scope="col">Account Type ID</th>
               <th scope="col">City</th>
               <th scope="col">Email</th>
               <th scope="col">Phone</th>
               <th scope="col">...</th>
             </tr>
           </thead>
           <tr v-for="account in filteredAccounts" :key="account.id">
               <td scope="col">{{ account.id }}</td>
               <td scope="col">{{ account.shortName }}</td>
               <td scope="col">{{ account.fullName }}</td>
               <td scope="col">{{ account.accountTypeId }}</td>
               <td scope="col">{{ account.city }}</td>
               <td scope="col">{{ account.email }}</td>
               <td scope="col">{{ account.phone }}</td>
               <td scope="col">
               <base-button link :to="this.$route.path + '/' + account.id" :id="account.id">View Details</base-button>
               </td>
           </tr>
         </table>
        </ul>
      <h3 v-else> No account Found.</h3>
    </base-card>
    </section>
</div>
</template>


<script>

import AccountAdd from '../../components/accounts/AccountAdd.vue';
import AccountSearch from '../../components/accounts/AccountSearch.vue';

export default {
  data(){
    return{
      buttonActive: false,
      linkButtonRegistration: '',
    };
  },

  components: {
    AccountAdd,
    AccountSearch
  },
  methods:{
    showButtonActiveAddAccount(){
      this.buttonActive = !this.buttonActive;
        this.$router.replace({path: '/accounts'});
      },
    saveData(data){
      this.$store.dispatch('accounts/addAccount', data);
      this.buttonActive = false;
    },
    searchData(data){
      this.$store.dispatch('accounts/searchAccountsId', data);
    },
    loadAccounts(){
      this.$store.dispatch('accounts/loadAccounts')
    },
    },
    created(){
      this.loadAccounts();
    },
  computed: {
    filteredAccounts(){
        return this.$store.getters['accounts/accounts'];
        },
        TotalAccount(){
          return this.$store.getters['accounts/accountTotal']
        },
        hasAccounts(){
            return this.$store.getters['accounts/hasAccounts'];
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
  border:1px solid black;
  padding: 0rem;
  margin: 0rem auto;
  max-width: 100%;
}

</style>
