<template>
  <q-page-container class="q-pa-md gradient-bg" style="margin-top: 50px; padding-bottom: 10px">
    <q-page class="flex flex-center q-pa-md gradient-bg">
      <div class="order-container q-mt-md">
        <!-- Cart Items Cluster Card -->
        <q-card class="q-mb-lg">
          <q-card-section>
            <h6 style="margin-bottom: 20px; margin-top: 20px">Cart items</h6>
            <q-row class="items-collage">
              <q-col v-for="(item, index) in cart" :key="index" :cols="4" class="image-item">
                <q-img :src="item.image" :alt="item.name" class="rounded-borders small-image" />
              </q-col>
            </q-row>
            <div style="margin-top: 20px"></div>
            <strong
              ><p>Total Amount: R{{ totalAmount }}</p></strong
            >
          </q-card-section>
        </q-card>

        <!-- Shipping Address Card -->
        <q-card class="q-mb-lg">
          <q-card-section>
            <h6 style="margin-bottom: 20px; margin-top: 20px">Shipping Address</h6>

            <q-form @submit.prevent="continueToPayment" ref="orderForm">
              <q-input
                v-model="recipientName"
                label="Recipient Name"
                outlined
                :rules="[(val) => !!val || 'Email is required']"
              />
              <q-input
                v-model="email"
                label="Email Address"
                outlined
                :rules="[(val) => !!val || 'Email is required']"
              />
              <q-input
                v-model="mobileNumber"
                label="Mobile Number"
                type="tel"
                outlined
                :rules="[validateMobile]"
                lazy-rules
              />
              <q-input
                v-model="manualAddress"
                label="Street Address"
                outlined
                :rules="[(val) => !!val || 'Street Address is required']"
              />
              <q-input v-model="complexOrBuilding" label="Complex/Building (optional)" outlined />
              <q-input
                v-model="suburb"
                label="Suburb"
                outlined
                :rules="[(val) => !!val || 'Suburb is required']"
              />
              <q-input
                v-model="manualCity"
                label="City"
                outlined
                :rules="[(val) => !!val || 'City is required']"
              />
              <q-select
                v-model="province"
                label="Province"
                outlined
                :options="provinces"
                :rules="[(val) => !!val || 'Province is required']"
              />
              <q-input
                v-model="manualPostalCode"
                label="Postal Code"
                outlined
                :rules="[(val) => !!val || 'Postal Code is required']"
              />
              <q-checkbox v-model="saveAddress" label="Save this address for future orders" />
            </q-form>
          </q-card-section>
        </q-card>

        <!-- Payment Methods Card -->

        <q-btn
          color="primary"
          :disable="!this.manualPostalCode || this.manualPostalCode.trim() === ''"
          label="Pay with Yoco"
          @click="startCheckout"
        />
        <p v-if="!this.manualPostalCode || this.manualPostalCode.trim() === ''" style="color: red">
          Complete address
        </p>
        <!-- Continue to Payment Button -->
      </div>
    </q-page>
  </q-page-container>
</template>

<script>
async function createCheckout(amount, totalDiscount, totalTaxAmount, subtotalAmount) {
  try {
    console.log(amount)
    const response = await fetch('https://yoco-worker.bastratasneem.workers.dev', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount,
        totalDiscount,
        totalTaxAmount,
        subtotalAmount,
        successUrl: 'https://mimcoskin.co.za/payment-success', // Replace with your su
      }),
    })

    const data = await response.json()
    console.log('response create checkout', data)
    if (!response.ok) {
      throw new Error(data.error || 'Failed to create checkout')
    }

    window.location.href = data.redirectUrl // Redirect user to Yoco payment page
  } catch (error) {
    console.error('Checkout Error:', error)
    alert(error.message)
  }
}
function generateSessionID() {
  return '_' + Math.random().toString(36).substr(2, 9)
}

import { mapGetters } from 'vuex'

import { collection, query, where, getDocs, deleteDoc, doc, addDoc } from 'firebase/firestore'

import { firestore } from '../../firebase'

