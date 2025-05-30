<template>
  <q-page-container class="q-pa-md gradient-bg" style="padding-top: 0px; padding-bottom: 10px">
    <q-page class="q-pa-md gradient-bg">
      <div class="allpagetop"></div>
      <h1 class="title-font-mindful">SHOP COLLECTION</h1>
      <div class="container">
        <div v-for="(block, index) in blocks" :key="index" class="block-class">
          <img
            :src="block.image"
            alt="Image"
            @mouseover="changeImage(index)"
            @mouseleave="resetImage(index)"
          />
          <div class="text-h6 title-font-second text-content">
            <div class="title-font-second text-content-1">
              <span>{{ block.name }}</span>
              <div
                style="
                  font-size: small;
                  line-height: 0.1rem !important;
                  font-weight: 10 !important;
                  letter-spacing: 0.08em;
                "
              >
                {{ block.price }}
              </div>
            </div>

            <q-btn
              size="sm"
              flat
              round
              icon="add"
              class="add-to-cart-button"
              @click="changeQuantity(1)"
            />
          </div>
        </div>
      </div>
      <div style="margin-top: 10px"></div>
    </q-page>
  </q-page-container>
</template>

<script>
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'

export default defineComponent({
  data() {
    return {
      blocks: [
        {
          name: 'Pretty',
          subText: 'Small description or extra details here', // Added subText
          price: 'R100',
          image:
            'https://kyliecosmetics.com/cdn/shop/products/KS_Vitamin-C-Serum_Ecomm-Pink_01.jpg?crop=center&height=300&v=1676681161&width=300',
          hoverImg:
            'https://kyliecosmetics.com/cdn/shop/products/KS_Eye-Cream_Ecomm-Pink_02.jpg?crop=center&height=400&v=1676679054&width=400',
          originalImg:
            'https://kyliecosmetics.com/cdn/shop/products/KS_Vitamin-C-Serum_Ecomm-Pink_01.jpg?crop=center&height=300&v=1676681161&width=300',
        },
        {
          name: 'ReKindle',
          price: 'R100',
          subText: 'Small description or extra details here', // Added subText
          image:
            'https://kyliecosmetics.com/cdn/shop/products/KS_Vitamin-C-Serum_Ecomm-Pink_01.jpg?crop=center&height=300&v=1676681161&width=300',
          hoverImg:
            'https://kyliecosmetics.com/cdn/shop/products/KS_Eye-Cream_Ecomm-Pink_02.jpg?crop=center&height=400&v=1676679054&width=400',
          originalImg:
            'https://kyliecosmetics.com/cdn/shop/products/KS_Vitamin-C-Serum_Ecomm-Pink_01.jpg?crop=center&height=300&v=1676681161&width=300',
        },
        {
          name: 'ReGlow',
          price: 'R100',
          subText: 'Small description or extra details here', // Added subText
          image:
            'https://kyliecosmetics.com/cdn/shop/products/KS_Vitamin-C-Serum_Ecomm-Pink_01.jpg?crop=center&height=300&v=1676681161&width=300',
          hoverImg:
            'https://kyliecosmetics.com/cdn/shop/products/KS_Eye-Cream_Ecomm-Pink_02.jpg?crop=center&height=400&v=1676679054&width=400',
          originalImg:
            'https://kyliecosmetics.com/cdn/shop/products/KS_Vitamin-C-Serum_Ecomm-Pink_01.jpg?crop=center&height=300&v=1676681161&width=300',
        },
        {
          name: 'RePurify',
          price: 'R100',
          subText: 'Small description or extra details here', // Added subText
          image:
            'https://kyliecosmetics.com/cdn/shop/products/KS_Vitamin-C-Serum_Ecomm-Pink_01.jpg?crop=center&height=300&v=1676681161&width=300',
          hoverImg:
            'https://kyliecosmetics.com/cdn/shop/products/KS_Eye-Cream_Ecomm-Pink_02.jpg?crop=center&height=400&v=1676679054&width=400',
          originalImg:
            'https://kyliecosmetics.com/cdn/shop/products/KS_Vitamin-C-Serum_Ecomm-Pink_01.jpg?crop=center&height=300&v=1676681161&width=300',
        },
        {
          name: 'Pretty',
          price: 'R100',
          subText: 'Small description or extra details here', // Added subText
          image:
            'https://kyliecosmetics.com/cdn/shop/products/KS_Vitamin-C-Serum_Ecomm-Pink_01.jpg?crop=center&height=300&v=1676681161&width=300',
          hoverImg:
            'https://kyliecosmetics.com/cdn/shop/products/KS_Eye-Cream_Ecomm-Pink_02.jpg?crop=center&height=400&v=1676679054&width=400',
          originalImg:
            'https://kyliecosmetics.com/cdn/shop/products/KS_Vitamin-C-Serum_Ecomm-Pink_01.jpg?crop=center&height=300&v=1676681161&width=300',
        },
        {
          name: 'ReKindle',
          price: 'R100',
          subText: 'Small description or extra details here', // Added subText
          image:
            'https://kyliecosmetics.com/cdn/shop/products/KS_Vitamin-C-Serum_Ecomm-Pink_01.jpg?crop=center&height=300&v=1676681161&width=300',
          hoverImg:
            'https://kyliecosmetics.com/cdn/shop/products/KS_Eye-Cream_Ecomm-Pink_02.jpg?crop=center&height=400&v=1676679054&width=400',
          originalImg:
            'https://kyliecosmetics.com/cdn/shop/products/KS_Vitamin-C-Serum_Ecomm-Pink_01.jpg?crop=center&height=300&v=1676681161&width=300',
        },
        {
          name: 'ReGlow',
          price: 'R100',
          subText: 'Small description or extra details here', // Added subText
          image:
            'https://kyliecosmetics.com/cdn/shop/products/KS_Vitamin-C-Serum_Ecomm-Pink_01.jpg?crop=center&height=300&v=1676681161&width=300',
          hoverImg:
            'https://kyliecosmetics.com/cdn/shop/products/KS_Eye-Cream_Ecomm-Pink_02.jpg?crop=center&height=400&v=1676679054&width=400',
          originalImg:
            'https://kyliecosmetics.com/cdn/shop/products/KS_Vitamin-C-Serum_Ecomm-Pink_01.jpg?crop=center&height=300&v=1676681161&width=300',
        },
        {
          name: 'RePurify',
          price: 'R100',
          subText: 'Small description or extra details here', // Added subText
          image:
            'https://kyliecosmetics.com/cdn/shop/products/KS_Vitamin-C-Serum_Ecomm-Pink_01.jpg?crop=center&height=300&v=1676681161&width=300',
          hoverImg:
            'https://kyliecosmetics.com/cdn/shop/products/KS_Eye-Cream_Ecomm-Pink_02.jpg?crop=center&height=400&v=1676679054&width=400',
          originalImg:
            'https://kyliecosmetics.com/cdn/shop/products/KS_Vitamin-C-Serum_Ecomm-Pink_01.jpg?crop=center&height=300&v=1676681161&width=300',
        },
      ],
    }
  },
  computed: {
    ...mapGetters('auth', ['isAuthenticated', 'getUser']),
  },
  methods: {
    changeImage(index) {
      this.blocks[index].image = this.blocks[index].hoverImg // Change image on hover
    },
    resetImage(index) {
      this.blocks[index].image = this.blocks[index].originalImg // Reset to original image on mouse leave
    },
  },
  mounted() {},
})
</script>

