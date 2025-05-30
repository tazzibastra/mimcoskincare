<template>
  <q-layout>
    <router-view />
  </q-layout>
</template>

<script>
import { useStore } from 'vuex'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const store = useStore()
    const router = useRouter()

    // Watch Firebase auth state
    onAuthStateChanged(auth, (user) => {
      if (user) {
        store.commit('auth/SET_USER', user)
        if (router.currentRoute.value.name === 'Login') {
          router.push({ name: 'Home' })
        }
      } else {
        store.commit('auth/CLEAR_USER')
        // if (router.currentRoute.value.name !== 'Login') {
        //   router.push({ name: 'Login' })
        // }
      }
    })

    return {}
  },
}
</script>
