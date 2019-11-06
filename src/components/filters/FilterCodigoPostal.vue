<template>
  <div id="filter_codigo_postal">
    <div class="filter-title">
      Código Postal
    </div>
    <div class="bg-fff">
      <div class="content">

        <textarea class="filter_textarea"></textarea>

        <p class="text-help">
          *Puede incluir uno o más códigos postales separados por coma o por salto de línea
        </p>

        <div class="flex-space-between-flex-end">
          <button class="btn btn-ver-mas">Ver detalles</button>
          <button class="btn btn-action-search wi">BUSCAR</button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'filter-codigo-postal',
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
