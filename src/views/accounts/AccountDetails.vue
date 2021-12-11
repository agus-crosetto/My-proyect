<template>
    <div>
      <base-card>
          <h1>  {{selectedAccount.fullName}}  </h1>
        <div class="lista">
          <div class="row align-items-start">
            <div class="col">
              <p> Short Name: {{selectedAccount.shortName}}  </p>
            </div>
            <div class="col">
              <p> ID Account Type: {{selectedAccount.accountTypeId}} </p>
            </div>
          </div>

          <div class="row align-items-start">
            <div class="col">
              <p> 1 Address: {{selectedAccount.addressLine1}} </p>
            </div>
            <div class="col">
              <p  v-if="selectedAccount.addressLine2.length > 0"> 2 Address: {{selectedAccount.addressLine2}} </p>
            </div>
          </div>
          <div class="row align-items-start">
            <div class="col">
              <p> City: {{selectedAccount.city}} </p>
            </div>
            <div class="col">
              <p> State: {{selectedAccount.state}} </p>
            </div>
          </div>
          <div class="row align-items-start">
            <div class="col">
              <p> Country: {{selectedAccount.country}} </p>
            </div>
            <div class="col">
              <p> Contact: {{selectedAccount.contact}} </p>
            </div>
          </div>
          <div class="row align-items-start">
            <div class="col">
              <p> E-mail: {{selectedAccount.email}} </p>
            </div>
            <div class="col">
              <p> Phone: {{selectedAccount.phone}}</p>
            </div>
          </div>
            
          <div class="actions">
            <base-button link type="button" :to="linkButtonRegistration" @click="showButtonActive"> Edit Account </base-button>
            <account-edit v-if="buttonActive"></account-edit>
            <base-button link type="button"> Delete Account </base-button>
          </div>
         </div>
      </base-card>
          <div class="col">
              <p> ACA VA LA LISTA DE TRANSACTIONS </p>
          </div>
    </div>
</template>


<script>
import AccountEdit from '../../components/accounts/AccountEdit.vue';

export default {
  components:{
    AccountEdit
  },
  props: ['id'],
  data(){
    return{
      selectedAccount: [],
      buttonActive: false,
      linkButtonRegistration: '',
    };
  },
  created(){
    console.log(this.id)
    this.selectedAccount = this.$store.getters['accounts/accounts'].find(acc => acc.id === this.id);
    console.log(this.selectedAccount)
  },
  computed:{
    },
  methods:{
    showButtonActive(){
    this.buttonActive = !this.buttonActive;
    this.$route.path + '/' + this.id;
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
  font-size: 1.5rem;
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
</style>