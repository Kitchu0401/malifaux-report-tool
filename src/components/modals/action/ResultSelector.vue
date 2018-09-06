<template>

  <article>
    <v-ons-row>
      <v-ons-col>
        <v-ons-list>
          <v-ons-list-item
              modifier="nodivider"
              v-for="damage in damageSpread" :key="damage"
              v-if="damage % 2 === 1">

            <v-ons-button modifier="large" style="margin: 0px;" @click="select(damage)">{{ damage }}</v-ons-button>

          </v-ons-list-item>
        </v-ons-list>
      </v-ons-col>
      <v-ons-col>
        <v-ons-list>
          <v-ons-list-item
              modifier="nodivider"
              v-for="damage in damageSpread" :key="damage"
              v-if="damage % 2 === 0">

            <v-ons-button modifier="large" style="margin: 0px;" @click="select(damage)">{{ damage }}</v-ons-button>

          </v-ons-list-item>
        </v-ons-list>
      </v-ons-col>
    </v-ons-row>
  </article>

</template>

<script>
import Vue from 'vue'

export default {
  name: 'ActionResultSelector',
  props: {
    select: Function,
    action: Object
  },
  data: function () {
    return {
      damageSpread: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    }
  }
}
</script>
