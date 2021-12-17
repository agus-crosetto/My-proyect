<template>
    <div>
      <div class="container">
        <div class="row">
          <div class="col-12 align-self-center">
            <h1>Account Details</h1>
          </div>
        </div>
      </div>
      <base-card> 
        <div class="card-header">
          <div class="row align-items">
            <div class=" col-2">
              <base-button link type="button" :to="linkButtonRegistration" @click="showButtonActive"> Edit Account </base-button>
            </div>
          <div class=" col-8" v-if="!buttonActive">
            <h1>  {{selectedAccount.fullName}}  </h1>
          </div>
          <div class=" col-2" v-if="!buttonActive">
            <button class="btn btn-danger" type="button" @click="deleteAccount(this.id)"> Delete Account </button>
          </div>
          <div class=" col-12">
            <account-edit @edit-data="updateData" v-if="buttonActive" :id="this.id"></account-edit>
          </div>
          </div>
        </div>
          <div class="row align-items-start" v-if="!buttonActive">
            <div class="container3 col-6">      
              <label><h4>Short Name:</h4> <h5> {{selectedAccount.shortName}}</h5></label>
            </div>
            <div class="container3 col-6">      
              <label><h4>ID Account Type:</h4> <h5> {{selectedAccount.accountTypeId}}</h5></label>
            </div>
            <div class="container3 col-6">      
              <label><h4>1 Address:</h4> <h5> {{selectedAccount.addressLine1}}</h5></label>
            </div>
            <div class="container3 col-6">      
              <label><h4>2 Address:</h4> <h5 v-if="selectedAccount.addressLine2.length > 0 "> {{selectedAccount.addressLine2}}</h5></label>
            </div>
            <div class="container3 col-6">      
              <label><h4>City:</h4> <h5> {{selectedAccount.city}}</h5></label>
            </div>
            <div class="container3 col-6">      
              <label><h4>State:</h4> <h5> {{selectedAccount.state}}</h5></label>
            </div>
            <div class="container3 col-6">      
              <label><h4>Country:</h4> <h5> {{selectedAccount.country}}</h5></label>
            </div>
            <div class="container3 col-6">      
              <label><h4>Contact:</h4> <h5> {{selectedAccount.contact}}</h5></label>
            </div>
             <div class="container3 col-6">      
              <label><h4>E-mail:</h4> <h5> {{selectedAccount.email}}</h5></label>
            </div>
             <div class="container3 col-6">      
              <label><h4>Phone:</h4> <h5> {{selectedAccount.phone}}</h5></label>
            </div>
          </div>
          <div class="row align-items-start" v-if="!buttonActive">
            <div class="container3 col-6">      
              <base-button link type="button" to="/accounts"> Back To Accounts </base-button>
            </div>
            <div class="container3 col-6">      
              <base-button type="button" @click="hideLista">{{ hide ? 'Hide' : 'Show'}} Transactions List</base-button>
            </div>
          </div>
          <div class="lista" v-if="!buttonActive" v-show="hide === true">
            <transaction-table :id="this.id"></transaction-table>
              <p> ACA VA LA LISTA DE TRANSACTIONS </p>
          </div>
      </base-card>
    </div>
</template>


<script>
import AccountEdit from '../../components/accounts/AccountEdit.vue';
import TransactionTable from '../../components/transactions/TransactionTable.vue';
export default {
  components:{
    AccountEdit,
    TransactionTable
  },
  props: ['id'],
  data(){
    return{
      selectedAccount: [],
      buttonActive: false,
      linkButtonRegistration: '',
      deleteAcept: false,
      hide: false,
    };
  },
  created(){
    this.selectedAccount = this.$store.getters['accounts/accounts'].find(acc => acc.id === this.id);
  },
  computed:{
    },
  methods:{

    async loadAccounts(){
      this.isLoading = true;
      try {
        await this.$store.dispatch('accounts/loadAccounts');
      } catch (error) {
        this.error = error.message || 'Something went wrong!'
      }
      this.isLoading = false;
    },

    updateData(data){
      this.$store.dispatch('accounts/updateAccounts', data);
      this.loadAccounts();
    },

    hideLista(){
      this.hide=!this.hide;
    },

    showButtonActive(){
    this.buttonActive = !this.buttonActive;
    this.$route.path + '/' + this.id;
    },

    deleteAccount(data){
      const userWantsDelete = confirm(' Are you sure? the user will be deleted!');
    if(userWantsDelete === true){
      this.$store.dispatch('accounts/deleteAccountId', data);
      this.$store.dispatch('accounts/loadAccounts')
      this.$router.replace({path: '/'});
    } else {
      console.log('no paso')
    }
    },

  },
}
</script>


<style scoped>
.lista {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
  
}

h3 {
  font-size: 1.6rem;
}

h3,
h4 {
  margin: 0.5rem 0;
}

div {
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: space-between;
}
.col {
  margin: 0rem;
}


.container {
  border-radius: 12px;
  box-shadow: 0 5px 0px rgba(0, 0, 0, 0.30);
  padding: 1rem;
  margin: 0rem auto;
  max-width: 100%;
  position: relative;
}
.container3 {
  border-radius: 12px;
  padding: 0rem;
  margin: 0px 0px 0px 0px;
  max-width: 80%;
  border: 2px solid rgba(126, 126, 126, 0.363);
}
</style>