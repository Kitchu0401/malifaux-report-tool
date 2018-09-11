<template>
  
  <v-ons-dialog
    cancelable
    :class="'dialog-model'"
    :visible.sync="visible">

    <v-ons-list style="height: 140px;">
      <!-- Custom action name -->
      <v-ons-list-header>Model name</v-ons-list-header>
      <v-ons-list-item><v-ons-input v-model="name"/></v-ons-list-item>

      <!-- Filtered model list -->
      <v-ons-list-item
          tappable
          modifier="nodivider">
        Add custom model
      </v-ons-list-item>
    </v-ons-list>

    <v-ons-list>
      <v-ons-list-item
          tappable
          modifier="nodivider"
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
    addModel: Function
  },
  mounted: function () {
    // Global event mapping
    Vue.EventBus.$on('open-modal-add-model', this.openModal)

    // TODO creating temporal model list
    // const CHARS = 'ABCDEFGHIJKLMNOPQRSTUWXYZ'
    const CHARS = 'ABCDEFGHIJ'
    let modelSet = new Set()
    while (modelSet.size < 30) {
      let tempName = ''
      while (tempName.length < 8) {
        tempName += CHARS[parseInt(Math.random() * CHARS.length)]
      }
      if (!modelSet.has(tempName)) modelSet.add(tempName)
    }
    modelSet.forEach(k => this.modelList.push({ name: k }))
    console.log(`${this.modelList.length} inserted.`)
  },
  data: function () {
    return {
      side: '',
      name: '',
      visible: false,
      modelList: []
    }
  },
  computed: {
    filteredModelList: function () {
      return this.modelList.filter(model => {
        return !this.name || model.name.indexOf(this.name) >= 0
      }).sort()
    }
  },
  methods: {
    openModal: function (side) {
      this.side = side
      this.name = ''
      this.visible = true
    },
    clickAddModel: function () {
      this.addModel(this.currentRoundIndex, this.model)
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
