<template>
  <div class="modal-overlay" @click.self="close">

    <!-- FULLSCREEN IMAGE -->
    <div v-if="fullscreen" class="fullscreen-overlay" @click="closeFullscreen">
      <img :src="images[currentIndex]" class="fullscreen-image" />
    </div>

    <!-- MODAL BOX -->
    <div class="modal-content">
      <button class="close-btn" @click="close">×</button>

      <h2>Luke {{ day }}</h2>
      <h3 class="modal-subtitle" v-if="subtitle">{{ subtitle }}</h3>
      <p v-if="text">{{ text }}</p>

      <!-- VIDEO / HTML CONTENT -->
      <div v-if="content" class="modal-html" v-html="content"></div>

      <!-- IMAGE VIEWER -->
      <div v-if="images && images.length" class="image-viewer" @touchstart="touchStart" @touchend="touchEnd">
        <button v-if="images.length > 1" class="nav-btn prev" @click.stop="prevImage">‹</button>

        <img :src="images[currentIndex]" class="modal-image" @click="openFullscreen" />

        <button v-if="images.length > 1" class="nav-btn next" @click.stop="nextImage">›</button>

        <div class="image-counter">
          {{ currentIndex + 1 }} / {{ images.length }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  day: Number,
  subtitle: String,
  text: String,
  content: String,
  images: { type: Array, default: () => [] }
});

const emit = defineEmits(["close"]);

const currentIndex = ref(0);
const fullscreen = ref(false);

/* Reset når modal åpnes */
watch(() => props.day, () => {
  currentIndex.value = 0;
  fullscreen.value = false;
});

/* FULLSCREEN IMAGE */
function openFullscreen() { fullscreen.value = true; }
function closeFullscreen() { fullscreen.value = false; }

/* BILDE-NAVIGASJON */
function nextImage() {
  currentIndex.value = (currentIndex.value + 1) % props.images.length;
}

function prevImage() {
  currentIndex.value =
    (currentIndex.value - 1 + props.images.length) % props.images.length;
}

/* SWIPE */
let startX = 0;
function touchStart(e) {
  startX = e.changedTouches[0].clientX;
}
function touchEnd(e) {
  const diff = e.changedTouches[0].clientX - startX;

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
  overflow-x: hidden;
  /* Hindrer scroll til siden */
}

/* -------------------------------
   MODAL BOX
--------------------------------*/
.modal-content {
  width: 95%;
  max-width: 900px;
  /* bredere modal */
  max-height: 85vh;
  padding: 2rem;
  background: #a57a5aed;
  border-radius: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  overflow-y: auto;
  overflow-x: hidden;
  /* viktig: ingen scroll til siden */
  text-align: center;
  position: relative;
  animation: slideUp 0.25s ease forwards;
}

.modal-subtitle {
  margin: 0.3rem 0;
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--paper);
}

.modal-content p {
  color: var(--paper);
}

/* -------------------------------
   CLOSE BUTTON
--------------------------------*/
.close-btn {
  position: absolute;
  top: 0.6rem;
  right: 0.8rem;
  background: none;
  border: none;
  font-size: 2rem;
  color: #fff9e6;
  cursor: pointer;
  z-index: 10;
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

/* NAV BUTTONS */
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
  color: #a57a5a;
  backdrop-filter: blur(5px);
  z-index: 5;
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
   FULLSCREEN IMAGE
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
   VIDEO / HTML CONTENT
--------------------------------*/
.modal-html {
  margin-top: 1.5rem;
  width: 100%;
  overflow: hidden;
  /* hindrer horisontal scroll */
}

.modal-html iframe {
  width: 100% !important;
  height: auto;
  aspect-ratio: 16/9;
  /* sørger for riktig proporsjon */
  border: 0;
  display: block;
  border-radius: 12px;
  background: black;
}

/* -------------------------------
   ANIMATIONS
--------------------------------*/
@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(30px);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
