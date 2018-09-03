<template>
  <div id="app">

    <ReportList
      v-if="!currentReport"
      :reportList="reportList"/>

    <ReportDetail
      v-if="currentReport"
      :reportDetail="currentReport"/>
    <add-action-modal/>

  </div>
</template>

<script>
import Vue from 'vue'

import ReportList from './components/ReportList.vue'
import ReportDetail from './components/ReportDetail.vue'

export default {
  name: 'App',
  components: {
    ReportList,
    ReportDetail
  },
  mounted: function () {
    // Global event mapping
    Vue.EventBus.$on('create-report', this.createReport)

    // ReportList initialize
    if (localStorage) {
      let reportList = JSON.parse(localStorage.getItem('malifaux-report-tool.report-list'))
      this.reportList = reportList && typeof reportList === 'Array' ? reportList : []
      // console.log(this.reportList, this.reportList.length)
    }
  },
  data: function () {
    return {
      currentReport: null,
      reportList: []
    }
  },
  methods: {
    createReport: function (params) {
      console.log('App.createReport()', params)

      this.currentReport = {
        recorder: params.discord_id,
        crew_yours: params.crew_thisside,
        crew_their: params.crew_opponent,
        history: [{}]
      }
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
