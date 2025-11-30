<template>
  <div class="home">
    <!-- HEADER -->
    <Header class="top-header" />

    <!-- GRID MED LUKER INNI HUSET -->
    <div class="luke-grid">
      <Luke v-for="(day, i) in shuffledDays" :key="day" :day="day" :isOpen="openDays.includes(day)" class="luke-anim"
        :style="{ animationDelay: (i * 0.12) + 's' }" @open="openDay" @showModal="openModal" />
    </div>

    <!-- COUNTDOWN NÅ UNDER LUKENE -->
    <Countdown class="countdown-under" />

    <!-- LENKE TIL GÅRSDAGENS SVAR -->
    <div class="answers-link">
      <router-link to="/svar">→ Se svar på løste oppgaver</router-link>
    </div>

    <!-- MODAL -->
    <Modal v-if="activeModalDay" :day="activeModalDay" :subtitle="activeSubtitle" :text="activeText"
      :images="activeImages" @close="closeModal" />

  </div>

</template>

<script>
import Header from '@/components/Header.vue'
import Countdown from '@/components/Countdown.vue'
import Luke from '@/components/Luke.vue'
import Modal from '@/components/Modal.vue'

export default {
  components: {
    Header,
    Countdown,
    Luke,
    Modal
  },

  data() {
    return {
      openDays: [],
      activeModalDay: null,
      activeText: '',
      activeImages: [],
      activeSubtitle: '',

      luker: [
        { number: 1, subtitle: 'Velkommen til årets julekalender!', text: 'Vi starter desember med en emoji-quiz ✨ Gjett filmen!', images: ['/images/emoji/emoji1.png', '/images/emoji/emoji2.png', '/images/emoji/emoji3.png', '/images/emoji/emoji4.png', '/images/emoji/emoji5.png', '/images/emoji/emoji6.png', '/images/emoji/emoji7.png', '/images/emoji/emoji8.png', '/images/emoji/emoji9.png', '/images/emoji/emoji10.png', '/images/emoji/emoji11.png', '/images/emoji/emoji12.png', '/images/emoji/emoji13.png',] },
        { number: 2, subtitle: 'Mitt skip er lastet med..', text: 'hhh', images: [] },
        { number: 3, text: 'Fortell én ting du gleder deg til 😊', images: [] },
        { number: 4, text: 'Syng en julesang 🎶', images: [] },
        { number: 5, text: 'Tre ting du er takknemlig for 🙏', images: [] },
        { number: 6, text: 'Finn noe rødt i rommet 🔴', images: [] },
        { number: 7, text: 'Gi et kompliment 💬', images: [] },
        { number: 8, text: 'Ta bilde av noe som glitrer ✨', images: [] },
        { number: 9, text: 'Vibekes julenøtt: Sjakkspillet: Strengt tatt er du ikke særlig god til å spille sjakk, du vet knapt nok hvordan brikkene flyttes. Likevel vil du garantert gjøre det meget godt i en miniturnering der du spiller simultant mot verdens to beste sjakkspillere: Du vil slå den ene eller spille remis, altså uavgjort, mot dem begge. Hvordan er det mulig? 🎄', images: [] },
        { number: 10, text: 'Lag et rim 🎁', images: [] },
        { number: 11, text: 'Tre dype pust 💫', images: [] },
        { number: 12, text: 'Lag en kakao ☕️', images: [] },
        { number: 13, text: 'Lag et julekort ❤️', images: [] },
        { number: 14, text: 'Hør en julesang 🎵', images: [] },
        { number: 15, text: 'Tenn et lys 🕯️', images: [] },
        { number: 16, subtitle: 'Yassars luke', text: 'Welcome to Whoville!', images: ['/images/luke16.png'] },
        { number: 17, text: 'Meld noen du savner 💌', images: [] },
        { number: 18, text: 'Finn noe mykt 🧣', images: [] },
        { number: 19, text: 'Gjør en god gjerning 🤝', images: [] },
        { number: 20, text: 'Skriv nyttårsønske ✍️', images: [] },
        { number: 21, text: 'Se på stjernene 🌟', images: [] },
        { number: 22, text: 'Gi et smil 🙂', images: [] },
        { number: 23, text: 'Lag et hjerte ❤️', images: [] },
        { number: 24, text: 'GOD JUL 🎅🎄', images: [] }
      ],

      shuffledDays: []
    }
  },

  created() {
    // Hent åpne luker fra localStorage
    const saved = localStorage.getItem('openedDays')
    if (saved) {
      try {
        this.openDays = JSON.parse(saved)
      } catch (e) {
        console.error("Kunne ikke lese saved openedDays:", e)
      }
    }

    this.shuffleDays()
  },

  methods: {
    shuffleDays() {
      const arr = Array.from({ length: 24 }, (_, i) => i + 1)
      this.shuffledDays = arr.sort(() => Math.random() - 0.5)
    },

    openDay(day) {
      if (!this.openDays.includes(day)) {
        this.openDays.push(day)
      }

      // lagre i localStorage
      localStorage.setItem('openedDays', JSON.stringify(this.openDays))
    },

    openModal(day) {
      const luke = this.luker.find(l => l.number === day)
      this.activeModalDay = day
      this.activeText = luke?.text || ''
      this.activeSubtitle = luke?.subtitle || ''
      this.activeImages = luke?.images || []
    },

    closeModal() {
      this.activeModalDay = null
      this.activeText = ''
      this.activeImages = []
    }
  }
}
</script>

<style scoped>
/* Bakgrunn */
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-image: url('/images/Background3.png');
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
}

/* Grid */
.luke-grid {
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translateX(-50%);
  width: 40%;
  height: 33%;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: clamp(3px, 1vw, 10px);
}

.top-header {
  margin-top: 20px;
  width: 100%;
  max-width: 500px;
  text-align: center;
}

/* Countdown under luker */
.countdown-under {
  position: absolute;
  bottom: 50px;
  /* juster etter smak */
  width: 100%;
  text-align: center;
  z-index: 20;
}

.answers-link {
  position: absolute;
  bottom: 20px;
  /* under countdown */
  width: 100%;
  text-align: center;
}

.answers-link a {
  color: var(--green-dark);
  text-decoration: none;
  font-size: 1.1rem;
}

/* Desktop fall-down animasjon */
.luke-anim {
  opacity: 0;
  transform: translateY(-200px) scale(0.9);
  animation: fallDown 0.7s ease-out forwards;
}

@keyframes fallDown {
  0% {
    opacity: 0;
    transform: translateY(-200px) scale(0.9);
  }

  70% {
    opacity: 1;
    transform: translateY(12px) scale(1.05);
  }

  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* ------------------------------------------
   📱 MOBILVERSJON
------------------------------------------- */
@media (max-width: 650px) {

  .luke-grid {
    top: 25%;
    left: 50%;
    transform: translateX(-50%);
    width: 66%;
    height: 43%;
    grid-template-columns: repeat(4, 1fr);
    gap: 6px;
  }

  .top-header {
    top: 10px;
    max-width: 80%;
  }

  .countdown-under {
    bottom: 70px;
  }
    
  .answers-link {
    bottom: 25px;
  }
}
</style>
