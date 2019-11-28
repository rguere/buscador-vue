<template>
  <div>
    <menu-infocif></menu-infocif>
    <router-view />
  </div>
</template>

<script> 
  import MenuInfocif from '@/components/MenuInfocif'
  export default {
    name: 'DefaultLayout',
    components: {
      MenuInfocif
    }
  }
</script>