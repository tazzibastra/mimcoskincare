import { auth } from '../firebase'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'

export default {
  namespaced: true,
  state: {
    user: null,
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user
    },
    CLEAR_USER(state) {
      state.user = null
    },
  },
  actions: {
    async login({ commit }, { email, password }) {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      commit('SET_USER', userCredential.user)
    },
    async signup({ commit }, { email, password }) {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      commit('SET_USER', userCredential.user)
    },
    async logout({ commit }) {
      await signOut(auth)
      commit('CLEAR_USER')
    },
    initializeAuth({ commit }) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          commit('SET_USER', user)
        } else {
          commit('CLEAR_USER')
        }
      })
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.user,
    getUser: (state) => state.user,
  },
}
