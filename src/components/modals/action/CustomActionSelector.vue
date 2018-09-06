<template>
  
  <v-ons-list>
    <!-- Custom action name -->
    <v-ons-list-header>Action name</v-ons-list-header>
    <v-ons-list-item><v-ons-input v-model="customAction.name"/></v-ons-list-item>

    <!-- Custom action target -->
    <v-ons-list-header>Available targets</v-ons-list-header>
    <v-ons-list-item v-for="(side, index) in ['Friendly', 'Opponent']" :key="index" tappable>
      <label class="left">
        <v-ons-checkbox
          :input-id="`checkbox-${index}`"
          :value="side"
          v-model="customAction.target"/>
      </label>
      <label class="center" :for="`checkbox-${index}`">{{ side }}</label>
    </v-ons-list-item>

    <v-ons-button modifier="large" style="margin: 6px 0" v-on:click="clickAddCustomAction">Add custom action</v-ons-button>
  </v-ons-list>

</template>

<script>
import Vue from 'vue'

export default {
  name: 'ActionModal',
  props: {
    addCustomAction: Function
  },
  data: function () {
    return {
      customAction: {
        name: '',
        target: []
      }
    }
  },
  methods: {
    clickAddCustomAction: function () {
      if (!this.customAction.name.trim()) return this.$ons.notification.toast('Action name is required!', { timeout: 2500 })

      this.addCustomAction({
        name: this.capitalize(this.customAction.name),
        target: this.customAction.target.map(t => t),
        type: 'Custom'
      })

      this.customAction.name = ''
      this.customAction.target = []
    },
    capitalize: function (string) {
      string = string.trim()
      return `${string.substring(0, 1).toUpperCase()}${string.substring(1)}`
    }
  }
}
</script>
