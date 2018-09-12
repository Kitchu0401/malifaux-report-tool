<template>
  
  <v-ons-dialog
    cancelable
    :class="'dialog-model'"
    :visible.sync="visible">

    <v-ons-list>
      <!-- Custom action name -->
      <v-ons-list-item><v-ons-input v-model="memo"/></v-ons-list-item>
      <v-ons-button modifier="large" style="margin: 6px 0" v-on:click="closeModal">Close</v-ons-button>
    </v-ons-list>
    
  </v-ons-dialog>

</template>

<script>
import Vue from 'vue'

export default {
  name: 'MemoModal',
  mounted: function () {
    // Global event mapping
    Vue.EventBus.$on('open-modal-add-memo', this.openModal)
  },
  data: function () {
    return {
      actionDetail: {},
      memo: '',
      visible: false
    }
  },
  methods: {
    openModal: function (action) {
      this.actionDetail = action
      this.memo = action.memo
      this.visible = true
    },
    closeModal: function () {
      this.actionDetail.memo = this.memo
      this.visible = false
    }
  }
}
</script>

<style scoped>
.dialog-model >>> .dialog {
  max-height: 80%;
  overflow-y: auto;
}
</style>
