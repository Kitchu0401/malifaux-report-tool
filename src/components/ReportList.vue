<template>

  <v-ons-page>

    <!-- Toolbar -->
    <v-ons-toolbar>
      <div class="left"><v-ons-toolbar-button>Menu</v-ons-toolbar-button></div>
      <div class="center" style="text-align: center;">Report List Page</div>
      <div class="right"><v-ons-toolbar-button @click="callCreateReportModal">New</v-ons-toolbar-button></div>
    </v-ons-toolbar>

    <v-ons-list>
      <!-- <v-ons-list-header>Default</v-ons-list-header> -->
      <report-list-item
        v-for="(report, index) in reportList" :key="index"
        :viewReport="viewReport"
        :deleteReport="deleteReport"
        :report="report"/>
    </v-ons-list>
    
    <CreateReportModal/>
  
  </v-ons-page>

</template>

<script>
import Vue from 'vue'
import moment from 'moment'

import ReportListItem from './ReportListItem.vue'
import CreateReportModal from './modals/CreateReportModal.vue'

export default {
  name: 'ReportList',
  components: {
    ReportListItem,
    CreateReportModal
  },
  props: {
    viewReport: Function,
    deleteReport: Function,
    reportList: Array
  },
  methods: {
    callCreateReportModal: function () {
      Vue.EventBus.$emit('open-modal-create-report')
    }
  }
}
</script>

<style scoped>

</style>
