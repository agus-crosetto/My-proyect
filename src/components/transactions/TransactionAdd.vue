<template>
    <form class="row g-3" @submit.prevent="submitForm">
  <div class="col-md-6">
    <label for="inputReference" class="form-label">Reference</label>
    <input type="text" class="form-control" id="inputReference" v-model.trim="reference" required>
  </div>
  <div class="col-md-6">
    <label for="inputTransactionType" class="form-label">Transaction Type Id</label>
    <input type="number" class="form-control" id="inputTransactionType" v-model.trim="typeId" required>
  </div>
    <div class="col-md-6">
    <label for="inputAccountId" class="form-label">Account Id</label>
    <input type="number" class="form-control" id="inputAccountId" v-model.number="accountId" required>
  </div>
  <div class="col-md-6">
    <label for="inputAmount" class="form-label">Amount</label>
    <input type="double" class="form-control" id="inputAmount" v-model.trim="amount" required>
  </div>
  <div class="col-12">
    <base-button type="submit">Add Transaction</base-button>
  </div>
</form>
</template>

<script>
export default {
  emits:['save-data'],
  data(){
    return{
      reference:'',
      typeId: null,
      accountId: null,
      amount: null,
      date: '',
    };
  },
  methods: {
    submitForm(){
      const formDataAdd = {
        reference: this.reference,
        typeId: this.typeId,
        accountId: this.accountId,
        amount: this.amount,
        date: new Date().toISOString(),
      };
      this.$emit('save-data', formDataAdd)
    }
  },
}
</script>