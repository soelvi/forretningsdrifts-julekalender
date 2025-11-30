<template>
  <div class="countdown">
    <p>Det er <strong>{{ daysLeft }}</strong> dager igjen til julaften!</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Beregn antall dager igjen til julaften
const daysLeft = ref(0)

const now = new Date()

// Lag julaften for nåværende år
const currentYear = now.getFullYear()
let christmas = new Date(`${currentYear}-12-24T00:00:00+01:00`)

// Hvis julaften allerede er passert, bruk neste år
if (now > christmas) {
  christmas = new Date(`${currentYear + 1}-12-24T00:00:00+01:00`)
}

// Beregn forskjellen i dager (avrundet opp)
const diffTime = christmas - now
daysLeft.value = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
</script>

<style scoped>
.countdown {
  font-size: 1.5rem;
  text-align: center;
  padding: 1rem;
  color: #446955;
}
</style>
