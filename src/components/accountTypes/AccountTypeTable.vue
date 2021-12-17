<template>
        <table class="table table-striped table-hover table-bordered">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Short Name</th>
              <th scope="col">Full Name</th>
              <th scope="col">Details</th>
            </tr>
          </thead>
          <tr v-for="account in filteredAccounts" :key="account.id">
            <th scope="col">{{ account.id }}</th>
            <td scope="col">{{ account.shortName }}</td>
            <td scope="col">{{ account.fullName }}</td>
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
    };
  },
  computed: {
        filteredAccounts(){
          return this.$store.getters['accountTypes/accountTypes'];
        },
    },
}
</script>