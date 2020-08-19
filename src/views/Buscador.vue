<template>
  <div class="home" id="page-wrapper">
    <!-- <select-topic></select-topic> -->
    <banner-top banner-title="Buscador de Empresas" banner-subtitle="Buscador de Empresas"></banner-top>
    <div class="container">
      <loading-full-page></loading-full-page>
      <filter-list-checkboxs :loadingResumen="loadingResumen" :search="search"></filter-list-checkboxs>
    </div>
    <infor-footer></infor-footer>
  </div>
</template>

<script>
// @ is an alias to /src

import { mapGetters } from "vuex";
import { sendPageView, getResumenLength } from "./../utils";
// getFiltersStorage
// import { persistentStorage } from "./../mixins/persistent-storage";

export default {
  name: "buscador",
  // mixins: [persistentStorage],
  layout: "basic",
  metaInfo() {
    return {
      title: "Buscador - Filtros",
    };
  },
  computed: mapGetters({
    search: "search/search",
  }),
  data: () => ({
    loadingResumen: false,
  }),
  mounted() {
    this.fetchSearch();
    sendPageView("", "Buscador - Filtros");
  },
  created() {
    this.$store.dispatch("layout/setLayout", "default-layout");
  },
  watch: {
    search: function (newSearch) {
      if (newSearch && getResumenLength(newSearch) > 0) {
        this.loadingResumen = false;
        // const beforeForm = getFiltersStorage();
        // if (beforeForm) {
        //   this.$store.dispatch("search/filtrar", beforeForm);
        // }
      }
    },
  },
  methods: {
    fetchSearch() {
      this.loadingResumen = true;
      if (getResumenLength(this.search) === 0) {
        this.searchResumen();
      } else {
        this.loadingResumen = false;
      }
    },
    async searchResumen() {
      await this.$store.dispatch("search/fetchSearch");
    },
  },
};
</script>

<style lang="scss" scoped></style>
