<template>
  <div style="max-width: 300px">
    <!-- Product Image -->
    <q-img :src="image" @click="goToProduct(productid)" class="cardimage">
      <div
        v-if="skintype"
        style="
          font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode',
            Geneva, Verdana, sans-serif;
          margin-left: 10px;
          margin-top: 10px;
          padding: 8px 10px;
          background: rgba(0, 0, 0, 0.2);
          border-radius: 3px;
          font-size: 10px;
        "
      >
        {{ skintype }}
      </div>
    </q-img>

    <!-- Product Info -->
    <div style="padding-left: 2px; padding-right: 2px">
      <div class="row items-center">
        <div class="text-h6 title-font-second">{{ name }}</div>
        <q-space />
        <div
          style="
            color: black;
            font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande',
              'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
            font-size: 12px;
          "
        >
          Price: R{{ price }}
          <span v-if="discount > 0" style="text-decoration: line-through; color: gray"
            >R{{ discount }}</span
          >
        </div>
      </div>

      <!-- Description -->
      <div
        style="
          color: black;
          font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode',
            Geneva, Verdana, sans-serif;
          margin-top: 1px;
          font-size: 12px;
        "
      >
        {{ description }}
      </div>

      <!-- Rating Component -->
      <div class="row items-center q-mt-sm">
        <q-rating
          :model-value="rating"
          size="18px"
          icon="star"
          icon-selected="star"
          icon-half="star_half"
          :max="5"
          readonly
          style="color: #000000"
        />
        <span style="margin-left: 8px; font-size: 10px; color: black">({{ totalreviews }})</span>
      </div>
    </div>

    <!-- Add to Cart Button -->
    <div align="left">
      <q-btn
        flat
        :disable="units === 0 || quantity === 0"
        label="Add to Cart"
        @click="addToCart"
        class="add-to-cart-button"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    productid: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    units: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      default: 1, // Default quantity set to 1
    },
    skintype: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default: 0, // Default rating, can be passed from parent
    },
    totalreviews: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      localQuantity: this.quantity || 1, // Ensure it starts at 1 if not provided
    }
  },
  watch: {
    quantity(newVal) {
      this.localQuantity = newVal || 1 // Ensure reactivity and keep minimum 1
    },
  },
  methods: {
    async addToCart() {
      this.$emit('add-to-cart', {
        productid: this.productid,
        image: this.image,
        name: this.name,
        price: this.price,
        quantity: this.localQuantity, // ✅ Correct key
      })
    },
    async changeQuantity(change) {
      const newQuantity = this.localQuantity + change
      if (newQuantity >= 1 && newQuantity <= this.units) {
        this.localQuantity = newQuantity
        this.$emit('change-quantity', { productid: this.productid, quantity: newQuantity })
      }
    },
    goToProduct(productId) {
      console.log(`Navigating to product ID: ${productId}`)
      this.$router.push(productId)
    },
  },
}
</script>

<style scoped>
.product-image {
  max-height: 200px;
  width: 100%; /* Ensure it takes up the width of the container */
  object-fit: contain; /* Ensure image doesn't overflow the container */
}

.title-font {
  font-family: 'League Spartan', sans-serif;
  font-weight: 700; /* Adjust for boldness if needed */
  letter-spacing: -0.08em;
  font-size: 35px;
}
.title-font-second {
  font-family: 'League Spartan', sans-serif;
  font-weight: 700; /* Adjust for boldness if needed */
  letter-spacing: -0.08em;
  font-size: 18px;
}
.text-color {
  color: black;
}

.quantity-button {
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  border: solid 1px black; /* Same border style */
  border-radius: 3px;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva,
    Verdana, sans-serif;
  font-size: 12px; /* Unified font size */
  height: 30px; /* Button height */
  padding: 8px 10px; /* Padding for bigger buttons */
  box-shadow: none !important; /* Ensure no shadow */
  margin-right: 10px;
}

.add-to-cart-button {
  color: black;
  border: solid 1px black; /* Same border style */
  border-radius: 3px;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva,
    Verdana, sans-serif;
  font-size: 11px; /* Unified font size */

  padding: 3.6px 7px; /* Padding for bigger buttons */
  box-shadow: none !important; /* Remove default shadow */
  margin-top: 10px;
}

.add-to-cart-button {
  color: black;
  border: solid 1px black; /* Same border style */
  border-radius: 3px;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva,
    Verdana, sans-serif;
  font-size: 11px; /* Unified font size */
  padding: 3.6px 7px; /* Padding for bigger buttons */
  box-shadow: none !important; /* Remove default shadow */
  margin-top: 10px;
  transition: background-color 0.3s ease; /* Smooth transition */
}

.add-to-cart-button:hover {
  background-color: #d0dde7; /* Light grey hover effect */
}

.cardimage {
  width: 250px;
  height: 300px;
  object-fit: cover;
  border-radius: 15px;
}
@media (max-width: 640px) {
  .quantity-button,
  .add-to-cart-button {
    font-size: 10px; /* Adjust font size for smaller screens */
    height: 25px; /* Adjust button height for mobile */
    transition: background-color 0.3s ease; /* Smooth transition */
  }

  .add-to-cart-button:hover {
    background-color: #d0dde7; /* Light grey hover effect */
  }

  .cardimage {
    width: 100%;
    height: 300px;
    object-fit: cover;
    border-radius: 15px;
  }
}
</style>
