<template>
  <div v-if="isAuthenticated" class="dashboard-container">
    <h1 class="dashboard-header">Manager Dashboard</h1>

    <div class="stats">
      <div class="card">
        <h2>Unique Sales</h2>
        <p>{{ salesCount }}</p>
      </div>
      <div class="card">
        <h2>Unique Subscriptions</h2>
        <p>{{ subscriptionsCount }}</p>
        <q-btn
          color="primary"
          label="Export Subs"
          @click="exportDataToExcel"
          style="margin-right: 10px"
        />
        <q-btn color="primary" label="Send Promo" @click="sendPromoEmail" />
      </div>
    </div>

    <div class="chart-container">
      <h4>Page Visit Tracking</h4>
      <Bar :data="chartData" :options="chartOptions" />
      <q-btn color="primary" label="Reset Tracking Data" @click="resetSubscriptions" />
    </div>
  </div>

  <!-- Passcode entry -->
  <div v-else class="passcode-container">
    <h2>Enter Passcode</h2>
    <q-input v-model="password" label="Passcode" type="password" />
    <q-btn color="primary" label="Submit" @click="authenticate" />
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import { getFirestore, collection, getDocs, deleteDoc, doc, addDoc } from 'firebase/firestore'
import emailjs from 'emailjs-com'
import { Bar } from 'vue-chartjs'
import * as XLSX from 'xlsx'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default defineComponent({
  components: { Bar },
  setup() {
    const password = ref('')
    const correctPassword = '1234' // Change to your preferred 4-digit code
    const isAuthenticated = ref(false)

    const salesCount = ref(0)
    const subscriptionsCount = ref(0)

    const pageCounts = ref([]) // Will store the data for the chart
    const pageNames = ref([]) // Will store the labels (page names)
    const chartData = ref({
      labels: pageNames.value,
      datasets: [
        {
          label: 'Page Visit Count',
          data: pageCounts.value,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    })

    const chartOptions = ref({
      indexAxis: 'y', // This makes the bars horizontal
      responsive: true,
      scales: {
        x: {
          beginAtZero: true, // Ensures the x-axis starts at zero
        },
        y: {
          beginAtZero: true, // Ensures the y-axis starts at zero
        },
      },
    })

    const resetSubscriptions = async () => {
      const db = getFirestore()
      const trackingCollection = collection(db, 'tracking')
      try {
        const querySnapshot = await getDocs(trackingCollection) // Fetch all documents
        querySnapshot.forEach(async (docSnapshot) => {
          const docRef = doc(db, 'tracking', docSnapshot.id) // Get reference to the document
          await deleteDoc(docRef) // Delete the document
        })
        alert('All tracking records have been deleted.')
      } catch (error) {
        console.error('Error deleting tracking records: ', error)
        alert('There was an error deleting the tracking records.')
      }
    }

    const exportDataToExcel = async () => {
      const db = getFirestore()
      const trackingCollection = collection(db, 'subscriptions')

      try {
        const querySnapshot = await getDocs(trackingCollection) // Fetch all documents
        const data = []
        const seen = new Set() // To track unique emails

        // Loop through each document and convert it into an object
        querySnapshot.forEach((docSnapshot) => {
          const docData = docSnapshot.data()
          const email = docData.email // Use email as the unique key

          // Check if the email has been encountered before
          if (email && !seen.has(email)) {
            seen.add(email)
            data.push(docData) // Add to data array if unique
          }
        })

        if (data.length > 0) {
          // Create a new worksheet from the unique JSON data
          const ws = XLSX.utils.json_to_sheet(data)

          // Create a new workbook
          const wb = XLSX.utils.book_new()
          XLSX.utils.book_append_sheet(wb, ws, 'Tracking Data')

          // Write the Excel file to the browser and prompt user to download
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

    const fetchData = async () => {
      try {
        const db = getFirestore()

        const salesSnapshot = await getDocs(collection(db, 'neworders'))

        if (!salesSnapshot.empty) {
          salesCount.value = salesSnapshot.size
        }

        const subscriptionsSnapshot = await getDocs(collection(db, 'subscriptions'))

        if (!subscriptionsSnapshot.empty) {
          // Create a Set to store unique emails
          const uniqueEmails = new Set()

          // Loop through each document in the snapshot
          subscriptionsSnapshot.forEach((doc) => {
            const email = doc.data().email // Assuming the email field is named 'email'
            if (email) {
              uniqueEmails.add(email) // Add email to the Set (duplicates are automatically ignored)
            }
          })

          // The size of the Set gives the count of unique emails
          subscriptionsCount.value = uniqueEmails.size
        }

        const trackingSnapshot = await getDocs(collection(db, 'tracking'))
        if (!trackingSnapshot.empty) {
          const pageCountMap = {}

          trackingSnapshot.forEach((doc) => {
            const pageName = doc.data().pagename
            console.log('Page Name:', pageName)
            if (pageName) {
              pageCountMap[pageName] = (pageCountMap[pageName] || 0) + 1
            }
          })

          // Populate the pageNames and pageCounts arrays
          pageNames.value = Object.keys(pageCountMap)
          pageCounts.value = Object.values(pageCountMap)

          console.log('Page Names:', pageNames.value)
          console.log('Page Counts:', pageCounts.value)

          // Update chart data after the arrays are populated
          chartData.value = {
            labels: pageNames.value,
            datasets: [
              {
                label: 'Page Visit Count',
                data: pageCounts.value,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
              },
            ],
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    const sendPromoEmail = async () => {
      try {
        const db = getFirestore()
        // Query Firestore to get all subscriptions
        const subscriptionsCollection = collection(db, 'subscriptions')
        const subscriptionSnapshot = await getDocs(subscriptionsCollection)

        if (subscriptionSnapshot.empty) {
          console.error('No subscriptions found.')
          return
        }

        // Loop through each subscription and send the email
        for (const doc of subscriptionSnapshot.docs) {
          const customerEmail = doc.data().email

          // Generate a voucher number (e.g., SUBSCRIBER-12345)
          const voucherNo = `SUBSCRIBER-${Math.floor(Math.random() * 100000)}`

          // Send email using EmailJS
          await emailjs.send(
            'service_eq2ly9c',
            'template_cuieopg',
            {
              from_name: 'mimcoskin',
              to_email: customerEmail,
              voucherno: voucherNo,
            },
            'BEep-nYRoXNA1bRdH',
          )

          // Create a new document in the vouchers collection
          const vouchersCollection = collection(db, 'vouchers')
          await addDoc(vouchersCollection, {
            isValid: true,
            timestamp: new Date(),
            totaloff: 5,
            voucherCode: voucherNo,
          })
          console.log(`Email sent to ${customerEmail}`)
        }

        console.log('Emails sent successfully to all customers!')
      } catch (error) {
        console.error('Failed to send emails:', error)
      }
    }

    onMounted(() => {
      fetchData()
    })

    return {
      password,
      isAuthenticated,
      salesCount,
      subscriptionsCount,
      chartData,
      chartOptions,
      resetSubscriptions,
      exportDataToExcel,
      sendPromoEmail,
      authenticate() {
        if (password.value === correctPassword) {
          isAuthenticated.value = true
          fetchData()
        } else {
          alert('Incorrect password!')
        }
      },
    }
  },
})
</script>

<style scoped>
.passcode-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
/* Container for the whole dashboard */
.dashboard-container {
  font-family: Arial, sans-serif;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

/* Header styling */
.dashboard-header {
  text-align: center;
  font-size: 2rem;
  color: #333;
  margin-bottom: 20px;
}

/* Stats section */
.stats {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 40px;
}

.card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
  flex: 1;
  min-width: 200px;
}

.card h2 {
  font-size: 1.2rem;
  color: #555;
  margin-bottom: 10px;
}

.card p {
  font-size: 1.5rem;
  color: #333;
  font-weight: bold;
}

/* Chart container */
.chart-container {
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Responsive Design */
@media (max-width: 768px) {
  .stats {
    flex-direction: column;
    align-items: center;
  }

  .card {
    width: 100%;
    margin-bottom: 20px;
  }

  .dashboard-header {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .dashboard-header {
    font-size: 1.2rem;
  }

  .card h2 {
    font-size: 1rem;
  }

  .card p {
    font-size: 1.2rem;
  }
}
</style>
