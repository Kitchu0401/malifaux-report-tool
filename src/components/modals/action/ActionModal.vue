<template>
  
  <v-ons-dialog
    cancelable
    :class="'dialog-action'"
    :visible.sync="visible">

    <section>
      <!-- Fixed list items -->
      <v-ons-list v-if="stepIndex === 0">
        <v-ons-list-item modifier="nodivider">
          <v-ons-button modifier="large" style="margin: 0px;" @click="select('crew_yours')">Add my action</v-ons-button>
        </v-ons-list-item>
        <v-ons-list-item modifier="nodivider">
          <v-ons-button modifier="large" style="margin: 0px;" @click="select('crew_their')">Add their action</v-ons-button>
        </v-ons-list-item>
        <v-ons-list-item modifier="nodivider">
          <v-ons-button modifier="large" style="margin: 0px;" @click="clickAddModel('crew_yours')">Add my model</v-ons-button>
        </v-ons-list-item>
        <v-ons-list-item modifier="nodivider">
          <v-ons-button modifier="large" style="margin: 0px;" @click="clickAddModel('crew_their')">Add their model</v-ons-button>
        </v-ons-list-item>
        <v-ons-list-item modifier="nodivider">
          <v-ons-button modifier="large" style="margin: 0px;" @click="clickNextRound()">Next Round</v-ons-button>
        </v-ons-list-item>
      </v-ons-list>
      
      <!-- Dynamic list items -->
      <!-- [1] Source -->
      <source-selector
        v-if="stepIndex === 1"
        :select="select"
        :action="action"
        :crew_yours="crew_yours"
        :crew_their="crew_their"/>

      <!-- [2] Action -->
      <action-selector
        v-if="stepIndex === 2"
        :showCustomAction="showCustomAction"
        :select="select"
        :action="action"/>

      <!-- [2-1] Custom action  -->
      <custom-action-selector
        v-if="stepIndex === 2.1"
        :addCustomAction="addCustomAction"/>

      <!-- [3] Target -->
      <target-selector
        v-if="stepIndex === 3"
        :select="select"
        :action="action"
        :crew_yours="crew_yours"
        :crew_their="crew_their"/>

      <!-- [4] Result -->
      <result-selector
        v-if="stepIndex === 4"
        :select="select"
        :action="action"/>
    </section>
    
  </v-ons-dialog>

</template>

<script>
import Vue from 'vue'

import SourceSelector from './SourceSelector.vue'
import ActionSelector from './ActionSelector.vue'
import TargetSelector from './TargetSelector.vue'
import ResultSelector from './ResultSelector.vue'
import CustomActionSelector from './CustomActionSelector.vue'

export default {
  name: 'ActionModal',
  components: {
   SourceSelector,
   ActionSelector,
   TargetSelector,
   ResultSelector,
   CustomActionSelector
  },
  props: {
    addAction: Function,
    callAddModelModal: Function,
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
    showCustomAction: function () {
      this.stepIndex = 2.1
    },
    addCustomAction: function (customAction) {
      this.action.source.actions.push(customAction)
      this.select(customAction)
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
        case 2.1:
          this.action.action = selected
          this.stepIndex = parseInt(this.stepIndex)
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
    clickAddModel: function (side) {
      this.visible = false
      this.callAddModelModal(side)
    },
    clickNextRound: function () {
      this.nextRound()
      this.visible = false
    }
  }
}
</script>

<style scoped>
.dialog-action >>> .dialog {
  max-height: 80%;
  overflow-y: scroll;
}
</style>
