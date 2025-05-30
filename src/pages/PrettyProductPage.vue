<template>
  <q-page class="q-pa-md q-gutter-md">
    <div class="row q-col-gutter-md">
      <!-- Left Column: Product Images -->
      <div class="col-12 col-md-6">
        <q-img :src="selectedImage" class="q-mb-md mainproductimage" loading="lazy"> </q-img>
        <div class="row q-gutter-sm justify-center">
          <q-img
            v-for="(img, index) in product.arrayofimages"
            :key="index"
            :src="img"
            :alt="`Image ${index + 1}`"
            @click="setSelectedImage(img)"
            class="cursor-pointer"
            style="width: 80px; height: 80px; border-radius: 20px; margin-bottom: 10px"
            :class="{ 'border-primary': selectedImage === img }"
            loading="lazy"
          />
        </div>
      </div>

      <!-- Right Column: Product Details -->
      <div class="col-12 col-md-6 leftdescriptiondiv">
        <h2 class="title-font" style="line-height: 30px; font-size: 21px">{{ product.name }}</h2>

        <q-rating
          v-model="product.overalrating"
          size="18px"
          icon="star"
          icon-selected="star"
          icon-half="star_half"
          :max="5"
          readonly
          style="margin-bottom: 20px; color: #d0dde7"
        />

        <p
          style="
            font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande',
              'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
          "
        >
          {{ product.productdescription }}
        </p>
        <p
          style="
            font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande',
              'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
          "
        >
          R {{ product.price }}
          <!-- <span style="text-decoration: line-through; color: gray">R{{ product.discount }}</span>
          <span style="margin-left: 5px; color: red">(65% off)</span> -->
        </p>
        <p
          style="
            font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande',
              'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
          "
        >
          Size: {{ product.size }}
        </p>

        <div class="q-mb-md row items-center">
          <q-btn flat label="Add to Cart" class="addtocartbtn" @click="handleAddToCart(product)" />
          <!-- <div style="margin-left: 10px"></div>
          <div class="quantity-control">
            <q-btn size="sm" flat round icon="remove" @click="changeQuantity(-1)" />
            {{ quantity }}
            <q-btn size="sm" flat round icon="add" @click="changeQuantity(1)" />
          </div> -->
        </div>

        <div class="row items-center justify-center q-my-md" style="gap: 20px; margin-top: 30px">
          <img
            v-for="(icon, index) in icons"
            :key="index"
            :src="icon.src"
            :alt="icon.alt"
            style="width: 40px; height: 40px"
          />
        </div>
        <q-expansion-item class="collapsibleitems" label="Reviews" dense>
          <div
            v-for="(review, index) in product.reviews"
            :key="index"
            class="q-mb-md"
            style="
              margin-left: 20px;
              margin-right: 20px;
              margin-top: 20px;
              background: white;
              border-radius: 10px;
              padding: 5px;
            "
          >
            <p class="text-bold">{{ review.name }}</p>

            <q-rating
              v-model="review.rating"
              size="18px"
              icon="star"
              icon-selected="star"
              icon-half="star_half"
              :max="5"
              readonly
              style="color: #d0dde7"
            />
            <p class="description-font insidecollapsibleitems">"{{ review.review }}"</p>
            <q-separator />
          </div>
        </q-expansion-item>
        <q-expansion-item class="collapsibleitems" label="Why We Love It" dense>
          <p class="description-font insidecollapsibleitems">{{ product.whyweloveit }}</p>
        </q-expansion-item>
        <q-expansion-item class="collapsibleitems" label="How to Use It" dense>
          <p class="description-font insidecollapsibleitems">{{ product.howtouse }}</p>
        </q-expansion-item>
        <q-expansion-item class="collapsibleitems" label="Ingredients" dense>
          <h5 class="description-font" style="margin-left: 10px">Key Ingredients</h5>
          <p class="description-font insidecollapsibleitems">
            <strong>Passionfruit Seed Oil</strong> - Rich in essential fatty acids, it deeply
            nourishes and softens lips.
          </p>
          <p class="description-font insidecollapsibleitems">
            <strong>Raspberry Seed Oil</strong> - Packed with antioxidants and vitamins, it helps
            protect and hydrate.
          </p>
          <p class="description-font insidecollapsibleitems">
            <strong>Watermelon Seed Extract</strong> - Lightweight yet ultra-moisturizing, it helps
            maintain smooth, plump lips.
          </p>
          <p class="description-font insidecollapsibleitems">
            Ingredients: {{ product.productingredients }}
          </p>
        </q-expansion-item>
      </div>
    </div>
  </q-page>
