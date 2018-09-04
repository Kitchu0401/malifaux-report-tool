<template>
  <div id="app">

    <ReportList
      v-if="!currentReport"
      :viewReport="viewReport"
      :reportList="reportList"/>

    <ReportDetail
      v-if="currentReport"
      :openListPage="openListPage"
      :saveReport="saveReport"
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
      this.reportList = Array.isArray(reportList) ? reportList : []
      console.log('Found saved report lists:', this.reportList)
    }
  },
  data: function () {
    return {
      currentReport: null,
      reportList: []
    }
  },
  methods: {
    openListPage: function () {
      this.currentReport = null
    },
    createReport: function (params) {
      this.currentReport = {
        recorder: params.discord_id,
        crew_yours: params.crew_thisside,
        crew_their: params.crew_opponent,
        history: [[]],
        created: null
      }
    },
    viewReport: function (report) {
      this.currentReport = report
    },
    saveReport: function () {
      this.currentReport.created = new Date().getTime()
      this.reportList.push(this.currentReport)

      if (localStorage) {
        localStorage.setItem('malifaux-report-tool.report-list', JSON.stringify(this.reportList))
      }

      this.openListPage()
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
