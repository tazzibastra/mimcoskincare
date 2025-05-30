<template>
  <q-page-container class="q-pa-md gradient-bg" style="padding-top: 0px; padding-bottom: 10px">
    <q-page class="q-pa-md gradient-bg homepage">
      <div v-if="!isLoaded">
        <!-- Home Video Section -->
        <div class="video-container">
          <picture>
            <source
              srcset="/assets/siteassets/heroimages/heroimagemobile.png"
              media="(max-width: 768px)"
            />
            <img
              src="/assets/siteassets/heroimages/heroimagedesktop.png"
              alt="Hero Image"
              class="video-img"
            />
          </picture>
        </div>

        <!-- <div
        class="flex justify-center items-center"
        style="
          margin-top: 50px;
          background-color: #ffbbf0;
          border-radius: 40px;
          margin-left: 10px;
          margin-right: 10px;
          padding: 20px; /* Reduced padding */
          padding-bottom: 30px; /* Reduced padding bottom */
          width: 100%;
          max-width: 300px; /* Adjusted max width for smaller size */
          margin-left: auto; /* Ensures centering */
          margin-right: auto; /* Ensures centering */
        "
      >
        <div
          class="q-ml-md flex justify-center items-center"
          style="
            border: 2px solid white;
            border-radius: 40px;
            padding: 40px;
            margin-left: 0px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 100%;
            max-width: 400px; /* Adjust max width as needed */
          "
        >
          <q-circular-progress
            indeterminate
            size="120px"
            :thickness="0.4"
            show-value
            :value="100"
            style="color: white"
          />
          <div
            class="text-h5"
            style="
              font-family: 'Roboto Slab', serif;
              font-weight: bold;
              color: white;
              text-align: center;
              margin-top: 10px;
            "
          >
            FIRST 100 CUSTOMERS!
          </div>
          <p style="color: white; text-align: center">
            perfect time to switch to plant-base skincare for a healthier skin barrier
          </p>
        </div>
      </div> -->

        <!-- Home Shop New Section -->
        <div>
          <div
            class="title-font"
            style="text-align: center; padding-top: 40px; padding-bottom: 20px"
          >
            <img
              src="assets/siteassets/flower.png"
              alt="flower"
              style="
                width: 15px;
                height: 15px;
                vertical-align: middle;
                margin-right: 10px;
                margin-bottom: 5px;
              "
            />
            <span style="font-weight: bold">MOST LOVED</span>
            <img
              src="assets/siteassets/flower.png"
              alt="flower"
              style="
                width: 15px;
                height: 15px;
                vertical-align: middle;
                margin-left: 10px;
                margin-bottom: 5px;
              "
            />
          </div>
          <div
            style="margin-top: 10px; margin-bottom: 20px; display: flex; justify-content: center"
          >
            <swiper
              :slides-per-view="1.2"
              :space-between="20"
              :initial-slide="0"
              :breakpoints="{
                640: { slidesPerView: 1.5, spaceBetween: 20 },
                1024: { slidesPerView: 2.5, spaceBetween: 30 },
              }"
              pagination
            >
              <swiper-slide v-for="product in products" :key="product.id">
                <ProductCard
                  :productid="product.productid"
                  :image="product.image"
                  :name="product.name"
                  :description="product.description"
                  :price="product.price"
                  :discount="product.discount"
                  :units="product.units"
                  :skintype="product.skintype"
                  :rating="product.rating"
                  :totalreviews="product.totalreviews"
                  @add-to-cart="handleAddToCart"
                  @change-quantity="updateQuantity"
                />
              </swiper-slide>
            </swiper>
          </div>
        </div>
        <div class="q-pa-md row justify-center">
          <div class="socialmediacontainer row q-col-gutter-md">
            <!-- First Image Div (GIF/Video) -->
            <div class="col-12 col-sm-6" style="padding: 0px">
              <video
                class="socialmedia"
                autoplay
                muted
                loop
                playsinline
                style="width: 100%; height: 100%; object-fit: cover; border-radius: inherit"
              >
                <source src="assets/siteassets/homesetsection/video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            <!-- Second Image Div (Image) -->
            <div class="col-12 col-sm-6" style="padding: 0px">
              <q-img
                src="assets/siteassets/homesetsection/rosa.jpg"
                alt="Second Image"
                class="socialmedia"
              />
            </div>
          </div>
        </div>

        <div class="title-font" style="text-align: center; padding-bottom: 20px">
          <img
            src="assets/siteassets/flower.png"
            alt="flower"
            style="
              width: 15px;
              height: 15px;
              vertical-align: middle;
              margin-right: 10px;
              margin-bottom: 5px;
            "
          />
          <span style="font-weight: bold">SHOP SETS</span>
          <img
            src="assets/siteassets/flower.png"
            alt="flower"
            style="
              width: 15px;
              height: 15px;
              vertical-align: middle;
              margin-left: 10px;
              margin-bottom: 5px;
            "
          />
        </div>
        <!-- Home Bundle Section -->

        <div class="bundlediv">
          <div style="margin-top: 10px">
            <swiper
              :slides-per-view="1.2"
              :space-between="20"
              :initial-slide="0"
              :breakpoints="{
                640: { slidesPerView: 1.5, spaceBetween: 20 },
                1024: { slidesPerView: 2.5, spaceBetween: 30 },
              }"
              pagination
            >
              <swiper-slide v-for="product in images" :key="product.id">
                <ProductCard
                  :productid="product.productid"
                  :image="product.image"
                  :name="product.name"
                  :description="product.description"
                  :price="product.price"
                  :discount="product.discount"
                  :units="product.units"
                  :skintype="product.save"
                  :rating="product.rating"
                  :totalreviews="product.totalreviews"
                  @add-to-cart="handleAddToCart"
                  @change-quantity="updateQuantity"
                />
              </swiper-slide>
            </swiper>
          </div>
        </div>
        <q-tabs
          v-model="tab"
          inline-label
          :breakpoint="0"
          align="justify"
          class="folder-tabs bg-white text-purple"
          style="margin-top: 30px; margin-right: 20px; margin-left: 20px"
        >
          <q-tab name="mails" label="Serums" />
          <q-tab name="alarms" label="Moisturiser" />
          <q-tab v-if="$q.screen.gt.sm" name="facialoils" label="Facial Oils" />
          <q-tab v-if="$q.screen.gt.sm" name="lips" label="Lips" />
          <q-tab v-if="$q.screen.gt.sm" name="cleansers" label="Cleansers" />
          <q-btn-dropdown v-if="$q.screen.lt.md" auto-close stretch flat label="More...">
            <q-list>
              <q-item clickable @click="tab = 'facialoils'">
                <q-item-section>Facial Oils</q-item-section>
              </q-item>
              <q-item clickable @click="tab = 'lips'">
                <q-item-section>Lips</q-item-section>
              </q-item>
              <q-item clickable @click="tab = 'cleansers'">
                <q-item-section>Cleansers</q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </q-tabs>

        <q-tab-panels v-model="tab" animated class="q-mt-md">
          <q-tab-panel name="mails">
            <div class="q-pa-md">
              <swiper
                :slides-per-view="1.2"
                :space-between="20"
                :initial-slide="0"
                :breakpoints="{
                  640: { slidesPerView: 1.5, spaceBetween: 20 },
                  1024: { slidesPerView: 2.5, spaceBetween: 30 },
                }"
                pagination
              >
                <swiper-slide v-for="product in serums" :key="product.id">
                  <ProductCard
                    :productid="product.productid"
                    :image="product.image"
                    :name="product.name"
                    :description="product.description"
                    :price="product.price"
                    :discount="product.discount"
                    :units="product.units"
                    :skintype="product.skintype"
                    :rating="product.rating"
                    :totalreviews="product.totalreviews"
                    @add-to-cart="handleAddToCart"
                    @change-quantity="updateQuantity"
                  />
                </swiper-slide>
              </swiper>
            </div>
          </q-tab-panel>

          <q-tab-panel name="alarms">
            <div class="q-pa-md">
              <swiper
                :slides-per-view="1.2"
                :space-between="20"
                :initial-slide="0"
                :breakpoints="{
                  640: { slidesPerView: 1.5, spaceBetween: 20 },
                  1024: { slidesPerView: 2.5, spaceBetween: 30 },
                }"
                pagination
              >
                <swiper-slide v-for="product in creams" :key="product.id">
                  <ProductCard
                    :productid="product.productid"
                    :image="product.image"
                    :name="product.name"
                    :description="product.description"
                    :price="product.price"
                    :discount="product.discount"
                    :units="product.units"
                    :skintype="product.skintype"
                    :rating="product.rating"
                    :totalreviews="product.totalreviews"
                    @add-to-cart="handleAddToCart"
                    @change-quantity="updateQuantity"
                  />
                </swiper-slide>
              </swiper>
            </div>
          </q-tab-panel>

          <q-tab-panel name="facialoils">
            <div class="q-pa-md">
              <swiper
                :slides-per-view="1.2"
                :space-between="20"
                :initial-slide="0"
                :breakpoints="{
                  640: { slidesPerView: 1.5, spaceBetween: 20 },
                  1024: { slidesPerView: 2.5, spaceBetween: 30 },
                }"
                pagination
              >
                <swiper-slide v-for="product in facialoils" :key="product.id">
                  <ProductCard
                    :productid="product.productid"
                    :image="product.image"
                    :name="product.name"
                    :description="product.description"
                    :price="product.price"
                    :discount="product.discount"
                    :units="product.units"
                    :skintype="product.skintype"
                    :rating="product.rating"
                    :totalreviews="product.totalreviews"
                    @add-to-cart="handleAddToCart"
                    @change-quantity="updateQuantity"
                  />
                </swiper-slide>
              </swiper>
            </div>
          </q-tab-panel>

          <q-tab-panel name="lips">
            <div class="q-pa-md">
              <swiper
                :slides-per-view="1.2"
                :space-between="20"
                :initial-slide="0"
                :breakpoints="{
                  640: { slidesPerView: 1.5, spaceBetween: 20 },
                  1024: { slidesPerView: 2.5, spaceBetween: 30 },
                }"
                pagination
              >
                <swiper-slide v-for="product in lips" :key="product.id">
                  <ProductCard
                    :productid="product.productid"
                    :image="product.image"
                    :name="product.name"
                    :description="product.description"
                    :price="product.price"
                    :discount="product.discount"
                    :units="product.units"
                    :skintype="product.skintype"
                    :rating="product.rating"
                    :totalreviews="product.totalreviews"
                    @add-to-cart="handleAddToCart"
                    @change-quantity="updateQuantity"
                  />
                </swiper-slide>
              </swiper>
            </div>
          </q-tab-panel>

          <q-tab-panel name="cleansers">
            <div class="q-pa-md">
              <swiper
                :slides-per-view="1.2"
                :space-between="20"
                :initial-slide="0"
                :breakpoints="{
                  640: { slidesPerView: 1.5, spaceBetween: 20 },
                  1024: { slidesPerView: 2.5, spaceBetween: 30 },
                }"
                pagination
              >
                <swiper-slide v-for="product in cleansers" :key="product.id">
                  <ProductCard
                    :productid="product.productid"
                    :image="product.image"
                    :name="product.name"
                    :description="product.description"
                    :price="product.price"
                    :discount="product.discount"
                    :units="product.units"
                    :skintype="product.skintype"
                    :rating="product.rating"
                    :totalreviews="product.totalreviews"
                    @add-to-cart="handleAddToCart"
                    @change-quantity="updateQuantity"
                  />
                </swiper-slide>
              </swiper>
            </div>
          </q-tab-panel>
        </q-tab-panels>

        <!-- Image on the Left -->
        <div class="q-pa-md">
          <!-- Wrapper for Centering -->
          <div class="row justify-center items-center q-gutter-md">
            <!-- Image on the Left -->
            <div class="col-12 col-md-6 flex flex-center">
              <q-img
                src="assets/siteassets/mirror.jpg"
                alt="Example image"
                class="rounded-borders"
                style="
                  width: 400px;
                  height: 400px;
                  border-radius: 50%;
                  object-fit: cover;
                  margin: 10px;
                "
              />
            </div>

            <!-- Description on the Right -->
            <div
              class="col-11 col-md-6 column justify-between items-center"
              style="margin-bottom: 50px"
            >
              <div>
                <div
                  class="text-h5 q-mb-sm text-center"
                  style="
                    font-family: 'League Spartan', sans-serif;
                    font-weight: 700; /* Adjust for boldness if needed */
                    letter-spacing: -0.08em;
                  "
                >
                  YOU ARE ENOUGH
                </div>
                <div
                  class="text-body1 text-center"
                  style="
                    color: black;
                    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande',
                      'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
                    margin: 10px;
                    font-size: 13px;
                  "
                >
                  This beautifully hand designed mirror features the affirmation “You are enough” to
                  inspire self-love every time you look into it. Perfect for your vanity, desk, or
                  self-care space.<br />
                  <br />
                  R 150
                </div>
              </div>
              <q-btn
                label="Add To Cart"
                color="black"
                class="q-mt-md"
                @click="handleAddToCart(mirror)"
              />
            </div>
          </div>
        </div>

        <!-- About us Section -->
      </div>
    </q-page>
  </q-page-container>
