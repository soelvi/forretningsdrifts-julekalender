<template>
  <div class="luke" :class="{ open: isOpen, locked: isLocked }" @click="handleClick">
    <div v-if="isLocked" class="locked-overlay"></div>

    <div class="front">{{ day }}</div>

    <div class="back">
      <div class="pattern"></div>
      <img class="luke-image" :src="`/images/luker/${day}.png`" :alt="`Bilde for luke ${day}`" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  day: Number,
  isOpen: Boolean
});

const emit = defineEmits(['open', 'showModal']);

/* ----------------------------------------------------
   LOGIKK: LUKEN ÅPNES KUN ETTER DATO + 11:30
----------------------------------------------------- */
const isLocked = computed(() => {
  const now = new Date();
  const d = now.getDate();
  const h = now.getHours();
  const m = now.getMinutes();

  if (props.day > d) return true;

  if (props.day === d) {
    if (h < 11) return true;
    if (h === 11 && m < 40) return true;
  }

  return false;
});

/* ----------------------------------------------------
   KLIKK PÅ LUKE
----------------------------------------------------- */
function handleClick() {
  if (isLocked.value) return;

  emit('open', props.day);

  // vent på flip-animasjon før modal åpnes
  setTimeout(() => {
    emit('showModal', props.day);
  }, 2500);
}
</script>

<style scoped>
.luke {
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  perspective: 1200px;
  cursor: pointer;
  font-size: clamp(1.2rem, 3vw, 2.8rem);

  /* ❗️ IKKE animasjon her – Home.vue styrer det */
}

.luke-image {
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
  object-fit: contain;
  pointer-events: none;
}

/* --- FRONT --- */
.front {
  position: absolute;
  inset: 0;
  background: #446955;
  color: var(--cream);

  border-radius: clamp(5px, 1vw, 12px);
  border: 3px dashed rgba(255, 255, 255, 0.8);

  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.4);

  display: flex;
  align-items: center;
  justify-content: center;

  transform-origin: left center;
  transform: rotateY(0deg);
  transition: transform 2.5s ease, box-shadow 0.4s ease;

  backface-visibility: hidden;
  z-index: 3;
}

.luke:not(.open):hover .front {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.4), 0 0 14px rgba(255, 255, 255, 0.7);
}

.luke.open .front {
  transform: rotateY(-100deg);
  box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.3), -15px 0 25px rgba(0, 0, 0, 0.4);
}

/* --- BACK --- */
.back {
  position: absolute;
  inset: 0;
  border: 3px dashed rgba(62, 61, 61, 0.8);
  border-radius: 10px;
  background: var(--cream);

  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  z-index: 1;
}

.pattern {
  position: absolute;
  inset: 0;
  opacity: 0.22;
  background-size: 120px;
  background-repeat: repeat;
}

.content {
  z-index: 2;
  font-size: 2rem;
}

/* --- LOCKED LOOK --- */
.locked-overlay {
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.15);
  /* backdrop-filter: blur(1px); */
  border-radius: 10px;
  z-index: 4;
  pointer-events: none;
}
</style>
