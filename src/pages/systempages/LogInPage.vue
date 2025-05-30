<template>
  <q-page-container class="q-pa-md gradient-bg" style="padding-top: 0px; padding-bottom: 10px">
    <q-page class="q-pa-md gradient-bg flex flex-center">
      <q-card class="q-ma-md">
        <q-card-section>
          <div class="text-h6 title-font-mindcare">Login</div>
        </q-card-section>

        <q-card-section>
          <q-input
            filled
            v-model="email"
            label="Email"
            type="email"
            :error="emailError"
            :error-message="emailErrorMessage"
          />
        </q-card-section>

        <q-card-section>
          <q-input
            filled
            v-model="password"
            label="Password"
            type="password"
            :error="passwordError"
            :error-message="passwordErrorMessage"
          />
        </q-card-section>

        <q-card-actions>
          <q-btn
            flat
            label="Login"
            class="add-to-cart-button2"
            @click="handleLogin"
            :loading="loading"
          />
          <q-btn label="Sign Up" flat @click="goToSignUp" />
        </q-card-actions>
      </q-card>
    </q-page>
  </q-page-container>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth, googleProvider } from '../../firebase' // Import the Google provider
import { signInWithPopup } from 'firebase/auth'

export default {
  setup() {
    const email = ref('')
    const password = ref('')
    const loading = ref(false)
    const emailError = ref(false)
    const passwordError = ref(false)
    const emailErrorMessage = ref('')
    const passwordErrorMessage = ref('')
    const store = useStore()
    const router = useRouter()

    const handleLogin = async () => {
      emailError.value = false
      passwordError.value = false
      emailErrorMessage.value = ''
      passwordErrorMessage.value = ''

      // Validate email and password
      if (!email.value || !password.value) {
        if (!email.value) {
          emailError.value = true
          emailErrorMessage.value = 'Email is required'
        }
        if (!password.value) {
          passwordError.value = true
          passwordErrorMessage.value = 'Password is required'
        }
        return
      }

      loading.value = true

      try {
        const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value)
        store.commit('auth/SET_USER', userCredential.user)
        router.push({ name: 'Home' }) // Redirect to a secure page after login
      } catch (error) {
        console.error('Error signing in:', error)
        if (error.code === 'auth/user-not-found') {
          emailError.value = true
          emailErrorMessage.value = 'User not found'
        } else if (error.code === 'auth/wrong-password') {
          passwordError.value = true
          passwordErrorMessage.value = 'Incorrect password'
        }
      } finally {
        loading.value = false
      }
    }

    const handleGoogleLogin = async () => {
      try {
        const result = await signInWithPopup(auth, googleProvider) // Use the Google provider to sign in
        const user = result.user
        store.commit('auth/SET_USER', user) // Set user in Vuex state
        router.push({ name: 'Home' })
      } catch (error) {
        console.error('Google login error:', error)
      }
    }

    const goToSignUp = () => {
      router.push({ name: 'Signup' }) // Redirect to the signup page
    }

    return {
      email,
      password,
      loading,
      emailError,
      passwordError,
      emailErrorMessage,
      passwordErrorMessage,
      handleLogin,
      handleGoogleLogin,
      goToSignUp,
    }
  },
}
</script>

<style scoped>
.q-page-container,
.q-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh; /* Full viewport height */
}

.q-card {
  width: 400px; /* Card width */
}

.add-to-cart-button2 {
  color: black;
  border: solid 1px black; /* Same border style */
  border-radius: 3px;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva,
    Verdana, sans-serif;
  font-size: 12px; /* Unified font size */
  height: 40px; /* Button height */
  padding: 7.6px 10px; /* Padding for bigger buttons */
  box-shadow: none !important; /* Remove default shadow */
  background-color: white;

  padding-right: 20px;
  padding-left: 20px;
  margin-right: 0px;
}

.title-font-mindcare {
  font-family: 'League Spartan', sans-serif;
  font-weight: 700; /* Adjust for boldness if needed */
  letter-spacing: -0.08em;
  font-size: 40px;
  text-align: center;
  color: #000000;
  margin-top: 10px;
  line-height: 1;
  padding-left: 10px;
  margin-right: 1px;
}

@media (max-width: 640px) {
  .q-card {
    width: 300px; /* Card width */
  }
}
</style>
