<template>
  <div class="panel panel-default cd" id="filter_codigo_postal">
    <div class="panel-heading">
      <p class="panel-title roboto white">
        {{ title }}
        <span class="span-info-right" v-if="selected_by_zip_codes !== 0"> ({{ selected_by_zip_codes | numeral('0,0') }} seleccionadas)</span>
      </p>
    </div>
    <div class="panel-body">
      <div class="form-group" v-if="zip_codes && zip_codes.validos.length === 0">
        <textarea v-model="dataFrm" class="form-control"></textarea>
      </div>
      <div class="panel panel-default cd" v-if="zip_codes && zip_codes.validos.length !== 0">
        <div class="panel-body">
          <div v-for="(item, key) in zip_codes.validos" :key="key">
              <label class="custon-checkboxs">
                  <input type="checkbox"
                    :name="`checkbox_${item.id}`"
                    v-model="selected_zip_codes"
                    :id="`checkbox_${item.id}`"
                    :value="item">
                  <span class="geekmark"></span>
                  <span class="name-checkbox">{{ item.label }}</span>
                  <span class="num-fil">({{ item.data | numeral('0,0') }})</span>
              </label>
          </div>
        </div>
      </div>
      <div class="form-group" v-if="zip_codes && zip_codes.invalidos.length !== 0">
        <p>Códigos invalidos</p>
        <span v-for="(item, key) in zip_codes.invalidos" :key="key" class="label label-danger">{{ item }}</span>
        <hr>
      </div>
      <div class="form-group">
        <p class="text-help">
          *Puede incluir uno o más códigos postales separados por coma o por salto de línea
        </p>
      </div>
      <div class="flex-space-between-flex-end">
        <button class="btn btn-warning" @click="showModal">
          Ver detalles <i class="fa fa-plus-circle"></i>
        </button>
        <button 
          v-if="zip_codes && zip_codes.validos.length === 0" 
          class="btn btn-info" @click="validateZipCodes" 
          :disabled="dataFrm.length === 0 || loadingFrm">
            BUSCAR <i :class="(loadingFrm)?'fa  fa-spinner fa-spin':'fa  fa-search'"></i>
        </button>
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
      loadingFrm: false,
      dataFrm: '',
      zip_codes: {
        validos: [],
        invalidos: []
      },
      selected_zip_codes: [],
      selected_by_zip_codes: 0,
      areApplied: false
    }),
    mounted() {},
    watch: {
      selected_zip_codes: function (newSelectedZipCodes) {
        this.selected_by_zip_codes = this.numberSelectedZipCodes(newSelectedZipCodes)
      }
    },
    methods: {
      validateZipCodes(){
        this.loadingFrm = true
        let sin_salto = this.dataFrm.replace(/(?:\r\n|\r|\n)/g, ',')
        this.$store.dispatch('search/validateZipCodes', sin_salto).then((response) => {
          this.zip_codes.validos = (response.validos)? response.validos: []
          this.zip_codes.invalidos = (response.invalidos)? response.invalidos: []
          this.selected_zip_codes = this.zip_codes.validos
          this.loadingFrm = false
        }).catch(() => {
          this.loadingFrm = false
          this.zip_codes = { validos: [], invalidos: [] }
          this.this.selected_zip_codes = 0
        })
      },
      numberSelectedZipCodes(newSelectedZipCodes) {
        let business_accountant = 0
        if (Array.isArray(newSelectedZipCodes)) {
          newSelectedZipCodes.forEach((item) => {
            business_accountant = business_accountant + item.data
          })
        }
        return business_accountant
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
