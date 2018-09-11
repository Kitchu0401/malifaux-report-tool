<template>
  
  <v-ons-dialog
    cancelable
    :class="'dialog-model'"
    :visible.sync="visible">

    <v-ons-list style="height: 140px;">
      <!-- Custom action name -->
      <v-ons-list-header>Model name</v-ons-list-header>
      <v-ons-list-item><v-ons-input v-model="model.name"/></v-ons-list-item>

      <!-- Filtered model list -->
      <v-ons-list-item
          tappable modifier="nodivider"
          @click="clickAddCustomModel">
        Add custom model
      </v-ons-list-item>
    </v-ons-list>

    <v-ons-list>
      <v-ons-list-item
          tappable modifier="nodivider"
          @click="clickAddModel(model.name)"
          v-for="(model, index) in filteredModelList" :key="index">
        {{ model.name }}
      </v-ons-list-item>
    </v-ons-list>
    
  </v-ons-dialog>

</template>

<script>
import Vue from 'vue'

export default {
  name: 'ModelModal',
  props: {
    addModel: Function,
    modelList: Array
  },
  mounted: function () {
    // Global event mapping
    Vue.EventBus.$on('open-modal-add-model', this.openModal)
  },
  data: function () {
    return {
      side: '',
      model: {
        name: ''
      },
      visible: false
    }
  },
  computed: {
    filteredModelList: function () {
      return this.modelList.filter(model => {
        return !this.model.name || model.name.toLowerCase().indexOf(this.model.name.toLowerCase()) >= 0
      }).sort()
    }
  },
  methods: {
    openModal: function (side) {
      this.side = side
      // this.model.name = ''
      this.visible = true
    },
    clickAddCustomModel: function () {
      this.addModel(this.side, this.model)
      this.visible = false
    },
    clickAddModel: function (name) {
      this.addModel(this.side, { name: name })
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
