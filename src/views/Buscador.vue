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
      title: 'Buscador de empresas',
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
  },
  created () {
    this.$store.dispatch('layout/setLayout', 'default-layout')
  },
  methods: {
    fetchSearch (){
      /*console.log(
        this.search.antiguedad.length,
        this.search.empleados.length,
        this.search.provincia.length,
        this.search.provincia_localidad.length,
        this.search.auditor.length,
        this.search.cnae.length,
        this.search.industria.length,
      )*/
      if (this.search && this.search.provincia_localidad && this.search.provincia_localidad.length === 0) {
        this.$store.dispatch('search/fetchSearch').then(() => {})
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>