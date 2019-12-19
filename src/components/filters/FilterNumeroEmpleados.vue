<template>
  <div class="panel panel-default cd" id="filter_numero_de_empleados">
    <div class="panel-heading">
      <p class="panel-title roboto white">
        {{ title }}
        <span class="span-info-right" v-if="selected_by_empleados !== 0"> ({{ selected_by_empleados | numeral('0,0') }} empresas seleccionadas)</span>
      </p>
    </div>
    <div class="panel-body">
      <div v-if="search.empleados && search.empleados.length !== 0">
        <div class="grid-2-columns-1fr">
          <div v-for="(item, key) in search.empleados" :key="key">
            <label class="custon-checkboxs">
              <input type="checkbox"
                :name="`checkbox_empleados_${item.id}`"
                v-model="selected_empleados"
                @change="handleChange(item, $event)"
                :id="`checkbox_empleados_${item.id}`"
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
              v-if="(selected_empleados.length !== 0 && !areApplied) || (selected_empleados.length !== 0 && reapply)"
              @click="apply">
                Aplicar <i :class="(loadingFrm)?'fa  fa-spinner fa-spin':'fa  fa-send'"></i>
            </button>
            <button type="button" class="btn btn-info" v-if="areApplied" @click="confirmClean">Limpiar <i class="fa fa-undo"></i></button>
          </div>
          <p class="text-help">* Puede elegir más de una opción</p>
        </div>
        <div>
          <div class="float-right">
            <label class="custon-checkboxs">
              <input type="checkbox" v-model="selected_empleados" :value="{id: 'incluir_null', label: 'incluir_null' }" name="">
              <span class="geekmark"></span>
              <span class="title">
                Incluir aquellas empresas en las que se desconoce su número de empleados
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
                  <button type="button" class="btn btn-success" v-if="selected_empleados.length !== 0" @click="apply">Aplicar <i :class="(loadingFrm)?'fa  fa-spinner fa-spin':'fa  fa-send'"></i></button>
                  <button type="button" class="btn btn-info" v-if="areApplied" @click="confirmClean">Limpiar <i class="fa fa-undo"></i></button>
                </div>
              </div>
              <div class="row" v-if="search.empleados && search.empleados.length !== 0">
                <div class="col-md-12">
                  <div class="panel panel-default cd">
                    <div class="panel-heading">
                      <p class="panel-title roboto white">
                        Seleccionar empresas por número de empleados (*Puede elegir más de una opción)
                        <span class="span-info-right" v-if="selected_by_empleados !== 0"> ({{ selected_by_empleados | numeral('0,0') }} empresas seleccionadas)</span>
                      </p>
                    </div>
                    <div class="panel-body">
                      <div class="row">
                        <div class="col-md-12">
                            <div v-if="search.empleados.length !== 0">
                                <div v-for="(item, key) in search.empleados" :key="key" class="checkbox">
                                    <label class="custon-checkboxs">
                                        <input type="checkbox"
                                            :name="`checkbox_empleados_${item.id}`"
                                            v-model="selected_empleados"
                                            @change="handleChange(item, $event)"
                                            :id="`checkbox_empleados_${item.id}`"
                                            :value="item">
                                        <span class="geekmark"></span>
                                        <span class="name-checkbox">{{ item.label }}</span>
                                        <span class="num-fil"> ({{ item.data | numeral('0,0') }})</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12">
                          <div class="float-right">
                            <label class="custon-checkboxs">
                              <input type="checkbox" v-model="selected_empleados" :value="{id: 'incluir_null', label: 'incluir_null' }" name="">
                              <span class="geekmark"></span>
                              <span class="title">
                                Incluir aquellas empresas en las que se desconoce su número de empleados 
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
                        Seleccionar empresas por número de empleados.
                      </p>
                    </div>
                    <div class="panel-body">
                      <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                              <label class="control-label">Insertar la antigüedad de la(s) empresa(s) en número de años</label>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group" :class="{ 'has-error has-feedback': $v.employees_from.$error }">
                              <label class="control-label" for="employees_from">De (incluido) <i class="fa fa-user-circle-o"></i></label>
                              <input type="text"
                                v-model.trim="$v.employees_from.$model"
                                required
                                class="form-control"
                                name="employees_from"
                                id="employees_from">
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group" :class="{ 'has-error has-feedback': $v.employees_to.$error }">
                              <label class="control-label" for="employees_to">Hasta (incluido) <i class="fa fa-user-circle-o"></i></label>
                              <input type="text"
                                v-model.trim="$v.employees_to.$model"
                                required
                                class="form-control"
                                name="employees_to"
                                id="employees_to">
                            </div>
                        </div>
                        <div class="col-md-4">
                            <button
                                type="button" 
                                class="btn btn-info"
                                @click="applyEmpleados"
                                :disabled="$v.$invalid || loadingEmpleados">
                                BUSCAR <i :class="(loadingEmpleados)?'fa  fa-spinner fa-spin':'fa  fa-search'"></i>
                            </button>
                        </div>
                        <div class="col-md-12">
                          <label class="custon-checkboxs">
                            <input type="checkbox" v-model="selected_empleados" :value="{id: 'incluir_null', label: 'incluir_null' }" name="">
                            <span class="geekmark"></span>
                            <span class="title">
                              Incluir aquellas empresas en las que se desconoce su número de empleados 
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-dialog>
      </div>
      <div v-if="search.empleados && search.empleados.length === 0 && !loading" class="alert alert-dismissible alert-primary">
        <strong>Oh!</strong> datos no encontrados.
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import swal from 'sweetalert2'
  import { required, maxLength } from 'vuelidate/lib/validators'
  import { inArrayObjectTreeselect, howAnimation } from './../../utils'
  export default {
    name: 'filter-numero-empleados',
    computed: mapGetters({
      search: 'search/search',
      loading: 'search/loading',
      form: 'filters/form',
      selected_companies: 'filters/selected_companies',
      applied_filters: 'filters/applied_filters',
    }),
    data: () => ({
      title: 'Número de empleados',
      selected_empleados: [],
      list_empleados: [],
      selected_by_empleados: 0,
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
      daterange: [],
      loadingDaterange: false,
      loadingEmpleados: false,
      daterange_incluir_null: false,
      employees_to: '',
      employees_from: '',
      incluir_null: false,
      all: false,
    }),
    validations() {
      return {
        employees_from: {
          required,
          between: maxLength(9)
        },
        employees_to: {
          required,
          between: maxLength(9)
        }
      }
    },
    watch: {
      selected_empleados: function (newProvincesLocalidad) {
        this.selected_by_empleados = this.numberCompaniesSelected((this.isAllProvincesLocalidad(newProvincesLocalidad))? this.search.empleados : newProvincesLocalidad)
      },
      selected_by_empleados: function(newValue) {
      if (newValue === 0) this.selected_empleados = []
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
          this.options[0].children = (this.search && this.search.empleados) ? this.search.empleados : []
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
            let result = inArrayObjectTreeselect(this.search.empleados, item.id)
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
        if (this.selected_empleados && this.selected_empleados.length !== 0) {
          this.hideModal()
          this.loadingFrm = true
          this.formatearDataPOST()
          this.$store.dispatch('search/filtrar', this.form).then((response) => {
            this.updateNumberSelectedCompanies(response.cantidad)
            this.$store.dispatch('filters/addFilters', {
              name: this.title,
              quantity: this.selected_by_empleados
            })
            this.areApplied = true
            this.reapply = false
            this.loadingFrm = false
          }).catch(() => {
            this.loadingFrm = false
          })
        }
      },
      applyEmpleados () {
        this.$v.$touch()
        if (!this.$v.$invalid) {
          this.hideModal()
          this.loadingEmpleados = true
          this.form.empleados = []
          let employees_from = parseInt(this.employees_from, 10),
            employees_to = parseInt(this.employees_to, 10),
            mayor = 0, menor = 0;
          if(employees_from > employees_to){
            mayor = employees_from
            menor = employees_to
          }else {
            mayor = employees_to
            menor = employees_from
          }
          this.form.empleados.push(`empleados:${menor}|${mayor}`)
          if(this.daterange_incluir_null){
            this.form.empleados.push("incluir_null")
          }
          this.$store.dispatch('search/filtrar', this.form).then((response) => {
            this.updateNumberSelectedCompanies(response.cantidad)
            this.$store.dispatch('filters/addFilters', {
              name: this.title,
              quantity: this.selected_by_empleados
            })
            this.areApplied = true
            this.reapply = false
            this.loadingEmpleados = false
          }).catch(() => {
            this.loadingEmpleados = false
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
        this.form.empleados = []
        if (this.applied_filters.length > 1) {
          this.$store.dispatch('search/filtrar', this.form).then((response) => {
            this.updateNumberSelectedCompanies(response.cantidad)
          })
        }else {
          this.updateNumberSelectedCompanies(0)
        }
        this.selected_by_empleados = 0
        this.$store.dispatch('filters/removeFilters', this.title)
        this.areApplied = false
        this.reapply = false
        this.incluir_null = false
      },
      emptyFilter () {
        this.form.empleados = []
        this.updateNumberSelectedCompanies(0)
        this.selected_by_empleados = 0
        this.$store.dispatch('filters/removeFilters', this.title)
        this.areApplied = false
        this.reapply = false
        this.incluir_null = false
      },
      handleChange () { //province, event
        this.reapply = (this.areApplied)? true: this.areApplied
      },
      formatearDataPOST (){
        this.form.empleados = []
        this.selected_empleados.forEach((item) => {
          this.form.empleados.push(item.id)
        })
        if (this.incluir_null) {
          this.form.empleados.push("incluir_null")
        }
        return this.form
      },
      selectAll () {
        if(this.all){
          this.selected_empleados = this.search.empleados
        }else {
          this.selected_empleados = []
        }
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
