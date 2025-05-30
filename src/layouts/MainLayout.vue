<template>
  <div class="hidden-trigger" @click="showDialog = true">
    15% off + Free Gift
    <q-icon
      name="card_giftcard"
      class="gift-icon"
      color="white"
      size="24px"
      style="color: white !important"
    />
  </div>

  <q-layout view="lHh Lpr lf" :class="{ 'scrolled-header': isScrolled }">
    <q-header :class="{ 'scrolled-header': isScrolled }">
      <q-toolbar class="text-black">
        <q-btn flat dense round @click="toggleMenu">
          <img src="assets/siteassets/hamburger.png" style="width: 20px; height: 20px" />
        </q-btn>
        <q-toolbar-title class="title-font">
          <router-link to="/" class="no-decoration">mimcoskin.</router-link>
        </q-toolbar-title>
        <!-- User Icon -->
        <!-- <q-btn flat round dense @click="navigateTo('ProfilePage')" aria-label="User">
          <img src="assets/siteassets/user.png" style="width: 24px; height: 24px" />
        </q-btn> -->
        <!-- Cart Icon with Badge -->
        <div style="position: relative; display: inline-block">
          <q-btn flat round dense @click="navigateTo('Checkout')" class="q-ml-md" aria-label="Cart">
            <img src="assets/siteassets/bag.png" style="width: 24px; height: 24px" />
            <q-badge
              v-if="cartItemCount > 0"
              class="q-ml-sm"
              style="
                position: absolute;
                top: -5px;
                right: -5px;
                font-size: 12px;
                padding: 2px 6px;
                background-color: #a0cde1;
              "
            >
              {{ cartItemCount }}
            </q-badge>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>
    <q-drawer v-model="menuOpen" overlay class="desktop">
      <q-toolbar class="title-font">
        <q-btn flat dense round @click="toggleMenu">
          <img src="assets/siteassets/hamburger.png" style="width: 24px; height: 24px" />
        </q-btn>
      </q-toolbar>
      <q-list>
        <div
          class="text-h5 title-font-sidebar"
          style="padding-left: 10px; padding-top: 10px; padding-bottom: 10px"
        >
          BEST SELLERS
        </div>
        <div
          style="
            background-color: #f1f0ed;
            border-radius: 20px;
            margin-left: 10px;
            margin-right: 10px;
          "
        >
          <q-item clickable class="cart-item" @click="navigateTo('RosaProductPage')">
            <q-item-section avatar>
              <q-img
                src="assets/siteassets/Rosa/rosa.png"
                class="cart-item-image"
                style="border-radius: 20px; width: 80px"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label>ROSA</q-item-label>
              <q-item-label caption>Plump + Hydrate</q-item-label>
            </q-item-section>
          </q-item>
        </div>
        <div
          style="
            background-color: #f1f0ed;
            border-radius: 20px;
            margin-left: 10px;
            margin-right: 10px;
            margin-top: 10px;
            margin-bottom: 20px;
          "
        >
          <q-item clickable class="cart-item" @click="navigateTo('PrettyProductPage')">
            <q-item-section avatar>
              <q-img
                src="assets/siteassets/Pretty/results-lipoil.webp"
                class="cart-item-image"
                style="border-radius: 20px; width: 80px"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label>PRETTY</q-item-label>
              <q-item-label caption>Soft + Plump Lips</q-item-label>
            </q-item-section>
          </q-item>
        </div>

        <div
          class="text-h5 title-font-sidebar"
          style="padding-left: 10px; padding-top: 10px; margin-bottom: -15px"
        >
          BARE
        </div>
        <div class="text-h5 title-font-sidebar" style="padding-left: 10px; font-weight: 100">
          collection
        </div>
        <div
          style="
            background-color: #f1f0ed;
            border-radius: 20px;
            margin-left: 10px;
            margin-right: 10px;
            margin-top: 10px;
          "
        >
          <q-item clickable class="cart-item" @click="navigateTo('HealingEraProductPage')">
            <q-item-section avatar>
              <q-img
                src="assets/siteassets/tee.png"
                class="cart-item-image"
                style="border-radius: 20px; width: 90px"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label>Healing Era</q-item-label>
              <q-item-label caption>Comfy Basic Tee</q-item-label>
            </q-item-section>
          </q-item>
        </div>
        <div
          style="
            background-color: #f1f0ed;
            border-radius: 20px;
            margin-left: 10px;
            margin-right: 10px;
            margin-top: 10px;
            margin-bottom: 20px;
          "
        >
          <q-item clickable class="cart-item" @click="navigateTo('SkinCareTravelBag')">
            <q-item-section avatar>
              <q-img
                src="assets/siteassets/tb.png"
                class="cart-item-image"
                style="border-radius: 20px; width: 90px"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label>mimco Travel Bag</q-item-label>
              <q-item-label caption>Travel Bag</q-item-label>
            </q-item-section>
          </q-item>
        </div>
      </q-list>
    </q-drawer>

    <q-page-container class="q-pa-none gradient-bg" style="padding-top: 0px !important">
      <div>
        <q-dialog v-model="showDialog" persistent>
          <q-card class="popup-card">
            <q-btn flat icon="close" class="close-btn" @click="closeDialog" />
            <q-card-section>
              <div class="popup-header">
                <q-icon name="card_giftcard" class="gift-icon" color="black" size="32px" />
                <h2 class="popup-heading">Get 15% Off PLUS a FREE Gift, on your first purchase!</h2>
              </div>
              <q-input v-model="email" filled placeholder="Enter your email" />
              <q-btn class="submit-btn" @click="subScribe">Sign Me Up!</q-btn>
            </q-card-section>
          </q-card>
        </q-dialog>
      </div>

      <router-view />
    </q-page-container>

    <!-- Footer -->
    <q-footer class="bg-light-gray text-dark q-pa-md" style="background-color: #f1f0ed">
      <div class="row justify-between items-start">
        <!-- Write a Review Section -->
        <div class="col-12 col-md-6 text-center">
          <h6 class="text-bold">Write a Review</h6>
          <q-form class="q-my-md">
            <q-rating
              v-model="rating"
              size="lg"
              icon="star"
              icon-selected="star"
              icon-half="star_half"
              :max="5"
              style="color: #000000"
            />
            <q-input
              v-model="reviewer"
              filled
              label="Your Name"
              class="q-my-sm d-block mx-auto custom-input"
              style="width: 60%; margin-left: 20%"
            />

            <q-select
              v-model="productreviewed"
              filled
              :options="products"
              label="Product Reviewed"
              class="q-my-sm d-block mx-auto"
              style="width: 60%; margin-left: 20%; font-size: 15px !important"
            />
            <q-input
              v-model="reviewtext"
              filled
              type="textarea"
              label="Your Review"
              class="q-my-sm d-block mx-auto"
              style="width: 60%; margin-left: 20%; font-size: 15px !important"
            />

            <q-btn label="Submit" color="primary" rounded class="q-mt-md" @click="submitReview" />

            <!-- Success message -->
            <q-dialog v-model="reviewSubmitted" persistent>
              <q-card class="text-black" style="background-color: white; padding: 30px">
                <q-card-section>
                  <div class="text-h6" style="text-align: center">
                    {{ dialogtext }}
                  </div>
                </q-card-section>
                <q-card-actions align="center">
                  <q-btn
                    label="Close"
                    flat
                    @click="reviewSubmitted = false"
                    style="
                      background-color: pink !important;
                      border-radius: 4px !important;
                      border: black;
                      font-size: 15px;
                    "
                  />
                </q-card-actions>
              </q-card>
            </q-dialog>
          </q-form>
        </div>

        <!-- Let's Stay Connected Section -->
        <div class="col-12 col-md-6 text-center">
          <h6 class="text-bold">Let's Stay Connected</h6>
          <q-input
            v-model="email"
            filled
            placeholder="Enter your email"
            class="q-my-md"
            style="width: 60%; margin-left: 20%; font-size: 15px"
          />
          <q-btn label="Subscribe" color="primary" rounded @click="subScribe" />

          <!-- Contact Info -->
          <p class="text-body1 q-mt-md text-left" style="margin-left: 20%; margin-top: 5%">
            <span class="text-bold" style="margin-right: 15px">Phone:</span>
            <a href="tel:+27677163302" class="text-primary hover-underline">067 716 3302</a><br />
            <span class="text-bold" style="margin-right: 20px">Email:</span>
            <a href="mailto:info@mimcoskin.co.za" class="text-primary hover-underline">
              info@mimcoskin.co.za</a
            >
          </p>

          <!-- Social Media Links -->
          <div class="row justify-center q-mt-lg social-icon-container">
            <a
              href="https://www.instagram.com/mimcoskin/"
              aria-label="Instagram"
              class="social-icon q-mr-md"
            >
              <img
                src="https://kyliecosmetics.com/cdn/shop/files/Icons_242d604c-8c8c-40dc-ae52-7982a0cf027e.png?v=1670873242"
                alt="Instagram"
              />
            </a>
            <a
              href="https://www.tiktok.com/@mimcoskinn?is_from_webapp=1&sender_device=pc"
              aria-label="TikTok"
              class="social-icon"
            >
              <img
                src="https://kyliecosmetics.com/cdn/shop/files/Icons_51f277e7-4d3a-4de3-ba57-771151957462.png?v=1670873242"
                alt="TikTok"
              />
            </a>
          </div>
        </div>
      </div>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { getFirestore, collection, addDoc, getDocs, where, query } from 'firebase/firestore'
