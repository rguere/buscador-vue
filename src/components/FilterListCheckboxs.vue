<template>
  <div>
    <filter-buttons v-if="structure === `0.1`"></filter-buttons>
    <div v-if="structure === `0.2`">
      <p
        class="filter-buttons_description text-center b"
        style="background-color: paleturquoise; padding: 5px;"
      >
        ¡Incorpora a tus búsquedas tantos filtros como quieras!. Hay múltiples
        posibilidades.
      </p>
    </div>
    <div :class="stylesClass.conten_row">
      <div :class="stylesClass.col_left">
        <affix
          v-if="structure === `0.2`"
          class="sidebar-menu"
          style="z-index: 1; background-color: rgb(255, 255, 255); max-width: 302.68px;"
          :offset="{ top: 237, bottom: 120 }"
          relative-element-selector="#example-content"
        >
          <div class="panel panel-default cd col_left">
            <div class="panel-body">
              <selected-companies></selected-companies>
              <btn-visualizar-resultados
                class="m-b-10"
              ></btn-visualizar-resultados>
              <btn-empty-filter class="m-b-10"></btn-empty-filter>
              <criteria-applied></criteria-applied>
            </div>
          </div>
        </affix>
      </div>
      <div :class="stylesClass.col_main">
        <affix
          class="sidebar-menu"
          v-if="structure === `0.2`"
          style="z-index: 1; background-color: rgb(255, 255, 255); max-width: 967.5px;"
          :offset="{ top: 237, bottom: 0 }"
          relative-element-selector="#example-content"
        >
          <div class="panel panel-default cd" style="margin-bottom: 0px;">
            <btns-filter class="m-b-10"></btns-filter>
          </div>
        </affix>
        <div v-if="structure === `0.1`" class="panel panel-default cd">
          <div class="panel-body" id="example-content">
            <div class="conten-flex-70-30">
              <div>
                <filter-ubicacion></filter-ubicacion>
                <filter-antiguedad></filter-antiguedad>
                <filter-numero-empleados></filter-numero-empleados>
                <filter-anios-cuentas-disponibles></filter-anios-cuentas-disponibles>
                <filter-sector-actividad></filter-sector-actividad>
                <filter-cargos></filter-cargos>
                <!--<filter-estado></filter-estado>
                <filter-informacion-financiera></filter-informacion-financiera>-->
              </div>
              <div>
                <filter-codigo-postal></filter-codigo-postal>
                <filter-razon-social></filter-razon-social>
                <filter-nif></filter-nif>
                <filter-tipo-cuentas></filter-tipo-cuentas>
                <filter-auditores></filter-auditores>
                <!--
                <el-badge value="Próximamente" class="item">
                  <filter-directivos-vinculaciones></filter-directivos-vinculaciones>
                </el-badge> -->
              </div>
            </div>
          </div>
        </div>

        <div v-if="structure === `0.2`" class="panel panel-default cd m-t-20">
          <div class="panel-body" id="example-content">
            <div class="row">
              <div class="col-md-12">
                <filter-ubicacion></filter-ubicacion>
                <filter-codigo-postal></filter-codigo-postal>
                <filter-antiguedad></filter-antiguedad>
                <filter-razon-social></filter-razon-social>
                <filter-numero-empleados></filter-numero-empleados>
                <filter-nif></filter-nif>
                <filter-anios-cuentas-disponibles></filter-anios-cuentas-disponibles>
                <filter-tipo-cuentas></filter-tipo-cuentas>
                <filter-sector-actividad></filter-sector-actividad>
                <filter-auditores></filter-auditores>
                <filter-cargos></filter-cargos>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// structure = "0.1" "0.2"
import { mapGetters } from "vuex";
export default {
  name: "filter-list-checkboxs",
  props: {
    search: Object,
  },
  data: () => ({}),
  computed: {
    ...mapGetters({
      structure: "structure/structure",
    }),
    stylesClass: function() {
      let styles = {};
      if (this.structure === "0.1") {
        styles.conten_row = "";
        styles.conten_row_flex = "conten-flex-70-30";
        styles.conten_item = "";
        styles.col_left = "";
        styles.col_main = "";
        styles.panel_filtres_items = "panel panel-default cd";
      } else if (this.structure === "0.2") {
        styles.conten_row = "row";
        styles.conten_row_flex = "row";
        styles.conten_item = "col-md-12";
        styles.col_left = "col-md-3";
        styles.col_main = "col-md-9";
        styles.panel_filtres_items = "panel panel-default cd m-t-20";
      }
      return styles;
    },
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
@import "./../sass/filters/filters";
</style>
