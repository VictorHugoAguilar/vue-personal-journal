<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">

    <h1>Journal</h1>

    <button @click="goToDaybook" class="btn btn-primary">Primary</button>
    <button @click="goToDaybook" class="btn btn-secondary">Secondary</button>
    <button @click="goToDaybook" class="btn btn-success">Success</button>
    <button @click="goToDaybook" class="btn btn-danger">Danger</button>


  </div>
</template>

<script>

export default {
  name: 'HomeView',
  components: {
  },
  methods: {
    goToDaybook() {
      this.$router.push({ name: 'no-entry' })
    }
  }
}
</script>
