<template>
  <div id="app">

    <ReportList
      v-if="!currentReport"
      :viewReport="viewReport"
      :deleteReport="deleteReport"
      :reportList="reportList"
      :modelList="modelList"/>

    <ReportDetail
      v-if="currentReport"
      :openListPage="openListPage"
      :saveReport="saveReport"
      :createModel="createModel"
      :reportDetail="currentReport"
      :modelList="modelList"/>
    <add-action-modal/>

  </div>
</template>

<script>
import Vue from 'vue'
import CrewBuilder from './util/CrewBuilder'

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
      let reportList = JSON.parse(localStorage.getItem('malifaux-tool-report.report-list'))
      this.reportList = Array.isArray(reportList) ? reportList : []
      
      console.log('Found saved report lists:', this.reportList)
    }
  },
  data: function () {
    return {
      currentReport: null,
      reportList: [],
      modelList: []
    }
  },
  methods: {
    openListPage: function () {
      this.currentReport = null
    },
    openDetailPage: function (report) {
      this.currentReport = report
    },
    createReport: function (params) {
      this.openDetailPage({
        recorder: params.discord_id,
        crew_yours: CrewBuilder.parse(params.crew_thisside),
        crew_their: CrewBuilder.parse(params.crew_opponent),
        history: [[]],
        created: null
      })
    },
    viewReport: function (report) {
      this.openDetailPage(report)
    },
    createModel: function (model) {
      let createdModel = CrewBuilder.generate(model)
      this.modelList.push(createdModel)
      return createdModel
    },
    saveReport: function () {
      let savingNewReport = this.currentReport.created === null
      this.currentReport.created = new Date().getTime()

      // Create new report
      if (savingNewReport) {
        this.reportList.push(this.currentReport)
      }
      // Update existing report
      else {
        let reportIndex = this.reportList.indexOf(this.currentReport)
        this.reportList.splice(reportIndex, 1, this.currentReport)
      }

      this.$ons.notification.toast('Successfully saved.', { timeout: 2500 })

      this.syncStorage()
      this.openListPage()
    },
    deleteReport: function (report) {
      this.$ons.notification.confirm('Delete selected report?')
        .then(confirmed => {
          if (confirmed) {
            let reportIndex = this.reportList.indexOf(report)
            this.reportList.splice(reportIndex, 1)

            this.$ons.notification.toast('Successfully deleted.', { timeout: 2500 })

            this.syncStorage()
          }
        })
    },
    syncStorage: function () {
      this.reportList.sort((prev, next) => prev.created < next.created )
      localStorage && localStorage.setItem('malifaux-tool-report.report-list', JSON.stringify(this.reportList))
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
