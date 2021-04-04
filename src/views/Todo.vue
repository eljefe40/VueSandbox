<template>
  <div class="home">

    <list-messages
      v-if="$store.state.messages.length"
    />

    <no-messages
      v-else
    />

    <button-done-sorting
      v-if="$store.state.sorting"
    />

  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {
    'list-messages': require('@/components/Todo/ListMessages.vue').default,
    'no-messages': require('@/components/Todo/NoMessages.vue').default,
    'button-done-sorting': require('@/components/Todo/ButtonDoneSorting.vue').default
  }
}
</script>
