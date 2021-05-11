<template>
  <div class="publish">

    <v-btn
        depressed
        elevation="2"
        text
        @click="publish1"
    >P1 (1+3)</v-btn>

    <v-btn
        depressed
        elevation="2"
        text
        @click="publish2"
    >P2 (2+3)</v-btn>

  </div>
</template>

<script>
export default {
  methods: {
    publish1 () {
      this.$mqtt.publish('vueSandbox/publish1', 'message to Sub1')
    },
    publish2 () {
      this.$mqtt.publish('vueSandbox/publish2', 'message to Sub2')
    }
  },
  mqtt: {
    'vueSandbox/publish1' (data, topic) {
      console.log(topic + ': ' + String.fromCharCode.apply(null, data))
    },
    'vueSandbox/publish2' (data, topic) {
      console.log(topic + ': ' + String.fromCharCode.apply(null, data))
    }
  }
}
</script>
