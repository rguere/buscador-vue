<template>
	<div class="home" id="page-wrapper">
		<banner-top></banner-top>
    <div class="container"><div v-if="loading" class="loading">Loading&#8230;</div><filter-list-checkboxs :search="search"></filter-list-checkboxs></div>
	</div>
</template>

<script>
// @ is an alias to /src

import { mapGetters } from 'vuex'

export default {
  name: 'buscador',
  middleware: 'auth',
  layout: 'basic',
  metaInfo () {
    return { 
      title: 'Buscador de empresas',
      titleTemplate: `%s | Información GRATIS de Empresas Españolas` 
    }
  },
  computed: mapGetters({
    search: 'search/search',
    loading: 'search/loading',
  }),
  data: () => ({
  }),
  mounted() {
    this.fetchSearch()
  },
  created () {
    this.$store.dispatch('layout/setLayout', 'default-layout')
  },
  methods: {
    fetchSearch (){
      this.$store.dispatch('search/fetchSearch').then(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>
	@import './../sass/loading';
</style>