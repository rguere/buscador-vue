<template>
  <div class="panel panel-default cd" id="filter_nombre_o_razon_social">
    <div class="panel-heading">
      <p class="panel-title roboto white">
        {{ title }}
        <span class="span-info-right" v-if="selected_by_social_reasons !== 0"> ({{ selected_by_social_reasons | numeral('0,0') }} empresas seleccionadas)</span>
      </p>
    </div>
    <div class="panel-body">
      <form v-on:submit.prevent="validateRazonSocial" class="m-b-10">
        <div class="input-group">
          <input type="text" v-model="dataFrm" id="social_reasons1" class="form-control" placeholder="Escriba aqui el nombre o razón social de la empresa" title="Escriba aqui el nombre o razón social de la empresa">
          <span class="input-group-btn">
            <button
              title="BUSCAR"
              type="button"                   
              class="btn btn-info" @click="validateRazonSocial" 
              :disabled="dataFrm.length === 0 || loadingValidar">
                BUSCAR <i :class="(loadingValidar)?'fa  fa-spinner fa-spin':'fa  fa-search'"></i>
            </button>
          </span>
        </div>
      </form>
      <div class="panel panel-default cd" v-if="social_reasons && social_reasons.empresas.length !== 0 && !search_edit">
        <div class="panel-body">
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label class="">{{ dataFrm }}</label>
              </div>
            </div>
            <!-- <div class="col-md-6">
              <el-tooltip content="Agregar más nombre o razón social a la búsqueda" placement="top">
                <button
                  type="button"        
                  v-if="social_reasons && social_reasons.empresas.length !== 0 && !search_edit"
                  class="btn btn-success pull-right" @click="addSearch" 
                  :disabled="dataFrm.length === 0 || loadingValidar">
                    <i :class="(loadingValidar)?'fa  fa-spinner fa-spin':'fa  fa-plus'"></i>
                </button>
              </el-tooltip>
              <el-tooltip content="Editar búsqueda" placement="top">
                <button
                  type="button"        
                  v-if="social_reasons && social_reasons.empresas.length !== 0 && !search_edit"
                  class="btn btn-info pull-right m-r-5" @click="editSearch" 
                  :disabled="dataFrm.length === 0 || loadingValidar">
                    <i :class="(loadingValidar)?'fa  fa-spinner fa-spin':'fa  fa-edit'"></i>
                </button>
              </el-tooltip>
            </div> -->
          </div>
          <div class="div-scroll-200">
            <div v-for="(item, key) in social_reasons.empresas" :key="key">
                <label class="custon-checkboxs">
                    <input type="checkbox"
                      :name="`checkbox_${item.IdEmpresa}`"
                      v-model="selected_social_reasons"
                      @change="handleChange(item, $event)"
                      :id="`checkbox_${item.IdEmpresa}`"
                      :value="item">
                    <span class="geekmark"></span>
                    <span class="name-checkbox">{{ item.RazonSocial }}</span>
                </label>
            </div>
          </div>
        </div>
      </div>
      <div class="flex-space-between-flex-end">
        <div>
          <button class="btn btn-warning m-r-5" @click="showModal">
            Ver detalles <i class="fa fa-plus-circle"></i>
          </button>
          <button
              v-if="selected_social_reasons && selected_social_reasons.length !== 0 && !search_edit && !compareWithNewtoApply"
              :disabled="selected_social_reasons.length === 0 || loadingApply"
              type="button"
              class="btn btn-success m-r-5"
              @click="apply">
                Aplicar <i :class="(loadingApply)?'fa  fa-spinner fa-spin':'fa  fa-send'"></i>
            </button>
          <button
            type="button"
            class="btn btn-info"
            v-if="areApplied"
            @click="confirmClean">
              Limpiar <i class="fa fa-undo"></i>
          </button>
        </div>
      </div>
      <div class="row" v-if="list_selected_social_reasons && list_selected_social_reasons.length !== 0">
        <div class="col-md-12">
          <br/>
          <el-collapse v-model="collapseResumen">
            <el-collapse-item title="Resumen de empresas seleccionadas" name="1">
              <div class="div-scroll-200">
                <div v-for="(item, key) in list_selected_social_reasons" :key="key">
                  <div class="checkbox" id="selected_em">
                    <label>
                      <input
                        type="checkbox"
                        :name="`checkbox_resumen${item.IdEmpresa}`"
                        v-model="selected_social_reasons"
                        @change="handleChangeList(item, $event)"
                        :id="`checkbox_resumen${item.IdEmpresa}`"
                        :value="item">
                      {{ item.RazonSocial }} - {{ item.CIF }}
                    </label>
                  </div>
                </div>
              </div>
            </el-collapse-item>
          </el-collapse> 
        </div>
      </div>
      <el-dialog
        :visible.sync="modalVisible"
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
                  v-if="selected_social_reasons && selected_social_reasons.length !== 0 && !search_edit && !compareWithNewtoApply"
                  :disabled="selected_social_reasons.length === 0 || loadingApply"
                  type="button"
                  class="btn btn-success"
                  @click="apply">
                    Aplicar <i :class="(loadingApply)?'fa  fa-spinner fa-spin':'fa  fa-send'"></i>
                </button>
              <button
                type="button"
                class="btn btn-info"
                v-if="areApplied"
                @click="confirmClean">
                  Limpiar <i class="fa fa-undo"></i>
              </button>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <div class="panel panel-default cd">
                <div class="panel-heading">
                  <p class="panel-title roboto white">
                    Introduce el nombre o la razón social y clique en “BUSCAR”
                  </p>
                </div>
                <div class="panel-body">
                  <div class="row">
                    <div class="col-md-7">
                      <form v-on:submit.prevent="validateRazonSocial">
                        <div class="input-group">
                          <input type="text" v-model="dataFrm" id="social_reasons" class="form-control" placeholder="Escriba aqui el nombre o razón social de la empresa" title="Escriba aqui el nombre o razón social de la empresa">
                          <span class="input-group-btn">
                            <button
                              type="button"                   
                              class="btn btn-info" @click="validateRazonSocial" 
                              :disabled="dataFrm.length === 0 || loadingValidar">
                                BUSCAR <i :class="(loadingValidar)?'fa  fa-spinner fa-spin':'fa  fa-search'"></i>
                            </button>
                          </span>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-12" v-if="social_reasons && social_reasons.empresas.length !== 0 && !search_edit">
              <div class="panel panel-default cd">
                <div class="panel-heading">
                  <p class="panel-title roboto white">
                    Selecciona una o varias empresas y clique en “Aplicar” para incorporarlas a su búsqueda.
                    <span class="span-info-right" v-if="selected_by_social_reasons !== 0"> ({{ selected_by_social_reasons | numeral('0,0') }} empresas seleccionadas)</span>
                  </p>
                </div>
                <div class="panel-body div-scroll-200">
                  <table class="table table-hover">
                    <thead>
                      <tr>
                        <th scope="col">Razón social de la empresa</th>
                        <th scope="col">NIF</th>
                        <th scope="col">Provincia</th>
                        <th scope="col">Localidad</th>
                        <th scope="col">Último año cuentas disponibles</th>
                        <!--<th scope="col">Ventas último año disponible (miles de €)</th>-->
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, key) in social_reasons.empresas" :key="key">
                        <th scope="row">
                          <div class="checkbox">
                            <label>
                              <input
                                type="checkbox"
                                :name="`checkbox_table_${item.IdEmpresa}`"
                                v-model="selected_social_reasons"
                                @change="handleChange(item, $event)"
                                :id="`checkbox_table_${item.IdEmpresa}`"
                                :value="item">
                              {{ item.RazonSocial }}
                            </label>
                          </div>
                        </th>
                        <td>{{ item.CIF }}</td>
                        <td>{{ item.Provincia }}</td>
                        <td>{{ item.Localidad }}</td>
                        <td>
                          {{ (item.UltimaCuentaAnual)? item.UltimaCuentaAnual.Ejercicio : ''  }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div class="col-md-12" v-if="list_selected_social_reasons && list_selected_social_reasons.length !== 0">
              <div class="panel panel-default cd">
                <div class="panel-heading">
                  <p class="panel-title roboto white">
                    Resumen de empresas seleccionadas
                    <span class="span-info-right" v-if="selected_by_social_reasons !== 0"> ({{ selected_by_social_reasons | numeral('0,0') }} empresas seleccionadas)</span>
                  </p>
                </div>
                <div class="panel-body div-scroll-200">
                  <table class="table table-hover">
                    <thead>
                      <tr>
                        <th scope="col">Razón social de la empresa</th>
                        <th scope="col">NIF</th>
                        <th scope="col">Provincia</th>
                        <th scope="col">Localidad</th>
                        <th scope="col">Último año cuentas disponibles</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, key) in list_selected_social_reasons" :key="key">
                        <th scope="row">
                          <div class="checkbox" id="selected_em">
                            <label>
                              <input
                                type="checkbox"
                                :name="`checkbox_table_${item.IdEmpresa}`"
                                v-model="selected_social_reasons"
                                @change="handleChangeList(item, $event)"
                                :id="`checkbox_table_${item.IdEmpresa}`"
                                :value="item">
                              {{ item.RazonSocial }}
                            </label>
                          </div>
                        </th>
                        <td>{{ item.CIF }}</td>
                        <td>{{ item.Provincia }}</td>
                        <td>{{ item.Localidad }}</td>
                        <td>
                          {{ (item.UltimaCuentaAnual)? item.UltimaCuentaAnual.Ejercicio : ''  }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import swal from 'sweetalert2'
  import { beforeOrderFilters, removeDuplicates, sendPageView, sendEvent } from './../../utils'
  import { persistentData } from './../../mixins/persistent-data'
  export default {
    name: 'filter-razon-social',
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
      compareWithNewtoApply: function () {
        let stg = this.selected_social_reasons_string
        let obj = JSON.stringify(this.selected_social_reasons)
        return (stg === obj)
      }
    },
    data: () => ({
      title: 'Nombre o razón social',
      loadingValidar: false,
      search_edit: true,
      search_add: false,
      dataFrm: '',
      social_reasons: {
        total: 0,
        cantidad: 0,
        empresas: [],
      },
      selected_social_reasons_string: '',
      selected_social_reasons: [],
      list_selected_social_reasons: [],
      selected_by_social_reasons: 0,
      areApplied: false,
      reapply: false,
      loadingApply: false,
      modalVisible: false,
      from_social_reasons: '',
      to_social_reason: '',
      loadingFile: false,
      file: {},
      collapseResumen: []
    }),
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
    watch: {
      selected_social_reasons: function (newRazonSocial) {
        this.selected_by_social_reasons = this.numberRazonSocial(newRazonSocial)
        this.list_selected_social_reasons = [...this.selected_social_reasons]
        if (this.reapply && newRazonSocial.length === 0) {
          this.clean()
        }
      }
    },
    methods: {
      validateRazonSocial(){
        if (this.dataFrm.length !== 0) {
          this.loadingValidar = true  
          this.$store.dispatch('search/validateRazonSocial', this.dataFrm).then((response) => {
            if(response && response.empresas && this.social_reasons.empresas.length !== 0 && this.search_add) {
              response.empresas.map((item) => {
                this.social_reasons.empresas.unshift(item)
              })
              this.social_reasons.empresas = removeDuplicates(this.social_reasons.empresas, 'RazonSocial')
            }else {
              this.social_reasons.empresas = (response.empresas)? response.empresas: []
            }
            this.loadingValidar = false
            this.search_edit = false
            this.search_add = false
            if(response.empresas.length === 0) {
              swal.fire(
                'Advertencia',
                'Nombre o razón social no existe',
                'warning'
              )
            }else {
              this.dataFrm = ''
            }
          }).catch(() => {
            this.loadingValidar = false
            this.social_reasons = { total: 0, cantidad: 0, empresas: [] }
            this.selected_social_reasons = []
          })
        }
      },
      apply () {
        if (this.selected_social_reasons && this.selected_social_reasons.length !== 0) {
          this.loadingApply = true
          this.search_edit = false
          this.search_add = false
          this.form.razonSocial = this.selected_social_reasons.map((item) => {
            return item.RazonSocial
          })
          let beforeForm = beforeOrderFilters(this.filters, this.applied_filters, this.form, this.title)
          this.$store.dispatch('search/filtrar', beforeForm).then((response) => {
            this.$store.dispatch('filters/addFilters', {
              name: this.title,
              quantity: this.selected_by_social_reasons,
              cantidades: response
            })
            this.updateNumberSelectedCompanies(response.cantidad)
            this.areApplied = true
            this.reapply = false
            this.loadingApply = false
            this.dataFrm = ''
            this.selected_social_reasons_string = JSON.stringify(this.selected_social_reasons)
            this.social_reasons = { total: 0, cantidad: 0, empresas: [] }
            sendEvent(`filtro-aplicado`, this.title)
          }).catch(() => {
            this.loadingApply = false
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
      clean (){
        this.form.razonSocial = []
        this.dataFrm = ''
        this.to_social_reason = ''
        this.selected_social_reasons = []
        this.selected_social_reasons_string = ''
        this.social_reasons = { total: 0, cantidad: 0, empresas: [] }
        this.list_selected_social_reasons = []
        this.collapseResumen = []
        if (this.applied_filters.length > 1) {
          let beforeForm = beforeOrderFilters(this.filters, this.applied_filters, this.form, this.title)
          this.$store.dispatch('search/filtrar', beforeForm).then((response) => {
            this.updateNumberSelectedCompanies(response.cantidad)
            this.$store.dispatch('filters/setCantidades', { cantidades: response })
          })
        }else {
          this.updateNumberSelectedCompanies(0)
        }
        this.selected_by_social_reasons = 0
        this.$store.dispatch('filters/removeFilters', this.title)
        this.areApplied = false
        this.reapply = false
        this.search_edit = true
        this.search_add = false
        sendEvent('filtro-limpiado', this.title);
      },
      emptyFilter () {
        this.form.razonSocial = []
        this.selected_social_reasons = []
        this.selected_social_reasons_string = ''
        this.dataFrm = ''
        this.to_social_reason = ''
        this.social_reasons = { total: 0, cantidad: 0, empresas: [] }
        this.list_selected_social_reasons = []
        this.updateNumberSelectedCompanies(0)
        this.selected_by_social_reasons = 0
        this.$store.dispatch('filters/removeFilters', this.title)
        this.areApplied = false
        this.reapply = false
        this.search_edit = true
        this.search_add = false
        this.collapseResumen = []
      },
      editSearch () {
        this.search_edit = true
        this.search_add = true
        this.dataFrm =  (this.areApplied)? '': this.dataFrm
        setTimeout(() => { document.getElementById('social_reasons').focus() }, 100)
      },
      addSearch () {
        this.search_edit = true
        this.search_add = true
        this.dataFrm = ''
        setTimeout(() => { document.getElementById('social_reasons').focus() }, 100)
      },
      numberRazonSocial(newRazonSocial) {
        let business_accountant = 0
        if (Array.isArray(newRazonSocial)) {
          newRazonSocial.forEach(() => {
            business_accountant = business_accountant + 1
          })
        }
        return business_accountant
      },
      updateNumberSelectedCompanies(quantity){
        this.$store.dispatch('filters/updateNumberSelectedCompanies', {
          quantity
        })
      },
      handleChange () { //element, event
        this.reapply = (this.areApplied)? true: this.areApplied
      },
      handleChangeList (element, event){
        event.preventDefault()
        this.reapply = (this.areApplied)? true: this.areApplied
        let checkboxs = document.querySelectorAll('#selected_em input[type="checkbox"]')
        checkboxs.forEach((item) => {
          item.checked = true
        })
      },
      showModal () {
        sendPageView(`filtro-razon-social`, `Buscador - Filtro de Razón Social`)
        this.modalVisible = true
      },
      hideModal () {
        sendPageView(``, `Buscador - Filtro`)
        this.modalVisible = false
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import './../../sass/filters/filters';
  .filter_textarea {
    max-height: 60px;
  }

  .top-10 {
    margin-top: 10px;
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
