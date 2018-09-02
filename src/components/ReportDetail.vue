<template>

  <v-ons-page>

    <!-- Toolbar -->
    <v-ons-toolbar>
      <div class="center">
        Report Detail Page: {{reportDetail.title}}
      </div>
      <!--
      <div class="right">
        <v-ons-toolbar-button>
          <v-ons-icon icon="ion-navicon, material: md-menu"></v-ons-icon>
        </v-ons-toolbar-button>
      </div>
      -->
    </v-ons-toolbar>

    <!--
    <v-ons-list>
      <v-ons-list-header>Default</v-ons-list-header>
      <v-ons-list-item>Item A</v-ons-list-item>
      <v-ons-list-item>Item B</v-ons-list-item>
    </v-ons-list>
    -->
  
  </v-ons-page>

</template>

<script>
export default {
  name: 'ReportDetail',
  props: {
    reportDetail: Object
  }
}
</script>

<style scoped>

</style>
