<template>
  
  <v-ons-dialog
    cancelable
    :visible.sync="visible">

    <section style="padding: 8px;">
      <p style="text-align: center;">{{ stepIndex }}<p/>

      <!-- Fixed list items -->
      <v-ons-list v-if="stepIndex === 0">
        <v-ons-list-item modifier="nodivider">
          <v-ons-button modifier="large" style="margin: 0px;" @click="select('crew_yours')">Add my action</v-ons-button>
        </v-ons-list-item>
        <v-ons-list-item modifier="nodivider">
          <v-ons-button modifier="large" style="margin: 0px;" @click="select('crew_their')">Add their action</v-ons-button>
        </v-ons-list-item>
        <v-ons-list-item modifier="nodivider">
          <v-ons-button modifier="large" style="margin: 0px;" @click="moveNextRound()">Next Round</v-ons-button>
        </v-ons-list-item>
      </v-ons-list>

      <!-- Dynamic list items -->
      <v-ons-list v-if="stepIndex !== 0">
        <v-ons-list-item 
            modifier="nodivider"
            v-for="(selection, key) in stepSelections"
            :key="key" :selection="selection">
          <v-ons-button modifier="large" style="margin: 0px;" @click="select(selection)">{{ selection.name || selection }}</v-ons-button>
        </v-ons-list-item>
      </v-ons-list>
    </section>
    
  </v-ons-dialog>

</template>

<script>
import Vue from 'vue'

const STEPS = [
  Symbol('Side'),
  Symbol('Source'),
  Symbol('Action'),
  Symbol('Target'),
  Symbol('Result')
]

const defaultItems = [
  {
    
  }
]

export default {
  name: 'AddActionModal',
  props: {
    addActionToHistory: Function,
    moveNextRound: Function,
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
      console.log('AddActionModal.select()', selected)

      switch (this.stepIndex) {

        // Selecting side
        // - selected: String 'crew_yours'|'crew_theirs'
        case 0:
          this.action.side = selected
          this.stepIndex++

          this.stepSelections = this[selected].modelList
          break;

        // Selecting source model
        // - selected: Model Object { name, actions, upgrades }
        case 1:
          this.action.source = selected
          this.stepIndex++

          this.stepSelections = selected.actions
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
          } else {
            this.stepSelections = selected.target
              .filter(t => t === 'Friendly' || t === 'Opponent')
              .reduce((arr, t) => arr.concat(t === 'Friendly'
                ? this.action.side === 'crew_yours' ? this['crew_yours'].modelList : this['crew_theirs'].modelList
                : this.action.side === 'crew_yours' ? this['crew_their'].modelList : this['crew_yours'].modelList), [])
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
          } else {
            this.stepSelections = [1,2,3,4,5,6,7,8,9,10]
          }
          break;

        // Selecting action`s result
        // - selected: Integer 1-10
        case 4:
          this.action.resultAmount = selected
          this.addAction()
          break;
      
        default:
          console.error('Invalid stepIndex value:', this.stepIndex)
          return;
      }
    },
    addAction: function () {
      this.addActionToHistory(this.action)
      this.visible = false
    }
  }
}
</script>
