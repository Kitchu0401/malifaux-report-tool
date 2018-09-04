<template>

  <v-ons-page>

    <!-- Toolbar -->
    <v-ons-toolbar>
      <div class="left"><v-ons-toolbar-button>Menu</v-ons-toolbar-button></div>
      <div class="center" style="text-align: center;">Report List Page</div>
      <div class="right"><v-ons-toolbar-button>New</v-ons-toolbar-button></div>
    </v-ons-toolbar>

    <v-ons-list>
      <!-- <v-ons-list-header>Default</v-ons-list-header> -->
      <v-ons-list-item v-for="(report, index) in reportList" :key="index" @click="viewReport(report)">
        <span class="list-item__title"><strong v-once v-text="report.recorder"/></span>
        <span class="list-item__subtitle">
          <strong v-once v-text="report.crew_yours.crewName"/>
          <span> vs </span>
          <strong v-once v-text="report.crew_their.crewName"/>
        </span>
      </v-ons-list-item>
    </v-ons-list>
    
    <CreateReportModal/>
  
  </v-ons-page>

</template>

<script>
import Vue from 'vue'

import CreateReportModal from './modals/CreateReportModal.vue'

export default {
  name: 'ReportList',
  components: {
    CreateReportModal
  },
  props: {
    viewReport: Function,
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
