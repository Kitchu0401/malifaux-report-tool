<template>

  <article>

    <!-- Custom action -->
    <v-ons-row>
      <v-ons-col>

        <v-ons-input v-model="customAction.name"/>

      </v-ons-col>
      <v-ons-col width="64px;">
        <v-ons-button modifier="large" style="margin: 0px;" @click="selectCustomAction">Add action</v-ons-button>
      </v-ons-col>
    </v-ons-row>

    <!-- Common actions -->
    <v-ons-row>
      <v-ons-col>
        <v-ons-list-item
            modifier="nodivider"
            v-for="(action, index) in commonOddActions" :key="index">

          <v-ons-button
            modifier="large" style="margin: 0px;"
            v-once v-text="action.name"
            @click="select(action)"/>

        </v-ons-list-item>
      </v-ons-col>
      <v-ons-col>
        <v-ons-list-item
            modifier="nodivider"
            v-for="(action, index) in commonEvenActions" :key="index">

          <v-ons-button
            modifier="large" style="margin: 0px;"
            v-once v-text="action.name"
            @click="select(action)"/>

        </v-ons-list-item>
      </v-ons-col>
    </v-ons-row>
  </article>

</template>

<script>
import Vue from 'vue'

export default {
  name: 'ActionActionSelector',
  props: {
    select: Function,
    action: Object
  },
  data: function () {
    return {
      customAction: {
        name: ''
      }
    }
  },
  computed: {
    commonOddActions: function () {
      return this.action.source.actions
        .filter(action => action.type === 'Common')
        .filter((action, index) => index % 2 === 0)
    },
    commonEvenActions: function () {
      return this.action.source.actions
        .filter(action => action.type === 'Common')
        .filter((action, index) => index % 2 === 1)
    }
  },
  methods: {
    selectCustomAction: function () {
      console.log({ name: this.customAction.name })
    }
  }
}
</script>
