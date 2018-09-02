<template>

  <v-ons-page>

    <!-- Toolbar -->
    <v-ons-toolbar>
      <div class="center">
        Report List Page
      </div>
      <div class="right">
        <v-ons-toolbar-button>
          <v-ons-icon icon="ion-navicon, material: md-plus" v-on:click="callCreateReportModal"></v-ons-icon>
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
export default {
  name: 'ReportList',
  props: {
    reportList: Array
  },
  methods: {
    callCreateReportModal: function () {
      this.$Vue.EventBus.$emit('open-modal-create-report')
    }
  }
}
</script>

<style scoped>

</style>
