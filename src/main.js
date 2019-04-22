// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import MintUI from 'mint-ui'
import VueLazyload from 'vue-lazyload'
import 'mint-ui/lib/style.css'
import {Button} from 'mint-ui'
Vue.component(Button.name, Button); 
Vue.use(MintUI)
import './mock/mockServer.js'
  import './filters'
Vue.config.productionTip = false
import loading from './common/imgs/loading.gif'
Vue.use(VueLazyload, {
  loading
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
