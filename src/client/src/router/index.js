import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import USPage from '../views/USPage.vue';
import WorldPage from '../views/WorldPage';
import GenderPage from '../views/GenderPage';
import AgePage from '../views/AgePage';
import CasePage from '../views/CasesPage';
import CompByGender from '../views/CompByGender';
import Comp2Provinces from '../views/Comp2Provinces';
import Comp2Counties from '../views/Comp2Counties';
Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
	},
	{
		path: '/US',
		name: 'USPage',
		component: USPage,
	},
	{
		path: '/World',
		name: 'WorldPage',
		component: WorldPage,
	},
	{
		path: '/Gender',
		name: 'GenderPage',
		component: GenderPage,
	},
	{
		path: '/Age',
		name: 'AgePage',
		component: AgePage,
	},
	{
		path: '/Cases',
		name: 'CasesPage',
		component: CasePage,
	},
	{
		path: '/CompByGender',
		name: 'CompByGender',
		component: CompByGender,
	},
	{
		path: '/Comp2Provinces',
		name: 'Comp2Provinces',
		component: Comp2Provinces,
	},
	{
		path: '/Comp2Counties',
		name: 'Comp2Counties',
		component: Comp2Counties,
	}
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

export default router;
