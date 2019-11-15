<template>
  <div class="panel panel-primary" id="filter_nif">
    <div class="panel-heading">
      NIF
    </div>
    <div class="panel-body">
      <div class="form-group">
        <textarea class="form-control"></textarea>
      </div>
      <p class="text-help">
        *Puede incluir uno o más NIF postales separados por coma o por salto de línea
      </p>
      <div class="flex-space-between-flex-end">
        <button class="btn btn-ver-mas">Ver detalles</button>
        <button class="btn btn-action-search wi">BUSCAR</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'filter-nif',
  }
</script>

<style lang="scss" scoped>
  @import './../../sass/filters/filters';
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
