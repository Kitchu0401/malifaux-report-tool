<template>

  <v-ons-page>

    <!-- Toolbar -->
    <v-ons-toolbar>
      <div class="left"><v-ons-toolbar-button @click="openListPage">Back</v-ons-toolbar-button></div>
      <div class="center" style="text-align: center;">Round {{ currentRoundIndex + 1 }}</div>
      <div class="right"><v-ons-toolbar-button v-if="editable" @click="saveReport">Save</v-ons-toolbar-button></div>
    </v-ons-toolbar>

    <!-- History: Carousel -->
    <v-ons-carousel fullscreen swipeable auto-scroll overscrollable :index.sync="currentRoundIndex">
      <v-ons-carousel-item v-for="(round, roundIndex) in reportDetail.history" :key="roundIndex" :style="{backgroundColor: '#fff'}">

        <report-history :round="round"/>

      </v-ons-carousel-item>
    </v-ons-carousel>

    <!-- History: Carousel - dots navigator -->
    <div class="dots">
      <span v-for="roundIndex in reportDetail.history.length" :key="roundIndex" :index="roundIndex - 1" @click="currentRoundIndex = roundIndex - 1">
        {{ currentRoundIndex === roundIndex - 1 ? '\u25CF' : '\u25CB' }}
      </span>
    </div>

    <!-- Action Fab -->
    <v-ons-fab
        position="bottom right"
        v-if="editable"
        v-on:click="callAddActionModal">
      <v-ons-icon icon="md-plus"></v-ons-icon>
    </v-ons-fab>

    <AddActionModal
      :addAction="addAction"
      :nextRound="nextRound"
      :currentRoundIndex="currentRoundIndex"
      :crew_yours="reportDetail.crew_yours"
      :crew_their="reportDetail.crew_their"/>
  
  </v-ons-page>

</template>

<script>
import Vue from 'vue'

import ReportHistory from './ReportHistory.vue'
import AddActionModal from './modals/AddActionModal.vue'

export default {
  name: 'ReportDetail',
  components: {
    ReportHistory,
    AddActionModal
  },
  props: {
    openListPage: Function,
    saveReport: Function,
    reportDetail: Object
  },
  data: function () {
    return {
      currentRoundIndex: 0
    }
  },
  computed: {
    editable: function () {
      return this.reportDetail.created === null
    }
  },
  methods: {
    callAddActionModal: function () {
      Vue.EventBus.$emit('open-modal-add-action')
    },
    addAction: function (currentRoundIndex, action) {
      this.reportDetail.history[currentRoundIndex].push(action)
    },
    nextRound: function () {
      this.reportDetail.history.push([])
    }
  }
}
</script>

<style scoped>
.dots {
  text-align: center;
  font-size: 30px;
  color: #aaa;
  position: absolute;
  bottom: 40px;
  left: 0;
  right: 0;
}

.dots span {
  cursor: pointer;
}
</style>
