<template>
  <q-page-container class="q-pa-md gradient-bg" style="padding-top: 0px; padding-bottom: 10px">
    <q-page class="q-pa-md gradient-bg homepage">
      <div class="text-h1 title-font-mindcare-bundle" style="margin-top: 80px; margin-bottom: 20px">
        SHOP ALL
      </div>

      <div class="container_bundles flex flex-center">
        <div v-for="(block, index) in blocks" :key="index" class="block-class">
          <img
            @click="goToProduct(block.productid)"
            :src="block.image"
            alt="Image"
            @mouseover="changeImage(index)"
            @mouseleave="resetImage(index)"
          />
          <div class="text-h6 title-font-second text-content">
            <div class="title-font-second-bundle text-content-1">
              <span>{{ block.name }}</span>

              <!-- New text under the title -->
              <div
                style="
                  font-size: small;
                  line-height: 1.5rem; /* Adjust line height for spacing */
                  font-weight: normal; /* Adjust to a lighter weight */
                  letter-spacing: 0.08em;
                "
              >
                {{ block.description }}
              </div>

              <div
                style="
                  font-size: small;
                  line-height: 0.8rem !important;
                  font-weight: 10 !important;
                  letter-spacing: 0.08em;
                "
              >
                R {{ block.price }}

                <span v-if="block.discount > 0" style="text-decoration: line-through; color: gray"
                  >R{{ block.discount }}</span
                >
                <!-- <span v-if="block.discount > 0" style="margin-left: 5px; color: red"
                  >(24% off)</span
                > -->
              </div>
            </div>
          </div>
          <q-btn
            flat
            :disable="units === 0 || quantity === 0"
            label="Add to Cart"
            @click="handleAddToCart(block)"
            class="add-to-cart-button-shopall"
          />
        </div>
      </div>

      <div class="container_bundles">
        <div v-for="(block, index) in blocks2" :key="index" class="block-class">
          <img
            @click="goToProduct(block.productid)"
            :src="block.image"
            alt="Image"
            @mouseover="changeImage(index)"
            @mouseleave="resetImage(index)"
          />
          <div class="text-h6 title-font-second text-content">
            <div class="title-font-second-bundle text-content-1">
              <span>{{ block.name }}</span>
              <!-- New text under the title -->
              <div
                style="
                  font-size: small;
                  line-height: 1.5rem; /* Adjust line height for spacing */
                  font-weight: normal; /* Adjust to a lighter weight */
                  letter-spacing: 0.08em;
                "
              >
                {{ block.description }}
              </div>
              <div
                style="
                  font-size: small;
                  line-height: 0.8rem !important;
                  font-weight: 10 !important;
                  letter-spacing: 0.08em;
                "
              >
                R {{ block.price }}
                <span v-if="block.discount > 0" style="text-decoration: line-through; color: gray"
                  >R{{ block.discount }}</span
                >
                <!-- <span v-if="block.discount > 0" style="margin-left: 5px; color: red"
                  >(24% off)</span
                > -->
              </div>
            </div>
          </div>
          <q-btn
            flat
            :disable="units === 0 || quantity === 0"
            label="Add to Cart"
            @click="handleAddToCart(block)"
            class="add-to-cart-button-shopall"
          />
        </div>
      </div>

      <div class="container_bundles">
        <div v-for="(block, index) in blocks3" :key="index" class="block-class">
          <img
            @click="goToProduct(block.productid)"
            :src="block.image"
            alt="Image"
            @mouseover="changeImage(index)"
            @mouseleave="resetImage(index)"
          />
          <div class="text-h6 title-font-second text-content">
            <div class="title-font-second-bundle text-content-1">
              <span>{{ block.name }}</span>
              <!-- New text under the title -->
              <div
                style="
                  font-size: small;
                  line-height: 1.5rem; /* Adjust line height for spacing */
                  font-weight: normal; /* Adjust to a lighter weight */
                  letter-spacing: 0.08em;
                "
              >
                {{ block.description }}
              </div>
              <div
                style="
                  font-size: small;
                  line-height: 0.8rem !important;
                  font-weight: 10 !important;
                  letter-spacing: 0.08em;
                "
              >
                R {{ block.price }}
                <span v-if="block.discount > 0" style="text-decoration: line-through; color: gray"
                  >R{{ block.discount }}</span
                >
                <!-- <span v-if="block.discount > 0" style="margin-left: 5px; color: red"
                  >(24% off)</span
                > -->
              </div>
            </div>
          </div>
          <q-btn
            flat
            :disable="block.units === 0"
            label="Add to Cart"
            @click="handleAddToCart(block)"
            class="add-to-cart-button-shopall"
          />
        </div>
      </div>

      <div class="container_bundles">
        <div v-for="(block, index) in blocks4" :key="index" class="block-class">
          <img
            @click="goToProduct(block.productid)"
            :src="block.image"
            alt="Image"
            @mouseover="changeImage(index)"
            @mouseleave="resetImage(index)"
          />

          <div class="text-h6 title-font-second text-content">
            <div class="title-font-second-bundle text-content-1">
              <span>{{ block.name }}</span>
              <!-- New text under the title -->
              <div
                style="
                  font-size: small;
                  line-height: 1.5rem; /* Adjust line height for spacing */
                  font-weight: normal; /* Adjust to a lighter weight */
                  letter-spacing: 0.08em;
                "
              >
                {{ block.description }}
              </div>
              <div
                style="
                  font-size: small;
                  line-height: 0.1rem !important;
                  font-weight: 10 !important;
                  letter-spacing: 0.01em;
                "
              >
                R {{ block.price }}
                <span v-if="block.discount > 0" style="text-decoration: line-through; color: gray"
                  >R{{ block.discount }}</span
                >
                <!-- <span v-if="block.discount > 0" style="margin-left: 5px; color: red"
                  >(24% off)</span
                > -->
              </div>
            </div>
          </div>
          <q-btn
            flat
            :disable="block.units === 0"
            label="Add to Cart"
            @click="handleAddToCart(block)"
            class="add-to-cart-button-shopall"
          />
        </div>
      </div>

      <div class="container_bundles">
        <div v-for="(block, index) in blocks5" :key="index" class="block-class">
          <img
            @click="goToProduct(block.productid)"
            :src="block.image"
            alt="Image"
            @mouseover="changeImage(index)"
            @mouseleave="resetImage(index)"
          />

          <div class="text-h6 title-font-second text-content">
            <div class="title-font-second-bundle text-content-1">
              <span>{{ block.name }}</span>
              <!-- New text under the title -->
              <div
                style="
                  font-size: small;
                  line-height: 1.5rem; /* Adjust line height for spacing */
                  font-weight: normal; /* Adjust to a lighter weight */
                  letter-spacing: 0.08em;
                "
              >
                {{ block.description }}
              </div>
              <div
                style="
                  font-size: small;
                  line-height: 0.1rem !important;
                  font-weight: 10 !important;
                  letter-spacing: 0.01em;
                "
              >
                R {{ block.price }}
                <span v-if="block.discount > 0" style="text-decoration: line-through; color: gray"
                  >R{{ block.discount }}</span
                >
                <!-- <span v-if="block.discount > 0" style="margin-left: 5px; color: red"
                  >(24% off)</span
                > -->
              </div>
            </div>
          </div>
          <q-btn
            flat
            :disable="block.units === 0"
            label="Add to Cart"
            @click="handleAddToCart(block)"
            class="add-to-cart-button-shopall"
          />
        </div>
      </div>

      <!-- Home High quality Section -->
      <div class="container-M"></div>
    </q-page>
  </q-page-container>
