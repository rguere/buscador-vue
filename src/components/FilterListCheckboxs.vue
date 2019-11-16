<template>
  <div>
    <filter-buttons></filter-buttons>
    <div class="panel panel-default">
      <div class="panel-body">
        <filter-actions-top></filter-actions-top>
        <div class="row">
          <div class="col-md-8">
            <filter-ubicacion></filter-ubicacion>

            <filter-antiguedad></filter-antiguedad>

            <filter-numero-empleados></filter-numero-empleados>

            <filter-estado></filter-estado>

            <filter-anios-cuentas-disponibles></filter-anios-cuentas-disponibles>

            <filter-informacion-financiera></filter-informacion-financiera>

            <filter-auditores :search="search"></filter-auditores>

            <filter-cargos></filter-cargos>
          </div>
          <div class="col-md-4">
            <filter-codigo-postal></filter-codigo-postal>

            <filter-razon-social></filter-razon-social>

            <filter-nif></filter-nif>

            <filter-tipo-cuentas></filter-tipo-cuentas>

            <filter-sector-actividad></filter-sector-actividad>

            <filter-directivos-vinculaciones></filter-directivos-vinculaciones>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: 'filter-list-checkboxs',
      props: {
        search: Object
      },
      data: () => ({
        show: true
      }),
      mounted() {
      },
      methods: {}
    }
</script>

<style lang="scss" scoped>

    @import './../sass/filters/filters';

</style>
