<template>
    <div class="conten-flex-70-30">

      <div class="flex-70-30">

        <filter-ubicacion></filter-ubicacion>

        <filter-antiguedad></filter-antiguedad>

        <filter-numero-empleados></filter-numero-empleados>

        <filter-estado></filter-estado>

        <filter-anios-cuentas-disponibles></filter-anios-cuentas-disponibles>

        <filter-informacion-financiera></filter-informacion-financiera>

        <filter-auditores></filter-auditores>

        <filter-cargos></filter-cargos>

      </div>

      <div>

        <filter-codigo-postal></filter-codigo-postal>

        <filter-razon-social></filter-razon-social>

        <filter-nif></filter-nif>

        <filter-tipo-cuentas></filter-tipo-cuentas>

        <filter-sector-actividad></filter-sector-actividad>

        <filter-directivos-vinculaciones></filter-directivos-vinculaciones>

      </div>

    </div>
</template>

<script>
    export default {
      name: 'filter-list-checkboxs',
      data: () => ({
        show: true
      }),
      mounted() {},
      methods: {}
    }
</script>

<style lang="scss" scoped>

    @import './../sass/filters/filters';

</style>
