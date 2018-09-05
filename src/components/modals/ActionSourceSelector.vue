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
  name: 'ActionSourceSelector',
  props: {
    select: Function,
    action: Object,
    crew_yours: Object,
    crew_their: Object
  },
  computed: {
    models: function () {
      switch (this.action.side) {
        case 'crew_yours':  return this.crew_yours.modelList
        case 'crew_their':  return this.crew_their.modelList
        default:            return []
      }
    }
  }
}
</script>
