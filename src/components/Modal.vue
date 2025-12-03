<template>
  <div class="modal-overlay" @click.self="close">

    <!-- GLITTER EXPLOSION -->
    <div class="glitter-container" v-if="showGlitter">
      <div v-for="n in 40" :key="n" class="glitter"></div>
    </div>

    <!-- FULLSCREEN IMAGE -->
    <div v-if="fullscreen" class="fullscreen-overlay" @click="closeFullscreen">
      <img :src="images[currentIndex]" class="fullscreen-image" />
    </div>

    <!-- MODAL -->
    <div class="modal-content">

      <!-- CLOSE BUTTON -->
      <button class="close-btn" @click="close">×</button>

      <h2>Luke {{ day }}</h2>
      <h3 class="modal-subtitle">{{ subtitle }}</h3>
      <p>{{ text }}</p>

      <!-- IMAGE VIEWER -->
      <div v-if="images && images.length" class="image-viewer" @touchstart="touchStart" @touchend="touchEnd">

        <!-- PREV BUTTON (desktop only) -->
        <button v-if="images.length > 1" class="nav-btn prev" @click.stop="prevImage">‹</button>

        <img :src="images[currentIndex]" class="modal-image" @click="openFullscreen" />

        <!-- NEXT BUTTON (desktop only) -->
        <button v-if="images.length > 1" class="nav-btn next" @click.stop="nextImage">›</button>

        <div class="image-counter">
          {{ currentIndex + 1 }} / {{ images.length }}
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  day: Number,
  subtitle: String,
  text: String,
  images: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(["close"]);

const currentIndex = ref(0);
const fullscreen = ref(false);

// Glitter
const showGlitter = ref(false);

watch(() => props.day, () => {
  currentIndex.value = 0;
  fullscreen.value = false;

  // Trigger glitter burst
  showGlitter.value = true;
  setTimeout(() => (showGlitter.value = false), 1500);
});

/* FULLSCREEN */
function openFullscreen() {
  fullscreen.value = true;
}

function closeFullscreen() {
  fullscreen.value = false;
}

/* IMAGE NAVIGATION DESKTOP */
function nextImage() {
  currentIndex.value = (currentIndex.value + 1) % props.images.length;
}

function prevImage() {
  currentIndex.value =
    (currentIndex.value - 1 + props.images.length) %
    props.images.length;
}

/* SWIPE MOBILE */
let startX = 0;

function touchStart(e) {
  startX = e.changedTouches[0].clientX;
}

function touchEnd(e) {
  const diff = e.changedTouches[0].clientX - startX;

  if (!props.images.length) return;

  if (diff > 60) prevImage();
  if (diff < -60) nextImage();
}

/* CLOSE */
function close() {
  emit("close");
}
</script>

<style scoped>
/* -------------------------------
   OVERLAY 
--------------------------------*/
.modal-overlay {
  position: fixed;
  inset: 0;
  background: #a57a5a48;
  backdrop-filter: blur(3px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  animation: fadeIn 0.2s ease forwards;
}

/* -------------------------------
   MODAL BOX
--------------------------------*/
.modal-content {
  width: 90%;
  max-width: 700px;
  max-height: 80vh;
  padding: 2rem;
  background: #a57a5aed;
  border-radius: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  overflow-y: auto;
  text-align: center;
  position: relative;
  animation: slideUp 0.25s ease forwards;
  overflow: hidden;
}

.modal-content p {
  color: var(--paper)
}

.modal-subtitle {
  margin-top: 0.2rem;
  margin-bottom: 0.2rem;
  font-size: 1.5rem;
  font-weight: 500;
  color: var(--paper)
}

.close-btn {
  position: absolute;
  top: 0.6rem;
  right: 0.8rem;
  background: none;
  border: none;
  font-size: 2rem;
  color: #fff9e6;
  cursor: pointer;
}

/* -------------------------------
   IMAGE VIEWER
--------------------------------*/
.image-viewer {
  margin-top: 1rem;
  position: relative;
}

.modal-image {
  width: 100%;
  max-height: 50vh;
  object-fit: fill;
  border-radius: 10px;
  cursor: pointer;
  background: rgba(0, 0, 0, 0.2);
}

.image-counter {
  margin-top: 0.4rem;
  font-size: 1rem;
  opacity: 0.8;
}

/* -------------------------------
   PREV/NEXT BUTTONS (desktop)
--------------------------------*/
.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.35);
  border: none;
  font-size: 3rem;
  padding: 0 12px;
  cursor: pointer;
  border-radius: 8px;
  color: #a57a5aed;
  backdrop-filter: blur(5px);
  transition: background 0.2s;
  z-index: 5;
}

.nav-btn:hover {
  background: rgba(255, 255, 255, 0.55);
}

.prev {
  left: -10px;
}

.next {
  right: -10px;
}

@media (max-width: 700px) {
  .nav-btn {
    display: none;
  }
}

/* -------------------------------
   FULLSCREEN
--------------------------------*/
.fullscreen-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3000;
}

.fullscreen-image {
  width: 95%;
  height: 95%;
  object-fit: contain;
  border-radius: 10px;
}

/* -------------------------------
   GLITTER EXPLOSION
--------------------------------*/
.glitter-container {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 5000;
}

.glitter {
  position: absolute;
  width: 6px;
  height: 6px;
  background: white;
  border-radius: 50%;
  animation: glitterPop 1.2s ease-out forwards;
  opacity: 0.8;
}

/* Random placement for explosion */
.glitter:nth-child(n) {
  left: 50%;
  top: 50%;
}

/* Glitter animation */
@keyframes glitterPop {
  0% {
    transform: translate(0, 0) scale(1);
    opacity: 0.9;
  }

  100% {
    transform: translate(calc(-100px + 200px * var(--rx)),
        calc(-100px + 200px * var(--ry))) scale(0);
    opacity: 0;
  }
}

/* Generate random directions */
.glitter {
  --rx: calc((random() - 0.5));
  --ry: calc((random() - 0.5));
}

/* -------------------------------
   ANIMATIONS
--------------------------------*/
@keyframes fadeIn {
  from {
    opacity: 0
  }

  to {
    opacity: 1
  }
}

@keyframes slideUp {
  from {
    transform: translateY(30px);
    opacity: 0
  }

  to {
    transform: translateY(0);
    opacity: 1
  }
}
</style>
   