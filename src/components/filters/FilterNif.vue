<template>
  <div class="panel panel-primary" id="filter_nif">
    <div class="panel-heading">
      {{ title }}
    </div>
    <div class="panel-body">
      <div class="form-group">
        <tags-input element-id="tags_nifs"
          placeholder=""
          class="tags-type-textarea"
          v-model="nifs"
          add-tags-on-comma
          :typeahead="true"></tags-input>
      </div>
      <p class="text-help">
        *Puede incluir uno o más NIF postales separados por coma o por salto de línea
      </p>
      <div class="flex-space-between-flex-end">
        <button class="btn btn-warning">Ver detalles <i class="fa fa-plus-circle"></i></button>
        <button class="btn btn-info">BUSCAR <i class="fa  fa-search"></i></button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'filter-nif',
    data: () => ({
      title: 'NIF',
      nifs: []
    }),
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
