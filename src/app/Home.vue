<template>
	<div class="home">
		<Header />
		<Countdown />

    <div class="calendar-grid">
      <Luke 
        v-for="(n, index) in randomizedLuker"
        :key="n"
        :day="n"
        :isOpen="openDays.includes(n)"
        :style="{ animationDelay: (Math.random() * 0.8 + index * 0.03) + 's' }"
        @open="openDay"
        @showModal="openModal"
      />
    </div>

    <!-- Modal -->
    <Modal
      v-if="activeModalDay"
      :day="activeModalDay"
      :text="activeText"
      @close="closeModal"
    />
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

  data () {
    return {
      randomizedLuker: [],   // ⬅ randomized grid order
      openDays: [],
      activeModalDay: null,
      activeText: '',
      luker: [
        { number: 1, text: 'Finn et bilde av et juletre 🌲' },
        { number: 2, text: 'Lag en liten tegning av noe som minner deg om vinter ❄️' },
        { number: 3, text: 'Fortell noen én ting du gleder deg til i desember 😊' },
        { number: 4, text: 'Syng en julesang (eller nynn!) 🎶' },
        { number: 5, text: 'Skriv ned tre ting du er takknemlig for 🙏' },
        { number: 6, text: 'Finn noe rødt i rommet 🔴' },
        { number: 7, text: 'Gi et kompliment til noen i dag 💬' },
        { number: 8, text: 'Ta et bilde av noe som glitrer ✨' },
        { number: 9, text: 'Del et hyggelig minne fra en tidligere jul 🎄' },
        { number: 10, text: 'Lag et lite rim om jul 🎁' },
        { number: 11, text: 'Ta tre dype pust og tenk på noe du ser frem til 💫' },
        { number: 12, text: 'Finn en kopp kakao eller te og nyt den ☕️' },
        { number: 13, text: 'Lag et lite julekort til noen ❤️' },
        { number: 14, text: 'Hør på favorittjulesangen din 🎵' },
        { number: 15, text: 'Tenn et lys og pust rolig i 1 minutt 🕯️' },
        { number: 16, text: 'Gi deg selv ros for noe du har gjort bra 💪' },
        { number: 17, text: 'Send en melding til noen du savner 💌' },
        { number: 18, text: 'Ta på deg noe varmt og mykt 🧣' },
        { number: 19, text: 'Gjør én god gjerning i dag 🤝' },
        { number: 20, text: 'Skriv ned et nyttårsønske ✍️' },
        { number: 21, text: 'Se på stjernene i kveld 🌟' },
        { number: 22, text: 'Gi et smil til noen du møter 🙂' },
        { number: 23, text: 'Lag eller tegn et hjerte ❤️' },
        { number: 24, text: 'God jul! Feir med glede og ro 🎅🎄' }
      ]
    }
  },

  mounted() {
    // RANDOM REKKEFØLGE VED LOAD
    this.randomizedLuker = [...this.luker]
      .sort(() => Math.random() - 0.5)
      .map(l => l.number)
  },

  methods: {
    openDay(day) {
      if (!this.openDays.includes(day)) {
        this.openDays.push(day)
      }
    },

    openModal(day) {
      const luke = this.luker.find(l => l.number === day)
      this.activeModalDay = day
      this.activeText = luke ? luke.text : 'Ingen oppgave funnet'
    },

    closeModal() {
      this.activeModalDay = null
      this.activeText = ''
    }
  }
}
</script>

<style scoped>
.home {
  text-align: center;
  background: transparent;
  min-height: 100vh;
  color: white;
  padding: 2rem;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  margin-top: 2rem;
  max-width: 800px;
  margin-inline: auto;
}

/* FALL-IN ANIMASJON */
.luke {
  opacity: 0;
  transform: translateY(-40px);
  animation: fallIn 0.7s ease forwards;
}

@keyframes fallIn {
  from {
    opacity: 0;
    transform: translateY(-40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
