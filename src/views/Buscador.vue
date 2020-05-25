<template>
  <div class="home" id="page-wrapper">
    <select-topic></select-topic>
    <banner-top
      banner-title="Buscador de Empresas"
      banner-subtitle="Buscador de Empresas"
    ></banner-top>
    <div class="container">
      <loading-full-page></loading-full-page>
      <filter-list-checkboxs :search="search"></filter-list-checkboxs>
    </div>
    <infor-footer></infor-footer>
  </div>
</template>

<script>
// @ is an alias to /src

import { mapGetters } from "vuex";
import { sendPageView } from "./../utils";

export default {
  name: "buscador",
  /*middleware: 'auth',*/
  layout: "basic",
  metaInfo() {
    return {
      title: "Buscador - Filtros",
    };
  },
  computed: mapGetters({
    search: "search/search",
  }),
  data: () => ({}),
  mounted() {
    this.fetchSearch();
    sendPageView("", "Buscador - Filtros");
  },
  created() {
    this.$store.dispatch("layout/setLayout", "default-layout");
  },
  methods: {
    fetchSearch() {
      if (
        this.search &&
        this.search.provincia_localidad &&
        this.search.provincia_localidad.length === 0
      ) {
        this.$store.dispatch("search/fetchSearch").then(() => {});
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
