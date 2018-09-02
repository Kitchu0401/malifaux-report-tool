<template>
  
  <v-ons-dialog
    cancelable
    :visible.sync="visible">

    <section style="padding: 8px;">
      <v-ons-list>
        <v-ons-list-item modifier="nodivider">
          <v-ons-button modifier="large" style="margin: 0px;">Add my action</v-ons-button>
        </v-ons-list-item>
        <v-ons-list-item modifier="nodivider">
          <v-ons-button modifier="large" style="margin: 0px;">Add their action</v-ons-button>
        </v-ons-list-item>
        <v-ons-list-item modifier="nodivider">
          <v-ons-button modifier="large" style="margin: 0px;">Next Round</v-ons-button>
        </v-ons-list-item>
        <v-ons-list-item modifier="nodivider">
          <v-ons-button modifier="large" style="margin: 0px;">Add my action</v-ons-button>
        </v-ons-list-item>
        <v-ons-list-item modifier="nodivider">
          <v-ons-button modifier="large" style="margin: 0px;">Add their action</v-ons-button>
        </v-ons-list-item>
        <v-ons-list-item modifier="nodivider">
          <v-ons-button modifier="large" style="margin: 0px;">Next Round</v-ons-button>
        </v-ons-list-item>
        <v-ons-list-item modifier="nodivider">
          <v-ons-button modifier="large" style="margin: 0px;">Add my action</v-ons-button>
        </v-ons-list-item>
        <v-ons-list-item modifier="nodivider">
          <v-ons-button modifier="large" style="margin: 0px;">Add their action</v-ons-button>
        </v-ons-list-item>
        <v-ons-list-item modifier="nodivider">
          <v-ons-button modifier="large" style="margin: 0px;">Next Round</v-ons-button>
        </v-ons-list-item>
        <v-ons-list-item modifier="nodivider">
          <v-ons-button modifier="large" style="margin: 0px;">Add my action</v-ons-button>
        </v-ons-list-item>
        <v-ons-list-item modifier="nodivider">
          <v-ons-button modifier="large" style="margin: 0px;">Add their action</v-ons-button>
        </v-ons-list-item>
        <v-ons-list-item modifier="nodivider">
          <v-ons-button modifier="large" style="margin: 0px;">Next Round</v-ons-button>
        </v-ons-list-item>
        <v-ons-list-item modifier="nodivider">
          <v-ons-button modifier="large" style="margin: 0px;">Add my action</v-ons-button>
        </v-ons-list-item>
        <v-ons-list-item modifier="nodivider">
          <v-ons-button modifier="large" style="margin: 0px;">Add their action</v-ons-button>
        </v-ons-list-item>
        <v-ons-list-item modifier="nodivider">
          <v-ons-button modifier="large" style="margin: 0px;">Next Round</v-ons-button>
        </v-ons-list-item>
        <v-ons-list-item modifier="nodivider">
          <v-ons-button modifier="large" style="margin: 0px;">Add my action</v-ons-button>
        </v-ons-list-item>
        <v-ons-list-item modifier="nodivider">
          <v-ons-button modifier="large" style="margin: 0px;">Add their action</v-ons-button>
        </v-ons-list-item>
        <v-ons-list-item modifier="nodivider">
          <v-ons-button modifier="large" style="margin: 0px;">Next Round</v-ons-button>
        </v-ons-list-item>
      </v-ons-list>
    </section>
    
  </v-ons-dialog>

</template>

<script>
import Vue from 'vue'

export default {
  name: 'AddActionModal',
  mounted: function () {
    // Global event mapping
    Vue.EventBus.$on('open-modal-add-action', this.openModal)
  },
  data: function () {
    return {
      visible: false
    }
  },
  methods: {
    openModal: function () {
      this.visible = true
    }
  }
}
</script>
