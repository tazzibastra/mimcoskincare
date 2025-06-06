<template>
  <q-page-container class="q-pa-md gradient-bg" style="margin-top: 50px; padding-bottom: 10px">
    <q-page class="flex flex-center q-pa-md gradient-bg">
      <div class="container-checkout"></div>
      <div class="cart-container">
        <!-- <q-banner class="bg-black text-white q-mb-md" rounded dense>
          CONGRATULATIONS YOUR ORDER WILL BE DOUBLED! <br />*this does not include any in our bare
          collection*
        </q-banner> -->
        <div v-if="cart.length > 0">
          <q-list bordered>
            <q-item v-for="(item, index) in cart" :key="index" class="cart-item">
              <q-item-section avatar>
                <q-img :src="item.image" class="cart-item-image" />
              </q-item-section>

              <q-item-section>
                <q-item-label>{{ item.name }}</q-item-label>
                <q-item-label caption>Price: R{{ item.price }}</q-item-label>
                <q-item-label caption>
                  Quantity:
                  <q-btn
                    size="sm"
                    color="primary"
                    flat
                    round
                    icon="remove"
                    @click="updateQuantity(index, -1)"
                  />
                  {{ item.quantity }}
                  <q-btn
                    size="sm"
                    color="primary"
                    flat
                    round
                    icon="add"
                    @click="updateQuantity(index, 1)"
                  />
                </q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-btn
                  size="sm"
                  color="negative"
                  flat
                  round
                  icon="delete"
                  @click="removeItem(index)"
                />
              </q-item-section>
            </q-item>
          </q-list>
          <div class="shipping-options">
            <q-radio
              v-model="shippingMethod"
              checked-icon="task_alt"
              unchecked-icon="panorama_fish_eye"
              val="65.00"
              :label="cartTotal > 550 ? 'FREE Standard Shipping' : 'R65 Standard Shipping'"
              @change="updateShipping"
            />
            <div style="margin-left: 39px">(2 - 3 days)</div>
            <q-radio
              v-model="shippingMethod"
              checked-icon="task_alt"
              unchecked-icon="panorama_fish_eye"
              val="100.00"
              label="R100 Express Shipping"
              @change="updateShipping"
            />
            <div style="margin-left: 39px">(1 - 2 days)</div>
          </div>
          <!-- Shipping and Product Breakdown -->
          <div class="cart-summary">
            <h6 style="margin-bottom: 10px; margin-top: 10px; color: #d0dde7">Breakdown:</h6>
            <!-- Product Amount with Strikethrough if Discount is Applied -->
            <div class="summary-item">
              <span class="item-name">Shipping:</span>
              <span class="item-price"
                >R{{ cartTotal > 550 && shippingMethod === '65.00' ? 0 : shippingAmount }}</span
              >
            </div>
            <div class="summary-item">
              <span class="item-name">Product Amount:</span>
              <span class="item-price">
                <span v-if="isVoucherValid" style="text-decoration: line-through; color: red">
                  R{{ cartTotal }}
                </span>
                <span v-if="isVoucherValid" style="margin-left: 5px"> R{{ discountedTotal }} </span>
                <span v-else>R{{ cartTotal }}</span>
              </span>
            </div>
          </div>

          <div class="cart-summary">
            <div class="summary-item">
              <h6 style="margin-bottom: 10px; margin-top: 20px; color: #d0dde7">
                Total To Pay: <strong></strong>
              </h6>
              <h6 style="margin-bottom: 10px; margin-top: 20px">
                R{{
                  finalTotal + (cartTotal > 550 && shippingMethod === '65.00' ? 0 : shippingAmount)
                }}
              </h6>
            </div>
            <q-input v-model="voucherCode" label="Enter Voucher Code" @blur="validateVoucher">
              <template v-slot:append>
                <q-icon v-if="isVoucherValid" name="check_circle" color="green" />
                <q-icon v-else-if="voucherChecked && !isVoucherValid" name="error" color="red" />
                <q-btn flat dense label="Validate" @click="validateVoucher" color="primary" />
              </template>
            </q-input>
            <q-banner
              v-if="voucherChecked && !isVoucherValid"
              class="text-negative bg-red-1 q-mt-sm"
            >
              Not valid on this sale
            </q-banner>
          </div>

          <q-btn class="proceed" flat size="sm" label="PROCEED" @click="proceedToOrder" />
        </div>
        <p v-else>Your cart is empty.</p>
      </div>
    </q-page>
  </q-page-container>
</template>

