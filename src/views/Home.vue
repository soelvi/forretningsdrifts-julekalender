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
      :images="activeImages" :content="activeContent" @close="closeModal" />

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
      activeContent: '',
      

      luker: [
        { number: 1, subtitle: 'Velkommen til årets julekalender!', text: 'Vi starter desember med en emoji-quiz ✨ Gjett filmen!', images: ['/images/emoji/emoji1.png', '/images/emoji/emoji2.png', '/images/emoji/emoji3.png', '/images/emoji/emoji4.png', '/images/emoji/emoji5.png', '/images/emoji/emoji6.png', '/images/emoji/emoji7.png', '/images/emoji/emoji8.png', '/images/emoji/emoji9.png', '/images/emoji/emoji10.png', '/images/emoji/emoji11.png', '/images/emoji/emoji12.png', '/images/emoji/emoji13.png',] },
        { number: 2, subtitle: 'Mitt skip er lastet med..', text: '', images: ['/images/skip/skip1.png', '/images/skip/skip2.png', '/images/skip/skip3.png', '/images/skip/skip4.png', '/images/skip/skip5.png',] }, 
        { number: 3, subtitle: 'COXs QUIZ FOR DE SPREKKEFERDIGE!', text: '', images: ['/images/rebeccas/rebeccas1.png', '/images/rebeccas/rebeccas2.png', '/images/rebeccas/rebeccas3.png', '/images/rebeccas/rebeccas4.png', '/images/rebeccas/rebeccas5.png', '/images/rebeccas/rebeccas6.png', '/images/rebeccas/rebeccas7.png'] },
        { number: 4, subtitle: '✨ JULEØNSKER ✨', text: 'Skriv ett eller flere ønsker for teamet og arbeidsmiljøet vårt for det kommende året. Om det er små justeringer eller større ønsker — alle innspill er verdifulle og kan bidra til at vi sammen skaper en enda bedre arbeidsplass!', images: [] },
        { number: 5, subtitle: 'TOPP 3', text: 'Hva topper din liste? 1-2 min betenkningstid pr. tema!', images: ['/images/topp3/topp1.png', '/images/topp3/topp2.png', '/images/topp3/topp3.png',] },
        { number: 6, subtitle: 'TOVEs TIPS FOR JULEBORDSESONGEN', text: '', images: ['/images/toves1.png'] },
        { number: 7, subtitle: '🌟 JOANNAs UTFORDRING TIL DEG I FØRJULSTIDA 🌟', text: 'For å holde deg frisk og rask i jula så utfordrer Joanna deg til følgende: Hver gang du reiser deg for å hente kaffe eller vann, gjør du 5 knebøy før du setter deg ved pulten igjen.', images: [] },
        { number: 8, subtitle: 'FLAGG QUIZ', text: 'Hvor mange klarer dere?', images: ['/images/flagg/flagg1.png', '/images/flagg/flagg2.png', '/images/flagg/flagg3.png', '/images/flagg/flagg4.png', '/images/flagg/flagg5.png', '/images/flagg/flagg6.png', '/images/flagg/flagg7.png', '/images/flagg/flagg8.png', '/images/flagg/flagg9.png', '/images/flagg/flagg10.png', '/images/flagg/flagg11.png', '/images/flagg/flagg12.png', '/images/flagg/flagg13.png'] },
        { number: 9, subtitle: '💫 VIBEKEs JULENØTT 💫', text: 'Sjakkspillet: Strengt tatt er du ikke særlig god til å spille sjakk, du vet knapt nok hvordan brikkene flyttes. Likevel vil du garantert gjøre det meget godt i en miniturnering der du spiller simultant mot verdens to beste sjakkspillere: Du vil slå den ene eller spille remis, altså uavgjort, mot dem begge. Hvordan er det mulig?', images: [] },
        { number: 10, subtitle: 'FULLSTENDIG JULEKAOS', text: 'Stokk om bokstavene og finn juleordene som gjemmer seg!', images: ['/images/bokstavrot/bokstavrot1.png', '/images/bokstavrot/bokstavrot2.png', '/images/bokstavrot/bokstavrot3.png', '/images/bokstavrot/bokstavrot4.png', '/images/bokstavrot/bokstavrot5.png',] },
        { number: 11, subtitle: '🌍 GEOGUESSR! 🌍', text: 'i regi av Rolv Kristian aka Rolvo240 eller mr. Worldwide om du vil! ', images: [] },
        {
          number: 12, subtitle: 'GÅTE', text: 'Jeg er en gave du gir uten å pakke inn. Jeg varer ofte bare et øyeblikk. Hva er jeg?', images: [] },
        { number: 13, subtitle: 'Kos deg litt ekstra i dag!', text: '', images: ['/images/kakao.png'] },
        { number: 14, subtitle: '', text: '', images: ['/images/colin.png'] },
        {
          number: 15, subtitle: 'QUIZ', text: 'Hva husker du fra året 2025?', images: [
            '/images/quiz/quiz.png',
            '/images/quiz/quiz1.png',
            '/images/quiz/quiz2.png',
            '/images/quiz/quiz3.png',
            '/images/quiz/quiz4.png',
            '/images/quiz/quiz5.png',
            '/images/quiz/quiz6.png',
            '/images/quiz/quiz7.png',
            '/images/quiz/quiz8.png',
            '/images/quiz/quiz9.png'
          ] },
        { number: 16, subtitle: 'YASSARs LUKE', text: 'Welcome to Whoville!', images: ['/images/luke16.png'] },
        { number: 17, subtitle: '⭐ Dagens utfordring: Si noe fint til en kollega ⭐', text: 'Spre litt ekstra glede – si noe hyggelig til en du jobber med!', images: []},
        { number: 18, subtitle: 'MONIKAs REBUS', text: 'Klarer dere løse disse?', images: ['/images/monika/monika1.png', '/images/monika/monika2.png'] },
        {
          number: 19, subtitle: 'LOGO QUIZ', text: 'Hvem kjenner igjen flest?', images: [
            '/images/logo/logo1.png',
            '/images/logo/logo2.jpg',
            '/images/logo/logo3.jpg',
            '/images/logo/logo4.png',
            '/images/logo/logo5.png',
            '/images/logo/logo6.png',
            '/images/logo/logo7.png',
            '/images/logo/logo8.png',
            '/images/logo/logo9.png',
            '/images/logo/logo10.png',
            '/images/logo/logo11.png',
            '/images/logo/logo12.png',
            '/images/logo/logo13.png',
            '/images/logo/logo14.png',
            '/images/logo/logo15.jpg',
            '/images/logo/logo16.png',
            '/images/logo/logo17.png',
            '/images/logo/logo18.png',
            '/images/logo/logo19.png',
            '/images/logo/logo20.png',
            '/images/logo/logo21.png',
            '/images/logo/logo22.png',
            '/images/logo/logo23.png'
          ] },
        { number: 20, subtitle: 'Toves familieoppskrift på rundstykker:', text: 'Denne oppskriften kommer fra min bestemor, og vi har alltid denne til julefrokosten!', images: ['/images/toves2.png', '/images/toves3.jpg'] },
        { number: 21, subtitle: '4. Advent', images: ['/images/4advent.png'] },
        {
          number: 22, subtitle: 'Få inn litt bevegelse mellom julekake nr. 5 og kaffekopp nr. 3. Her er en økt som passer for alle!', content: `
          <div class="video-wrapper">
            <iframe
              width="853"
              height="480"
              src="https://www.youtube.com/embed/_OyUpsoCuk4?list=RD_OyUpsoCuk4"
              title="Trim for Eldre med Valborg Hagfeldt"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen>
            </iframe>
          </div>`
        },
        {
          number: 23, subtitle: ' ✨ La julefreden senke seg ✨', content: `
            <div class="video-wrapper">
              <iframe 
                width="853" 
                height="480"
                src="https://www.youtube.com/embed/nt3Ggo1CE3g?list=RDnt3Ggo1CE3g"
                title="Enya - May It Be (Official Lyric Video)"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen>
              </iframe>
            </div>
          `},
        {
          number: 24, subtitle: 'GOD JUL 🎅🎄', text: 'Siste luke er åpnet! 🎄 Tusen takk for deltakelse og hyggelige førjulsstunder. Ønsker dere en riktig god jul og vel fortjent ferie ✨', images: [] }
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

      //lagre i localStorage
      localStorage.setItem('openedDays', JSON.stringify(this.openDays))
    },

    openModal(day) {
      const luke = this.luker.find(l => l.number === day)
      this.activeModalDay = day
      this.activeText = luke?.text || ''
      this.activeSubtitle = luke?.subtitle || ''
      this.activeImages = luke?.images || []
      this.activeContent = luke?.content || '' 
    },

    closeModal() {
      this.activeModalDay = null
      this.activeText = ''
      this.activeImages = []
      this.activeContent = ''
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
  bottom: 30px;
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

