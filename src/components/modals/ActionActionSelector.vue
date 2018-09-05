<template>

  <v-ons-list>
    <v-ons-list-item modifier="nodivider" v-for="(action, index) in action.source.actions" :key="index">

      <v-ons-button
        modifier="large" style="margin: 0px;"
        v-once v-text="action.name"
        @click="select(action)"/>

    </v-ons-list-item>
  </v-ons-list>

</template>

<script>
import Vue from 'vue'

export default {
  name: 'ActionActionSelector',
  props: {
    select: Function,
    action: Object
  }
}
</script>
