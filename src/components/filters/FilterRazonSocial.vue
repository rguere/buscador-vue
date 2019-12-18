<template>
  <div class="panel panel-default cd" id="filter_nombre_o_razon_social">
    <div class="panel-heading">
      <p class="panel-title roboto white">
        {{ title }}
        <span class="span-info-right" v-if="selected_by_social_reasons !== 0"> ({{ selected_by_social_reasons | numeral('0,0') }} empresas seleccionadas)</span>
      </p>
    </div>
    <div class="panel-body">
      <div class="form-group" v-if="(social_reasons && social_reasons.FichaEmpresas.length === 0) || (search_edit)">
        <textarea v-model="dataFrm" id="social_reasons" class="form-control" placeholder="Escriba aqui el nombre o razón social de la empresa"></textarea>
      </div>
      <div class="panel panel-default cd" v-if="social_reasons && social_reasons.FichaEmpresas.length !== 0 && !search_edit">
        <div class="panel-body">
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label class="">{{ dataFrm }}</label>
              </div>
            </div>
            <div class="col-md-6">
              <button
                type="button"        
                v-if="social_reasons && social_reasons.FichaEmpresas.length !== 0 && !search_edit"
                class="btn btn-xs btn-info pull-right" @click="editSearch" 
                :disabled="dataFrm.length === 0 || loadingValidar">
                  Editar búsqueda <i :class="(loadingValidar)?'fa  fa-spinner fa-spin':'fa  fa-edit'"></i>
              </button>
            </div>
          </div>
          <div class="div-scroll-200">
            <div v-for="(item, key) in social_reasons.FichaEmpresas" :key="key">
                <label class="custon-checkboxs">
                    <input type="checkbox"
                      :name="`checkbox_${item.id}`"
                      v-model="selected_social_reasons"
                      :id="`checkbox_${item.id}`"
                      :value="item">
                    <span class="geekmark"></span>
                    <span class="name-checkbox">{{ item.razonSocial }}</span>
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
              v-if="social_reasons && social_reasons.FichaEmpresas.length !== 0 && !search_edit"
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
        <div>
          <button
            type="button"
            v-if="social_reasons && social_reasons.FichaEmpresas.length === 0 || search_edit" 
            class="btn btn-info" @click="validateRazonSocial" 
            :disabled="dataFrm.length === 0 || loadingValidar">
              BUSCAR <i :class="(loadingValidar)?'fa  fa-spinner fa-spin':'fa  fa-search'"></i>
          </button>
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
                  v-if="social_reasons && social_reasons.FichaEmpresas.length !== 0 && !search_edit"
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
                  <textarea v-model="dataFrm" id="social_reasons" class="form-control"></textarea>
                  <button
                    type="button"
                    v-if="social_reasons && social_reasons.FichaEmpresas.length === 0 || search_edit" 
                    class="btn btn-info pull-right top-10" @click="validateRazonSocial" 
                    :disabled="dataFrm.length === 0 || loadingValidar">
                      BUSCAR <i :class="(loadingValidar)?'fa  fa-spinner fa-spin':'fa  fa-search'"></i>
                  </button>
                </div>
              </div>
            </div>
            <div class="col-md-12" v-if="social_reasons && social_reasons.FichaEmpresas.length !== 0 && !search_edit">
              <div class="panel panel-default cd">
                <div class="panel-heading">
                  <p class="panel-title roboto white">
                    Selecciona una o varias empresas y clique en “Aplicar” para incorporarlas a su búsqueda.
                  </p>
                </div>
                <div class="panel-body">
                  <table class="table table-hover">
                    <thead>
                      <tr>
                        <th scope="col">Razón social de la empresa</th>
                        <th scope="col">NIF</th>
                        <th scope="col">Provincia</th>
                        <th scope="col">Localidad</th>
                        <th scope="col">Último año cuentas disponibles</th>
                        <th scope="col">Ventas último año disponible (miles de €)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, key) in social_reasons.FichaEmpresas" :key="key">
                        <th scope="row">
                          <div class="checkbox">
                            <label>
                              <input
                                type="checkbox"
                                :name="`checkbox_table_${item.id}`"
                                v-model="selected_social_reasons"
                                :id="`checkbox_table_${item.id}`"
                                :value="item">
                              {{ item.razonSocial }}
                            </label>
                          </div>
                        </th>
                        <td>{{ item.cif }}</td>
                        <td>{{ item.provincia }}</td>
                        <td>{{ item.localidad }}</td>
                        <td>{{ item.fechaActoRegistro }}</td>
                        <td>{{ item.fechaGeneracion }}</td>
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
  export default {
    name: 'filter-razon-social',
    computed: mapGetters({
      search: 'search/search',
      loading: 'search/loading',
      form: 'filters/form',
      selected_companies: 'filters/selected_companies',
      applied_filters: 'filters/applied_filters',
    }),
    data: () => ({
      title: 'Nombre o razón social',
      loadingValidar: false,
      search_edit: true,
      dataFrm: '',
      social_reasons: {
        FichaEmpresas: [], 
      },
      selected_social_reasons: [],
      selected_by_social_reasons: 0,
      areApplied: false,
      loadingApply: false,
      modalVisible: false,
      from_social_reasons: '',
      to_social_reason: '',
      loadingFile: false,
      file: {},
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
      }
    },
    methods: {
      validateRazonSocial(){
        this.loadingValidar = true  
        this.$store.dispatch('search/validateRazonSocial', this.dataFrm).then((response) => {
          this.social_reasons.FichaEmpresas = (response.FichaEmpresas)? response.FichaEmpresas: []
          //this.selected_social_reasons = this.social_reasons.FichaEmpresas
          this.loadingValidar = false
          this.search_edit = false
        }).catch(() => {
          this.loadingValidar = false
          this.social_reasons = { FichaEmpresas: [] }
          this.selected_social_reasons = []
        })
      },
      apply () {
        if (this.selected_social_reasons && this.selected_social_reasons.length !== 0) {
          this.hideModal()
          this.loadingApply = true
          this.search_edit = false
          this.form.razonSocial = this.selected_social_reasons.map((item) => {
            return item.razonSocial
          })
          this.$store.dispatch('search/filtrar', this.form).then((response) => {
            this.$store.dispatch('filters/addFilters', {
              name: this.title,
              quantity: this.selected_by_social_reasons
            })
            this.updateNumberSelectedCompanies(response.cantidad)
            this.areApplied = true
            this.loadingApply = false
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
        this.form.codigosPostales = []
        this.dataFrm = ''
        this.to_social_reason = ''
        this.social_reasons = { FichaEmpresas: [] }
        if (this.applied_filters.length > 1) {
          this.$store.dispatch('search/filtrar', this.form).then((response) => {
            this.updateNumberSelectedCompanies(response.cantidad)
          })
        }else {
          let resta = (this.selected_social_reasons.length === 0)? 0 : this.selected_companies - this.selected_by_social_reasons
          this.updateNumberSelectedCompanies((resta < 0)? 0: resta)
        }
        this.selected_by_social_reasons = 0
        this.$store.dispatch('filters/removeFilters', this.title)
        this.areApplied = false
        this.search_edit = true
      },
      emptyFilter () {
        this.form.codigosPostales = []
        this.social_reasons = { FichaEmpresas: [] }
        this.updateNumberSelectedCompanies(0)
        this.selected_by_social_reasons = 0
        this.$store.dispatch('filters/removeFilters', this.title)
        this.areApplied = false
        this.search_edit = true
      },
      editSearch () {
        this.search_edit = true
        setTimeout(() => { document.getElementById('social_reasons').focus() }, 100)
      },
      numberRazonSocial(newRazonSocial) {
        let business_accountant = 0
        if (Array.isArray(newRazonSocial)) {
          newRazonSocial.forEach((item) => {
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
        this.modalVisible = true
      },
      hideModal () {
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
