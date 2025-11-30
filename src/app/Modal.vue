<template>
  <div class="modal-overlay" @click.self="close">

    <!-- FULLSCREEN -->
    <div 
      v-if="fullscreen" 
      class="fullscreen-overlay" 
      @click="closeFullscreen"
    >
      <img :src="images[currentIndex]" class="fullscreen-image" />
    </div>

    <!-- MODAL VINDU -->
    <div class="modal-content">
      <button class="close-btn" @click="close">×</button>

      <h2>Luke {{ day }}</h2>
      <p>{{ text }}</p>

      <!-- IMAGE VIEWER -->
      <div 
        class="image-viewer"
        v-if="images && images.length > 0"
        @touchstart="touchStart"
        @touchmove="touchMove"
        @touchend="touchEnd"
      >
        <img 
          :src="images[currentIndex]" 
          class="modal-image"
          @click="openFullscreen"
        />
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
  text: String,
  images: Array
});

const emit = defineEmits(["close"]);

const currentIndex = ref(0);
const fullscreen = ref(false);

// Reset når modal åpnes
watch(() => props.day, () => {
  currentIndex.value = 0;
  fullscreen.value = false;
});

/* FULLSCREEN */
function openFullscreen() {
  fullscreen.value = true;
}

function closeFullscreen() {
  fullscreen.value = false;
}

/* SWIPE */
let startX = 0;

function touchStart(e) {
  startX = e.touches[0].clientX;
}

function touchMove(e) {
  // optional feedback
}

function touchEnd(e) {
  const endX = e.changedTouches[0].clientX;
  const diff = endX - startX;

  if (diff > 60) {
    currentIndex.value =
      (currentIndex.value - 1 + props.images.length) %
      props.images.length;
  }

  if (diff < -60) {
    currentIndex.value =
      (currentIndex.value + 1) % props.images.length;
  }
}

/* LUKK */
function close() {
  emit("close");
}
</script>


<style scoped>
/* ------------------------
   MODAL OVERLAY
------------------------ */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.45);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

/* ------------------------
   MODAL BOX
------------------------ */
.modal-content {
  width: 90%;
  max-width: 700px;
  max-height: 80vh;
  padding: 2rem;
  background: #a57a5aed;
  border-radius: 16px;
  border: 2px solid rgba(255,255,255,0.3);
  overflow-y: auto;
  text-align: center;
  color: #fff9e6;
  position: relative;
}

/* Close-knapp */
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

/* ------------------------
   IMAGE VIEWER
------------------------ */
.image-viewer {
  margin-top: 1rem;
  position: relative;
}

.modal-image {
  width: 100%;
  max-height: 50vh;
  object-fit: contain;
  border-radius: 10px;
  cursor: pointer;
  background: rgba(0,0,0,0.2);
}

.image-counter {
  margin-top: 0.4rem;
  font-size: 1rem;
  opacity: 0.8;
}

/* ------------------------
   FULLSCREEN MODUS
------------------------ */
.fullscreen-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.85);
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
</style>
