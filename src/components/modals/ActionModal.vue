<template>
  
  <v-ons-dialog
    cancelable
    :visible.sync="visible">

    <section style="padding: 8px;">
      <!-- Fixed list items -->
      <v-ons-list v-if="stepIndex === 0">
        <v-ons-list-item modifier="nodivider">
          <v-ons-button modifier="large" style="margin: 0px;" @click="select('crew_yours')">Add my action</v-ons-button>
        </v-ons-list-item>
        <v-ons-list-item modifier="nodivider">
          <v-ons-button modifier="large" style="margin: 0px;" @click="select('crew_their')">Add their action</v-ons-button>
        </v-ons-list-item>
        <v-ons-list-item modifier="nodivider">
          <v-ons-button modifier="large" style="margin: 0px;" @click="clickNextRound()">Next Round</v-ons-button>
        </v-ons-list-item>
      </v-ons-list>
      
      <!-- Dynamic list items -->
      <!-- [1] Source -->
      <action-source-selector
        v-if="stepIndex === 1"
        :select="select"
        :action="action"
        :crew_yours="crew_yours"
        :crew_their="crew_their"/>

      <!-- [2] Action -->
      <action-action-selector
        v-if="stepIndex === 2"
        :select="select"
        :action="action"/>

      <!-- [3] Target -->
      <action-target-selector
        v-if="stepIndex === 3"
        :select="select"
        :action="action"
        :crew_yours="crew_yours"
        :crew_their="crew_their"/>

      <!-- [4] Result -->
      <action-result-selector
        v-if="stepIndex === 4"
        :select="select"
        :action="action"/>
    </section>
    
  </v-ons-dialog>

</template>

<script>
import Vue from 'vue'

import ActionSourceSelector from './ActionSourceSelector.vue'
import ActionActionSelector from './ActionActionSelector.vue'
import ActionTargetSelector from './ActionTargetSelector.vue'
import ActionResultSelector from './ActionResultSelector.vue'

export default {
  name: 'ActionModal',
  components: {
    ActionSourceSelector,
    ActionActionSelector,
    ActionTargetSelector,
    ActionResultSelector
  },
  props: {
    addAction: Function,
    nextRound: Function,
    currentRoundIndex: Number,
    crew_yours: Object,
    crew_their: Object
  },
  mounted: function () {
    // Global event mapping
    Vue.EventBus.$on('open-modal-add-action', this.openModal)
  },
  data: function () {
    return {
      stepIndex: 0,
      stepSelections: [],
      action: {},
      visible: false
    }
  },
  methods: {
    openModal: function () {
      this.stepIndex = 0
      this.action = {}
      this.visible = true
    },
    select: function (selected) {
      switch (this.stepIndex) {
        // Selecting side
        // - selected: String 'crew_yours'|'crew_their'
        case 0:
          this.action.side = selected
          this.stepIndex++

          break;

        // Selecting source model
        // - selected: Model Object { name, actions, upgrades }
        case 1:
          this.action.source = selected
          this.stepIndex++

          break;

        // Selecting performed action
        // - selected: Action Object { name, target, result }
        // - if there`s no target, jump to result
        case 2:
          this.action.action = selected
          this.stepIndex++
          
          // Target required check:
          if (this.action.action.target.length <= 0) {
            this.stepIndex++
            this.select()
          }

          break;

        // Selecting action`s target
        // - selected: Model Object { name, target }
        case 3:
          this.action.target = selected || null
          this.stepIndex++

          // Result required check:
          if (this.action.action.result === undefined) {
            this.stepIndex++
            this.select()
          }

          break;

        // Selecting action`s result
        // - selected: Integer 1-10
        case 4:
          this.action.resultAmount = selected
          this.clickAddAction()
          break;
      
        default:
          console.error('Invalid stepIndex value:', this.stepIndex)
          return;
      }
    },
    clickAddAction: function () {
      this.addAction(this.currentRoundIndex, this.action)
      this.visible = false
    },
    clickNextRound: function () {
      this.nextRound()
      this.visible = false
    }
  }
}
</script>
