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
  
  </v-ons-page>

</template>

<script>
import Vue from 'vue'

export default {
  name: 'ReportDetail',
  props: {
    reportDetail: Object
  },
  methods: {
    callAddActionModal: function () {
      Vue.EventBus.$emit('open-modal-add-action')
    }
  }
}
</script>

<style scoped>

</style>
