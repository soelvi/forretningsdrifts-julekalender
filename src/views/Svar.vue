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
				{ day: 2, text: "" },
				{ day: 3, text: "Rebeccas" },
				{ day: 4, text: "" },
				{ day: 5, text: "" },
				{ day: 6, text: "" },
				{ day: 7, text: "" },
				{ day: 8, text: "Flagg" },
				{ day: 9, text: "Du spiller først mot spiller A, som har hvite brikker — noe som betyr at han begynner. Han gjør sitt første trekk, men du venter med å svare. Du går i stedet til spiller B, som har svarte brikker — noe som betyr at det er du som skal åpne partiet. Der gjentar du A sitt trekk og venter til B har gjort sitt mottrekk. Så snart han har gjort det, gjentar du dette trekket mot A. Slik fortsetter du helt til spillene er avsluttet. Det geniale er at du ikke velger et eneste trekk selv, du har derimot sørget for at A og B faktisk spiller mot hverandre. Da blir resultatet nødvendigvis remis i begge partiene, med mindre du vinner mot en av dem. 🎄" },
				{ day: 10, text: "Julekaos" },
				{ day: 11, text: "" },
				{ day: 12, text: "Quiz" },
				{ day: 13, text: "" },
				{ day: 14, text: "" },
				{ day: 15, text: "" },
				{ day: 16, text: "" },
				{ day: 17, text: "Quiz" },
				{ day: 18, text: "Monikas" },
				{ day: 19, text: "" },
				{ day: 20, text: "" },
				{ day: 21, text: "" },
				{ day: 22, text: "" },
				{ day: 23, text: "" },
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
	margin-bottom: 1.2rem;

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
