<template>

  <v-ons-list>
    <report-history-action
      v-for="(action, actionIndex) in round"
      :key="actionIndex"
      :action="action"/>
  </v-ons-list>

</template>

<script>
import ReportHistoryAction from './ReportHistoryAction.vue'

export default {
  name: 'ReportHistory',
  components: {
    ReportHistoryAction
  },
  props: {
    round: Array
  }
}
</script>

<style scoped>

</style>
