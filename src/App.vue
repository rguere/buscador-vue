<template>
  <div id="app">
    <v-dialog/>
    <menu-infocif></menu-infocif>
    <router-view />
  </div>
</template>

<script> 
  import MenuInfocif from '@/components/MenuInfocif'
  export default {
    components: {
      MenuInfocif
    }
  }
</script>

<style lang="scss">
  
  @import './sass/app';

</style>
