<template>
    <div>
      <base-card> 
<form class="row g-3" @submit.prevent="submitForm(selectedAccount)">
  <div class="col-md-4">
    <label for="inputReference" class="form-label">Reference</label>
    <input type="text" class="form-control" id="inputReference" v-model.trim="selectedAccount.reference" required>
  </div>
  <div class="col-md-4">
    <label for="inputTransactionType" class="form-label">Transaction Type ID</label>
    <input type="text" class="form-control" id="inputTransactionType" v-model.trim="selectedAccount.typeId" required>
  </div>
    <div class="col-md-4">
    <label for="inputAccountTypeId" class="form-label">Account Type Id</label>
    <input type="number" class="form-control" id="inputAccountTypeId" v-model.number="selectedAccount.accountId" required>
  </div>
  <div class="col-md-6">
    <label for="inputDate" class="form-label">Address Line 1</label>
    <input type="date" class="form-control" id="inputDate" v-model.trim="selectedAccount.date" required>
  </div>
  <div class="col-md-6">
    <label for="inputamount" class="form-label">Amount</label>
    <input type="double" class="form-control" id="inputamount" v-model.trim="selectedAccount.amount">
  </div>
  <div class="col-6">
    <base-button type="submit">Update Transaction</base-button>
  </div>
  <div class="col-6">
    <base-button type="button" @click="cancelEdit">Back to Transactions</base-button>
  </div>
</form>



      </base-card>
    </div>
</template>


<script>
export default {

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
    showButtonActive(){
    this.buttonActive = !this.buttonActive;
    this.$route.path + '/' + this.id;
    },

    cancelEdit(){
      const userWantsDelete = confirm(' Are you sure? This Transactio was left unedited!');
    if(userWantsDelete === true){
      this.$router.replace({path: '/transactions'});
    }
    },

    submitForm(data){
      const userWantsEdit = confirm(' Are you sure? the Transactios will be edited!');
      if(userWantsEdit === true){
      this.$emit('edit-data', data);
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