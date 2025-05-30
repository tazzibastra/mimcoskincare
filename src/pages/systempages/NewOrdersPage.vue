<template>
  <q-page class="q-pa-md" style="margin-top: 100px">
    <q-dialog v-model="confirmDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">Confirm Shipment</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div><strong>Quote Amount:</strong> R{{ quoteAmount }}</div>
          <div><strong>Service Type:</strong> {{ serviceType }}</div>
          <div><strong>Pickup Time:</strong> {{ pickupTime }}</div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="negative" v-close-popup />
          <q-btn flat label="Confirm" color="primary" @click="confirmShipment" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <div v-if="!authenticated" class="q-gutter-md">
      <q-input v-model="password" type="password" label="Enter Password" outlined />
      <q-btn label="Login" color="primary" @click="authenticate" />
      <div v-if="error" class="text-negative">{{ error }}</div>
    </div>

    <div v-else>
      <q-btn label="Export to Excel" color="primary" @click="exportDataToExcel" class="q-mb-md" />
      <q-btn
        label="Export Tracking"
        color="primary"
        @click="exportTrackingToExcel"
        class="q-mb-md"
      />
      <q-input outlined v-model="filter" label="Search Orders" class="q-mb-md" debounce="300" />
      <q-table
        title="New Orders"
        :rows="orders"
        :columns="columns"
        row-key="id"
        :filter="filter"
        :rows-per-page-options="[10, 20, 50]"
        :pagination="{ sortBy: 'createdAt', descending: true }"
      >
        <!-- Custom cell for 'items' column -->
        <template v-slot:body-cell-items="props">
          <q-td :props="props">
            <div v-if="props.row.items && props.row.items.length > 0">
              <!-- Check if each item is an object and display the 'name' property -->
              <div v-for="(item, index) in props.row.items" :key="index">
                <!-- Assuming 'item' is an object with a 'name' property -->
                {{ item.name || item }}
                <!-- This will fall back to displaying the item if no 'name' field -->
              </div>
            </div>
            <div v-else>No items</div>
          </q-td>
        </template>

        <!-- Action column -->
        <template v-slot:body-cell-Total="props">
          <q-td align="center">
            <q-btn color="primary" label="Create Waybill" @click="createWaybill(props.row)" />
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'

import { useQuasar } from 'quasar'
import axios from 'axios'
import emailjs from 'emailjs-com'
import * as XLSX from 'xlsx'
import { firestore } from '../../firebase'
import { getFirestore, collection, getDocs } from 'firebase/firestore'
// --- STATE ---
const $q = useQuasar()
const confirmDialog = ref(false)
const quoteAmount = ref('')
const serviceType = ref('')
const pickupTime = ref('')
let orderToShip = null
const authenticated = ref(false)
const password = ref('')
const error = ref('')
const orders = ref([])
const filter = ref('') // search input binding
const columns = [
  { name: 'createdAt', label: 'Order ID', field: 'createdAt', align: 'left' },
  { name: 'checkoutID', label: 'Order ID', field: 'checkoutID', align: 'left' },
  { name: 'recipientName', label: 'Customer Name', field: 'recipientName', align: 'left' },
  { name: 'streetaddress', label: 'Address', field: 'streetaddress', align: 'left' },
  { name: 'suburb', label: 'Address', field: 'suburb', align: 'left' },
  { name: 'province', label: 'Address', field: 'province', align: 'left' },
  { name: 'Sum', label: 'Amount', field: 'Total', align: 'center' },

  { name: 'items', label: 'Items', field: 'items', align: 'left' },
  { name: 'Total', label: 'Total', field: 'Total', align: 'center' },
]

// --- FUNCTIONS ---
const authenticate = () => {
  if (password.value === '1234') {
    authenticated.value = true
    loadOrders()
  } else {
    error.value = 'Incorrect Password'
  }
}

const loadOrders = async () => {
  const querySnapshot = await getDocs(collection(firestore, 'neworders'))
  orders.value = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
}
const exportDataToExcel = async () => {
  const db = getFirestore()
  const trackingCollection = collection(db, 'neworders')

  try {
    const querySnapshot = await getDocs(trackingCollection)
    const data = []
    const seen = new Set() // To track unique emails (or checkoutIDs)

    querySnapshot.forEach((docSnapshot) => {
      const docData = docSnapshot.data()
      const email = docData.checkoutID

      // Only process if this email hasn't been seen before
      if (email && !seen.has(email)) {
        seen.add(email)

        // If there are items, create a row for each
        if (Array.isArray(docData.items)) {
          docData.items.forEach((item) => {
            data.push({
              ...docData, // All order-level data
              ...item, // Spread item properties as individual columns
            })
          })
        } else {
          data.push(docData)
        }
      }
    })

    if (data.length > 0) {
      // Remove the original items array from the output
      const flattenedData = data.map((row) => {
        const newRow = { ...row }

        return newRow
      })

      const ws = XLSX.utils.json_to_sheet(flattenedData)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, 'Tracking Data')
      XLSX.writeFile(wb, 'TrackingData.xlsx')

      alert('Tracking data exported successfully!')
    } else {
      alert('No unique data available to export.')
    }
  } catch (error) {
    console.error('Error exporting tracking data: ', error)
    alert('There was an error exporting the tracking data.')
  }
}

