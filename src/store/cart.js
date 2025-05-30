export default {
  namespaced: true,
  state: {
    cart: [],
    cartCount: 0,
  },
  getters: {
    cartCount: (state) => state.cart.reduce((total, item) => total + item.units, 0),
    cart: (state) => state.cart,
    totalAmount: (state) => state.totalAmount,
  },
  mutations: {
    addToCart(state, item) {
      const existingItem = state.cart.find((i) => i.id === item.id)
      if (existingItem) {
        existingItem.units += item.units
      } else {
        state.cart.push(item)
      }
    },
    incrementItemUnits(state, itemId) {
      const existingItem = state.cart.find((i) => i.id === itemId)
      if (existingItem) {
        existingItem.units += 1
      }
    },
    decrementItemUnits(state, itemId) {
      const existingItem = state.cart.find((i) => i.id === itemId)
      if (existingItem) {
        existingItem.units += -1
      }
    },
    removeFromCart(state, itemId) {
      console.log('Cart before removal:', state.cart)
      console.log('Cart before removal item id:', itemId)
      state.cart = state.cart.filter((item) => item.id !== itemId)
      console.log('Cart after removal:', state.cart)
    },
    clearCart(state) {
      state.cart = []
    },
    updateCartCount(state) {
      state.cartCount = state.cart.reduce((total, item) => total + item.units, 0)
    },
    setCart(state, cart) {
      state.cart = cart
    },
    setTotalAmount(state, amount) {
      state.totalAmount = amount
    },
  },
  actions: {
    addToCart({ commit }, item) {
      commit('addToCart', item)
      commit('updateCartCount')
    },
    incrementItemUnits({ commit }, itemId) {
      commit('incrementItemUnits', itemId)
      commit('updateCartCount')
    },
    decrementItemUnits({ commit }, itemId) {
      commit('decrementItemUnits', itemId)
      commit('updateCartCount')
    },
    removeFromCart({ commit }, itemId) {
      commit('removeFromCart', itemId)
      commit('updateCartCount')
    },
    clearCart({ commit }) {
      commit('clearCart')
      commit('updateCartCount')
    },
    setCart({ commit }, cart) {
      commit('setCart', cart)
      commit('updateCartCount')
    },
    updateTotalAmount({ commit }, amount) {
      commit('setTotalAmount', amount)
    },
  },
}
