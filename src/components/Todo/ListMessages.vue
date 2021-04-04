<template>
  <v-list
    class="pt-0"
    flat
  >
    <draggable
      v-model="messages"
      handle=".handle"
    >
      <message
        v-for="message in messages"
        :key="message.id"
        :message="message"
      />
    </draggable>
  </v-list>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  computed: {
    messages: {
      get() {
        return this.$store.getters.messagesFiltered
      },
      set(value) {
        this.$store.dispatch('setTasks', value)
      }
    }
  },
  components: {
    'message': require('@/components/Todo/Message.vue').default,
    draggable
  }
}
</script>
