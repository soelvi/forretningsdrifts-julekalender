import Home from './views/Home.vue';
/*
import Header from './components/Header.vue';*/

export default [
	{ name: 'home', path: '/', component: Home },
	/* { name: 'header', path: '/', component: Header}, */
	{ name: 'Svar', path: '/svar', component: () => import('@/views/Svar.vue')}

];
