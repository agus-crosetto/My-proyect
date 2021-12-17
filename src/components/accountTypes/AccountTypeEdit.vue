<template>
    <div>
      <base-card> 
<form class="row g-3" @submit.prevent="submitForm(selectedAccount)">
  <div class="col-md-6">
    <label for="inputShortName" class="form-label">Short Name</label>
    <input type="text" class="form-control" id="inputShortName" v-model.trim="selectedAccount.shortName" required>
  </div>
  <div class="col-md-6">
    <label for="inputFullName" class="form-label">Full Name</label>
    <input type="text" class="form-control" id="inputFullName" v-model.trim="selectedAccount.fullName" required>
  </div>
  <div class="col-6">
    <base-button type="submit">Update Account Type</base-button>
  </div>
  <div class="col-6">
    <base-button type="button" @click="cancelEdit">Back to Account Types</base-button>
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
    this.selectedAccount = this.$store.getters['accountTypes/accountTypes'].find(acc => acc.id === this.id);
  },
  computed:{
    },
  methods:{
    showButtonActive(){
    this.buttonActive = !this.buttonActive;
    this.$route.path + '/' + this.id;
    },

    cancelEdit(){
      const userWantsDelete = confirm(' Are you sure? This Account Type was left unedited!');
    if(userWantsDelete === true){
      this.$router.replace({path: '/account-types'});
    }
    },
    submitForm(data){
      const userWantsEdit = confirm(' Are you sure? the Account Type will be edited!');
      if(userWantsEdit === true){
      this.$emit('edit-data', data);
      this.$store.dispatch('accountTypes/loadAccountTypes')
      this.$router.replace({path: '/account-types'});
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