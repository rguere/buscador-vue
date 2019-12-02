<template>
  <div id="app">
    <component :is="layout"></component>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    computed: mapGetters({
      layout: 'layout/layout'
    }),
  }
</script>

<style lang="scss">
  
  @import '@/sass/app';

</style>
