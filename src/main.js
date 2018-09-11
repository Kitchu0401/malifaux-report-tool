// Webpack CSS import
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

// JS import
import Vue from 'vue';
import VueOnsen from 'vue-onsenui';
import axios from 'axios'

// Component import
import App from './App.vue'
import './registerServiceWorker'

Vue.EventBus = new Vue()
Vue.Axios = axios.create({ baseURL: 'http://localhost:8080' })
Vue.config.productionTip = false

Vue.use(VueOnsen);

new Vue({
  render: h => h(App)
}).$mount('#app')
