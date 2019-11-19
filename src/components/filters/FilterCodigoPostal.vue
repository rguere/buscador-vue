<template>
  <div class="panel panel-default cd" id="filter_codigo_postal">
    <div class="panel-heading">
      <p class="panel-title roboto white">
        {{ title }}
      </p>
    </div>
    <div class="panel-body">
      <div class="form-group">
        <div class="form-group">
          <textarea v-model="zip_codes" class="form-control"></textarea>
        </div>
      </div>
      <p class="text-help">
        *Puede incluir uno o más códigos postales separados por coma o por salto de línea
      </p>
      <div class="flex-space-between-flex-end">
        <button class="btn btn-warning" @click="showModal">Ver detalles <i class="fa fa-plus-circle"></i></button>
        <button class="btn btn-info" @click="searchZipCodes" :disabled="zip_codes.length === 0">BUSCAR <i class="fa  fa-search"></i></button>
      </div>
      <div class="modal fade" id="bv-modal-filter-codigo-postal" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="d-block">
              <div class="content" style="margin-bottom: 30px">
                <div class="btns-modal-header">
                  <div>
                    <button class="btn btn-warning" @click="hideModal"><i class="fa fa-arrow-left"></i> Vover</button>
                    <button class="btn btn-a">
                      {{ title }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  export default {
    name: 'filter-codigo-postal',
    data: () => ({
      title: 'Código Postal',
      existing_zip_codes: [],
      zip_codes: []
    }),
    mounted() {
      for (var i = 1; i <= 52; i++) {
        this.existing_zip_codes.push({key: i.toString(), value: i.toString()})
      }
    },
    methods: {
      validateZipCodes (value) {
        //let isValid = true
        return !isNaN(value)
      },
      searchZipCodes(){
        this.$store.dispatch('search/searchZipCodes', this.zip_codes)
      },
      showModal () {
        $('#bv-modal-filter-codigo-postal').modal({ backdrop: 'static', show: true })
      },
      hideModal () {
        $('#bv-modal-filter-codigo-postal').modal('hide')
      },
    }
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