</template>

<script>
import ProductCard from '../components/CardComponet.vue'
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
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/swiper-bundle.css'
import { ref } from 'vue'

export default {
  name: 'ProductList',
  components: { ProductCard, Swiper, SwiperSlide },
  data() {
    return {
      // Hardcoded product data
      tab: ref('mails'),
      products: [
        // {
        //   productid: 'holyglaze',
        //   name: 'The Holy Glaze',
        //   image: 'assets/siteassets/10.png',
        //   description: 'Even + Brighten Skin with Rice and Vitamin C',
        //   price: 325.0,
        //   discount: 0.0,
        //   units: 15,
        //   skintype: '',
        //   rating: 5,
        //   totalreviews: '1 reviews',
        // },

        // {
        //   productid: 'reglow',
        //   name: 'ReGlow',
        //   image: 'assets/siteassets/3.png',
        //   description: 'Plump + Ultra-hydrating with Tremella Mushroom',
        //   price: 169.0,
        //   discount: 259.0,
        //   units: 8,
        //   skintype: 'Normal - Dry Skin',
        //   rating: 4.5,
        //   totalreviews: '2 reviews',
        // },

        // {
        //   productid: 'repurify',
        //   name: 'RePurify',
        //   image: 'assets/siteassets/2.png',
        //   description: 'Pore Treament + Breakout Prevention moisturiser',
        //   price: 169.0,
        //   discount: 259.0,
        //   units: 8,
        //   skintype: 'Combination - Oily Skin',
        //   rating: 5,
        //   totalreviews: '1 reviews',
        // },
        {
          productid: 'resparkle',
          name: 'ReSparkle',
          image: '/assets/siteassets/resparkle/resparkle.png',
          description: 'Fine lines + Texture + Uneven tone waterbase formula',
          price: 259.0,
          discount: 0.0,
          units: 8,
          skintype: 'All Skin Types',
          rating: 5,
          totalreviews: '5 reviews',
        },
        {
          productid: 'rosa',
          name: 'Rosa',
          image: '/assets/siteassets/Rosa/rosa.png',
          description: 'Plump + Ultra-hydrating dewy serum with Tremella Mushroom',
          price: 289.0,
          discount: 0.0,
          units: 10,
          skintype: 'All Skin',
          rating: 4.5,
          totalreviews: '7 reviews',
        },
        {
          productid: 'rekindle',
          name: 'ReKindle',
          image: 'assets/siteassets/ReKindle/rekindle.png',
          description: 'Breakout Prevention Purifying Cleanser + Makeup Remover',
          price: 159.0,
          discount: 0.0,
          units: 10,
          skintype: 'Oily Skin',
          rating: 4,
          totalreviews: '1 reviews',
        },
        {
          productid: 'pretty',
          name: 'Pretty',
          image: 'assets/siteassets/Pretty/pretty.png',
          description: 'Hydrating + barrier-protecting + Glossy Shine Lip Oil',
          price: 109.0,
          discount: 0.0,
          units: 15,
          skintype: '',
          rating: 5,
          totalreviews: '4 reviews',
        },
      ],
      cleansers: [
        {
          productid: 'rekindle',
          name: 'ReKindle',
          image: 'assets/siteassets/ReKindle/rekindle.png',
          description: 'Breakout Prevention Purifying Cleanser + Makeup Remover',
          price: 159.0,
          discount: 0.0,
          units: 10,
          skintype: 'Oily Skin',
          rating: 4,
          totalreviews: '1 reviews',
        },
      ],
      lips: [
        {
          productid: 'pretty',
          name: 'Pretty',
          image: 'assets/siteassets/Pretty/pretty.png',
          description: 'Hydrating + barrier-protecting + Glossy Shine Lip Oil',
          price: 109.0,
          discount: 0.0,
          units: 15,
          skintype: '',
          rating: 5,
          totalreviews: '4 reviews',
        },
      ],
      facialoils: [
        {
          productid: 'holyglaze',
          name: 'The Holy Glaze',
          image: 'assets/siteassets/HolyGlaze/The Holy Glaze Facial Oil.png',
          description: 'Even + Brighten Skin with Rice and Vitamin C',
          price: 325.0,
          discount: 0.0,
          units: 15,
          skintype: '',
          rating: 5,
          totalreviews: '1 reviews',
        },
      ],
      mirror: {
        productid: 'mirror',
        name: 'You are enough mirror',
        image: 'assets/siteassets/mirror.jpg',
        description: 'Hand',
        price: 150.0,
        discount: 0.0,
        units: 15,
        skintype: '',
        rating: 5,
        totalreviews: '1 reviews',
      },
      creams: [
        {
          productid: 'reglow',
          name: 'ReGlow',
          image: 'assets/siteassets/Reglow/reglowcream.png',
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
          image: 'assets/siteassets/RePurify/repurifycream.png',
          description: 'Pore Treament + Breakout Prevention moisturiser',
          price: 259.0,
          discount: 0.0,
          units: 8,
          skintype: 'Combination - Oily Skin',
          rating: 5,
          totalreviews: '1 reviews',
        },
      ],
      serums: [
        {
          productid: 'resparkle',
          name: 'ReSparkle',
          image: '/assets/siteassets/resparkle/resparkle.png',
          description: 'Fine lines + Texture + Uneven tone',
          price: 259.0,
          discount: 0.0,
          units: 8,
          skintype: 'All Skin Types',
          rating: 5,
          totalreviews: '5 reviews',
        },
        {
          productid: 'rosa',
          name: 'Rosa',
          image: 'assets/siteassets/Rosa/rosa.png',
          description: 'Plump + Ultra-hydrating dewy serum with Tremella Mushroom',
          price: 289.0,
          discount: 0.0,
          units: 10,
          skintype: 'All Skin',
          rating: 4.5,
          totalreviews: '7 reviews',
        },
      ],
      images: [
        {
          productid: 'myturn',
          name: 'My Turn',
          image: 'assets/siteassets/sets/myturnbundle.png',
          description: 'Full Hydration Plump Combo',
          price: 667.0,
          discount: 924.0,
          units: 8,
          skintype: 'Combination',
          quantity: 1,
          save: 'SAVE 150',
          newprice: 700.0,
          rating: 0,
          totalreviews: '0 reviews',
        },
        {
          productid: 'therapyera',
          name: 'Therapy Era',
          image: 'assets/siteassets/sets/therapyera.png',
          description: 'Essential Hydrating Combo',
          price: 508.0,
          discount: 753.0,
          units: 8,
          skintype: 'Combination',
          quantity: 1,
          save: 'SAVE 150',
          newprice: 553.0,
          rating: 0,
          totalreviews: '0 reviews',
        },
        {
          productid: 'justagirl',
          name: 'Just A Girl',
          image: 'assets/siteassets/sets/justagirl.png',
          description: '2 x Hydrating Plump lip oils',
          price: 200.0,
          discount: 218.0,
          units: 8,
          skintype: 'Combination',
          quantity: 1,
          save: 'SAVE 18',
          newprice: 170.0,
          rating: 0,
          totalreviews: '0 reviews',
        },
      ],
      NEW: [
        {
          productid: 'holyglaze',
          name: 'The Holy Glaze',
          image: 'assets/siteassets/15.png',
          description: 'Even + Brighten',
          price: 325.0,
          discount: 0.0,
          units: 15,
          skintype: '',
          rating: 5,
          totalreviews: '1 reviews',
        },
        {
          productid: 'resparkle',
          name: 'ReSparkle',
          image: '/assets/siteassets/16.png',
          description: 'Fine lines + Texture',
          price: 259.0,
          discount: 0.0,
          units: 8,
          skintype: 'All Skin Types',
          rating: 5,
          totalreviews: '5 reviews',
        },
      ],
      blocks: [
        {
          productid: 'rekindle',
          name: 'ReKindle',
          image: 'assets/siteassets/4.png',
          description: 'Facial Cleanser',
          price: 159.0,
          discount: 0.0,
          units: 10,
          skintype: 'Oily Skin',
        },
        {
          productid: 'reglow',
          name: 'ReGlow',
          image: 'assets/siteassets/3.png',
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
          image: 'assets/siteassets/2.png',
          description: 'Facial Moisturiser',
          price: 169.0,
          discount: 259.0,
          units: 8,
          skintype: 'Combination - Oily Skin',
        },

        {
          productid: 'rosa',
          name: 'Rosa',
          image: 'assets/siteassets/5.png',
          description: 'Facial Serum',
          price: 289.0,
          discount: 0.0,
          units: 10,
          skintype: 'All Skin',
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
          units: 10,
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
          image: 'assets/siteassets/10.png',
          description: 'Even + Brighten',
          price: 325.0,
          discount: 0.0,
          units: 15,
          skintype: '',
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
    if (window.instgrm) {
      window.instgrm.Embeds.process()
    } else {
      // Otherwise, load the Instagram embed script
      const script = document.createElement('script')
      script.setAttribute('src', 'https://www.instagram.com/embed.js')
      script.onload = () => window.instgrm.Embeds.process()
      document.body.appendChild(script)
    }
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

.moving-progress::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.2) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0.2) 75%,
    transparent 75%,
    transparent
  );
  background-size: 50px 50px;
  animation: moveProgress 1s linear infinite;
}

@keyframes moveProgress {
  from {
    transform: translateX(-50px);
  }
  to {
    transform: translateX(50px);
  }
}

.folder-tabs .q-tab {
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  margin: 0 4px;
  background-color: #f4f4f4;
  transition: all 0.3s ease;
}

.folder-tabs .q-tab--active {
  background-color: white;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
  border-bottom: 2px solid white;
  z-index: 1;
}

.title-font {
  font-family: 'League Spartan', sans-serif;
  font-weight: 700; /* Adjust for boldness if needed */
  letter-spacing: -0.08em;
  font-size: 20px;
}

.socialmedia {
  height: 55%;
  object-fit: cover;
  padding: 0px !important;
}

.socialmediacontainer {
  max-width: 1600px;
  width: 90%;
  height: 510px;
  border-radius: 16px;
  overflow: hidden;
  background-color: #f5f5f5;
  margin-top: 50px;
  margin-bottom: 50px;
}

@media (max-width: 640px) {
  .socialmedia {
    height: 100%;
    object-fit: cover;
    padding: 0px !important;
  }

  .socialmediacontainer {
    width: 90%;
    height: 90%;
    margin-top: 50px;
    margin-bottom: 50px;

    margin-left: 5px;
  }
}
</style>
