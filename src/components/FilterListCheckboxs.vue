<template>
  <div>
    <filter-buttons></filter-buttons>
    <div class="panel panel-default cd">
      <div class="panel-body">
        <div class="row">
          <div class="col-md-8">

            <filter-ubicacion></filter-ubicacion>
            
            <filter-antiguedad></filter-antiguedad>

            <filter-numero-empleados></filter-numero-empleados>

            <!-- <el-badge value="Próximamente" class="item">
              <filter-estado></filter-estado>
            </el-badge>

            <el-badge value="Próximamente" class="item">
              <filter-anios-cuentas-disponibles></filter-anios-cuentas-disponibles>
            </el-badge>
            
            <el-badge value="Próximamente" class="item">
              <filter-informacion-financiera></filter-informacion-financiera>
            </el-badge>
            
            <el-badge value="Próximamente" class="item">
              <filter-auditores :search="search"></filter-auditores>
            </el-badge>
            
            <el-badge value="Próximamente" class="item">
              <filter-cargos></filter-cargos>
            </el-badge> -->

          </div>
          <div class="col-md-4">
            <filter-codigo-postal></filter-codigo-postal>

            <filter-razon-social></filter-razon-social>

            <filter-nif></filter-nif>
            
            <!-- <el-badge value="Próximamente" class="item">
              <filter-tipo-cuentas></filter-tipo-cuentas>
            </el-badge>
            
            <el-badge value="Próximamente" class="item">
              <filter-sector-actividad></filter-sector-actividad>
            </el-badge>  
            
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
