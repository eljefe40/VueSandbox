// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueMqtt from 'vue-mqtt'

Vue.use(VueMqtt, 'ws://broker.hivemq.com:8000/mqtt', {clientId: 'WebClient-' + parseInt(Math.random() * 100000)})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
