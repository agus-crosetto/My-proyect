<template>
    <table class="table table-striped table-hover table-bordered">
           <thead>
             <tr>
               <th scope="col">ID</th>
               <th scope="col">Short Name</th>
               <th scope="col">Full Name</th>
               <th scope="col">Account Type</th>
               <th scope="col">City</th>
               <th scope="col">Email</th>
               <th scope="col">Phone</th>
               <th scope="col">Details</th>
             </tr>
           </thead>


           <tr v-for="account in filteredAccounts" :key="account.id">
               <th scope="col">{{ account.id }}</th>
               <td scope="col">{{ account.shortName }}</td>
               <td scope="col">{{ account.fullName }}</td>
               <td scope="col" :model="accountTypeName(account.accountTypeId)">{{ account.accountTypeId }} - {{ accountTypeNameForId.fullName }} </td>
               <td scope="col">{{ account.city }}</td>
               <td scope="col">{{ account.email }}</td>
               <td scope="col">{{ account.phone }}</td>
               <td scope="col">
               <base-button link :to="this.$route.path + '/' + account.id" :id="account.id">View Details</base-button>
               </td>
           </tr>
         </table>
</template>

<script>

export default {
  data(){
    return{
       accountTypeNameForId: '',
    };
  },
  created(){
    this.loadAccountTypes();
  },
  methods:{
    async loadAccountTypes(){
      this.isLoading = true;
      try {
        await this.$store.dispatch('accountTypes/loadAccountTypes');
      } catch (error) {
          this.error = error.message || 'Something went wrong!'
        }
      this.isLoading = false;
    },
    accountTypeName(data){
      const id = data + '' ;
      this.accountTypeNameForId = this.$store.getters['accountTypes/accountTypes'].find(acc => acc.id === id);
    },
  },
  computed: {
        filteredAccounts(){
          return this.$store.getters['accounts/accounts'];
        },
    },
}
</script>