export default {
  data() {
    return {
      cart: [],
      recipientName: '',
      email: '',
      mobileNumber: '',
      manualAddress: '',
      complexOrBuilding: '',
      suburb: '',
      manualCity: '',
      province: '',
      manualPostalCode: '',
      shippingMethod: '',
      paymentMethod: '',
      saveAddress: false,
      provinces: [
        'Eastern Cape',
        'Free State',
        'Gauteng',
        'KwaZulu-Natal',
        'Limpopo',
        'Mpumalanga',
        'Northern Cape',
        'North West',
        'Western Cape',
      ],
    }
  },
  computed: {
    ...mapGetters('auth', ['isAuthenticated', 'getUser']),
    ...mapGetters('cart', ['totalAmount']), // Get total from Vuex
    isShippingComplete() {
      // Check if all required fields are filled
      const {
        recipientName,
        mobileNumber,
        email,
        manualAddress,
        complexOrBuilding,
        suburb,
        manualCity,
        province,
        manualPostalCode,
        shippingMethod,
        paymentMethod,
      } = this.shipping
      return [
        recipientName,
        mobileNumber,
        email,
        manualAddress,
        complexOrBuilding,
        suburb,
        manualCity,
        province,
        manualPostalCode,
        shippingMethod,
        paymentMethod,
      ].every((field) => field.trim() !== '')
    },
  },
  methods: {
    validateMobile(val) {
      const regex = /^(\+27|0)[6-8][0-9]{8}$/
      return regex.test(val) || 'Please enter a valid South African mobile number'
    },
    async validateAndSubmit() {
      const formValid = this.$refs.orderForm.validate()
      if (formValid) {
        await this.continueToPayment()
      }
    },
    async fetchCart(userID) {
      console.log('inside', userID)
      try {
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
    async continueToPayment() {
      try {
        const ordersCollection = collection(firestore, 'neworders')

        const orderDetails = {
          userid: this.getUser.uid,
          recipientName: this.recipientName,
          mobilenumber: this.mobileNumber,
          email: this.email,
          streetaddress: this.manualAddress,
          complexorbuilding: this.complexOrBuilding,
          suburb: this.suburb,
          city: this.manualCity,
          province: this.province,
          postalcode: this.manualPostalCode,
          shippingMethod: this.shippingMethod,
          paymentmethod: this.paymentMethod,
          saveAddress: this.saveAddress,
          createdAt: new Date().toISOString(),
          status: 'Order Placed',
          Total: this.totalAmount,
        }

        await addDoc(ordersCollection, orderDetails)

        alert('Order has been successfully placed and saved!')
      } catch (error) {
        console.error('Error saving order:', error)
        alert('Failed to save order. Please try again.')
      }
    },

    async prepopulateAddress() {
      try {
        const ordersCollection = collection(firestore, 'neworders')
        const q = query(ordersCollection, where('userid', '==', this.getUser.uid))
        const querySnapshot = await getDocs(q)
        console.log('data', querySnapshot)
        if (!querySnapshot.empty) {
          const data = querySnapshot.docs[0].data()
          this.recipientName = data.recipientName || ''
          this.mobileNumber = data.mobilenumber || ''
          this.email = data.email || ''
          this.manualAddress = data.streetaddress || ''
          this.complexOrBuilding = data.complexorbuilding || ''
          this.suburb = data.suburb || ''
          this.manualCity = data.city || ''
          this.province = data.province || ''
          this.manualPostalCode = data.postalcode || ''
        }
      } catch (error) {
        console.error('Error prepopulating address:', error)
      }
    },
    async removeItem() {
      if (this.isAuthenticated && this.getUser) {
        try {
          // Reference the user's orders collection
          const ordersCollection = collection(firestore, 'orders')
          const q = query(ordersCollection, where('userID', '==', this.getUser.uid))

          const querySnapshot = await getDocs(q)

          if (!querySnapshot.empty) {
            // Loop through and delete each order document for the user
            const deletePromises = querySnapshot.docs.map((docSnapshot) =>
              deleteDoc(doc(firestore, 'orders', docSnapshot.id)),
            )
            await Promise.all(deletePromises)
            console.log('All items removed from the cart')
          }

          // Remove item from Vuex store
          // store.dispatch('cart/removeFromCart', cartItem.id) // Adjust based on your action setup

          this.$store.dispatch('cart/clearCart') // Adjust based on your Vuex action
        } catch (error) {
          console.error('Error removing item from Firestore:', error)
        }
        this.fetchCart(this.getUser.uid)
      }

      this.$store.dispatch('cart/clearCart') // Adjust based on your Vuex action
    },

    async startCheckout() {
      const formattedAmount = (this.totalAmount * 100).toFixed(0)
      console.log('final amount', formattedAmount)
      console.log('final amounts', parseInt(formattedAmount))
      const generateCheckoutId = () => {
        // Generate a unique checkout ID using the current timestamp and a random string
        const timestamp = Date.now()
        const randomString = Math.random().toString(36).substring(2, 10) // Generate a random alphanumeric string
        return `checkout-${timestamp}-${randomString}`
      }

      // Generate checkout ID and store it in localStorage
      const checkoutId = generateCheckoutId()

      // Store user details before redirecting to Yoco
      localStorage.setItem('customerEmail', this.email)
      localStorage.setItem('customerName', this.recipientName)
      localStorage.setItem('totalPrice', this.totalAmount)
      localStorage.setItem('checkoutId', checkoutId) // Store in local storage
      console.log('GeneratedID', checkoutId)

      const items = this.cart.map((item) => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      }))
      localStorage.setItem('orderItems', JSON.stringify(items))

      await createCheckout(parseInt(formattedAmount), 0, 0, 0) // Example values
      const ordersCollection = collection(firestore, 'neworders')

      const orderDetails = {
        userid: this.getUser ? this.getUser.uid : null,
        recipientName: this.recipientName,
        mobilenumber: this.mobileNumber,
        email: this.email,
        streetaddress: this.manualAddress,
        complexorbuilding: this.complexOrBuilding,
        suburb: this.suburb,
        city: this.manualCity,
        province: this.province,
        postalcode: this.manualPostalCode,
        shippingMethod: this.shippingMethod,
        paymentmethod: this.paymentMethod,
        saveAddress: this.saveAddress,
        createdAt: new Date().toISOString(),
        status: 'Order Placed',
        paymentstatus: 'Started',
        Total: this.totalAmount,
        checkoutID: checkoutId, // Use the generated checkout ID
        items: this.cart.map((item) => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
      }

      await addDoc(ordersCollection, orderDetails)
      await this.removeItem()
    },
  },

  mounted() {
    let sessionID = localStorage.getItem('sessionID')

    // If no session ID exists in local storage (for logged-out users), create a new one
    if (!sessionID) {
      sessionID = generateSessionID()
      localStorage.setItem('sessionID', sessionID)
    }
    // Track the page visit

    const trackingRef = collection(firestore, 'tracking')
    const newTrackingEntry = {
      sessionID: sessionID, // Use the session ID for both logged-in and logged-out users
      timestamp: new Date().toISOString(), // Store the timestamp of the page visit
      pagename: 'Order Confirmation Page',
    }

    // Add the tracking data to Firestore
    addDoc(trackingRef, newTrackingEntry)
      .then(() => {
        console.log('Page visit logged in tracking collection')
      })
      .catch((error) => {
        console.error('Error logging page visit:', error)
      })

    if (this.isAuthenticated && this.getUser) {
      this.fetchCart(this.getUser.uid)
      this.prepopulateAddress()
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
.order-container {
  width: 100%;
  max-width: 800px;
  padding: 20px;
  padding-top: 0px;
  border-radius: 18px;
}

.order-title {
  text-align: center;
  margin-bottom: 24px;
  color: #333;
  margin-top: 0px;
}

.q-mb-lg {
  margin-bottom: 24px;
  border-radius: 18px;
}

.full-width {
  width: 100%;
}

.items-collage {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.image-item {
  max-width: 80px;
  flex: 1 0 80px;
}

.small-image {
  width: 100%;
  height: auto;
  border-radius: 10px;
}

.q-input {
  margin-bottom: 16px;
}

.q-radio {
  margin-bottom: 12px;
}

.add-to-cart-button2 {
  color: black;
  border: solid 1px black; /* Same border style */
  border-radius: 3px;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva,
    Verdana, sans-serif;
  font-size: 12px; /* Unified font size */
  height: 40px; /* Button height */
  padding: 7.6px 10px; /* Padding for bigger buttons */
  box-shadow: none !important; /* Remove default shadow */
  background-color: white;
  margin-top: 10px;

  padding-right: 20px;
  padding-left: 20px;
  margin-right: 0px;
  margin-bottom: 20px;
}
</style>