</template>

<script>
import product1 from '/assets/siteassets/Pretty/pretty.png'
import {
  getFirestore,
  collection,
  updateDoc,
  query,
  where,
  getDocs,
  addDoc,
} from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
export default {
  name: 'ProductPage',
  data() {
    return {
      product: {
        productid: 'pretty',
        name: 'Pretty Lip Oil',
        price: 109.0,
        discount: 0.0,
        productdescription:
          'A nourishing blend that hydrates, softens, and plumps lips with a glossy finish and moisture-rich texture.',
        size: '6ml',
        arrayofimages: [
          'assets/siteassets/Pretty/pretty.png',
          '/assets/siteassets/Pretty/pretty.jpg',
          '/assets/siteassets/Pretty/results-lipoil.webp',
        ],
        productingredients:
          'Hydrogenated Polysobutene, Isononyl Isononanoate, Ethylene/Propylene/Styrene Copolymer, Diisostearyl Malate, Polybutene, Aroma/Flavor, BHI, Butylene/Ethylene/Styrene Copolymer, Caprylic/Capric Triglyceride, Passiflora Edulis Seed Oil, Citrullus Vulgaris (Watermelon) Fruit Extract, Citrullus Vulgaris (Watermelon) Seed Extract, Pentaerythrityl Tetra-Di-Butyl Hydroxyhydrocinnamate, Rubus Idaeus (Raspberry) Leaf Extract, Rubus Idaeus (Raspberry) Seed Oil, Tocopherol, Tocopheryl Acetate, Triethoxycaprylylsilane.',
        whyweloveit:
          'Our Lip Oil delivers deep hydration and lasting comfort while leaving lips looking smooth and naturally plumped. Infused with a nourishing complex, its rich, conditioning texture blends the glossy shine of a lip gloss with the moisture-locking benefits of a balm—giving you the best of both worlds',
        howtouse:
          'Apply directly to clean, dry lips using the applicator. Wear it alone for a natural, glossy finish or layer it over your favorite lipstick for extra hydration and shine. Reapply as needed throughout the day for soft, nourished lips.',
        overalrating: 5,
        reviews: [
          {
            name: 'lillttx',
            rating: 5,
            review: 'smells great, feels great love it',
          },
          {
            name: 'Kulthum Khan',
            rating: 5,
            review: 'smells really good, just like watermelon',
          },
        ],
      },
      selectedImage: product1,
      quantity: 1,
      icons: [
        {
          src: '//kyliecosmetics.com/cdn/shop/files/Circle_KC_Icons_-_Vegan.png?v=1670875011&width=200&height=200',
          alt: 'Vegan',
        },
        {
          src: '//kyliecosmetics.com/cdn/shop/files/Circle_KC_Icons_-_Cruelty_Free.png?v=1670875011&width=150&height=150',
          alt: 'Cruelty-Free',
        },
        {
          src: '//kyliecosmetics.com/cdn/shop/files/Circle_KC_Icons_-_Clean.png?v=1670875011&width=150&height=150',
          alt: 'Eco-Friendly',
        },
      ],
    }
  },
  methods: {
    setSelectedImage(img) {
      this.selectedImage = img
    },
    addToCart() {
      console.log(`Added ${this.quantity} of "${this.product.name}" to cart.`)
    },
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
          console.log('quantity', this.quantity)
          querySnapshot.forEach(async (docSnapshot) => {
            const currentData = docSnapshot.data()
            await updateDoc(docSnapshot.ref, { units: currentData.units + this.quantity })
          })
        } else {
          // The product is not in the cart; create a new cart entry.
          const newCartEntry = {
            createdAt: new Date().toISOString(), // Create a current timestamp.
            image: this.selectedImage, // e.g., "./src/assets/CloudJelly_Hero.webp"
            itemname: product.name, // e.g., "Rosa"
            itemprice: product.price, // e.g., 100
            productid: product.productid, // e.g., 2
            units: 1, // Start with 1 unit.
            userID: user.uid, // e.g., "bgkRHBmyVOTSyiurde9PGmAsd2P2"
          }

          await addDoc(cartsCollection, newCartEntry)
        }
      } else {
        // If the user is not logged in, add the item to the Vuex store.
        // Note: In your store, the mutation/action expects an object with an "id" property,
        // so we map "productid" to "id". Also, adjust the property names if needed.
        console.log('quantity', product.quantity)
        const cartItem = {
          id: product.productid, // maps to store's 'id'
          image: this.selectedImage, // same as product.image
          name: product.name, // store expects 'name' (itemname in Firestore)
          price: product.price, // store expects 'price' (itemprice in Firestore)
          units: 1, // starting with 1 unit
          createdAt: new Date().toISOString(), // include a timestamp if needed
        }
        console.log('dispath cartitem', cartItem)
        this.$store.dispatch('cart/addToCart', cartItem)
      }
    },
    changeQuantity(amount) {
      if (this.quantity + amount > 0) this.quantity += amount
    },
  },
  mounted() {
    //Generate a session ID if user is not logged in (for anonymous tracking)
    // Generate a session ID if user is not logged in (for anonymous tracking)
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
        pagename: 'Pretty Product Page',
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
  },
}
</script>

