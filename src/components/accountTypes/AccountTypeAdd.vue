<template>
    <form class="row g-3" @submit.prevent="submitForm">
  <div class="col-md-6">
    <label for="inputShortName" class="form-label">Short Name</label>
    <input type="text" class="form-control" id="inputShortName" v-model.trim="shortName" required>
  </div>
  <div class="col-md-6">
    <label for="inputFullName" class="form-label">Full Name</label>
    <input type="text" class="form-control" id="inputFullName" v-model.trim="fullName" required>
  </div>
  <div class="col-12">
    <base-button type="submit">Add Account Type</base-button>
  </div>
</form>
</template>

<script>
export default {
  emits:['save-data'],
  data(){
    return{
      shortName:'',
      fullName: '',
    };
  },
  methods: {
    submitForm(){
      const formDataSearch = {
        shortName: this.shortName,
        fullName: this.fullName,
      };
      this.$emit('save-data', formDataSearch)
    }
  },
}
</script>