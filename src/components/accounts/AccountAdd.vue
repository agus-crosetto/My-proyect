<template>
    <form class="row g-3" @submit.prevent="submitForm">
  <div class="col-md-4">
    <label for="inputShortName" class="form-label">Short Name</label>
    <input type="text" class="form-control" id="inputShortName" v-model.trim="shortName" required>
  </div>
  <div class="col-md-4">
    <label for="inputFullName" class="form-label">Full Name</label>
    <input type="text" class="form-control" id="inputFullName" v-model.trim="fullName" required>
  </div>
    <div class="col-md-4">
    <label for="inputAccountTypeId" class="form-label">Account Type Id</label>
    <input type="number" class="form-control" id="inputAccountTypeId" v-model.number="accountTypeId">
  </div>
  <div class="col-md-6">
    <label for="inputAddressLine1" class="form-label">Address Line 1</label>
    <input type="text" class="form-control" id="inputAddressLine1" v-model.trim="addressLine1" required>
  </div>
  <div class="col-md-6">
    <label for="inputAddressLine2" class="form-label">Address Line 2</label>
    <input type="text" class="form-control" id="inputAddressLine2" v-model.trim="addressLine2">
  </div>
  <div class="col-md-4">
    <label for="inputCity" class="form-label">City</label>
    <input type="text" class="form-control" id="inputCity" v-model.trim="city" required>
  </div>
  <div class="col-md-4">
    <label for="inputState" class="form-label">State</label>
    <input type="text" class="form-control" id="inputState" v-model.trim="state" required>
  </div>
  <div class="col-md-4">
    <label for="inputCountry" class="form-label">Country</label>
    <input type="text" class="form-control" id="inputCountry" v-model.trim="country" required>
  </div>
  <div class="col-md-6">
    <label for="inputContact" class="form-label">Contact</label>
    <input type="text" class="form-control" id="inputContact" v-model.trim="contact" required>
  </div>
  <div class="col-md-6">
    <label for="inputEmail" class="form-label">Email</label>
    <input type="email" class="form-control" id="inputEmail" v-model.trim="email" required>
  </div>
  <div class="col-md-12">
    <label for="inputPhone" class="form-label">Phone</label>
    <input type="text" class="form-control" id="inputPhone" v-model.trim="phone" required>
  </div>
  <div class="col-12">
    <base-button type="submit">Add Account</base-button>
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
      accountTypeId: 0,
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      country: '',
      contact: '',
      email: '',
      phone: '',
    };
  },
  methods: {
    submitForm(){
      const formDataSearch = {
        shortName: this.shortName,
        fullName: this.fullName,
        accountTypeId: this.accountTypeId,
        addressLine1: this.addressLine1,
        addressLine2: this.addressLine2,
        city: this.city,
        state: this.state,
        country: this.country,
        contact: this.contact,
        email: this.email,
        phone: this.phone
      };
      this.$emit('save-data', formDataSearch)
    }
  },
}
</script>
