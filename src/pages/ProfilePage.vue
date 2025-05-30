<template>
  <q-page-container class="q-pa-md gradient-bg" style="padding-top: 100px; padding-bottom: 10px">
    <q-page class="q-pa-md gradient-bg">
      <div v-if="user">
        <q-card class="custom-table">
          <q-card-section>
            <div class="text-h6" style="color: black">PERSONAL INFORMATION</div>
            <q-separator />
            <div v-if="userInfo">
              <div><strong>Email:</strong> {{ userInfo.email }}</div>
              <div><strong>Phone:</strong> {{ userInfo.mobilenumber || 'Not provided' }}</div>
              <!-- Add more personal info fields as required -->
            </div>
            <div v-else>
              <p>Loading your information...</p>
            </div>
          </q-card-section>

          <div class="q-pa-md">
            <q-table
              title="Orders"
              :rows="orders"
              :columns="columns"
              row-key="id"
              class="custom-table"
            />
            <q-btn
              flat
              label="Logout"
              color="black"
              @click="handleLogout"
              style="
                border-radius: 3px;
                border: solid;
                border-width: 0.1px;
                margin-top: 20px;
                margin-bottom: 20px;
                margin-left: 20px;
              "
            />
          </div>
        </q-card>

        <!-- Order History Section -->
      </div>

      <div v-else>
        <!-- Redirect to Sign Up page if not authenticated -->

        <div class="text-center">
          <p class="please-text title-font-mindcare">Oops! No Profile Found</p>
          <q-btn flat class="add-to-cart-button2" @click="redirectToLogin" label="Login" />

          <q-btn
            flat
            class="add-to-cart-button2"
            style="margin-right: 40px"
            @click="redirectToSignUp"
            label="Sign Up"
          />
        </div>
      </div>
    </q-page>
  </q-page-container>
</template>
<script>
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { auth, firestore } from '../firebase'
import { signOut } from 'firebase/auth'

export default defineComponent({
  data() {
    return {
      user: null,
      userInfo: null,
      orders: [],
      avatarStyle: {
        backgroundColor: '#f44336', // Red heart background color
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
      columns: [
        {
          name: 'id',
          label: 'OrderNo.',
          align: 'left',
          field: 'id',
        },
        {
          name: 'status',
          label: 'Status',
          align: 'left',
          field: 'status',
        },
        {
          name: 'createdAt',
          label: 'Date',
          align: 'left',
          field: 'createdAt',
        },
        {
          name: 'Total',
          label: 'Total',
          align: 'left',
          field: 'Total',
        },
      ],
    }
  },
  computed: {
    ...mapGetters('auth', ['isAuthenticated', 'getUser']),
  },
  methods: {
    async fetchUserData() {
      try {
        const ordersCollection = collection(firestore, 'neworders')
        const q = query(ordersCollection, where('userid', '==', this.getUser.uid))
        const querySnapshot = await getDocs(q)
        console.log('data', querySnapshot)
        if (!querySnapshot.empty) {
          this.userInfo = querySnapshot.docs[0].data()
          this.orders = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(), // Spread the data of the document
          }))
          console.log('order', this.orders)
          const data = querySnapshot.docs[0].data()
          this.mobileNumber = data.mobilenumber || ''
          this.manualAddress = data.streetaddress || ''
          this.complexOrBuilding = data.complexorbuilding || ''
          this.suburb = data.suburb || ''
          this.manualCity = data.city || ''
          this.province = data.province || ''
          this.manualPostalCode = data.postalcode || ''
        } else {
          // If no order exists, fetch the user's email from `this.getUser`
          this.userInfo = {
            userid: this.getUser.uid,
            email: this.getUser.email || '', // Use email if available
          }
          this.mobileNumber = ''
          this.manualAddress = ''
          this.complexOrBuilding = ''
          this.suburb = ''
          this.manualCity = ''
          this.province = ''
          this.manualPostalCode = ''
        }
      } catch (error) {
        console.error('Error prepopulating address:', error)
      }
    },

    async handleLogout() {
      try {
        await signOut(auth)
        this.$store.commit('auth/CLEAR_USER') // Clear user from Vuex
        this.$store.dispatch('cart/clearCart') // Clear Vuex cart
        this.$router.push({ name: 'Login' }) // Redirect to login
      } catch (error) {
        console.error('Error during logout:', error)
      }
    },
    redirectToSignUp() {
      this.$router.push('/signup') // Redirect to your sign-up page
    },
    redirectToLogin() {
      this.$router.push('/login') // Redirect to your sign-up page
    },
  },
  async created() {
    // Fetch authenticated user and their data
    this.user = this.getUser
    console.log('this is the user', this.user)
    console.log('this is the getuser', this.getUser)
    if (this.isAuthenticated && this.getUser) {
      await this.fetchUserData()
    }
  },
  watch: {
    user(newUser) {
      if (newUser) {
        this.fetchUserData()
      }
    },
  },
})
</script>

<style scoped>
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
  margin-left: 10px;
  padding-right: 20px;
  padding-left: 20px;
  margin-right: 0px;
  margin-bottom: 20px;
}

.title-font-mindcare {
  font-family: 'League Spartan', sans-serif;
  font-weight: 700; /* Adjust for boldness if needed */
  letter-spacing: -0.08em;
  font-size: 30px;
  text-align: center;
  color: #000000;
  margin-top: 10px;
}

.q-page {
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 800px;
}

.q-page-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.custom-table {
  border-radius: 10px; /* Rounded edges */
  width: 100%; /* Make it take up full width */

  margin: 0 auto; /* Center the table */
}

.q-table__header,
.q-table__body {
  border-radius: 10px; /* Round edges for both header and body */
}

.q-table__header th,
.q-table__body td {
  padding: 16px; /* Increase padding for a wider table */
}
@media (max-width: 600px) {
  .custom-table {
    width: 90% !important; /* Reduce width on smaller screens */
    max-width: 440px; /* Limit max width */
    margin: 0 auto; /* Center the card */
  }
}
</style>