<script>
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  getFirestore,
  addDoc,
} from 'firebase/firestore'
import { firestore } from '../../firebase'
import { useRouter } from 'vue-router'
const router = useRouter()
export default {
  name: 'CartPage',
  data() {
    return {
      cart: [],
      menuVisible: false,
      shippingMethod: '65.00', // Selected shipping method
      finalAmount: 0.0,
      productAmount: 0, // Total product amount
      shippingAmount: 65.0, // Shipping cost based on selected method
      voucherNumber: '',
      voucherCode: '',
      isVoucherValid: false,
      voucherChecked: false, // To track if check has been performed
      discountPercentage: 0, // The % discount from Firestore
      discountAmount: 0, // Calculated discount value
    }
  },
  computed: {
    ...mapGetters('auth', ['isAuthenticated', 'getUser']),

    userEmail() {
      return this.getUser ? this.getUser.email : ''
    },
    cartTotal() {
      let cartNumber = parseInt(
        this.cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2),
        10,
      )
      return cartNumber
    },
    discountedTotal() {
      let cartNumber = this.cartTotal - this.discountAmount
      return cartNumber
    },
    finalTotal() {
      // Calculate the total price (cart total)
      let cartNumber = parseFloat(
        this.cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2),
      )

      // Apply discount and round to 2 decimal places
      let finalAmount = cartNumber - this.discountAmount
      return parseFloat(finalAmount.toFixed(2)) // Ensures the final amount is rounded to 2 decimal places
    },
  },
  methods: {
    ...mapActions('cart', ['updateTotalAmount']), // Map Vuex action
    async fetchCart(userID) {
      try {
        console.log(userID)
        const ordersCollection = collection(firestore, 'orders')
        const q = query(ordersCollection, where('userID', '==', userID))
        const querySnapshot = await getDocs(q)

        this.cart = querySnapshot.docs.map((doc) => ({
          id: doc.data().productid,
          name: doc.data().itemname,
          image: doc.data().image,
          price: doc.data().itemprice,
          quantity: doc.data().units,
        }))
      } catch (error) {
        console.error('Error fetching cart data:', error)
      }
    },
    updateShipping() {
      this.updateCartTotal() // Recalculate shipping amount after selection
    },
    updateCartTotal() {
      let cartNumber = parseInt(this.cartTotal, 10)

      // Check if the cart total qualifies for free standard shipping
      if (cartNumber > 550 && this.shippingMethod === '65.00') {
        this.shippingAmount = 0 // Free standard shipping
      } else if (this.shippingMethod === '100.00') {
        this.shippingAmount = 100.0 // Express shipping cost
      } else if (this.shippingMethod === '65.00') {
        this.shippingAmount = 65.0 // Standard shipping cost
      } else {
        this.shippingAmount = 0 // Default case
      }

      // Update final amount
      this.finalAmount = cartNumber - this.discountAmount
    },
    updateQuantity(index, change) {
      const item = this.cart[index]
      const newQuantity = item.quantity + change

      if (newQuantity < 1) {
        this.removeItem(index)
      } else {
        this.addItem(index, change)
        this.cart[index].quantity = newQuantity
      }
    },
    async addItem(index, change) {
      const cartItems = this.cart[index]
      console.log('items', cartItems.id)
      if (this.isAuthenticated && this.getUser) {
        try {
          const ordersCollection = collection(firestore, 'orders')

          // Update units in Firestore
          const orderQuery = query(
            ordersCollection,
            where('userID', '==', this.getUser.uid),
            where('productid', '==', cartItems.id),
          )
          const querySnapshot = await getDocs(orderQuery)

          if (!querySnapshot.empty) {
            const orderDoc = querySnapshot.docs[0]
            await updateDoc(orderDoc.ref, {
              units: orderDoc.data().units + change,
            })
            console.log(`Incremented units for ${cartItems.name} in Firestore`)
          }
          if (change == 1) {
            this.$store.dispatch('cart/incrementItemUnits', cartItems.id)
          } else {
            this.$store.dispatch('cart/decrementItemUnits', cartItems.id)
          }
        } catch (error) {
          console.error('Error updating Firestore:', error)
        }
      } else {
        if (change == 1) {
          this.$store.dispatch('cart/incrementItemUnits', cartItems.id)
        } else {
          this.$store.dispatch('cart/decrementItemUnits', cartItems.id)
        }

        console.log(`changed ${cartItems.name} to Vuex store`)
      }
    },
    async removeItem(index) {
      const item = this.cart[index]
      if (this.isAuthenticated && this.getUser) {
        try {
          // Find the specific order document for the user
          const ordersCollection = collection(firestore, 'orders')
          const q = query(
            ordersCollection,
            where('userID', '==', this.getUser.uid),
            where('productid', '==', item.id),
          )

          const querySnapshot = await getDocs(q)

          if (!querySnapshot.empty) {
            // Assume the first matching document is the correct one to delete
            const docRef = doc(firestore, 'orders', querySnapshot.docs[0].id)
            await deleteDoc(docRef)
            console.log('Item removed from database:', item.id)
          }

          // Remove item from Vuex store
          // store.dispatch('cart/removeFromCart', cartItem.id) // Adjust based on your action setup

          this.$store.dispatch('cart/removeFromCart', item.id)
        } catch (error) {
          console.error('Error removing item from Firestore:', error)
        }
        this.fetchCart(this.getUser.uid)
      }
      console.log('index', item.id)
      this.$store.dispatch('cart/removeFromCart', item.id)
      this.cart.splice(index, 1)
    },
    navigateTo(page) {
      router.push({ name: page })
    },
    ...mapActions('cart', ['updateTotalAmount']), // Map Vuex action
    async proceedToOrder() {
      let cartNumber = parseInt(this.cartTotal, 10) - this.discountAmount
      // Ensure correct shipping amount before calculating final total
      if (cartNumber > 550 && this.shippingMethod === '65.00') {
        this.shippingAmount = 0 // Free shipping applied
      } else {
        this.shippingAmount = parseFloat(this.shippingMethod) // Standard shipping applies
      }
      this.finalAmount = cartNumber + this.shippingAmount
      this.updateTotalAmount(parseFloat(this.finalAmount.toFixed(2))) // Store total securely in Vuex
      this.$router.push({ name: 'OrderConfirmation' }) // Navigate to next page
    },
    async validateVoucher() {
      console.log('voucherCode', this.voucherCode)
      if (!this.voucherCode) return // Exit if empty input

      try {
        const db = getFirestore()

        // Query the 'subscriptions' collection to see if the voucherCode exists
        const q = query(collection(db, 'vouchers'), where('voucherCode', '==', this.voucherCode))
        const querySnapshot = await getDocs(q)
        console.log('querySnapshot', querySnapshot)
        if (!querySnapshot.empty) {
          // Voucher found in subscriptions, mark as valid
          this.isVoucherValid = true
          console.log('voucherCode BOOL', this.isVoucherValid)
          const voucherDoc = querySnapshot.docs[0].data()
          // Optional: apply a fixed discount or a default one since it's not from 'vouchers'
          this.discountPercentage = voucherDoc.totaloff ?? 0
          this.discountAmount = (this.cartTotal * this.discountPercentage) / 100
          let cartNumber = parseInt(this.cartTotal, 10)
          this.finalAmount = cartNumber - this.discountAmount
        } else {
          // Not found in subscriptions
          this.isVoucherValid = false
          this.resetDiscount()
        }
      } catch (error) {
        console.error('Error checking voucher:', error)
        this.isVoucherValid = false
        this.resetDiscount()
      }

      this.voucherChecked = true
    },
    resetDiscount() {
      this.discountPercentage = 0
      this.discountAmount = 0
      this.finalTotal = this.cartTotal
    },
  },

  watch: {
    isAuthenticated(newValue) {
      if (newValue && this.getUser) {
        console.log('cart l', this.cart.length)
        this.fetchCart(this.getUser.uid)
      } else {
        console.log('cart checkout page', this.$store.getters['cart/cart'])

        this.cart = this.$store.getters['cart/cart'].map((item) => ({
          ...item, // Keeps all existing properties
          quantity: item.units, // Maps 'units' to 'quantity'
        }))
      }
    },
    shippingMethod() {
      this.updateCartTotal()
    },
  },
  mounted() {
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
        pagename: 'Checkout Page',
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

    if (this.isAuthenticated && this.getUser) {
      this.fetchCart(this.getUser.uid)
    } else {
      this.cart = this.$store.getters['cart/cart'].map((item) => ({
        ...item, // Keeps all existing properties
        quantity: item.units, // Maps 'units' to 'quantity'
      }))
      console.log('cart checkout page', this.$store.getters['cart/cart'])
      console.log('cart', this.cart.length)
    }
  },
}
</script>

