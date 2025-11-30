<template>
  <div 
    class="luke" 
    :class="{ open: isOpen, locked: isLocked }"
    @click="handleClick"
  >
  <div v-if="isLocked" class="locked-overlay"></div>
  
  <div class="front">{{ day }}</div>
  
  <div class="back">
    <div class="pattern"></div>
    <span class="content">🎁</span>
  </div>
  </div>

</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  day: Number,
  isOpen: Boolean
})

const emit = defineEmits(['open', 'showModal'])

/* -----------------------------------------
   LOCK-LOGIKK: 
   Luken åpnes kun hvis:
   - dagens dato >= luke-nummer
   - og klokken er >= 11:30
------------------------------------------ */
const isLocked = computed(() => {
  const now = new Date()

  const currentDay = now.getDate()
  const currentHour = now.getHours()
  const currentMinute = now.getMinutes()

  // Luken er i framtiden
  if (props.day > currentDay) return true

  // Luken er i dag → sjekk klokkeslett
  if (props.day === currentDay) {
    if (currentHour < 11) return true
    if (currentHour === 11 && currentMinute < 30) return true
  }

  // Ellers er luken åpen
  return false
})


/* -----------------------------------------
   Håndtering av klikk på luke
------------------------------------------ */
function handleClick() {
  // Ikke åpne hvis dato eller tid ikke tillater det
  if (isLocked.value) return

  // Åpne luke (flippe-animasjon)
  emit('open', props.day)

  // Vent til animasjonen er ferdig før modal
  setTimeout(() => {
    emit('showModal', props.day)
  }, 2500)
}
</script>


<style scoped>
.luke {
  position: relative;
  width: 100%;
  aspect-ratio: 1/1;
  perspective: 1200px;
  cursor: pointer;
}

/* --- FRONT (døren) --- */
.front {
  position: absolute;
  inset: 0;
  background: #446955;
  color: white;
  border-radius: 10px;

  /* Papprive kant (avrevet papp-effekt) */
  border: 3px dashed rgba(255,255,255,0.8);
  box-shadow: inset 0 0 6px rgba(0,0,0,0.4), 0 0 0 rgba(0,0,0,0);

  font-size: 2.8rem;
  font-weight: bold;

  display: flex;
  align-items: center;
  justify-content: center;

  transform-origin: left center;
  transform: rotateY(0deg);

  transition: transform 2.5s ease, box-shadow 0.4s ease;
  backface-visibility: hidden;
  z-index: 3;
}

/* Hover glød */
.luke:not(.open):hover .front {
  box-shadow: inset 0 0 6px rgba(0,0,0,0.4), 0 0 14px rgba(255,255,255,0.7);
}

/* Når døren åpnes */
.luke.open .front {
  transform: rotateY(-100deg);
  box-shadow: inset 0 0 8px rgba(0,0,0,0.3), 
              -15px 0 25px rgba(0,0,0,0.4); /* skygge bak døren */
}


/* --- BACK (fast plate) --- */
.back {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  
  border: 3px dashed rgba(62, 61, 61, 0.8);
  border-radius: 10px;
  overflow: hidden; /* viktig: holder motivet inni */

  display: flex;
  align-items: center;
  justify-content: center;

  background: #F9F3E9;
  z-index: 1;
}

/* JULEMØNSTER */
.pattern {
  position: absolute;
  inset: 0;
  opacity: 0.22;
  background-size: 120px;
  background-repeat: repeat;
  pointer-events: none;

  /* JULEMOTIV – du kan bytte enkelt! */
  /* background-image: url('https://i.imgur.com/j4CKEOl.png');  */
  /* Dette er søte små juletrær 🎄 */
}

/* Innholdet oppå motivet */
.content {
  position: relative;
  z-index: 2;
  font-size: 2rem;
}

.locked-overlay {
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.15); /* halvtransparent hvit */
  backdrop-filter: blur(1px); /* subtil frost */
  border-radius: 10px;
  z-index: 4; /* Ligger over fronten */
  pointer-events: none; /* Klikk går fremdeles til .luke */
}




</style>
