<template>
    <div>
      <div class="container">
        <div class="row">
          <div class="col-12 align-self-center">
            <h1>Transaction Type Details</h1>
          </div>
        </div>
      </div>
      <base-card> 
        <div class="card-header">
          <div class="row align-items">
            <div class=" col-2">
              <base-button link type="button" :to="linkButtonRegistration" @click="showButtonActive"> Edit Transaction Type </base-button>
            </div>
          <div class=" col-8" v-if="!buttonActive">
            <h1>  {{selectedAccount.fullName}}  </h1>
          </div>
          <div class=" col-2" v-if="!buttonActive">
            <button class="btn btn-danger" type="button" @click="deleteTransactionType(this.id)"> Delete Transaction Type </button>
          </div>
          <div class=" col-12">
            <transaction-type-edit @edit-data="updateData" v-if="buttonActive" :id="this.id"></transaction-type-edit>
          </div>
          </div>
        </div>
          <div class="row align-items-start" v-if="!buttonActive">
            <div class="container3 col-4">      
              <label><h4>Full Name:</h4> <h5> {{selectedAccount.fullName}}</h5></label>
            </div>
            <div class="container3 col-4">      
              <label><h4>Short Name:</h4> <h5> {{selectedAccount.shortName}}</h5></label>
            </div>
            <div class="container3 col-4">      
              <label><h4>Sign:</h4> <h5> {{selectedAccount.sign}}</h5></label>
            </div>
          </div>
          <base-button link type="button" to="/transaction-types"> Back To Transaction Types </base-button>
      </base-card>
    </div>
</template>


<script>
import TransactionTypeEdit from '../../components/transactionTypes/TransactionTypesEdit.vue';
export default {
  components:{
    TransactionTypeEdit,
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
    this.selectedAccount = this.$store.getters['transactionTypes/TransactionTypes'].find(acc => acc.id === this.id);
  },
  computed:{
    },
  methods:{
    showButtonActive(){
        this.buttonActive = !this.buttonActive;
        this.$route.path + '/' + this.id;
    },
    updateData(data){
      this.$store.dispatch('transactionTypes/updateTransactionType', data);
    },
    deleteTransactionType(data){
      const userWantsDelete = confirm(' Are you sure? the Transaction Type will be deleted!');
    if(userWantsDelete === true){
      this.$store.dispatch('transactionTypes/deleteTransactionTypeId', data);
      this.$store.dispatch('transactionTypes/loadTransactionTypes')
      this.$router.replace({path: '/transaction-types'});
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