<style scoped>
.cart-container {
  max-width: 600px;
  width: 100%;
  padding: 30px;
  background-color: white;
  border-radius: 10px;
  border: 2px solid black; /* Added border */
  margin-bottom: 30px;
}

.cart-item {
  margin-bottom: 10px;
}

.cart-item-image {
  width: 60px;
  height: 60px;
  border-radius: 10px;
}
.shipping-options {
  margin-top: 20px;
}
.cart-summary {
  margin-top: 20px;
  border-top: 1px solid #ccc;
  padding-top: 10px;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.q-checkbox {
  margin-top: 10px;
}

::v-deep(.q-menu q-position-engine scroll) {
  max-height: 100vh !important;
  min-height: 4000px !important;
}

.proceed {
  color: black;
  border: solid 1px black;
  border-radius: 3px;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva,
    Verdana, sans-serif;
  font-size: 12px;
  height: 30px;
  padding: 4px 6px;
  box-shadow: none !important;
  margin-top: 10px;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
}

.item-name {
  flex: 1;
  text-align: left;
}

.item-price {
  text-align: right;
  min-width: 80px;
}

.valid-voucher {
  border: solid 2px green !important;
  border-radius: 3px;
}

.valid-voucher .q-field__control:before {
  border: none !important;
}

.valid-voucher .q-field__control:focus-within {
  box-shadow: none !important;
}
</style>
