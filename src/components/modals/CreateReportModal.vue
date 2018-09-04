<template>
  
  <v-ons-dialog
    cancelable
    :visible.sync="visible">
    
    <p style="text-align: center">Creating new report</p>

    <section style="padding: 8px">
      <v-ons-list>
        <v-ons-list-item style="padding: 0px;">
          <label for="discord-id">Discord ID</label>
          <v-ons-input
            input-id="discord-id"
            placeholder="Discord ID"
            style="width: 100%;"
            v-model="discord_id"/>
        </v-ons-list-item>
        <v-ons-list-item style="padding: 0px;">
          <label for="discord-id">Your crew</label>
          <textarea
            input-id="crew_yours"
            placeholder="Your crew"
            class="textarea" rows="5" style="width: 100%;"
            v-model="crew_thisside"/>
        </v-ons-list-item>
        <v-ons-list-item style="padding: 0px;">
          <label for="discord-id">Opponent`s crew</label>
          <textarea
            input-id="crew_their"
            placeholder="Their crew"
            class="textarea" rows="5" style="width: 100%;"
            v-model="crew_opponent"/>
        </v-ons-list-item>

        <v-ons-button modifier="large" style="margin: 6px 0" v-on:click="createReport">Start recording</v-ons-button>
      </v-ons-list>
    </section>
    
  </v-ons-dialog>

</template>

<script>
import Vue from 'vue'
import CrewParse from '../../util/crewParser'

const SAMPLE_CREW = {
  thisside: `Declared Faction: Arcanists 
Crew Name: Marcus w/ Amina 50ss 
Leader: Marcus - Cache:(4)
   The Gods Domain 1ss 
   The Hunger Cry 1ss 
   Feral Instincts 1ss 
Jackalope 2ss 
Amina Naidu 9ss 
   Imbued Protection 2ss 
Rogue Necromancy 10ss 
   Imbued Energies 1ss 
Cojo 6ss 
   Well Rehearsed 1ss 
Ferdinand Vogel 8ss 
Arcane Effigy 4ss 
Night Terror 3ss`,

  opponent: `Declared Faction: Gremlins 
Crew Name: Mwah? 50ss 
Leader: Mah Tucket - Cache:(4)
   Manifest Destiny 1ss 
   Know the Terrain 1ss 
   Out For Blood 2ss 
The Little Lass 4ss 
Trixiebelle 8ss 
   A Gun For a Lady 1ss 
   Dirty Cheater 1ss 
McTavish 11ss 
   Mud Toss 1ss 
Banjonista 5ss 
Bayou Bushwhacker 5ss 
Bayou Bushwhacker 5ss 
Lucky Effigy 4ss`
}

export default {
  name: 'CreateReportModal',
  mounted: function () {
    // Global event mapping
    Vue.EventBus.$on('open-modal-create-report', this.openModal)
  },
  data: function () {
    return {
      visible: false,
      // discord_id: '',
      // crew_thisside: '',
      // crew_opponent: ''
      discord_id: '@test-discord-id',
      crew_thisside: SAMPLE_CREW.thisside,
      crew_opponent: SAMPLE_CREW.opponent
    }
  },
  methods: {
    openModal: function () {
      this.visible = true
    },
    createReport: function () {
      if (!this.discord_id)     return this.$ons.notification.toast('Discord ID is required!', { timeout: 2500 })
      if (!this.crew_thisside)  return this.$ons.notification.toast('Your crew is required!', { timeout: 2500 })
      if (!this.crew_opponent)  return this.$ons.notification.toast('Opponent`s crew is required!', { timeout: 2500 })

      let params = {
        discord_id: this.discord_id,
        crew_thisside: CrewParse.parse(this.crew_thisside),
        crew_opponent: CrewParse.parse(this.crew_opponent)
      }

      Vue.EventBus.$emit('create-report', params)

      this.visible = false
    }
  }
}
</script>
