<template>

  <v-ons-list-item :class="`action ${action.side}`" @click="callAddMemoModal(action)" tappable>
    <span class="list-item__title"><strong v-once v-text="action.source.name"></strong></span>
    <span class="list-item__subtitle">
      <span>Took <strong v-once v-text="action.action.name"/> action</span>
      <span v-if="action.target"> to <strong v-once v-text="action.target.name"/></span>
      <span v-if="action.resultAmount"> dealt <strong v-once v-text="action.resultAmount"/> damage</span>.
    </span>
    <span class="list-item__subtitle" v-show="action.memo">
      <span v-text="action.memo"/>
    </span>
  </v-ons-list-item>

</template>

<script>
export default {
  name: 'ReportHistoryAction',
  props: {
    action: Object,
    callAddMemoModal: Function
  }
}
</script>

<style scoped>
.action.crew_yours { text-align: left; }
.action.crew_their { text-align: right; }
</style>
