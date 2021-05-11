<template>
  <div id="pubby">

    <v-text-field v-on:keyup.enter="enterKeyHandler"
                  v-bind:placeholder="topic"
    >{{ topic }}
    </v-text-field>
    <v-text-field v-on:keyup.enter="enterKeyHandler"
                  v-bind:placeholder="message"
    >{{ message }}
    </v-text-field>
    <v-text-field v-on:keyup.enter="enterKeyHandler"
                  v-bind:placeholder="brokerURL"
    >{{ brokerURL }}
    </v-text-field>

    <br>
    <br>
    <br>

    <publish></publish>
    <sub1></sub1>
    <sub2></sub2>
    <sub3></sub3>

  </div>
</template>

<script>
import Vue from 'vue'
import VueMqtt from 'vue-mqtt'

Vue.use(VueMqtt, 'ws://broker.hivemq.com:8000/mqtt', {clientId: 'WebClient-' + parseInt(Math.random() * 100000)})
Vue.config.productionTip = false

/* eslint-disable no-new */


import Publish from '../components/PubSub/Publish'
import Sub1 from '../components/PubSub/Sub1'
import Sub2 from '../components/PubSub/Sub2'
import Sub3 from '../components/PubSub/Sub3'

export default {

  name: 'pubby',
  components: {
    Publish, Sub1, Sub2, Sub3
  },
  data() {
    return {
      date: '',
      brokerURL: "ws://broker.hivemq.com:8000/mqtt",
      //  brokerURL: "ws://jeffjoslin.com:1883",
      topic: "foo",
      client: null,
      message: "",
      response: "this is a response"
    }
  },
  mounted() {
    this.$mqtt.subscribe('vueSandbox/#')
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.sub {
  width: 31%;
  float: left;
  border: 1px solid #ccc;
  margin: 20px 1%;
  padding: 20px 0;
}

button {
  padding: 10px 20px;
}
</style>
