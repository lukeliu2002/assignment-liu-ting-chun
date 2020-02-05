import Vue from 'vue';
import VueResource from 'vue-resource';
import Toasted from 'vue-toasted';
import store from '@/store';
import App from '@/App';
import router from '@/router';
import '@/assets/global.scss';

Vue.use(VueResource);
Vue.use(Toasted);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
