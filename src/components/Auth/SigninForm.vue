<template>
  <form @submit.prevent="handleSignup">
    <input v-model="email" type="email" placeholder="Email" required />
    <input v-model="password" type="password" placeholder="Password" required />
    <button type="submit">Signup</button>
  </form>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    ...mapActions('auth', ['signup']),
    async handleSignup() {
      try {
        await this.signup({ email: this.email, password: this.password })
        this.$router.push('/checkout') // Redirect after signup
      } catch (error) {
        console.error('Signup failed:', error)
      }
    },
  },
}
</script>
