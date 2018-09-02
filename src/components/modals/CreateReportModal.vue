<template>
  
  <v-ons-dialog
    cancelable
    :visible.sync="visible">
    
    <p style="text-align: center">Lorem ipsum</p>
    
  </v-ons-dialog>

</template>

<script>
export default {
  name: 'CreateReportModal',
  mounted: function () {
    // Global event mapping
    Vue.EventBus.$on('open-modal-create-report', this.openModal)
  },
  data: function () {
    return {
      visible: false
    }
  },
  methods: {
    openModal: function () {
      console.log('Global.open-modal-create-report')
      this.visible = true
    }
  }
}
</script>
