<template>

  <v-ons-page>

    <!-- Toolbar -->
    <v-ons-toolbar>
      <!--
      <div class="left">
        <v-ons-toolbar-button>
          <v-ons-icon icon="md-menu" size="32px"></v-ons-icon>
        </v-ons-toolbar-button>
      </div>
      -->
      <div class="center" style="text-align: center;">
        Report Detail Page
      </div>
      <!--
      <div class="right">
        <v-ons-toolbar-button>
          <v-ons-icon icon="md-plus" size="32px" v-on:click="callCreateReportModal"></v-ons-icon>
        </v-ons-toolbar-button>
      </div>
      -->
    </v-ons-toolbar>

    <!-- History -->
    <v-ons-list>
      <!--
      <v-ons-list-item v-for="(report, index) in reportList" :key="index" :report="report"></v-ons-list-item>
      -->
    </v-ons-list>

    <!-- Action Fab -->
    <v-ons-fab position="bottom right" v-on:click="callAddActionModal">
      <v-ons-icon icon="md-plus"></v-ons-icon>
    </v-ons-fab>

    <AddActionModal
      :addActionToHistory="addActionToHistory"
      :moveNextRound="moveNextRound"
      :crew_yours="reportDetail.crew_yours"
      :crew_their="reportDetail.crew_their"/>
  
  </v-ons-page>

</template>

<script>
import Vue from 'vue'

import AddActionModal from './modals/AddActionModal.vue'

export default {
  name: 'ReportDetail',
  components: {
    AddActionModal
  },
  props: {
    reportDetail: Object,
  },
  methods: {
    callAddActionModal: function () {
      Vue.EventBus.$emit('open-modal-add-action')
    },
    addActionToHistory: function (action) {
      // console.log('ReportDetail.addActionToHistory()', action)

      let message = [
        `${action.source.name} took`,
        ` ${action.action.name} action`,
        `${action.target ? ' to ' + action.target.name : ''}`,
        `${action.action.result ? ', dealing ' + action.resultAmount + ' dmamage.' : '.'}`,
      ].join('')
      
      console.log(message)

      // Expected
      // - source: String - model declaring action
      // - target: String - model targeted by action
      // - resultType: String|Symbol - type of result (damage, healing)
      // - resultAmount: Integer - amount of result (etc: modified wound)
    },
    moveNextRound: function () {
      console.log('ReportDetail.moveNextRound()', action)

    }
  }
}
</script>

<style scoped>

</style>
