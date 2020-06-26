<template>
  <router-link
    to="/visualizar-resultados"
    :disabled="applied_filters.length === 0"
    :class="class_btn_defaul"
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
  props: ["class_btn"],
  computed: {
    ...mapGetters({
      applied_filters: "filters/applied_filters",
    }),
  },
  data() {
    return {
      class_btn_defaul:
        "btn btn-orange btn-lg link-disabled btn-visualizar-resultados",
    };
  },
  mounted() {
    if (this.class_btn) {
      this.class_btn_defaul = `${this.class_btn_defaul} ${this.class_btn}`;
    }
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
