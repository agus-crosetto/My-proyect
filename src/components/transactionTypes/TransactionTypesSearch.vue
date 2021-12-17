<template>
  <form class="row g-2" @submit.prevent="submitForm">
    <div class="col-4 align-self-center">
      <input type="number" class="form-control" id="inputAccount" v-model.trim="id" placeholder="ID" required>
    </div>
    <div class="col-8 align-self-center">
      <base-button type="submit">Search Transaction Type for ID</base-button>
    </div>
  </form>
</template>

<script>
export default {
  emits:['search-data'],
  data(){
    return{
      id: null,
    };
  },
  methods: {
    submitForm(){
      const formData = {
        id: this.id,
      };
      this.$emit('search-data', formData);
    }
  },
}
</script>