<template>
  <div id="app">
    <!-- Resten av appen -->
    <RouterView />

    <!-- Snø som bakgrunn -->
    <div class="snowflakes" aria-hidden="true">
      <div class="snowflake" v-for="n in 50" :key="n" :style="generateSnowflakeStyle()">
        <img src="/images/logo_hvit.svg" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup>
function generateSnowflakeStyle() {
  const left = Math.random() * 100 + '%'
  const duration = 5 + Math.random() * 5 + 's'
  const delay = Math.random() * 5 + 's'
  const scale = 0.1 + Math.random() * 0.8; // justere størrelse
  return {
    left,
    animationDuration: duration,
    animationDelay: delay,
    '--flake-scale': scale,
    
  }
}
</script>

<style>
@import '../style/reset.css';
@import '../style/variables.css';
@import '../style/fonts.css';
@import '../style/style.css';

/* Snøen dekker hele siden */
.snowflakes {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none; /* Klikk går gjennom snø */
  overflow: hidden;
  z-index: 9999; /* Sørg for at den ligger over alt annet */
}

.snowflake img {
  width: 20px;
  height: auto;
  transform: scale(var(--flake-scale, 1));
}

.snowflake {
  position: absolute;
  top: -2rem;
  color: #fff;
  opacity: 0.5;
  user-select: none;
  animation-name: fall;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

@keyframes fall {
  0% { transform: translateY(-2rem) rotate(0deg); opacity: 0.8; }
  100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
}
</style>
