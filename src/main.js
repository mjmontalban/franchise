import Vue from 'vue'
import { ToastPlugin, ModalPlugin } from 'bootstrap-vue'
import VueCompositionAPI from '@vue/composition-api'
import VueSweetalert2 from 'vue-sweetalert2';

import router from './router'
import store from './store'
import App from './App.vue'

// Global Components
import './global-components'

// 3rd party plugins
import '@/libs/portal-vue'
import '@/libs/toastification'
import axios from '@axios'

// BSV Plugin Registration
Vue.use(ToastPlugin)
Vue.use(ModalPlugin)
Vue.use(VueSweetalert2)


// Composition API
Vue.use(VueCompositionAPI)

require('@core/assets/fonts/feather/iconfont.css')



// import core styles
require('@core/scss/core.scss')

// import assets styles
require('@/assets/scss/style.scss')

Vue.config.productionTip = false

const appURL = process.env.BACKEND_URL

Vue.prototype.$appURL = appURL || 'https://partnerbackend.glogc.com/api/'
Vue.prototype.$s3URL = 'https://gologs3.s3.ap-southeast-1.amazonaws.com/'
Vue.prototype.$processingURL = 'https://processing.glogc.com/v1/'

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