<style>
/* Ensure the body takes full height */
body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  background-color: #f5f5f5;
}

/* Flex container to align blocks side by side */
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px; /* Space between blocks */
}

/* Style for each block */
.block-class {
  width: 200px; /* Adjust size as needed */
  height: 200px;
  display: flex;
  flex-direction: column; /* Stack image and text */
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease; /* Smooth transition for hover effect */
}

.block-class img {
  width: 100%;
  height: 70%;
  object-fit: cover; /* Ensures image fills the area */
  transition: all 0.3s ease; /* Smooth transition for hover effect */
}

.text-content {
  display: flex;
  justify-content: space-between; /* Ensures the text and button are spaced apart */
  align-items: center; /* Aligns the button and text vertically */
  width: 100%; /* Ensures the container takes up full width of the block */
  padding-right: 20px;
}
.text-content-1 {
  display: flex;
  flex-direction: column; /* Allows the elements to stack vertically */
  justify-content: flex-start; /* Ensures everything starts from the top */
  align-items: flex-start; /* Aligns the text to the left */
  width: 100%;
  padding-right: 20px;
}
.allpagetop {
  margin-top: 3px;
}

.title-font-second {
  font-family: 'League Spartan', sans-serif;
  font-weight: 700; /* Adjust for boldness if needed */
  letter-spacing: -0.08em;
  font-size: 20px;
  margin-left: 10px;
  margin-top: 3px;
}
.add-to-cart-button {
  color: black;
  border: solid 1px black; /* Same border style */
  border-radius: 3px;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva,
    Verdana, sans-serif;
  font-size: 12px; /* Unified font size */
  height: 30px; /* Button height */
  padding: 4px 6px; /* Padding for bigger buttons */
  box-shadow: none !important; /* Remove default shadow */
  margin-top: 10px;
}
.block-subtext {
  font-size: 12px; /* Smaller text */
  color: #888; /* Gray color for the subtext */
}

.text-content div {
  display: flex;
  flex-direction: column;
}

.title-font-mindful {
  font-family: 'League Spartan', sans-serif;
  font-weight: 700; /* Adjust for boldness if needed */
  letter-spacing: -0.08em;
  font-size: 55px;
  text-align: center;

  color: #f7adbe;
  margin-bottom: 0px;
}
/* Mobile responsiveness */
@media (max-width: 640px) {
  .container {
    flex-wrap: wrap; /* Allow blocks to move to the next row */
    justify-content: center; /* Ensure blocks are centered */
  }

  .block-class {
    width: 150px; /* Adjust size as needed */
    height: 200px;
    display: flex;
    flex-direction: column; /* Stack image and text */
    background-color: white;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .allpagetop {
    margin-top: 600px;
  }

  .title-font-mindful {
    font-family: 'League Spartan', sans-serif;
    font-weight: 700; /* Adjust for boldness if needed */
    letter-spacing: -0.08em;
    font-size: 40px;
    text-align: center;
    color: #f7adbe;
    margin-top: 70px;
    line-height: 1;
    margin-bottom: 20px;
  }
}
</style>
