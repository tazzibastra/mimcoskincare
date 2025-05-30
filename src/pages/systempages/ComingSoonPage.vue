<template>
  <q-page-container class="flex flex-center">
    <q-page class="flex flex-center">
      <div class="text-center">
        <!-- Coming Soon Image -->
        <q-img
          :src="product"
          alt="Coming Soon"
          spinner-color="primary"
          class="coming-soon-img q-mb-md"
        />
      </div>
    </q-page>
  </q-page-container>
</template>

<script>
export default {
  data() {
    return {}
  },
}
</script>
<style scoped>
.coming-soon-img {
  padding: 300px;
}

@media (max-width: 650px) {
  .coming-soon-img {
    padding: 200px;
  }
}
</style>
