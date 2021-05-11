<template>
  <div class="sub" v-html="buff">
  </div>
</template>

<script>
export default {
  data () {
    return {
      buff: 'Sub3:<br>'
    }
  },
  mqtt: {
    'vueSandbox/+' (data, topic) {
      this.buff = this.buff + data + '<br>'
    }
  }
}
</script>
