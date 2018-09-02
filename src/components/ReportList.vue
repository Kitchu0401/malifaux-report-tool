<template>

  <v-ons-page>

    <!-- Toolbar -->
    <v-ons-toolbar>
      <div class="left">
        <v-ons-toolbar-button>
          <v-ons-icon icon="md-menu" size="32px"></v-ons-icon>
        </v-ons-toolbar-button>
      </div>
      <div class="center" style="text-align: center;">
        Report List Page
      </div>
      <div class="right">
        <v-ons-toolbar-button>
          <v-ons-icon icon="md-plus" size="32px" v-on:click="callCreateReportModal"></v-ons-icon>
        </v-ons-toolbar-button>
      </div>
    </v-ons-toolbar>

    <v-ons-list>
      <!-- <v-ons-list-header>Default</v-ons-list-header> -->
      <v-ons-list-item v-for="(report, index) in reportList" :key="index" :report="report"></v-ons-list-item>
    </v-ons-list>
  
  </v-ons-page>

</template>

<script>
import Vue from 'vue'

export default {
  name: 'ReportList',
  props: {
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