const exportTrackingToExcel = async () => {
  const db = getFirestore()
  const trackingCollection = collection(db, 'tracking')

  try {
    const querySnapshot = await getDocs(trackingCollection)
    const data = []
    const seen = new Set() // To track unique sessionIDs

    querySnapshot.forEach((docSnapshot) => {
      const docData = docSnapshot.data()
      const sessionID = docData.sessionID

      if (sessionID && !seen.has(sessionID)) {
        seen.add(sessionID)
        data.push(docData)
      }
    })

    if (data.length > 0) {
      const ws = XLSX.utils.json_to_sheet(data)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, 'Tracking Data')
      XLSX.writeFile(wb, 'TrackingData.xlsx')

      alert('Tracking data exported successfully!')
    } else {
      alert('No unique data available to export.')
    }
  } catch (error) {
    console.error('Error exporting tracking data: ', error)
    alert('There was an error exporting the tracking data.')
  }
}
const createWaybill = async (order) => {
  try {
    // LOGIN
    const loginResponse = await axios.post('http://localhost:3000/api/login', {
      Username: 'bastratasneem@gmail.com',
      Password: 'ZakM2016!',
    })

    const apiKey = loginResponse.data.Key
    if (!apiKey) {
      throw new Error('Failed to get API Key')
    }

    // GET QUOTE
    const quoteResponse = await axios.post(
      'http://localhost:3000/api/get-quote',
      {
        SenderSuburb: 'Heathfield',
        SenderPostalCode: '7945',
        ReceiverSuburb: order.suburb,
        ReceiverPostalCode: order.postalcode,
        Parcels: [
          { Height: 10, Width: 28, Length: 20, Weight: 1, Description: 'Skincare Products' },
        ],
      },
      { headers: { ApiKey: apiKey } },
    )
    console.log('order row', order)
    const quoteData = quoteResponse.data
    console.log('quote details', quoteData)
    if (quoteData.statusCode !== 0) {
      throw new Error('GetQuote failed: ' + quoteData.statusDescription)
    }

    // Save quote information to display in dialog
    quoteAmount.value = quoteData.Quotes[1]?.QuotedPrice || 'N/A'
    serviceType.value = quoteData.Quotes[1]?.ServiceType || 'PEC'
    pickupTime.value = quoteData.CollectionTimeFrom || 'N/A'

    // Save order and API Key for later when confirming
    orderToShip = { order, apiKey }

    // Open the dialog
    confirmDialog.value = true
  } catch (error) {
    console.error(error)
    $q.notify({
      color: 'negative',
      message: `Error: ${error.message}`,
      position: 'top',
    })
  }
}

const confirmShipment = async () => {
  try {
    confirmDialog.value = false // close dialog

    const { order, apiKey } = orderToShip

    const shipmentResponse = await axios.post(
      'http://localhost:3000/api/create-shipment',
      {
        SenderName: 'mimcoskin',
        SenderContactNumber: '0677163302',
        SenderEmailAddress: 'info@mimcoskin.co.za',
        SenderAddress: '36 Rochester Cl',
        SenderBussinessPark: 'Rochester Village',
        SenderSuburb: 'Heathfield',
        SenderPostalCode: '7945',
        ReceiverName: order.recipientName,
        ReceiverContactNumber: order.mobilenumber,
        ReceiverEmailAddress: order.email,
        ReceiverAddress: order.streetaddress,
        ReceiverBusinessPark: '',
        ReceiverSuburb: order.suburb,
        ReceiverPostalCode: order.postalcode,
        ServiceType: serviceType.value,
        CollectToday: true,
        RequireInsurance: false,
        InsuranceAmount: 0,
        DiscountCode: '',
        Parcels: [
          {
            Height: 10,
            Width: 28,
            Length: 20,
            Weight: 1,
            Description: 'Skincare Products',
          },
        ],
      },
      { headers: { ApiKey: apiKey } },
    )

    const shipmentData = shipmentResponse.data
    if (shipmentData.statusCode !== 0) {
      throw new Error('CreateShipment failed: ' + shipmentData.statusDescription)
    } else {
      try {
        // Send email using EmailJS
        await emailjs.send(
          'service_ngl2b2o',
          'template_cuieopg',
          {
            to_name: order.recipientName,
            tracking_number: shipmentData.WaybillNumber,
            reply_to: 'mimcoskincare@gmail.com',
            to_email: order.email,
          },
          'BEep-nYRoXNA1bRdH',
        )

        console.log('Email sent successfully!')
      } catch (error) {
        console.error('Failed to send email:', error)
      }

      window.open(shipmentData.DownloadURL, '_blank')

      const $q = useQuasar()
      $q.notify({
        color: 'positive',
        message: `Waybill created! Waybill No: ${shipmentData.WaybillNumber}`,
        position: 'top',
      })
    }
  } catch (error) {
    console.error(error)
    const $q = useQuasar()
    $q.notify({
      color: 'negative',
      message: `Error: ${error.message}`,
      position: 'top',
    })
  }
}
</script>

<style scoped>
.text-negative {
  color: red;
}
</style>
