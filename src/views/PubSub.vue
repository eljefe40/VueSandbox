<template>
  <div class="about pa-6">
    <h1>PubSub (mqtt) </h1>

    <v-textarea
        solo
        background-color="primary"
        name="input-7-4"
    ></v-textarea>

    <v-text-field v-on:keyup.enter="enterKeyHandler"
                    placeholder="topic"
    >{{topic}}</v-text-field>
    <v-text-field v-on:keyup.enter="enterKeyHandler"
                   placeholder="message"
    ></v-text-field>
    <v-text-field v-on:keyup.enter="enterKeyHandler"
                   placeholder="broker"
    ></v-text-field>
  </div>
</template>

<script>

const mqtt = require('mqtt')
import {format} from 'date-fns'

export default {
  data() {
    return {
      date: '',
      brokerURL: "ws://broker.hivemq.com:8000/mqtt",
      topic: "foo",
      client: null,
      response: "ddfd"
    }
  },
  methods: {
    enterKeyHandler(e) {

      console.log(this.client, "enter key........", e);
      this.client.publish(this.topic, e.target.value)
      this.response=e.target.value
      e.target.value = "";

    },
    getDate() {
      this.date = format(new Date(), 'MMMM d, H:mm:ss')
      setTimeout(this.getDate, 1000)
    },
    initClient() {
      console.log("topic is:", topic)   // vue component
      let self = this; // "this" will shapeshift.... keep a reference to the vue component

      let response = this.response;
      let topic = this.topic
      let client = mqtt.connect(this.brokerURL)

      console.log("topic:", topic, "  -THIS IS: ", this, self) // client

      client.on('connect', function () {
        console.log("connected")
        this.client = client
        console.log("THIS IS:", this, self)
        client.subscribe(topic, function (err) {
          if (!err) {
            client.publish(topic, 'Hello mqtt', {qos: 0, retain: false})
          }
        })
      })
      client.on('message', function (topic, message) {
        response = message.toString();
        console.log("RX 0n topic ", topic, "  --> ", response)
        self.response=response
      })

      console.log("mqttclient: ", client, topic)
      client.publish(topic, 'yo momma', 2)
      self.client = client;
    }
  },
  mounted() {

    console.log("mounting pubsub...---------============")
    this.getDate()
    this.initClient()
  }
}

</script>

