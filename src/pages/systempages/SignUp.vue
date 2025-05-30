<template>
  <div class="sign-up-container">
    <h2 class="title-font-mindcare">Sign Up</h2>

    <form @submit.prevent="handleSignUp" v-if="!socialLogin">
      <div>
        <label for="username">Email</label>
        <input
          v-model="username"
          type="email"
          id="username"
          required
          :class="{ 'is-invalid': !isValidEmail(username) && username !== '' }"
        />
        <p v-if="username && !isValidEmail(username)" style="color: red">
          Please enter a valid email address.
        </p>
      </div>
      <div>
        <label for="password">Password</label>
        <input v-model="password" type="password" id="password" required />
      </div>
      <button class="add-to-cart-button2" type="submit">Sign Up</button>
    </form>

    <div v-if="loading">Loading...</div>
  </div>
</template>

<script>
import { auth, googleProvider } from '../../firebase' // Adjust path as needed
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { signInWithPopup } from 'firebase/auth'

export default {
  data() {
    return {
      username: '',
      password: '',
      loading: false,
      socialLogin: false,
    }
  },
  methods: {
    handleSignUp() {
      this.loading = true
      createUserWithEmailAndPassword(auth, this.username, this.password)
        .then((userCredential) => {
          // Handle successful sign-up
          this.loading = false
          console.log('User signed up', userCredential)
          this.$router.push('/')
        })
        .catch((error) => {
          this.loading = false
          console.error('Error signing up', error.message)
        })
    },
    isValidEmail(email) {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      return emailRegex.test(email)
    },
    googleSignIn() {
      this.socialLogin = true
      this.loading = true
      signInWithPopup(auth, googleProvider)
        .then((result) => {
          // Handle successful login
          this.loading = false
          console.log('Google login successful', result.user)
          this.$router.push('/')
        })
        .catch((error) => {
          this.loading = false
          console.error('Error signing in with Google', error.message)
        })
    },
  },
}
</script>

<style scoped>
.sign-up-container {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: white;
  margin-top: 20px;
  margin-bottom: 20px;
}

@media (max-width: 640px) {
  .sign-up-container {
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: white;
    margin-top: 60px;
    margin-bottom: 20px;
  }
}

button {
  background-color: #f7adbe;
  color: white;
  padding: 10px;
  width: 100%;
  border: none;
  cursor: pointer;
  margin: 10px 0;
}

button:hover {
  background-color: #f7adbe;
}

input {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 4px;
  border: 1px solid #ccc;
}

h2 {
  text-align: center;
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
</style>
