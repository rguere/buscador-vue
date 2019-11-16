<template>
  <div class="panel panel-primary" id="filter_nombre_o_razon_social">
    <div class="panel-heading">
      {{ title }}
    </div>
    <div class="panel-body">
      <div class="form-group">
        <tags-input element-id="tags"
          placeholder="Escriba aqui el nombre o razón social de la empresa"
          class="tags-type-textarea"
          v-model="names_or_social_reasons"
          add-tags-on-comma
          :typeahead="true"></tags-input>
      </div>
      <div class="flex-space-between-flex-end">
        <button class="btn btn-warning">Ver detalles <i class="fa fa-plus-circle"></i></button>
        <button class="btn btn-info">BUSCAR <i class="fa  fa-search"></i></button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'filter-razon-social',
    data: () => ({
      title: 'Nombre o razón social',
      names_or_social_reasons: []
    }),
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
