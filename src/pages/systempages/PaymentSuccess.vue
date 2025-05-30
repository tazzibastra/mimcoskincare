<script>
import { onMounted } from 'vue'
import emailjs from 'emailjs-com'
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore'

import { firestore } from '../../firebase'
export default {
  name: 'PaymentSuccess',
  setup() {
    const sendConfirmationEmail = async () => {
      try {
        const customerEmail = localStorage.getItem('customerEmail')
        const customerName = localStorage.getItem('customerName')
        const orderItems = JSON.parse(localStorage.getItem('orderItems')) || []
        const checkoutId = localStorage.getItem('checkoutId')
        console.log('checkoutid on paymentpage', checkoutId)
        if (!customerEmail || !checkoutId) {
          console.error('Missing required data: customer email or checkout ID.')
          return
        }

        // Query Firestore to find the order by checkoutId
        const ordersCollection = collection(firestore, 'neworders')
        const orderQuery = query(ordersCollection, where('checkoutID', '==', checkoutId))
        const querySnapshot = await getDocs(orderQuery)

        if (!querySnapshot.empty) {
          // Update the payment status of the first matching order
          const orderDoc = querySnapshot.docs[0]
          await updateDoc(doc(firestore, 'neworders', orderDoc.id), {
            paymentstatus: 'success',
          })
          console.log(`Order ${orderDoc.id} updated to success.`)
        } else {
          console.error('No matching order found for checkoutID:', checkoutId)
          return
        }

        // Create only the table rows
        let orderRows = orderItems
          .map(
            (item) => `
      <tr>
        <td style="padding: 10px; border: 1px solid #ddd;">${item.name}</td>
        <td style="padding: 10px; border: 1px solid #ddd;">${item.quantity}</td>
        <td style="padding: 10px; border: 1px solid #ddd;">R${item.price.toFixed(2)}</td>
        <td style="padding: 10px; border: 1px solid #ddd;">R${(item.price * item.quantity).toFixed(2)}</td>
      </tr>
    `,
          )
          .join('') // Ensure it's a proper string

        // Send email using EmailJS
        await emailjs.send(
          'service_yjekz7m',
          'template_ki8jnrp',
          {
            from_name: 'MimcoSkin',
            to_name: customerName,
            message: `Thank you for shopping with us! You just made our day! Your Glowy Skin is only days away, and we'll update you on the progress.`,
            reply_to: customerEmail,
            order_rows: orderRows, // Only send rows
          },
          '00VCvQVhKPfGeHpEu',
        )

        console.log('Email sent successfully!')
      } catch (error) {
        console.error('Failed to send email:', error)
      }
    }

    const goHome = () => {
      // Redirect to the home page
      window.location.href = '/' // Or use this.$router.push("/") if you are using Vue Router
    }

    onMounted(() => {
      sendConfirmationEmail()
    })

    return {
      goHome,
    }
  },
}
</script>

<template>
  <div class="payment-success">
    <h1>Yay! Your order is on its way!</h1>

    <p>
      Thank you for shopping with us—you just made our day! A confirmation email is on its way to
      your inbox. In the meantime, grab a snack, do a happy dance, and get ready for some skincare
      magic! 💕
    </p>
    <button @click="goHome">Continue Shopping</button>
  </div>
</template>
<script></script>
<style scoped>
.payment-success {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Full viewport height */
  text-align: center;
}

h1 {
  font-size: 4rem;
  color: pink;
  margin-bottom: 10px; /* Reduce space between h1 and p */
}

p {
  font-size: 1.1rem;
  color: #555;
  max-width: 600px; /* To keep text nicely formatted */
  margin-top: 0; /* Remove default margin */
}

button {
  margin-top: 20px;
  padding: 12px 24px;
  font-size: 1rem;
  background-color: pink;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s ease-in-out;
}

button:hover {
  background-color: #ff69b4; /* A slightly darker pink for hover effect */
}

@media (max-width: 640px) {
  h1 {
    font-size: 1.5rem;
    color: pink;
    margin-bottom: 10px; /* Reduce space between h1 and p */
  }

  p {
    font-size: 1rem;
    color: #555;
    max-width: 600px; /* To keep text nicely formatted */
    margin-top: 0; /* Remove default margin */
    margin-left: 30px;
    margin-right: 30px;
  }
}
</style>
