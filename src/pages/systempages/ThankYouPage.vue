<template>
  <q-page-container class="flex flex-center">
    <q-page class="flex flex-center">
      <!-- Coming Soon Image -->
      <q-img
        :src="product"
        alt="Coming Soon"
        spinner-color="primary"
        class="coming-soon-img"
        loading="lazy"
      />

      <canvas ref="confettiCanvas" class="confetti-canvas"></canvas>
    </q-page>
  </q-page-container>
</template>

<script>
import confetti from 'canvas-confetti'
import product1 from '/assets/siteassets/thankyoucard1.png'
export default {
  data() {
    return {
      product: product1,
    }
  },
  mounted() {
    this.startConfetti()
  },
  methods: {
    startConfetti() {
      const canvas = this.$refs.confettiCanvas
      if (!canvas) return

      const myConfetti = confetti.create(canvas, { resize: true })

      const duration = 5 * 1000 // 5 seconds of confetti
      const end = Date.now() + duration

      const frame = () => {
        myConfetti({
          particleCount: 7,
          spread: 100,
          startVelocity: 50, // Faster fall
          gravity: 1, // Ensures confetti falls all the way down
          ticks: 200, // Confetti stays visible longer
          origin: {
            x: Math.random(), // Spread across the width
          },
          colors: ['#000000'], // Black confetti
        })

        if (Date.now() < end) {
          requestAnimationFrame(frame)
        }
      }

      frame()
    },
  },
}
</script>

<style scoped>
.confetti-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 5;
}

.coming-soon-img {
  padding: 300px;
  margin-left: 10px;
}

@media (max-width: 650px) {
  .coming-soon-img {
    padding: 250px;
  }
}
</style>