<style scoped>
body {
  overflow-x: hidden;
}

.cursor-pointer {
  cursor: pointer;
}
.border-primary {
  border: 2px solid var(--q-primary);
}
.title-font {
  font-family: 'League Spartan', sans-serif;
  font-weight: 700;
  font-size: 35px;
  margin-top: 10px;
  margin-bottom: 10px;
}
.description-font {
  font-family: 'Lucida Sans', sans-serif;
  text-align: left;
}
.quantity-control {
  display: flex;
  align-items: center;
  border: solid 0.1px black;
  border-radius: 3px;
  font-size: 12px;
  padding: 9px 10px;
  margin-right: 10px;
}
.addtocartbtn {
  color: black;
  border: solid 1px black; /* Same border style */
  border-radius: 3px;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva,
    Verdana, sans-serif;
  font-size: 11px; /* Unified font size */
  padding: 4.6px 8px; /* Padding for bigger buttons */
  box-shadow: none !important; /* Remove default shadow */
  margin-top: 10px;
  transition: background-color 0.3s ease; /* Smooth transition */
}

.addtocartbtn:hover {
  background-color: #d0dde7; /* Light grey hover effect */
}
.collapsibleitems {
  background: #d0dde7;
  margin-bottom: 10px;
  border-radius: 3px;
  padding: 5px;
  font-weight: bold;
}
.insidecollapsibleitems {
  padding: 10px;
  text-align: left;
  font-weight: normal; /* Ensure text inside p is not bold */
  background-color: white;
  border-radius: 10px;
}

.mainproductimage {
  width: 90%;
  height: 500px;
  object-fit: fit;
  margin-top: 80px;
  margin-bottom: 20px;
  margin-left: 50px;
  margin-right: 50px;
  border-radius: 20px;
}

.leftdescriptiondiv {
  padding-left: 50px;
  padding-right: 20px;
  padding-top: 100px;
}

@media (max-width: 640px) {
  .mainproductimage {
    width: 90%;
    height: 500px;
    object-fit: fit;
    margin-top: 80px;
    margin-bottom: 10px;
    margin-left: 28px;
    margin-right: 0px;
    border-radius: 20px;
  }

  .leftdescriptiondiv {
    padding-left: 50px;
    padding-right: 20px;
    padding-top: 10px;
  }
}
</style>
