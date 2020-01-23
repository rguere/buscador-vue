<template>
  <div class="panel panel-default cd" id="filter_antiguedad">
    <div class="panel-heading">
      <p class="panel-title roboto white">
        {{ title }}
        <span class="span-info-right" v-if="selected_by_antiguedad !== 0"> ({{ selected_by_antiguedad | numeral('0,0') }} empresas seleccionadas)</span>
      </p>
    </div>
    <div class="panel-body">
      <div v-if="search.antiguedad && search.antiguedad.length !== 0">
        <div class="grid-3-columns-1fr">
          <div v-for="(item, key) in search.antiguedad" :key="key">
            <label class="custon-checkboxs" v-if="item.label !== 'incluir_null'">
              <input type="checkbox"
                :name="`checkbox_antiguedad_${item.id}`"
                v-model="selected_antiguedad"
                @change="handleChange()"
                :id="`checkbox_antiguedad_${item.id}`"
                :value="item">
              <span class="geekmark"></span>
              <span class="name-checkbox">{{ item.label }}</span>
              <span class="num-fil"> ({{ item.data | numeral('0,0') }})</span>
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
              v-if="(selected_antiguedad.length !== 0 && !areApplied) || (selected_antiguedad.length !== 0 && !compareWithNewtoApply)"
              @click="apply">
                Aplicar <i :class="(loadingFrm)?'fa  fa-spinner fa-spin':'fa  fa-send'"></i>
            </button>
            <button type="button" class="btn btn-info" v-if="areApplied" @click="confirmClean">Limpiar <i class="fa fa-undo"></i></button>
          </div>
          <div>
            <div class="checkboxs-resaldado float-right" v-if="itemIncluirNull">
              <label class="custon-checkboxs">
                <input type="checkbox" v-model="selected_antiguedad" :value="itemIncluirNull" @change="handleChange()" name="">
                <span class="geekmark"></span>
                <span class="title">
                  Incluir aquellas empresas en las que se desconoce su antigüedad
                </span>
              </label>
            </div>
          </div>
        </div>
        <div class="float-right margin-top-10">
          <p class="text-help">* Puede elegir más de una opción</p>
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
                        <span class="span-info-right" v-if="selected_by_antiguedad !== 0"> ({{ selected_by_antiguedad | numeral('0,0') }} empresas seleccionadas)</span>
                      </p>
                    </div>
                    <div class="panel-body">
                      <div class="row">
                        <div class="col-md-6">
                          <button
                            type="button" 
                            class="btn btn-info pull-right"
                            @click="applyAhnos"
                            :disabled="$v.$invalid || loadingAhnos">
                              BUSCAR <i :class="(loadingAhnos)?'fa  fa-spinner fa-spin':'fa  fa-search'"></i>
                          </button>
                          <div class="conten-epa">
                            <div class="form-group">
                              <label class="control-label">Insertar la antigüedad de la(s) empresa(s) en número de años</label>
                            </div>
                            <div class="form-group anti-inputs" :class="{ 'has-error has-feedback': $v.ahnos_from.$error }">
                              <label class="control-label" for="ahnos_from">De (incluido)</label>
                              <input type="text"
                                v-model.trim="$v.ahnos_from.$model"
                                required
                                class="form-control"
                                name="ahnos_from"
                                id="ahnos_from"
                                placeholder="(Introducir, en formato número, los años de antigüedad)">
                              <label>años de antigüedad</label>
                            </div>
                            <div class="form-group anti-inputs" :class="{ 'has-error has-feedback': $v.ahnos_to.$error }">
                              <label class="control-label" for="ahnos_to">Hasta (incluido)</label>
                              <input type="text"
                                v-model.trim="$v.ahnos_to.$model"
                                required
                                class="form-control"
                                name="ahnos_to"
                                id="ahnos_to"
                                placeholder="(Introducir, en formato número, los años de antigüedad)">
                              <label>años de antigüedad</label>
                            </div>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="panel panel-warning">
                            <div class="panel-heading">Seleccionar años, por búsqueda estándar</div>
                            <div class="panel-body">
                              <div v-if="search.antiguedad.length !== 0">
                                <div v-for="(item, key) in search.antiguedad" :key="key" class="checkbox">
                                  <label class="custon-checkboxs" v-if="item.label !== 'incluir_null'">
                                      <input type="checkbox"
                                          :name="`checkbox_empleados_${item.id}`"
                                          v-model="selected_antiguedad"
                                          @change="handleChange()"
                                          :id="`checkbox_empleados_${item.id}`"
                                          :value="item">
                                      <span class="geekmark"></span>
                                      <span class="name-checkbox">{{ item.label }}</span>
                                      <span class="num-fil"> ({{ item.data | numeral('0,0') }})</span>
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="checkboxs-resaldado w-50-p" v-if="itemIncluirNull">
                            <label class="custon-checkboxs">
                              <input type="checkbox" v-model="selected_antiguedad" :value="itemIncluirNull" @change="handleChange()" name="">
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
                        <span class="span-info-right" v-if="selected_by_antiguedad !== 0"> ({{ selected_by_antiguedad | numeral('0,0') }} empresas seleccionadas)</span>
                      </p>
                    </div>
                    <div class="panel-body">
                      <div class="row">
                        <div class="col-md-4">
                          <div class="block">
                            <label class="demonstration">Desde (incluido)</label>
                            <el-date-picker
                              v-model="daterange[0]"
                              format="dd/MM/yyyy"
                              value-format="yyyy-MM-dd"
                              type="date"
                              placeholder="(Introducir, en formato dd/mm/aaaa, la fecha de constitución)"
                              :picker-options="pickerOptions">
                            </el-date-picker>
                          </div>
                        </div>
                        <div class="col-md-4">
                          <div class="block">
                            <label class="demonstration">Hasta (incluido)</label>
                            <el-date-picker
                              v-model="daterange[1]"
                              format="dd/MM/yyyy"
                              value-format="yyyy-MM-dd"
                              type="date"
                              placeholder="(Introducir, en formato dd/mm/aaaa, la fecha de constitución)"
                              :picker-options="pickerOptions">
                            </el-date-picker>
                          </div>
                        </div>
                        <div class="col-md-4">
                          <button
                            type="button" 
                            class="btn btn-info"
                            @click="applyRange"
                            :disabled="(this.daterange[0] === null) || (this.daterange[1] === null)">
                              BUSCAR <i :class="(loadingDaterange)?'fa  fa-spinner fa-spin':'fa  fa-search'"></i>
                          </button>
                        </div>
                        <div class="col-md-12">
                          <div class="checkboxs-resaldado w-50-p m-t-10" v-if="itemIncluirNull">
                            <label class="custon-checkboxs">
                              <input type="checkbox" v-model="selected_antiguedad" :value="itemIncluirNull" @change="handleChange()" name="">
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
  import { required, maxLength } from 'vuelidate/lib/validators'
  import { inArrayObjectTreeselect, howAnimation, beforeOrderFilters } from './../../utils'
  import { persistentData } from './../../mixins/persistent-data'
  export default {
    name: 'filter-antiguedad',
    mixins: [persistentData],
    computed: {
      ...mapGetters({
        search: 'search/search',
        loading: 'search/loading',
        form: 'filters/form',
        selected_companies: 'filters/selected_companies',
        applied_filters: 'filters/applied_filters',
        filters: 'filters/filters',
      }),
      itemIncluirNull: function () {
        let include = this.search.antiguedad.filter(function (item) { return item.label === 'incluir_null' })
        return (include)? include[0]: null;
      },
      compareWithNewtoApply: function () {
        let stg = this.selected_antiguedad_string
        let obj = JSON.stringify(this.selected_antiguedad)
        return (stg === obj)
      }
    },
    data: () => ({
      title: 'Antigüedad',
      selected_antiguedad_string: '',
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
      daterange: [null, null],
      loadingDaterange: false,
      loadingAhnos: false,
      daterange_incluir_null: false,
      ahnos_to: '',
      ahnos_from: '',
      incluir_null: false,
      all: false,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
    }),
    validations() {
      return {
        ahnos_from: {
          required,
          between: maxLength(3)
        },
        ahnos_to: {
          required,
          between: maxLength(3)
        }
      }
    },
    watch: {
      selected_antiguedad: function (newProvincesLocalidad) {
        this.selected_by_antiguedad = this.numberCompaniesSelected((this.isAllProvincesLocalidad(newProvincesLocalidad))? this.search.antiguedad : newProvincesLocalidad)
        if (this.reapply && newProvincesLocalidad.length === 0) {
          this.clean()
        }
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
        if (filter === this.title) { this.modalVisible = true }
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
        this.$v.$reset()
        this.modalVisible = true
      },
      hideModal () {
        this.$v.$reset()
        this.modalVisible = false
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
          let beforeForm = beforeOrderFilters(this.filters, this.applied_filters, this.form, this.title)
          this.$store.dispatch('search/filtrar', beforeForm).then((response) => {
            this.updateNumberSelectedCompanies(response.cantidad)
            this.$store.dispatch('filters/addFilters', {
              name: this.title,
              quantity: this.selected_by_antiguedad,
              cantidades: response
            })
            this.areApplied = true
            this.reapply = false
            this.loadingFrm = false
            this.selected_antiguedad_string = JSON.stringify(this.selected_antiguedad)
          }).catch(() => {
            this.loadingFrm = false
          })
        }
      },
      applyRange () {
        if (this.daterange && this.daterange.length !== 0 && this.daterange[0] !== 0 && this.daterange[1] !== 0) {
          this.hideModal()
          this.loadingDaterange = true
          this.form.antiguedad = []
          this.form.antiguedad.push(`fechas:${this.daterange.join("|")}`)
          let beforeForm = beforeOrderFilters(this.filters, this.applied_filters, this.form, this.title)
          this.$store.dispatch('search/filtrar', beforeForm).then((response) => {
            this.updateNumberSelectedCompanies(response.cantidad)
            this.$store.dispatch('filters/addFilters', {
              name: this.title,
              quantity: this.selected_by_antiguedad,
              cantidades: response
            })
            this.areApplied = true
            this.reapply = false
            this.loadingDaterange = false
            this.selected_antiguedad_string = JSON.stringify(this.selected_antiguedad)
          }).catch(() => {
            this.loadingDaterange = false
          })
        }
      },
      applyAhnos () {
        this.$v.$touch()
        if (!this.$v.$invalid) {
          this.hideModal()
          this.loadingAhnos = true
          this.form.antiguedad = []
          this.form.antiguedad.push(`ahnos:${this.ahnos_from}|${this.ahnos_to}`)
          let beforeForm = beforeOrderFilters(this.filters, this.applied_filters, this.form, this.title)
          this.$store.dispatch('search/filtrar', beforeForm).then((response) => {
            this.updateNumberSelectedCompanies(response.cantidad)
            this.$store.dispatch('filters/addFilters', {
              name: this.title,
              quantity: this.selected_by_antiguedad,
              cantidades: response
            })
            this.areApplied = true
            this.reapply = false
            this.loadingAhnos = false
            this.selected_antiguedad_string = JSON.stringify(this.selected_antiguedad)
          }).catch(() => {
            this.loadingAhnos = false
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
        this.selected_antiguedad = []
        this.selected_antiguedad_string = ''
        if (this.applied_filters.length > 1) {
          let beforeForm = beforeOrderFilters(this.filters, this.applied_filters, this.form, this.title)
          this.$store.dispatch('search/filtrar', beforeForm).then((response) => {
            this.updateNumberSelectedCompanies(response.cantidad)
            this.$store.dispatch('filters/setCantidades', { cantidades: response })
          })
        }else {
          this.updateNumberSelectedCompanies(0)
        }
        this.selected_by_antiguedad = 0
        this.daterange = [null, null],
        this.$store.dispatch('filters/removeFilters', this.title)
        this.areApplied = false
        this.reapply = false
        this.incluir_null = false
      },
      emptyFilter () {
        this.form.antiguedad = []
        this.selected_antiguedad = []
        this.selected_antiguedad_string = ''
        this.updateNumberSelectedCompanies(0)
        this.selected_by_antiguedad = 0
        this.daterange = [null, null],
        this.$store.dispatch('filters/removeFilters', this.title)
        this.areApplied = false
        this.reapply = false
        this.incluir_null = false
      },
      handleChange () { //province, event
        this.reapply = (this.areApplied)? true: this.areApplied
      },
      formatearDataPOST (){
        this.form.antiguedad = []
        this.selected_antiguedad.forEach((item) => {
          this.form.antiguedad.push(item.id)
        })
        return this.form
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import './../../sass/filters/filters';

  .block{
    display: flex;
    flex-direction: column;

    .demonstration {
      margin-bottom: 3px;
    }

    .el-date-editor{
      width: 100%;
    }

  }

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

</style>