import emailjs from 'emailjs-com'
// Initialize router and store
const router = useRouter()
const store = useStore()
const isScrolled = ref(false)
const handleScroll = () => {
  const scrollThreshold = 200 // Change this to the position where you want the header to change
  isScrolled.value = window.scrollY > scrollThreshold
}
// Reactive states
const menuOpen = ref(false)
const showDialog = ref(false)
const cartItemCount = computed(() => store.getters['cart/cartCount'])
const closeDialog = () => {
  showDialog.value = false
}
onMounted(() => {
  window.addEventListener('scroll', handleScroll)

  setTimeout(() => {
    showDialog.value = true
  }, 5000) // 2-second delay
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const rating = ref(4)
const reviewer = ref('')
const reviewtext = ref('')
const email = ref('')
const reviewSubmitted = ref(false)
const dialogtext = ref('')
const productreviewed = ref('')
const products = [
  'Rosa Face Serum',
  'Rekindle Cleanser',
  'ReGlow Moisturiser',
  'RePurify Moisturiser',
  'Pretty Lip oil',
  'ReSparkle Serum',
  'The Holy Glaze Facial Oil',
]
// Toggle menu visibility
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

const submitReview = async () => {
  try {
    const db = getFirestore()
    const reviewsCollection = collection(db, 'reviews')

    const newReview = {
      reviewer: reviewer.value,
      reviewtext: reviewtext.value,
      rating: rating.value,
      timestamp: new Date(),
      productreviewed: productreviewed.value,
    }

    await addDoc(reviewsCollection, newReview)

    dialogtext.value = 'Thank you for your review! Your feedback is very important to us'
    reviewSubmitted.value = true
    reviewer.value = ''
    reviewtext.value = ''
    productreviewed.value = ''
  } catch (error) {
    console.error('Error submitting review:', error)
  }
}

const generateVoucherNumber = () => {
  const randomString = Math.random().toString(36).substring(2, 8).toUpperCase()
  return `WELCOME-${randomString}`
}

const subScribe = async () => {
  try {
    const db = getFirestore()
    const subsCollection = collection(db, 'subscriptions')
    const voucherCollection = collection(db, 'vouchers')

    // Check if the email already exists in the subscriptions
    const querySnapshot = await getDocs(query(subsCollection, where('email', '==', email.value)))

    if (!querySnapshot.empty) {
      console.log('Email already exists, voucher not sent.')
      dialogtext.value = 'You have already received a voucher with this email :('
      reviewSubmitted.value = true
      showDialog.value = false
      email.value = ''
      return
    }

    const voucherNumber = generateVoucherNumber()
    dialogtext.value = 'Thank you for subscribing, your voucher code is in your emails!'
    reviewSubmitted.value = true
    showDialog.value = false

    const newSub = {
      email: email.value,
      timestamp: new Date(),
      voucherNumber: voucherNumber,
    }

    const newVouch = {
      isValid: true,
      totaloff: 15,
      timestamp: new Date(),
      voucherCode: voucherNumber,
    }

    // Add new subscription
    await addDoc(subsCollection, newSub)

    // Add new voucher
    await addDoc(voucherCollection, newVouch)

    const expiryDate = new Date()
    expiryDate.setMonth(expiryDate.getMonth() + 2)
    emailjs.init('00VCvQVhKPfGeHpEu') // Re-initialize before sending
    // Send email
    await emailjs.send(
      'service_yjekz7m',
      'template_fwkm4pi',
      {
        voucherno: voucherNumber,
        shop_url: 'https://mimcoskin.co.za/',
        expiry_date: expiryDate.toISOString().split('T')[0],
        to_email: email.value,
      },
      '00VCvQVhKPfGeHpEu',
    )

    email.value = ''
  } catch (error) {
    console.error('Error submitting subscription:', error)
  }
}

const navigateTo = (page) => {
  router.push({ name: page })
}
</script>

<style scoped>
@import url('../css/mainlayout.css'); /* This will be applied when the component is active */
</style>
