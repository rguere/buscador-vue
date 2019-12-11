<template>
  <div class="panel panel-default cd" id="filter_antiguedad">
    <div class="panel-heading">
      <p class="panel-title roboto white">
        {{ title }}
        <span class="span-info-right" v-if="selected_by_antiguedad !== 0"> ({{ selected_by_antiguedad | numeral('0,0') }} seleccionadas)</span>
      </p>
    </div>
    <div class="panel-body">
      <div v-if="search.antiguedad && search.antiguedad.length != 0">
        <div class="grid-3-columns-1fr" v-if="!areApplied || (form.antiguedad.length !== 0)">
          <div v-for="(item, key) in search.antiguedad" :key="key">
            <label class="custon-checkboxs">
              <input type="checkbox"
                :name="`checkbox_antiguedad_${item.id}`"
                v-model="selected_antiguedad"
                @change="handleChange(item, $event)"
                :id="`checkbox_antiguedad_${item.id}`"
                :value="item">
              <span class="geekmark"></span>
              <span class="name-checkbox">{{ item.label }}</span>
              <span class="num-fil">({{ item.data | numeral('0,0') }})</span>
            </label>
          </div>
        </div>
        <div class="flex-space-between-flex-end">
          <div class="btns">
            <button 
              type="button"
              class="btn btn-warning"
              @click="showModal">
                Ver detalles <i class="fa fa-plus-circle"></i>
            </button>
            <button
              type="button"
              class="btn btn-success"
              v-if="(selected_antiguedad.length !== 0 && !areApplied) || (selected_antiguedad.length !== 0 && reapply)"
              @click="apply">
                Aplicar <i :class="(loadingFrm)?'fa  fa-spinner fa-spin':'fa  fa-send'"></i>
            </button>
            <button type="button" class="btn btn-info" v-if="areApplied" @click="confirmClean">Limpiar <i class="fa fa-undo"></i></button>
          </div>
          <p class="text-help">* Puede elegir más de una opción</p>
        </div>
        <div>
          <div class="bg-g float-right">
            <label class="custon-checkboxs">
              <input type="checkbox" v-model="incluir_null" name="">
              <span class="geekmark"></span>
              <span class="title">
                Incluir aquellas empresas en las que se desconoce su antigüedad
              </span>
            </label>
          </div>
        </div>
        <el-dialog :visible.sync="modalVisible"
          width="95%"
          :close-on-click-modal="false"
          :show-close="false"
          :destroy-on-close="true"
          :center="true"
          top="5vh">
            <div>
              <div class="btns-modal-header">
                <div>
                  <button class="btn btn-warning" @click="hideModal"><i class="fa fa-arrow-left"></i> Vover</button>
                  <button class="btn btn-a">
                    {{ title }}
                  </button>
                </div>
                <div>
                  <button type="button" class="btn btn-success" v-if="selected_antiguedad.length !== 0" @click="apply">Aplicar <i :class="(loadingFrm)?'fa  fa-spinner fa-spin':'fa  fa-send'"></i></button>
                  <button type="button" class="btn btn-info" v-if="areApplied" @click="confirmClean">Limpiar <i class="fa fa-undo"></i></button>
                </div>
              </div>
              <div class="row" v-if="search.antiguedad && search.antiguedad.length !== 0">
                <div class="col-md-12">
                  <div class="panel panel-default cd">
                    <div class="panel-heading">
                      <p class="panel-title roboto white">
                        Seleccionar empresas por años de antigüedad.
                      </p>
                    </div>
                    <div class="panel-body">
                      <div class="row">
                        <div class="col-md-6">
                          <div class="conten-epa">
                            <div class="form-group">
                              <label class="control-label">Insertar la antigüedad de la(s) empresa(s) en número de años</label>
                            </div>
                            <div class="form-group anti-inputs">
                              <label>De (incluido)</label>
                              <input type="text" class="form-control" placeholder="(Introducir, en formato número, los años de antigüedad)">
                              <label>años de antigüedad</label>
                            </div>
                            <div class="form-group anti-inputs">
                              <label>De (incluido)</label>
                              <input type="text" class="form-control" placeholder="(Introducir, en formato número, los años de antigüedad)">
                              <label>años de antigüedad</label>
                            </div>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <button
                            type="button" 
                            class="btn btn-info"
                            :disabled="daterange.length === 0">
                              BUSCAR <i :class="(loadingDaterange)?'fa  fa-spinner fa-spin':'fa  fa-search'"></i>
                          </button>
                          <div class="panel panel-warning">
                            <div class="panel-heading">Seleccionar años, por búsqueda estándar</div>
                            <div class="panel-body">
                              <div class="checkbox">
                                <label>(Seleccionar todo) <input type="checkbox" value=""></label>
                              </div>
                              <div class="checkbox">
                                <label>Más de 50 años de antigüedad. <input type="checkbox" value=""></label>
                              </div>
                              <div class="checkbox">
                                <label>De 25 a 10 años de antigüedad. <input type="checkbox" value=""></label>
                              </div>
                              <div class="checkbox">
                                <label>De 10 a 25 años de antigüedad. <input type="checkbox" value=""></label>
                              </div>
                              <div class="checkbox">
                                <label>De 1 a 10 años de antigüedad. <input type="checkbox" value=""></label>
                              </div>
                              <div class="checkbox">
                                <label>Menos de un año. <input type="checkbox" value=""></label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="bg-g">
                            <label class="custon-checkboxs">
                              <input type="checkbox" name="">
                              <span class="geekmark"></span>
                              <span class="title">
                                Incluir aquellas empresas en las que se desconoce su antigüedad
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="panel panel-default cd">
                    <div class="panel-heading">
                      <p class="panel-title roboto white">
                        Seleccionar empresas por años de antigüedad.
                      </p>
                    </div>
                    <div class="panel-body">
                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group">
                            <label class="control-label">Insertar la fecha de constitución de la(s) empresa(s)</label>
                            <el-date-picker
                              v-model="daterange"
                              class="form-control daterange"
                              type="daterange"
                              format="dd/MM/yyyy"
                              range-separator=""
                              start-placeholder="Desde (incluido)"
                              end-placeholder="Hasta (incluido)">
                            </el-date-picker>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <button
                            type="button" 
                            class="btn btn-info"
                            :disabled="daterange.length === 0">
                              BUSCAR <i :class="(loadingDaterange)?'fa  fa-spinner fa-spin':'fa  fa-search'"></i>
                          </button>
                        </div>
                        <div class="col-md-12">
                          <div class="bg-g">
                            <label class="custon-checkboxs">
                              <input type="checkbox" name="">
                              <span class="geekmark"></span>
                              <span class="title">
                                Incluir aquellas empresas en las que se desconoce su antigüedad
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-dialog>
      </div>
      <div v-if="search.antiguedad && search.antiguedad.length === 0 && !loading" class="alert alert-dismissible alert-primary">
        <strong>Oh!</strong> datos no encontrados.
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import swal from 'sweetalert2'
  import { inArrayObjectTreeselect, howAnimation } from './../../utils'
  export default {
    name: 'filter-antiguedad',
    computed: mapGetters({
      search: 'search/search',
      loading: 'search/loading',
      form: 'filters/form',
      selected_companies: 'filters/selected_companies',
      applied_filters: 'filters/applied_filters',
    }),
    data: () => ({
      title: 'Antigüedad',
      selected_antiguedad: [],
      list_antiguedad: [],
      selected_by_antiguedad: 0,
      options: [{
        id: 'all',
        label: 'TODA ESPAÑA',
        isDefaultExpanded: true,
        children: []
      }],
      areApplied: false,
      reapply: false,
      showBtnApply: false,
      loadingFrm: false,
      modalVisible: false,
      daterange: '',
      loadingDaterange: false,
      incluir_null: false
    }),
    watch: {
      selected_antiguedad: function (newProvincesLocalidad) {
        this.selected_by_antiguedad = this.numberCompaniesSelected((this.isAllProvincesLocalidad(newProvincesLocalidad))? this.search.antiguedad : newProvincesLocalidad)
      },
      selected_by_antiguedad: function(newValue) {
      if (newValue === 0) this.selected_antiguedad = []
      },
      selected_companies: function () {
        howAnimation(document.querySelector('.selected_companies'))
      }
    },
    mounted() {
      this.$root.$on('clean_filter', (filter) => {
        if (filter === this.title) { this.clean() }
      })
      this.$root.$on('show_modal_filter', (filter) => {
        if (filter === this.title) { this.showModal() }
      })
      this.$root.$on('empty_filter', (filter) => {
        if (filter === this.title) { this.emptyFilter() }
      })
    },
    methods: {
      fetchSearch (){
        this.$store.dispatch('search/fetchSearch').then(() => {
          this.options[0].children = (this.search && this.search.antiguedad) ? this.search.antiguedad : []
        })
      },
      showModal () {
        this.modalVisible = true
      },
      hideModal () {
        this.modalVisible = false
        let treeselect__input = document.querySelector('#options input.vue-treeselect__input')
        if (treeselect__input) treeselect__input.value = ''
      },
      /**
       * [updateNumberSelectedCompanies actualiza la cantidad de empresas selecionadas en el store de Vuex]
       * @param  {[number]} quantity [cantidad de empresas selecionadas]
       */
      updateNumberSelectedCompanies(quantity){
        this.$store.dispatch('filters/updateNumberSelectedCompanies', {
          quantity
        })
      },
      /**
       * [numberCompaniesSelected cuenta la cantidad de empresas selecionadas]
       * @param  {[Array<Object>]} newSelectedCompanies [description]
       * @return {[number]}        business_accountant  [description]
       */
      numberCompaniesSelected(newSelectedCompanies) {
        let business_accountant = 0
        if (Array.isArray(newSelectedCompanies)) {
          newSelectedCompanies.forEach((item) => {
            let result = inArrayObjectTreeselect(this.search.antiguedad, item.id)
            if (result && result.data && result.data) {
              business_accountant = business_accountant + result.data
            }
          })
        }
        return business_accountant
      },
      /**
       * [isAllProvincesLocalidad saber si el valor del treeselect es TODA ESPAÑA]
       * @param  {[type]}  arrayProvincesLocalidad [description]
       * @return {Boolean}                         [description]
       */
      isAllProvincesLocalidad (arrayProvincesLocalidad){
      return (arrayProvincesLocalidad[0] && arrayProvincesLocalidad[0].id === 'all')? true: false
      },
      apply () {
        if (this.selected_antiguedad && this.selected_antiguedad.length !== 0) {
          this.hideModal()
          this.loadingFrm = true
          this.formatearDataPOST()
          this.$store.dispatch('search/filtrar', this.form).then((response) => {
            this.updateNumberSelectedCompanies(response.cantidad)
            this.$store.dispatch('filters/addFilters', {
              name: this.title,
              quantity: this.selected_by_antiguedad
            })
            this.areApplied = true
            this.reapply = false
            this.loadingFrm = false
          }).catch(() => {
            this.loadingFrm = false
          })
        }
      },
      confirmClean () {
        swal.fire({
          icon: 'question',
          title: 'Estas seguro?',
          html: `deseas vaciar el filtro ${this.title}?`,
          showCancelButton: true,
          cancelButtonText: 'Cancelar',
          cancelButtonColor: '#d9534f',
          showConfirmButton: true,
          confirmButtonColor: '#337ab7',
          confirmButtonText: 'Si, seguro'
        }).then((result) => {
          if (result.value) {
            this.clean()
          }
        })
      },
      clean () {
        this.form.antiguedad = []
        if (this.applied_filters.length > 1) {
          this.$store.dispatch('search/filtrar', this.form).then((response) => {
            this.updateNumberSelectedCompanies(response.cantidad)
          })
        }else {
          let resta = (this.selected_antiguedad.length === 0)? 0 : this.selected_companies - this.selected_by_antiguedad
          this.updateNumberSelectedCompanies((resta < 0)? 0: resta)
        }
        this.selected_by_antiguedad = 0
        this.$store.dispatch('filters/removeFilters', this.title)
        this.areApplied = false
        this.reapply = false
      },
      emptyFilter () {
        this.form.antiguedad = []
        this.updateNumberSelectedCompanies(0)
        this.selected_by_antiguedad = 0
        this.$store.dispatch('filters/removeFilters', this.title)
        this.areApplied = false
        this.reapply = false
      },
      handleChange () { //province, event
        this.reapply = (this.areApplied)? true: this.areApplied
      },
      handleChangeList (province, event){
        event.preventDefault()
        let checkboxs = document.querySelectorAll('#ul_selected_antiguedad input[type="checkbox"]')
        checkboxs.forEach((item) => {
          item.checked = true
        })
      },
      inputTreeselect () { //values
      },
      selectTreeselect () {
      },
      deselectTreeselect () {
      },
      formatearDataPOST (){
        this.form.antiguedad = []
        this.selected_antiguedad.forEach((item) => {
          this.form.antiguedad.push(item.id)
        })
        if (this.incluir_null) {
          this.form.antiguedad.push("incluir_null")
        }
        return this.form
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import './../../sass/filters/filters';
  .float-right {
    float: right;
  }
  .bg-g {
    width: 50%;
  }

  .el-range-editor--medium.el-input__inner {
    width: 100%;
  }

  .anti-inputs {
    display: flex;
    align-items: center;
    input {
      width: 50%;
      margin: 0 5px;
    }
  }

  .conten-epa {
    padding: 55px 0;
  }

  .checkbox input[type=checkbox]{
    margin-left: 15px;
  }

  .panel-warning {
    margin-top: 20px;
    width: 300px;
  }
</style>
