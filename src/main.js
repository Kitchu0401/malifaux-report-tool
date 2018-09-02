// Webpack CSS import
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

// JS import
import Vue from 'vue';
import VueOnsen from 'vue-onsenui';

// Component import
import App from './App.vue'
import './registerServiceWorker'

Vue.EventBus = new Vue()
Vue.config.productionTip = false

Vue.use(VueOnsen);

new Vue({
  render: h => h(App)
}).$mount('#app')
