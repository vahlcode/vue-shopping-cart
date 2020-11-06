import Vue from 'vue'
import App from './App.vue'
import VueApollo from 'vue-apollo'
import Vuex from 'vuex'

import store from './store'
import apolloClient from './utils/apolloClient'

Vue.use(Vuex);
Vue.use(VueApollo)

Vue.config.productionTip = false

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})

new Vue({
  render: h => h(App),
  apolloProvider,
  store,
}).$mount('#app')
