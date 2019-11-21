<template>
  <div class="panel panel-default cd" id="filter_codigo_postal">
    <div class="panel-heading">
      <p class="panel-title roboto white">
        {{ title }}
        <span class="span-info-right" v-if="selected_by_zip_codes !== 0"> ({{ selected_by_zip_codes | numeral('0,0') }} seleccionadas)</span>
      </p>
    </div>
    <div class="panel-body">
      <!-- <div class="form-group">
        {{ form }}
      </div> -->
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
        <div>
          <button class="btn btn-warning m-r-2" @click="showModal">
            Ver detalles <i class="fa fa-plus-circle"></i>
          </button>
          <button
              v-if="zip_codes && zip_codes.validos.length !== 0 && !areApplied"
              :disabled="selected_zip_codes.length === 0 || loadingApply"
              type="button"
              class="btn btn-success"
              @click="apply">
                Aplicar <i :class="(loadingApply)?'fa  fa-spinner fa-spin':'fa  fa-send'"></i>
            </button>
          <button
            type="button"
            class="btn btn-info"
            v-if="areApplied"
            @click="clean">
              Limpiar <i class="fa fa-undo"></i>
          </button>
        </div>
        <div>
          <button
            type="button"
            v-if="zip_codes && zip_codes.validos.length === 0" 
            class="btn btn-info" @click="validateZipCodes" 
            :disabled="dataFrm.length === 0 || loadingValidar">
              BUSCAR <i :class="(loadingValidar)?'fa  fa-spinner fa-spin':'fa  fa-search'"></i>
          </button>
          <button
            type="button"        
            v-if="zip_codes && zip_codes.validos.length !== 0"
            class="btn btn-info" @click="clean" 
            :disabled="dataFrm.length === 0 || loadingValidar">
              BUSCAR <i :class="(loadingValidar)?'fa  fa-spinner fa-spin':'fa  fa-search'"></i>
          </button>
        </div>
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
                  <div>
                    <button
                        v-if="zip_codes && zip_codes.validos.length !== 0 && !areApplied"
                        :disabled="selected_zip_codes.length === 0 || loadingApply"
                        type="button"
                        class="btn btn-success"
                        @click="apply">
                          Aplicar <i :class="(loadingApply)?'fa  fa-spinner fa-spin':'fa  fa-send'"></i>
                      </button>
                    <button
                      type="button"
                      class="btn btn-info"
                      v-if="areApplied"
                      @click="clean">
                        Limpiar <i class="fa fa-undo"></i>
                    </button>
                  </div>
                </div>
                <div class="conten-flex-70-30">
                  <div>
                    <div class="panel panel-default cd">
                      <div class="panel-heading">
                        <p class="panel-title roboto white">
                          Introduce uno o varios códigos postales, separados por coma o salto de línea, y clica en “BUSCAR”.
                        </p>
                      </div>
                      <div class="panel-body">
                        <div class="row">
                          <div class="col-md-12">
                            <div class="pull-right" style="display: flex;">
                              <input type="file" name="" class="form-control" placeholder="Adjuntar Archivo">
                              <button
                                  type="button"
                                class="btn btn-info">
                                  BUSCAR <i :class="(loadingValidar)?'fa  fa-spinner fa-spin':'fa  fa-search'"></i>
                              </button>
                            </div>
                            <div style="height: 100px;"></div>
                          </div>
                          <div class="col-md-12">
                            <p>
                              Introduce o pega un máximo de 1.000 códigos postales. En caso de querer incluir una mayor cantidad, adjunte un archivo con un máximo de 1.000.000 de códigos postales clicando en “Adjuntar Archivo”
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="panel panel-default cd">
                      <div class="panel-heading">
                        <p class="panel-title roboto white">
                          Introduce el rango de código postales y clica en “BUSCAR”
                        </p>
                      </div>
                      <div class="panel-body">
                        <div class="row text-center">
                          <div class="col-md-4">
                            <div class="form-group">
                              <label class="control-label" for="inputDefault">Del código postal:</label>
                              <input type="text" class="form-control" id="inputDefault">
                            </div>
                          </div>
                          <div class="col-md-4">
                            <div class="form-group">
                              <label class="control-label" for="inputDefault">Al código postal:</label>
                              <input type="text" class="form-control" id="inputDefault">
                            </div>
                          </div>
                          <div class="col-md-4">
                            <button
                              type="button"
                              class="btn btn-info pull-right">
                                BUSCAR <i :class="(loadingValidar)?'fa  fa-spinner fa-spin':'fa  fa-search'"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div class="panel panel-default cd">
                      <div class="panel-heading">
                        <p class="panel-title roboto white">
                          Códigos Postales seleccionadas <span class="span-info-right">{{ zip_codes.validos.length }}</span>
                        </p>
                      </div>
                    </div>
                    <div class="panel panel-default">
                      <div class="panel-heading">
                        <p class="panel-title roboto white">
                          Empresas seleccionadas <span class="span-info-right">{{ selected_by_zip_codes | numeral('0,0') }}</span>
                        </p>
                      </div>
                      <div class="panel-body">
                        <ul class="ul_selected_provinces_localidad"><li v-for="(item, key) in zip_codes.validos" :key="key">{{ item.label }} <span class="num-fil">({{ item.data | numeral('0,0') }})</span></li></ul>
                      </div>
                    </div>
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
  import { mapGetters } from 'vuex'
  import $ from 'jquery'
  export default {
    name: 'filter-codigo-postal',
    computed: mapGetters({
      search: 'search/search',
      loading: 'search/loading',
      form: 'filters/form',
      selected_companies: 'filters/selected_companies',
    }),
    data: () => ({
      title: 'Código Postal',
      loadingValidar: false,
      dataFrm: '',
      zip_codes: {
        validos: [],
        invalidos: []
      },
      selected_zip_codes: [],
      selected_by_zip_codes: 0,
      areApplied: false,
      loadingApply: false
    }),
    mounted() {
      this.$root.$on('clean_filter', (filter) => {
        if (filter === this.title) { this.clean() }
      })
      this.$root.$on('show_modal_filter', (filter) => {
        if (filter === this.title) { this.showModal() }
      })
    },
    watch: {
      selected_zip_codes: function (newSelectedZipCodes) {
        this.selected_by_zip_codes = this.numberSelectedZipCodes(newSelectedZipCodes)
      }
    },
    methods: {
      validateZipCodes(){
        this.loadingValidar = true  
        let sin_salto = this.dataFrm.replace(/(?:\r\n|\r|\n)/g, ',')
        this.$store.dispatch('search/validateZipCodes', sin_salto).then((response) => {
          this.zip_codes.validos = (response.validos)? response.validos: []
          this.zip_codes.invalidos = (response.invalidos)? response.invalidos: []
          this.selected_zip_codes = this.zip_codes.validos
          this.loadingValidar = false
        }).catch(() => {
          this.loadingValidar = false
          this.zip_codes = { validos: [], invalidos: [] }
          this.this.selected_zip_codes = 0
        })
      },
      apply () {
        if (this.selected_zip_codes && this.selected_zip_codes.length !== 0) {
          this.hideModal()
          this.loadingApply = true
          this.form.codigosPostales = this.selected_zip_codes.map((item) => {
            return item.id
          })
          this.$store.dispatch('search/filtrar', this.form).then((response) => {
            this.$store.dispatch('filters/addFilters', this.title)
            this.updateNumberSelectedCompanies(response.cantidad)
            this.areApplied = true
            this.loadingApply = false
          }).catch(() => {
            this.loadingApply = false
          })
        }
      },
      clean (){
        this.$store.dispatch('filters/removeFilters', this.title)
        let resta = this.selected_companies - this.selected_by_zip_codes
        this.updateNumberSelectedCompanies((resta < 0)? 0: resta)
        this.areApplied = false
        this.selected_by_zip_codes = 0
        this.form.codigosPostales = []
        this.zip_codes = { validos: [], invalidos: [] }
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
      updateNumberSelectedCompanies(quantity){
        this.$store.dispatch('filters/updateNumberSelectedCompanies', {
          quantity
        })
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

.label-danger, .m-r-2 { margin-right: 2px; }

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
