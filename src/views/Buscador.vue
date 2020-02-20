<template>
	<div class="home" id="page-wrapper">
		<banner-top banner-title="Buscador de Empresas" banner-subtitle="Buscador de Empresas"></banner-top>
    <div class="container">
      <loading-full-page></loading-full-page>
      <filter-list-checkboxs :search="search"></filter-list-checkboxs>
    </div>
	</div>
</template>

<script>
// @ is an alias to /src

import { mapGetters } from 'vuex'

export default {
  name: 'buscador',
  /*middleware: 'auth',*/
  layout: 'basic',
  metaInfo () {
    return { 
      title: 'Buscador - Filtros',
      titleTemplate: `%s | Información GRATIS de Empresas Españolas` 
    }
  },
  computed: mapGetters({
    search: 'search/search',
  }),
  data: () => ({
  }),
  mounted() {
    this.fetchSearch()
    if(window.ga){
      window.ga('set', 'page', '/buscador');
      window.ga('set', 'title', 'Buscador - Filtros');
      window.ga('send', 'pageview');
    }
  },
  created () {
    this.$store.dispatch('layout/setLayout', 'default-layout')
  },
  methods: {
    fetchSearch (){
      if (this.search && this.search.provincia_localidad && this.search.provincia_localidad.length === 0) {
        this.$store.dispatch('search/fetchSearch').then(() => {})
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>