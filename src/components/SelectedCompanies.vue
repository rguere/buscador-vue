<template>
  <h3 class="selected_companies">
    <span class="f-20">{{ selected_companies | numeral("0,0") }}</span>
    Empresas seleccionadas
  </h3>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "selected-companies",
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      selected_companies: "filters/selected_companies",
    }),
  },
};
</script>

<style lang="scss">
.col_left {
  .selected_companies {
    text-align: center;
    margin-bottom: 20px;
    span.f-20 {
      display: block;
      font-size: 35px;
      font-weight: bold;
    }
  }
}
</style>
