<template>

  <v-ons-list-item @click="viewReport(report)">
    <span class="list-item__title"><strong v-once v-text="report.recorder"/></span>
    <span class="list-item__subtitle">
      <strong v-once v-text="report.crew_yours.crewName"/>
      <span> vs </span>
      <strong v-once v-text="report.crew_their.crewName"/>
    </span>
    <span class="list-item__subtitle" v-once v-text="createdString"></span>
    <div class="right"><v-ons-icon icon="ion-navicon, material:md-remove" @click.stop="deleteReport(report)"/></div>
  </v-ons-list-item>

</template>

<script>
import moment from 'moment'

export default {
  name: 'ReportList',
  props: {
    viewReport: Function,
    deleteReport: Function,
    report: Object
  },
  computed: {
    createdString: function () {
      return moment(this.report.created).format('YYYY-MM-DD HH:mm:ss')
    }
  }
}
</script>

<style scoped>

</style>
