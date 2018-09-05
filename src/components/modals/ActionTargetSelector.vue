<template>

  <v-ons-list>
    <v-ons-list-item modifier="nodivider" v-for="(model, index) in models" :key="index">

      <v-ons-button
        modifier="large" style="margin: 0px;"
        v-once v-text="model.name"
        @click="select(model)"/>

    </v-ons-list-item>
  </v-ons-list>

</template>

<script>
import Vue from 'vue'

export default {
  name: 'ActionTargetSelector',
  props: {
    select: Function,
    action: Object,
    crew_yours: Object,
    crew_their: Object
  },
  computed: {
    models: function () {
      return this.action.action.target
        .filter(t => t === 'Friendly' || t === 'Opponent')
        .reduce((arr, t) => arr.concat(t === 'Friendly'
          ? this.action.side === 'crew_yours' ? this.crew_yours.modelList : this.crew_their.modelList
          : this.action.side === 'crew_yours' ? this.crew_their.modelList : this.crew_yours.modelList), [])
    }
  }
}
</script>
