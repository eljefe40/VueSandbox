<template>
  <div>
    <v-list-item
      @click="$store.dispatch('doneTask', message.id)"
      :class="{ 'blue lighten-5' : message.done }"
      class="white"
      :ripple="false"
    >
      <template v-slot:default>
        <v-list-item-action>
          <v-checkbox
            :input-value="message.done"
            color="primary"
          ></v-checkbox>
        </v-list-item-action>

        <v-list-item-content>
          <v-list-item-title
            :class="{ 'text-decoration-line-through' : message.done }"
          >
            {{ message.title }}
          </v-list-item-title>
        </v-list-item-content>

        <v-list-item-action v-if="message.dueDate">
          <v-list-item-action-text>
            <v-icon small>mdi-calendar</v-icon>
            {{ message.dueDate | niceDate }}
          </v-list-item-action-text>
        </v-list-item-action>

        <v-list-item-action>
          <message-menu :message="message" />
        </v-list-item-action>

        <v-list-item-action
          v-if="$store.state.sorting"
        >
          <v-btn
            color="primary"
            class="handle"
            icon
          >
            <v-icon>mdi-drag-horizontal-variant</v-icon>
          </v-btn>
        </v-list-item-action>
      </template>

    </v-list-item>
    <v-divider></v-divider>

  </div>
</template>

<script>
import { format } from 'date-fns'

export default {
  props: ['message'],
  filters: {
    niceDate(value) {
      return format(new Date(value), 'MMM d')
    }
  },
  components: {
    'message-menu': require('@/components/Todo/MessageMenu.vue').default
  }
}
</script>

<style lang="sass">
  .sortable-ghost
    opacity: 0
  .sortable-drag
    box-shadow: 0 0 10px rgba(0,0,0,0.3)
</style>
