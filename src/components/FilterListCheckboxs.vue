<template>
  <div>
    <filter-buttons></filter-buttons>
    <div class="panel panel-default cd">
      <div class="panel-body">
        <div class="conten-flex-70-30">
          <div class="">
            <filter-ubicacion></filter-ubicacion>
            <filter-antiguedad></filter-antiguedad>
            <filter-numero-empleados></filter-numero-empleados>
            <filter-anios-cuentas-disponibles></filter-anios-cuentas-disponibles>
            <filter-sector-actividad></filter-sector-actividad>
            <!--<filter-estado></filter-estado>
            <filter-informacion-financiera></filter-informacion-financiera>
            <filter-cargos></filter-cargos>-->
          </div>
          <div class="">
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
  </div>
</template>

<script>
export default {
  name: "filter-list-checkboxs",
  props: {
    search: Object,
  },
  data: () => ({
    show: true,
  }),
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
@import "./../sass/filters/filters";
</style>
