<template>
  <div class="panel panel-default cd" id="filter_anios_con_cuentas_disponibles">
    <div class="panel-heading">
      <p class="panel-title roboto white">
        {{ title }}
        <span class="span-info-right" v-if="selected_by_cuentas_disponibles !== 0"> ({{ selected_by_cuentas_disponibles | numeral('0,0') }} empresas seleccionadas)</span>
      </p>
    </div>
    <div class="panel-body">
      <div v-if="search.cuentas_disponibles && search.cuentas_disponibles.length !== 0">
        <div class="row">
          <div class="col-md-6">
            <div class="grid-3-columns-1fr">
              <div v-for="(item, key) in search.cuentas_disponibles" :key="key">
                <label class="custon-checkboxs" v-if="item.label !== 'incluir_null'">
                  <input type="checkbox"
                    :name="`checkbox_cuentas_disponibles_${item.id}`"
                    v-model="selected_cuentas_disponibles"
                    @change="handleChange()"
                    :id="`checkbox_cuentas_disponibles_${item.id}`"
                    :value="item">
                  <span class="geekmark"></span>
                  <span class="name-checkbox">{{ item.label }}</span>
                  <span class="num-fil"> ({{ item.data | numeral('0,0') }})</span>
                </label>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div v-for="(item, key) in options_to_include" :key="key">
              <label class="custon-checkboxs white" v-if="item.label !== 'incluir_null'">
                <input type="checkbox"
                  :name="`checkbox___cuentas_disponibles__${item.id}`"
                  v-model="selected_cuentas_disponibles"
                  :id="`checkbox___cuentas_disponibles__${item.id}`"
                  :value="item"
                  @click="takeIntoAccount(item, $event)">
                <span class="geekmark"></span>
                <span class="name-checkbox">{{ item.label }}</span>
              </label>
            </div>
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
              v-if="(selected_cuentas_disponibles.length !== 0 && !areApplied) || (selected_cuentas_disponibles.length !== 0 && !compareWithNewtoApply)"
              @click="apply">
                Aplicar <i :class="(loadingFrm)?'fa  fa-spinner fa-spin':'fa  fa-send'"></i>
            </button>
            <button type="button" class="btn btn-info" v-if="areApplied" @click="confirmClean">Limpiar <i class="fa fa-undo"></i></button>
          </div>
          <div>
            <div class="checkboxs-resaldado float-right" v-if="itemIncluirNull">
              <label class="custon-checkboxs">
                <input type="checkbox" v-model="selected_cuentas_disponibles" :value="itemIncluirNull" @change="handleChange()" name="">
                <span class="geekmark"></span>
                <span class="title">
                  Incluir aquellas empresas de las que no hay cuentas disponibles
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
                  <button
                    type="button"
                    class="btn btn-success"
                    v-if="(selected_cuentas_disponibles.length !== 0 && !areApplied) || (selected_cuentas_disponibles.length !== 0 && !compareWithNewtoApply)"
                    @click="apply">Aplicar <i :class="(loadingFrm)?'fa  fa-spinner fa-spin':'fa  fa-send'"></i></button>
                    <button type="button" class="btn btn-info" v-if="areApplied" @click="confirmClean">Limpiar <i class="fa fa-undo"></i></button>
                </div>
              </div>
              <div class="row" v-if="search.cuentas_disponibles && search.cuentas_disponibles.length !== 0">
                <div class="col-md-6">
                  <div class="panel panel-default cd">
                    <div class="panel-heading">
                      <p class="panel-title roboto white">
                        Años con Cuentas Disponibles
                      </p>
                    </div>
                    <div class="panel-body">
                      <div class="row">
                        <div class="col-md-12">
                            <div class="div-scroll-300" v-if="search.cuentas_disponibles.length !== 0">
                                <div v-for="(item, key) in search.cuentas_disponibles" :key="key" class="checkbox">
                                    <label class="custon-checkboxs" v-if="item.label !== 'incluir_null'">
                                        <input type="checkbox"
                                            :name="`checkbox_cuentas_disponibles_${item.id}`"
                                            v-model="selected_cuentas_disponibles"
                                            @change="handleChange()"
                                            :id="`checkbox_cuentas_disponibles_${item.id}`"
                                            :value="item">
                                        <span class="geekmark"></span>
                                        <span class="name-checkbox">{{ item.label }}</span>
                                        <span class="num-fil"> ({{ item.data | numeral('0,0') }})</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12">
                          <div class="checkboxs-resaldado float-right" v-if="itemIncluirNull">
                            <label class="custon-checkboxs">
                              <input type="checkbox" v-model="selected_cuentas_disponibles" :value="itemIncluirNull" @change="handleChange()" name="">
                              <span class="geekmark"></span>
                              <span class="title">
                                Incluir aquellas empresas de las que no hay cuentas disponibles 
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="row">
                    <div class="col-md-12">
                      <div class="panel panel-default cd">
                        <div class="panel-heading">
                          <p class="panel-title roboto white">
                            Años con cuentas seleccionados
                            <span class="span-info-right" v-if="selected_cuentas_disponibles.length !== 0"> {{ selected_cuentas_disponibles.length }}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-12">
                      <div class="panel panel-default cd">
                        <div class="panel-heading">
                          <p class="panel-title roboto white">
                            Empresas seleccionadas
                            <span class="span-info-right" v-if="selected_by_cuentas_disponibles !== 0"> ({{ selected_by_cuentas_disponibles | numeral('0,0') }} empresas seleccionadas)</span>
                          </p>
                        </div>
                        <div class="panel-body">
                          <div class="div-scroll-200" id="selected_cuentasDisponibles">
                            <div v-for="(item, key) in selected_cuentas_disponibles" :key="key">
                              <label class="custon-checkboxs" v-if="item.label !== 'incluir_null' && item.id !== 'todos:true' && item.id !== 'todos:false'">
                                <input type="checkbox"
                                  :name="`checkbox_cuentas_disponibles__${item.id}`"
                                  v-model="selected_cuentas_disponibles"
                                  @change="handleChangeList(item, $event)"
                                  :id="`checkbox_cuentas_disponibles__${item.id}`"
                                  :value="item">
                                <span class="geekmark"></span>
                                <span class="name-checkbox">{{ item.label }}</span>
                                <span class="num-fil"> ({{ item.data | numeral('0,0') }})</span>
                              </label>
                            </div>
                          </div>
                          <div style="margin-top: 40px;">
                            <div v-for="(item, key) in options_to_include" :key="key">
                              <label class="custon-checkboxs white" v-if="item.label !== 'incluir_null'">
                                <input type="checkbox"
                                  :name="`checkbox_cuentas_disponibles__${item.id}`"
                                  v-model="selected_cuentas_disponibles"
                                  :id="`checkbox_cuentas_disponibles__${item.id}`"
                                  :value="item"
                                  @click="takeIntoAccount(item, $event)">
                                <span class="geekmark"></span>
                                <span class="name-checkbox">{{ item.label }}</span>
                              </label>
                            </div>
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
      <div class="flex-space-between-flex-end">
        <p></p>
        <p class="text-help">* Puedes elegir más de una opción</p>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import swal from 'sweetalert2'
  import { inArrayObjectTreeselect, howAnimation, beforeOrderFilters, sendPageView, sendEvent, removeDuplicates } from './../../utils'
  import { persistentData } from './../../mixins/persistent-data'
  export default {
    name: 'filter-anios-cuentas-disponibles',
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
        let include = this.search.cuentas_disponibles.filter(function (item) { return item.label === 'incluir_null' })
        return (include)? include[0]: null;
      },
      compareWithNewtoApply: function () {
        let stg = this.selected_cuentas_disponibles_string
        let obj = JSON.stringify(this.selected_cuentas_disponibles)
        return (stg === obj)
      }
    },
    data: () => ({
      title: 'Años con cuentas disponibles',
      selected_cuentas_disponibles_string: '',
      selected_cuentas_disponibles: [],
      selected_to_include: [],
      list_cuentas_disponibles: [],
      selected_by_cuentas_disponibles: 0,
      options_to_include: [{
        id: 'todos:true',
        label: 'Tener en cuenta todos los años seleccionados',
        data: null
      },{
        id: 'todos:false',
        label: 'Tener en cuenta al menos uno de los años seleccionados',
        data: null
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
      incluir_null: false,
      all: false,
    }),
    watch: {
      selected_cuentas_disponibles: function (newProvincesLocalidad) {
        this.selected_by_cuentas_disponibles = this.numberCompaniesSelected((this.isAllProvincesLocalidad(newProvincesLocalidad))? this.search.cuentas_disponibles : newProvincesLocalidad)
        if (this.reapply && newProvincesLocalidad.length === 0) {
          this.clean()
        }
      },
      selected_by_cuentas_disponibles: function(newValue) {
      if (newValue === 0) this.selected_cuentas_disponibles = []
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
      },
      showModal () {
        sendPageView(`filtro-anios-con-cuentas-disponibles`, `Buscador - Filtro de Años con cuentas disponibles`)
        this.modalVisible = true
      },
      hideModal () {
        sendPageView(``, `Buscador - Filtro`)
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
            let result = inArrayObjectTreeselect(this.search.cuentas_disponibles, item.id)
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
        if (this.selected_cuentas_disponibles && this.selected_cuentas_disponibles.length !== 0) {
          this.hideModal()
          this.loadingFrm = true
          this.formatearDataPOST()
          let beforeForm = beforeOrderFilters(this.filters, this.applied_filters, this.form, this.title)
          this.$store.dispatch('search/filtrar', beforeForm).then((response) => {
            this.updateNumberSelectedCompanies(response.cantidad)
            this.$store.dispatch('filters/addFilters', {
              name: this.title,
              quantity: this.selected_by_cuentas_disponibles,
              cantidades: response
            })
            this.areApplied = true
            this.reapply = false
            this.loadingFrm = false
            this.selected_cuentas_disponibles_string = JSON.stringify(this.selected_cuentas_disponibles)
            sendEvent(`filtro-aplicado`, this.title)
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
        this.form.cuentasDisponibles = []
        this.selected_cuentas_disponibles = []
        this.selected_cuentas_disponibles_string = ''
        if (this.applied_filters.length > 1) {
          let beforeForm = beforeOrderFilters(this.filters, this.applied_filters, this.form, this.title)
          this.$store.dispatch('search/filtrar', beforeForm).then((response) => {
            this.updateNumberSelectedCompanies(response.cantidad)
            this.$store.dispatch('filters/setCantidades', { cantidades: response })
          })
        }else {
          this.updateNumberSelectedCompanies(0)
        }
        this.selected_by_cuentas_disponibles = 0
        this.$store.dispatch('filters/removeFilters', this.title)
        this.areApplied = false
        this.reapply = false
        this.incluir_null = false
        this.employees_from = ''
        this.employees_to = ''
        sendEvent('filtro-limpiado', this.title);
      },
      emptyFilter () {
        this.form.cuentasDisponibles = []
        this.selected_cuentas_disponibles = []
        this.selected_cuentas_disponibles_string = ''
        this.updateNumberSelectedCompanies(0)
        this.selected_by_cuentas_disponibles = 0
        this.$store.dispatch('filters/removeFilters', this.title)
        this.areApplied = false
        this.reapply = false
        this.incluir_null = false
        this.employees_from = ''
        this.employees_to = ''
      },
      handleChange () { //province, event
        this.reapply = (this.areApplied)? true: this.areApplied
        this.takeIntoAccountDefault()
      },
      handleChangeList (elemet, event){
        event.preventDefault()
        this.reapply = (this.areApplied)? true: this.areApplied
        let checkboxs = document.querySelectorAll('#selected_cuentasDisponibles input[type="checkbox"]')
        checkboxs.forEach((item) => {
          item.checked = true
        })
      },
      formatearDataPOST (){
        this.form.cuentasDisponibles = []
        this.selected_cuentas_disponibles.forEach((item) => {
          this.form.cuentasDisponibles.push(item.id)
        })
        return this.form
      },
      takeIntoAccount (item, event = null) {
        if (item.id === 'todos:true') {
          this.selected_cuentas_disponibles = this.selected_cuentas_disponibles.filter(item => item.id !== 'todos:false')
          this.selected_cuentas_disponibles.push(this.options_to_include[0])
        }else if (item.id === 'todos:false') {
          this.selected_cuentas_disponibles = this.selected_cuentas_disponibles.filter(item => item.id !== 'todos:true')
          this.selected_cuentas_disponibles.push(this.options_to_include[1])
        }
        this.selected_cuentas_disponibles = removeDuplicates(this.selected_cuentas_disponibles, 'id')
        if (event && event.target && event.target.tagName === 'INPUT'){
          event.target.checked = true
        }
      },
      takeIntoAccountDefault () {
        if (this.selected_cuentas_disponibles && this.selected_cuentas_disponibles.length > 1 && this.options_to_include && this.options_to_include.length > 0) {
          let tiene = this.selected_cuentas_disponibles.filter(item => (item.id === 'todos:false' || item.id === 'todos:true'))
          if (tiene && tiene.length === 0) {
            this.takeIntoAccount(this.options_to_include[0])
          }
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
