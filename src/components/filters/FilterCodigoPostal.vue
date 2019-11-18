<template>
  <div class="panel panel-primary" id="filter_codigo_postal">
    <div class="panel-heading">
      {{ title }}
    </div>
    <div class="panel-body">
      <div class="form-group">
        <tags-input element-id="tags_zip_codes"
          placeholder=""
          class="tags-type-textarea"
          v-model="zip_codes"
          :existing-tags="existing_zip_codes"
          add-tags-on-comma
          :validate="validateZipCodes"
          :typeahead="true"></tags-input>
      </div>
      <p class="text-help">
        *Puede incluir uno o más códigos postales separados por coma o por salto de línea
      </p>
      <div class="flex-space-between-flex-end">
        <button class="btn btn-warning" @click="showModal">Ver detalles <i class="fa fa-plus-circle"></i></button>
        <button class="btn btn-info" @click="searchZipCodes" :disabled="zip_codes.length === 0">BUSCAR <i class="fa  fa-search"></i></button>
      </div>
      <b-modal id="bv-modal-filter-codigo-postal" hide-footer hide-header static no-close-on-backdrop scrollable size="lg">
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
      </b-modal>
    </div>
  </div>
</template>

<script>
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
        this.$bvModal.show('bv-modal-filter-codigo-postal')
      },
      hideModal () {
        this.$bvModal.hide('bv-modal-filter-codigo-postal')
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
