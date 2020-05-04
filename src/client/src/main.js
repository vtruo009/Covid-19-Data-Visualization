import Vue from 'vue';
import App from './App.vue';
import router from './router';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import VueGoogleCharts from 'vue-google-charts';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

// Sets up FontAwesomeIcons
Vue.component('font-awesome-icon', FontAwesomeIcon);
// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);
// Set up Google charts
Vue.use(VueGoogleCharts);
Vue.config.productionTip = false;

// Sets up toast
Vue.use(Toast);

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

new Vue({
	router,
	render: function(h) {
		return h(App);
	},
}).$mount('#app');
