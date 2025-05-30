<template>
  <q-page class="q-pa-md q-gutter-md">
    <div class="row q-col-gutter-md">
      <!-- Left Column: Product Images -->
      <div class="col-12 col-md-6">
        <q-img :src="selectedImage" ratio="4/3" class="q-mb-md" />
        <div class="row q-gutter-sm justify-center">
          <q-img
            v-for="(img, index) in product.images"
            :key="index"
            :src="img"
            :alt="`Image ${index + 1}`"
            @click="selectedImage = img"
            class="cursor-pointer"
            style="width: 80px; height: 80px"
            :class="{ 'border-primary': selectedImage === img }"
          />
        </div>
      </div>

      <!-- Right Column: Product Details -->
      <div class="col-12 col-md-6">
        <div class="q-mb-md">
          <h2>{{ product.title }}</h2>
          <p>{{ product.description }}</p>
        </div>
        <div class="q-mb-md row items-center">
          <q-btn label="Add to Cart" color="primary" class="q-mr-md" @click="addToCart" />
          <q-btn-group flat>
            <q-btn
              flat
              round
              icon="remove"
              color="primary"
              @click="quantity = Math.max(quantity - 1, 1)"
            />
            <q-input v-model="quantity" type="number" min="1" outlined dense style="width: 60px" />
            <q-btn flat round icon="add" color="primary" @click="quantity++" />
          </q-btn-group>
        </div>

        <!-- Collapsible Sections -->
        <q-expansion-item label="Ingredients" expand-separator dense>
          <p>{{ product.ingredients }}</p>
        </q-expansion-item>
        <q-expansion-item label="Why We Love It" expand-separator dense>
          <p>{{ product.whyWeLoveIt }}</p>
        </q-expansion-item>
        <q-expansion-item label="How to Use It" expand-separator dense>
          <p>{{ product.howToUse }}</p>
        </q-expansion-item>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'ProductDetailPage',
  data() {
    return {
      // Replace with API data or props for dynamic rendering
      product: {
        title: 'Hydrating Face Cream',
        description: 'A deeply hydrating cream to leave your skin glowing and nourished.',
        images: [
          'https://via.placeholder.com/600x400?text=Main+Image',
          'https://via.placeholder.com/600x400?text=Image+1',
          'https://via.placeholder.com/600x400?text=Image+2',
          'https://via.placeholder.com/600x400?text=Image+3',
        ],
        ingredients: 'Water, Glycerin, Shea Butter, Aloe Vera.',
        whyWeLoveIt: 'This cream provides 24-hour hydration and gives a radiant finish.',
        howToUse: 'Apply a pea-sized amount to your face and neck every morning and night.',
      },
      selectedImage: 'https://via.placeholder.com/600x400?text=Main+Image',
      quantity: 1,
    }
  },
  methods: {
    addToCart() {
      console.log(`Added ${this.quantity} of "${this.product.title}" to cart.`)
    },
  },
}
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
.border-primary {
  border: 2px solid var(--q-primary);
}
.title-font {
  font-family: 'League Spartan', sans-serif;
  font-weight: 700; /* Adjust for boldness if needed */
  letter-spacing: -0.08em;
  font-size: 35px;
}
</style>
