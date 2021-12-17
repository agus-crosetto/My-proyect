<template>
    <div>
      <div class="container">
        <div class="row">
          <div class="col-12 align-self-center">
            <h1>Transaction Details</h1>
          </div>
        </div>
      </div>
      <base-card> 
        <div class="card-header">
          <div class="row align-items">
            <div class=" col-2">
              <base-button link type="button" :to="linkButtonRegistration" @click="showButtonActive"> Edit Transaction </base-button>
            </div>
          <div class=" col-8" v-if="!buttonActive">
            <h1> ID: {{selectedAccount.id}}  </h1>
            <h1> Reference: {{selectedAccount.reference}}  </h1>
          </div>
          <div class=" col-2" v-if="!buttonActive">
            <button class="btn btn-danger" type="button" @click="deleteTransaction(this.id)"> Delete Transaction </button>
          </div>
          <div class=" col-12">
            <transaction-edit @edit-data="updateData" v-if="buttonActive" :id="this.id"></transaction-edit>
          </div>
          </div>
        </div>
          <div class="row align-items-start" v-if="!buttonActive">
            <div class="container3 col-6">      
              <label><h4>Date:</h4> <h5> {{selectedAccount.date}}</h5></label>
            </div>
            <div class="container3 col-6">      
              <label><h4>Transaction Type ID:</h4> <h5> {{selectedAccount.typeId}}</h5></label>
            </div>
            <div class="container3 col-6">      
              <label><h4>Account ID:</h4> <h5> {{selectedAccount.accountId}}</h5></label>
            </div>
            <div class="container3 col-6">      
              <label><h4>Amount:</h4> <h5> {{selectedAccount.amount}}</h5></label>
            </div>
          </div>
          <base-button link type="button" to="/transactions"> Back To Transactions </base-button>
      </base-card>
    </div>
</template>


<script>
import TransactionEdit from '../../components/transactions/TransactionEdit.vue';
export default {
  components:{
    TransactionEdit,
  },
  props: ['id'],
  data(){
    return{
      selectedAccount: [],
      buttonActive: false,
      linkButtonRegistration: '',
      deleteAcept: false,
    };
  },
  created(){
    this.selectedAccount = this.$store.getters['transactions/transactions'].find(acc => acc.id === this.id);
  },
  computed:{
    },
  methods:{

    updateData(data){
      this.$store.dispatch('transactions/updateAccounts', data);
    },

    showButtonActive(){
    this.buttonActive = !this.buttonActive;
    this.$route.path + '/' + this.id;
    },

    deleteTransaction(data){
      const userWantsDelete = confirm(' Are you sure? the Transaction will be deleted!');
    if(userWantsDelete === true){
      this.$store.dispatch('transactions/deleteTransactionId', data);
      this.$store.dispatch('transactions/loadTransaction')
      this.$router.replace({path: '/transactions'});
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