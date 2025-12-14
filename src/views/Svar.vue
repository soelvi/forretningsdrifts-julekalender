<template>
	<div class="svar-wrapper">

		<!-- Tilbakeknapp -->
		<router-link to="/" class="back-btn">← Tilbake til kalender</router-link>

		<h1 class="svar-title">Svar på løste oppgaver</h1>

		<div v-if="visibleAnswers.length">
			<div v-for="a in visibleAnswers" :key="a.day" class="svar-card">
				<h3>Luke {{ a.day }}</h3>
				<p>{{ a.text }}</p>
			</div>
		</div>

		<p v-else class="empty-message">Ingen svar er tilgjengelig ennå 🎁</p>

	</div>
</template>


<script>
export default {
	name: "Svar",

	data() {
		return {
			answers: [
				{ day: 1, text: "Emoji-Quiz: 1. Snekker Andersen og julenissen / 2. Tre nøtter til Askepott / 3. Flåklypa Grand Prix / 4. Cast Away / 5. IT / 6. Snakes on a plane / 7. Ringenes Herre / 8. Ratatouille / 9. E.T: The Extra-Terrestrial / 10. Forrest Gump / 11. The Sixth Sense / 12. The Wolf of Wallstreet / 13. Hjemme Alene" },
				{ day: 3, text: "Rebeccas Quiz: 1. Flåklypa / 2. Lemen / 3. Builders bum / 4. Ane Dahl Torp / 5. Great rift valley / 6. Crack / 7. Brist " },
				{ day: 8, text: "Flagg Quiz: 1. Barbados / 2. Tanzania / 3. Laos / 4. Mexico / 5. Frankrike / 6. Chile / 7. India / 8. Ghana / 9. Georgia / 10. Sør - Korea / 11. Færøyene / 12. Sri Lanka / 13. Nord - Makedonia" },
				{ day: 9, text: "Vibekes nøtt: Du spiller først mot spiller A, som har hvite brikker — noe som betyr at han begynner. Han gjør sitt første trekk, men du venter med å svare. Du går i stedet til spiller B, som har svarte brikker — noe som betyr at det er du som skal åpne partiet. Der gjentar du A sitt trekk og venter til B har gjort sitt mottrekk. Så snart han har gjort det, gjentar du dette trekket mot A. Slik fortsetter du helt til spillene er avsluttet. Det geniale er at du ikke velger et eneste trekk selv, du har derimot sørget for at A og B faktisk spiller mot hverandre. Da blir resultatet nødvendigvis remis i begge partiene, med mindre du vinner mot en av dem. 🎄" },
				{ day: 10, text: "Julekaos: 1. Gløgg / 2. Risengrynsgrøt / 3. Jomfru Maria / 4. Ribberull / 5. Juleevangeliet" },
				{ day: 12, text: "Gåte: En klem eller et smil." },
				{ day: 15, text: "Quiz: 1. For høyt innhold av D-vitamin / 2. Rangeringen av verdens lykkeligste land / 3. Ulovlige hoppdresser/manipulerte dresser / 4. Tekst-TV / 5. Tekoligark / 6. Granåsen skisenter / 7. Stranger Things / 8. Labubu/Lafufu / 9. Amerikansk" },
				{ day: 18, text: "Monikas rebus: 1. Produktutviklingsprosessen 2.0 / 2. Delprosessansvarlig" },
				{ day: 19, text: "Logo Quiz: 1. Carhartt / 2. Clas Ohlson / 3. Air BnB / 4. Nestlé / 5. DreamWorks /6. Cadillac / 7. Dominos / 8. Fjällräven / 9. Batman / 10. LG / 11. Maserati / 12. Nespresso / 13. RedBull / 14. Reebok / 15. SoundCloud / 16. Steam / 17. Storebrand / 18. Umbro / 19. Unilever / 20. Versace / 21. Adobe / 22. Pringles / 23. FN/UN" },
				{ day: 24, text: "GOD JUL 🎅🎄" },
			]
		}
	},

	computed: {
		visibleAnswers() {
			const today = new Date().getDate()

			// viser kun svar fra dager som er ferdige (day < i dag)
			const arr = this.answers.filter(a => a.day < today)

			return arr.sort((a, b) => b.day - a.day)
		}
	}
}
</script>


<style scoped>
/* Grønn bakgrunn */
.svar-wrapper {
	width: 100vw;
	min-height: 100vh;
	background: #446955;
	padding: 2rem;
	padding-top: 6rem;

	display: flex;
	flex-direction: column;
	align-items: center;
}

/* Tilbakeknapp */
.back-btn {
	position: absolute;
	top: 20px;
	left: 20px;

	background: rgba(255, 255, 255, 0.15);
	padding: 0.6rem 1.2rem;
	border-radius: 10px;
	backdrop-filter: blur(6px);
	color: #fff4e6;
	font-size: 1rem;
	text-decoration: none;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
	transition: all 0.2s ease;
}

.back-btn:hover {
	background: rgba(255, 255, 255, 0.25);
}

/* Tittel */
.svar-title {
	font-size: 2.6rem;
	color: #fff4e6;
	text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
	margin-bottom: 2rem;
	letter-spacing: 1px;
}

/* Rektangulære, brede glassmorphism-kort */
.svar-card {
	width: min(95%, 900px);
	padding: 1.5rem 2rem;
	margin: 0 auto 1.2rem;
	/* ← Midtstiller perfekt */

	background: rgba(255, 255, 255, 0.12);
	backdrop-filter: blur(14px);
	border-radius: 16px;
	border: 1px solid rgba(255, 255, 255, 0.28);

	color: #fff4e6;
	box-shadow: 0 8px 25px rgba(0, 0, 0, 0.25);

	animation: fadeInUp 0.6s ease both;
}

/* Tekst i kort */
.svar-card h3 {
	margin: 0 0 0.5rem;
	font-size: 1.7rem;
	color: #ffe8c8;
}

.svar-card p {
	margin: 0;
	font-size: 1.25rem;
	line-height: 1.55;
	color: var(--paper);
}

/* Ingen svar ennå */
.empty-message {
	color: #fff9e6;
	margin-top: 3rem;
	font-size: 1.3rem;
	opacity: 0.9;
}

/* Fade-in animasjon */
@keyframes fadeInUp {
	from {
		opacity: 0;
		transform: translateY(20px);
	}

	to {
		opacity: 1;
		transform: translateY(0);
	}
}
</style>
