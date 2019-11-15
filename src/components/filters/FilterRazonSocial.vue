<template>
  <div class="panel panel-primary" id="filter_nombre_o_razon_social">
    <div class="panel-heading">
      Nombre o razón social
    </div>
    <div class="panel-body">
      <div class="form-group">
        <textarea class="form-control" placeholder="Escriba aqui el nombre o razón social de la empresa"></textarea>
      </div>
      <div class="flex-space-between-flex-end">
        <button class="btn btn-ver-mas">Ver detalles</button>
        <button class="btn btn-action-search wi">BUSCAR</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'filter-razon-social',
  }
</script>

<style lang="scss" scoped>
  @import './../../sass/filters/filters';
  .filter_textarea {
    max-height: 60px;
  }

  @media (min-width: 750px) and (max-width: 1100px) {
    .flex-space-between-flex-end {
      flex-wrap: wrap;
      :nth-child(1),
      :nth-child(2) {
        width: 100%;
        margin-bottom: 5px;
      }
    }
  }
</style>