</template>

<script>
import {
  getFirestore,
  doc,
  collection,
  getDoc,
  updateDoc,
  query,
  where,
  getDocs,
  addDoc,
} from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

import 'swiper/swiper-bundle.css'

export default {
  name: 'ProductList',

  data() {
    return {
      // Hardcoded product data
      products: [
        {
          productid: 'rekindle',
          name: 'ReKindle',
          image: 'assets/siteassets/rekindle.png',
          description: 'Breakout Prevention Purifying Cleanser + Makeup Remover',
          price: 159.0,
          units: 10,
          skintype: 'Oily Skin',
          rating: 4,
          totalreviews: '1 reviews',
        },
        {
          productid: 'reglow',
          name: 'ReGlow',
          image: '../assets/reglow-new.jpg',
          description: 'Plump + Ultra-hydrating with Tremella Mushroom',
          price: 259.0,
          discount: 0.0,
          units: 8,
          skintype: 'Normal - Dry Skin',
          rating: 4.5,
          totalreviews: '2 reviews',
        },
        {
          productid: 'repurify',
          name: 'RePurify',
          image: '../assets/repurify4.png',
          description: 'Pore Treament + Breakout Prevention moisturiser',
          price: 259.0,
          discount: 0.0,
          units: 8,
          skintype: 'Combination - Oily Skin',
          rating: 4.1,
          totalreviews: '1 reviews',
        },
        {
          productid: 'rosa',
          name: 'Rosa',
          image: '../assets/rosa-new.jpg',
          description: 'Plump + Ultra-hydrating dewy serum with Tremella Mushroom',
          price: 289.0,
          discount: 0.0,
          units: 10,
          skintype: 'All Skin',
          rating: 4.5,
          totalreviews: '7 reviews',
        },
        {
          productid: 'pretty',
          name: 'Pretty',
          image: '../assets/pretty-new.jpg',
          description: 'Hydrating + barrier-protecting + Glossy Shine Lip Oil',
          price: 105.0,
          units: 15,
          skintype: '',
          rating: 5,
          totalreviews: '4 reviews',
        },
      ],
      images: [
        {
          productid: 'myturn',
          name: 'My Turn',
          image: '../assets/myturn.jpg',
          description: 'Full Hydration Plump Combo',
          price: 812.0,
          units: 8,
          skintype: 'Combination',
          quantity: 1,
          save: 'SAVE 112',
          newprice: 700.0,
          rating: 0,
          totalreviews: '0 reviews',
        },
        {
          productid: 'therapyera',
          name: 'Therapy Era',
          image: '../assets/bundle2.jpg',
          description: 'Essential Hydrating Combo',
          price: 653.0,
          units: 8,
          skintype: 'Combination',
          quantity: 1,
          save: 'SAVE 100',
          newprice: 553.0,
          rating: 0,
          totalreviews: '0 reviews',
        },
        {
          productid: 'justagirl',
          name: 'Just A Girl',
          image: '../assets/2lip oils.png',
          description: '2 x Hydrating Plump lip oils',
          price: 210.0,
          units: 8,
          skintype: 'Combination',
          quantity: 1,
          save: 'SAVE 40',
          newprice: 170.0,
          rating: 0,
          totalreviews: '0 reviews',
        },
      ],
      blocks: [
        {
          productid: 'rekindle',
          name: 'ReKindle',
          image: 'assets/siteassets/rekindle.png',
          description: 'Facial Cleanser',
          price: 159.0,
          discount: 0.0,
          units: 10,
          skintype: 'Oily Skin',
        },
        {
          productid: 'reglow',
          name: 'ReGlow',
          image: 'assets/siteassets/reglowcream.png',
          description: 'Facial Moisturiser',
          price: 259.0,
          discount: 0.0,
          units: 8,
          skintype: 'Normal - Dry Skin',
        },
      ],
      blocks2: [
        {
          productid: 'repurify',
          name: 'RePurify',
          image: 'assets/siteassets/repurifycream.png',
          description: 'Pore Treament + Breakout Prevention moisturiser',
          price: 259.0,
          discount: 0.0,
          units: 8,
          skintype: 'Combination - Oily Skin',
          rating: 5,
          totalreviews: '1 reviews',
        },

        {
          productid: 'rosa',
          name: 'Rosa',
          image: 'assets/siteassets/rosa.png',
          description: 'Plump + Ultra-hydrating dewy serum with Tremella Mushroom',
          price: 289.0,
          discount: 0.0,
          units: 10,
          skintype: 'All Skin',
          rating: 4.5,
          totalreviews: '7 reviews',
        },
      ],
      blocks3: [
        {
          productid: 'pretty',
          name: 'Pretty',
          image: 'assets/siteassets/H.png',
          description: 'Lip Oil',
          price: 109.0,
          discount: 0.0,
          units: 15,
          skintype: '',
        },
        {
          productid: 'healingera',
          name: 'Healing Era',
          image: 'assets/siteassets/tee.png',
          description: 'Comfy Tee',

          price: 165.0,
          discount: 0.0,
          units: 10,
          skintype: '',
        },
      ],
      blocks4: [
        {
          productid: 'travelbag',
          name: 'Travel Bag',
          image: 'assets/siteassets/tb.png',
          description: 'Travel Bag',
          price: 145.0,
          discount: 0.0,
          units: 0,
          skintype: '',
        },
        {
          productid: 'holyglaze',
          name: 'The Holy Glaze',
          image: 'assets/siteassets/The Holy Glaze Facial Oil.png',
          description: 'Even + Brighten Skin with Rice and Vitamin C',
          price: 325.0,
          discount: 0.0,
          units: 15,
          skintype: '',
          rating: 5,
          totalreviews: '1 reviews',
        },
      ],
      blocks5: [
        {
          productid: 'resparkle',
          name: 'ReSparkle',
          image: '/assets/siteassets/16.png',
          description: 'Fine lines + Texture',
          price: 259.0,
          discount: 0.0,
          units: 8,
          skintype: 'All Skin Types',
        },
      ],

      activeIndex: 0,
    }
  },
  methods: {
    async handleAddToCart(product) {
      const auth = getAuth()
      const user = auth.currentUser

      console.log('product', product)
      console.log('product', product.productid)
      console.log('product', product.id)

      if (user) {
        const db = getFirestore()
        const cartsCollection = collection(db, 'orders')

        // Query for an existing cart entry for the current user and the specific product.
        const cartItemQuery = query(
          cartsCollection,
          where('userID', '==', user.uid),
          where('productid', '==', product.productid),
        )
        const querySnapshot = await getDocs(cartItemQuery)

        if (!querySnapshot.empty) {
          // The product is already in the cart; update the units field.
          querySnapshot.forEach(async (docSnapshot) => {
            const currentData = docSnapshot.data()
            await updateDoc(docSnapshot.ref, { units: currentData.units + 1 })
          })
        } else {
          // The product is not in the cart; create a new cart entry.
          const newCartEntry = {
            createdAt: new Date().toISOString(), // Create a current timestamp.
            image: product.image, // e.g., "./src../assets/CloudJelly_Hero.webp"
            itemname: product.name, // e.g., "Rosa"
            itemprice: product.price, // e.g., 100
            productid: product.productid, // e.g., 2
            units: 1, // Start with 1 unit.
            userID: user.uid, // e.g., "bgkRHBmyVOTSyiurde9PGmAsd2P2"
          }

          await addDoc(cartsCollection, newCartEntry)
          this.$store.dispatch('cart/addToCart', newCartEntry)
        }
      } else {
        // If the user is not logged in, add the item to the Vuex store.
        // Note: In your store, the mutation/action expects an object with an "id" property,
        // so we map "productid" to "id". Also, adjust the property names if needed.
        const cartItem = {
          id: product.productid, // maps to store's 'id'
          image: product.image, // same as product.image
          name: product.name, // store expects 'name' (itemname in Firestore)
          price: product.price, // store expects 'price' (itemprice in Firestore)
          units: 1,
          createdAt: new Date().toISOString(), // include a timestamp if needed
        }
        console.log('dispath cartitem', cartItem)
        this.$store.dispatch('cart/addToCart', cartItem)
      }
    },
    async addToCart(productid, image, price, quantity) {
      // Emit product and selected quantity to parent
      this.$emit('add-to-cart', {
        productid: productid,
        image: image,
        name: image,
        price: price,
        units: quantity,
      })
    },
    async updateQuantity(productId, action) {
      const auth = getAuth()
      const user = auth.currentUser

      if (user) {
        const db = getFirestore()
        const cartRef = doc(db, `carts/${user.uid}`)
        const cartSnap = await getDoc(cartRef)

        if (cartSnap.exists()) {
          let cartData = cartSnap.data()
          const itemIndex = cartData.items.findIndex((item) => item.id === productId)

          if (itemIndex !== -1) {
            if (action === 'increment') {
              cartData.items[itemIndex].units += 1
            } else if (action === 'decrement' && cartData.items[itemIndex].units > 1) {
              cartData.items[itemIndex].units -= 1
            } else if (action === 'decrement' && cartData.items[itemIndex].units === 1) {
              cartData.items.splice(itemIndex, 1)
            }
          }

          await updateDoc(cartRef, cartData)
        }
      } else {
        if (action === 'increment') {
          this.incrementItemUnits(productId)
        } else {
          this.decrementItemUnits(productId)
        }
      }
    },
    onSlideChange(swiper) {
      this.activeIndex = swiper.activeIndex % this.images.length
    },
    goToProduct(productId) {
      console.log(`Navigating to product ID: ${productId}`)
      // Example navigation logic (update as per your router setup)
      this.$router.push(productId)
    },
    async fetchRealTimeCart() {
      const auth = getAuth()
      const user = auth.currentUser
      if (user) {
        const db = getFirestore()
        const ordersCollection = collection(db, 'orders')
        const q = query(ordersCollection, where('userID', '==', user.uid))

        try {
          const querySnapshot = await getDocs(q)

          // Map Firestore cart items to the structure expected by your Vuex store
          const cartItems = querySnapshot.docs.map((doc) => ({
            id: doc.data().productid, // Firestore 'productid' mapped to Vuex 'id'
            image: doc.data().image,
            name: doc.data().itemname,
            price: doc.data().itemprice,
            units: doc.data().units || 1, // Default value for units
            createdAt: doc.data().createdAt,
          }))

          console.log('Fetched cart items from Firestore:', cartItems)

          // Dispatch to Vuex to add the cart items
          await this.$store.dispatch('cart/setCart', cartItems)

          // Optionally log the updated cart count
          console.log('Updated cart count:', this.$store.getters['cart/cartCount'])
        } catch (error) {
          console.error('Error fetching cart from Firestore:', error)
        }
      }
    },
    generateSessionID() {
      return 'session_' + Math.random().toString(36).substr(2, 9)
    },
  },
  mounted() {
    //Generate a session ID if user is not logged in (for anonymous tracking)
    // Generate a session ID if user is not logged in (for anonymous tracking)
    console.log('environment', process.env.NODE_ENV)
    if (process.env.NODE_ENV === 'production') {
      let sessionID = localStorage.getItem('sessionID')

      // If no session ID exists in local storage (for logged-out users), create a new one
      if (!sessionID) {
        sessionID = this.generateSessionID()
        localStorage.setItem('sessionID', sessionID)
      }

      // Track the page visit
      const db = getFirestore()
      const trackingRef = collection(db, 'tracking')
      const newTrackingEntry = {
        sessionID: sessionID, // Use the session ID for both logged-in and logged-out users
        timestamp: new Date().toISOString(), // Store the timestamp of the page visit
        pagename: 'Home Page',
      }

      // Add the tracking data to Firestore
      addDoc(trackingRef, newTrackingEntry)
        .then(() => {
          console.log('Page visit logged in tracking collection')
        })
        .catch((error) => {
          console.error('Error logging page visit:', error)
        })
    }

    const auth = getAuth()
    const user = auth.currentUser
    if (user) {
      console.log('who is logged in', user.uid)
      this.fetchRealTimeCart()
    } else {
      console.log('user is not authenticated')
    }
  },
}
</script>
<style scoped>
@import url('../css/home.css'); /* This will be applied when the component is active */
</style>
