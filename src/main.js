import "babel-polyfill"

import Vue from 'vue'
import App from './App'
import Vueresource from 'vue-resource'
import VueLazyload from 'vue-lazyload'
import router from './router/index.js'

import './common/stylus/index.styl'

Vue.use(Vueresource)
Vue.use(VueLazyload,{
	loading:require("./common/images/default.png")
});

new Vue({
  el: '#app',
  router,
  render:h=>h(App)
})
