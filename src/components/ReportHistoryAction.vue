<template>

  <v-ons-list-item :class="`action ${action.side}`" tappable>
    <span class="list-item__title"><strong v-once v-text="action.source.name"></strong></span>
    <span class="list-item__subtitle">
      <span>Took <strong v-once v-text="action.action.name"/> action</span>
      <span v-if="action.target"> to <strong v-once v-text="action.target.name"/></span>
      <span v-if="action.resultAmount"> dealt <strong v-once v-text="action.resultAmount"/> damage</span>.
    </span>
  </v-ons-list-item>

</template>

<script>
export default {
  name: 'ReportHistoryAction',
  props: {
    action: Object
  }
}
</script>

<style scoped>
.action.crew_yours { text-align: left; }
.action.crew_their { text-align: right; }
</style>
