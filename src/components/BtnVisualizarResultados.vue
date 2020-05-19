<template>
  <router-link
    to="/visualizar-resultados"
    :disabled="applied_filters.length === 0"
    class="btn btn-orange btn-lg link-disabled btn-visualizar-resultados"
  >
    <i class="fa fa-list-alt"></i>
    Visualizar
    <span class="hidden-xs hidden-sm">resultados</span>
  </router-link>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "btn-visualizar-resultados",
  computed: {
    ...mapGetters({
      applied_filters: "filters/applied_filters",
    }),
  },
};
</script>

<style lang="scss">
.col_left {
  .btn-visualizar-resultados {
    width: 100%;
  }
}
</style>
