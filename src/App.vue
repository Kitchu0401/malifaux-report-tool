<template>
  <div id="app">

    <ReportList
      v-if="!currentReport"
      v-bind:reportList="reportList"/>

    <ReportDetail
      v-if="currentReport"
      v-bind:report="currentReport"/>
    
    <CreateReportModal/>

  </div>
</template>

<script>
import ReportList from './components/ReportList.vue'
import ReportDetail from './components/ReportDetail.vue'
import CreateReportModal from './components/modals/CreateReportModal.vue'

export default {
  name: 'app',
  components: {
    ReportList,
    ReportDetail,
    CreateReportModal
  },
  mounted: function () {
    // ReportList initialize
    if (localStorage) {
      let reportList = JSON.parse(localStorage.getItem('malifaux-report-tool.report-list'))
      this.reportList = reportList && typeof reportList === 'Array' ? reportList : []
      console.log(this.reportList, this.reportList.length)
    }
  },
  data: function () {
    return {
      currentReport: null,
      reportList: []
    }
  },
  methods: {
    createReport: function () {
      console.log('App.createReport()')
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
