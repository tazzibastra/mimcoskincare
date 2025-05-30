import { createStore } from 'vuex'
import auth from './auth' // Adjust the path if needed
import cart from './cart' // Add this line

const store = createStore({
  modules: {
    auth, // Register your `auth` module
    cart, // Register your `cart` module
  },
})

export default store
