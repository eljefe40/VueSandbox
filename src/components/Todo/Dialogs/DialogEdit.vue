<template>
  <v-dialog
    :value="true"
    persistent
    max-width="290"
  >
    <v-card>
      <v-card-title class="headline">
        Edit message
      </v-card-title>
      <v-card-text>
        Edit the title of this message:
        <v-text-field
          v-model="taskTitle"
          @keyup.enter="saveTask"
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          @click="$emit('close')"
          text
        >
          Cancel
        </v-btn>
        <v-btn
          @click="saveTask"
          :disabled="taskTitleInvalid"
          color="red darken-1"
          text
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['message'],
  data() {
    return {
      taskTitle: null
    }
  },
  computed: {
    taskTitleInvalid() {
      return !this.taskTitle || this.taskTitle === this.message.title
    }
  },
  methods: {
    saveTask() {
      if (!this.taskTitleInvalid) {
        let payload = {
          id: this.message.id,
          title: this.taskTitle
        }
        this.$store.dispatch('updateTaskTitle', payload)
        this.$emit('close')
        this.$vuetify.goTo(0, { duration: 0 })
      }
    }
  },
  mounted() {
    this.taskTitle = this.message.title
  }
}
</script>

<style>

</style>
