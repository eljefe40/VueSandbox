<template>
  <div class="sub" v-html="buff">
  </div>
</template>

<script>
export default {
  data () {
    return {
      buff: 'Sub1:<br>'
    }
  },
  mqtt: {
    'vueSandbox/publish1' (data) {
      this.buff = this.buff + data + '<br>'
    }
  }
}
</script>
