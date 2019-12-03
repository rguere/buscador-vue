<template>
  <div class="panel panel-default cd" id="filter_nombre_o_razon_social">
    <div class="panel-heading">
      <p class="panel-title roboto white">
        {{ title }}
        <span class="span-info-right" v-if="selected_by_social_reasons !== 0"> ({{ selected_by_social_reasons | numeral('0,0') }} seleccionadas)</span>
      </p>
    </div>
    <div class="panel-body">
      <div class="form-group" v-if="(social_reasons && social_reasons.validos.length === 0) || (search_edit)">
        <textarea v-model="dataFrm" id="social_reasons" class="form-control" placeholder="Escriba aqui el nombre o razón social de la empresa"></textarea>
      </div>
      <div class="panel panel-default cd" v-if="social_reasons && social_reasons.validos.length !== 0 && !search_edit">
        <div class="panel-body">
          <button
            type="button"        
            v-if="social_reasons && social_reasons.validos.length !== 0 && !search_edit"
            class="btn btn-xs btn-info pull-right" @click="editSearch" 
            :disabled="dataFrm.length === 0 || loadingValidar">
              Editar búsqueda <i :class="(loadingValidar)?'fa  fa-spinner fa-spin':'fa  fa-edit'"></i>
          </button>
          <div v-for="(item, key) in social_reasons.validos" :key="key">
              <label class="custon-checkboxs">
                  <input type="checkbox"
                    :name="`checkbox_${item.id}`"
                    v-model="selected_social_reasons"
                    :id="`checkbox_${item.id}`"
                    :value="item">
                  <span class="geekmark"></span>
                  <span class="name-checkbox">{{ item.label }}</span>
                  <span class="num-fil">({{ item.data | numeral('0,0') }})</span>
              </label>
          </div>
        </div>
      </div>
      <div class="form-group" v-if="social_reasons && social_reasons.invalidos.length !== 0 && !search_edit">
        <p>Nombre o razón social no encontrados</p>
        <span v-for="(item, key) in social_reasons.invalidos" :key="key" class="label label-danger label-no-encontrados">{{ item }}</span>
        <hr>
      </div>
      <div class="flex-space-between-flex-end">
        <div>
          <button class="btn btn-warning m-r-2" @click="showModal">
            Ver detalles <i class="fa fa-plus-circle"></i>
          </button>
          <button
              v-if="social_reasons && social_reasons.validos.length !== 0 && !search_edit"
              :disabled="selected_social_reasons.length === 0 || loadingApply"
              type="button"
              class="btn btn-success m-r-2"
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
            v-if="social_reasons && social_reasons.validos.length === 0 || search_edit" 
            class="btn btn-info" @click="validateZipCodes" 
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
                  v-if="social_reasons && social_reasons.validos.length !== 0 && !search_edit"
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
                    v-if="social_reasons && social_reasons.validos.length === 0 || search_edit" 
                    class="btn btn-info pull-right top-10" @click="validateZipCodes" 
                    :disabled="dataFrm.length === 0 || loadingValidar">
                      BUSCAR <i :class="(loadingValidar)?'fa  fa-spinner fa-spin':'fa  fa-search'"></i>
                  </button>
                </div>
              </div>
            </div>
            <div class="col-md-12">
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
                      <tr>
                        <th scope="row">
                          <div class="checkbox">
                            <label><input type="checkbox" value=""> REPSOL S.A.</label>
                          </div>
                        </th>
                        <td>A78374725</td>
                        <td>MADRID</td>
                        <td>MADRID</td>
                        <td>21/12/2018</td>
                        <td>21/12/2018</td>
                      </tr>
                      <tr>
                        <th scope="row">
                          <div class="checkbox">
                            <label><input type="checkbox" value=""> REPSOL PETROLEO S.A.</label>
                          </div>
                        </th>
                        <td>A78374725</td>
                        <td>MADRID</td>
                        <td>MADRID</td>
                        <td>21/12/2018</td>
                        <td>21/12/2018</td>
                      </tr>
                      <tr>
                        <th scope="row">
                          <div class="checkbox">
                            <label><input type="checkbox" value=""> REPSOL TRADING S.A.</label>
                          </div>
                        </th>
                        <td>A78374725</td>
                        <td>MADRID</td>
                        <td>MADRID</td>
                        <td>21/12/2018</td>
                        <td>21/12/2018</td>
                      </tr>
                      <tr>
                        <th scope="row">
                          <div class="checkbox">
                            <label><input type="checkbox" value=""> REPSOL QUÍMICA S.A.</label>
                          </div>
                        </th>
                        <td>A78374725</td>
                        <td>MADRID</td>
                        <td>MADRID</td>
                        <td>21/12/2018</td>
                        <td>21/12/2018</td>
                      </tr>
                      <tr>
                        <th scope="row">
                          <div class="checkbox">
                            <label><input type="checkbox" value=""> REPSOL BUTANO S.A.</label>
                          </div>
                        </th>
                        <td>A78374725</td>
                        <td>MADRID</td>
                        <td>MADRID</td>
                        <td>21/12/2018</td>
                        <td>21/12/2018</td>
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
  import { required, between } from 'vuelidate/lib/validators'
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
        validos: [],
        invalidos: []
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
    validations() {
      return {
        from_social_reasons: {
          required,
          between: between(0, (this.to_social_reason)? this.to_social_reason: 9999999)
        },
        to_social_reason: {
          required,
          between: between((this.from_social_reasons)? this.from_social_reasons: 0, 9999999)
        }
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
    watch: {
      selected_social_reasons: function (newSelectedZipCodes) {
        this.selected_by_social_reasons = this.numberSelectedZipCodes(newSelectedZipCodes)
      }
    },
    methods: {
      validateZipCodes(){
        // this.loadingValidar = true  
        this.dataFrm.replace(/(?:\r\n|\r|\n)/g, ',')
        // let sin_salto =
        // this.$store.dispatch('search/validateZipCodes', sin_salto).then((response) => {
        //   this.social_reasons.validos = (response.validos)? response.validos: []
        //   this.social_reasons.invalidos = (response.invalidos)? response.invalidos: []
        //   this.selected_social_reasons = this.social_reasons.validos
        //   this.loadingValidar = false
        //   this.search_edit = false
        // }).catch(() => {
        //   this.loadingValidar = false
        //   this.social_reasons = { validos: [], invalidos: [] }
        //   this.this.selected_social_reasons = 0
        // })
      },
      apply () {
        if (this.selected_social_reasons && this.selected_social_reasons.length !== 0) {
          this.hideModal()
          this.loadingApply = true
          this.search_edit = false
          this.form.codigosPostales = this.selected_social_reasons.map((item) => {
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
        this.from_social_reasons = ''
        this.to_social_reason = ''
        this.social_reasons = { validos: [], invalidos: [] }
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
        this.social_reasons = { validos: [], invalidos: [] }
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
      handleChangeList (){ //province, event
      },
      validateRankSearchZipCodes () {//event
        this.$v.$touch()
        if (!this.$v.$invalid) {
          let from_social_reasons = parseInt(this.from_social_reasons, 10),
            to_social_reason = parseInt(this.to_social_reason, 10),
            ranks = [];
          let zero_on_left = (this.from_social_reasons.charAt(0) === '0' || this.to_social_reason.charAt(0) === '0')? true: false
          for (var i = from_social_reasons; i <= to_social_reason; i++) {
            ranks.push(`${(zero_on_left)?'0':''}${i}`)
          }
          let sin_salto = ranks.join(',')
          this.dataFrm = sin_salto
          this.loadingValidar = true
          this.$store.dispatch('search/validateZipCodes', sin_salto).then((response) => {
            this.social_reasons.validos = (response.validos)? response.validos: []
            this.social_reasons.invalidos = (response.invalidos)? response.invalidos: []
            this.selected_social_reasons = this.social_reasons.validos
            this.loadingValidar = false
            this.search_edit = false
          }).catch(() => {
            this.loadingValidar = false
            this.social_reasons = { validos: [], invalidos: [] }
            this.this.selected_social_reasons = 0
          })

        }
      },
      uploadFileZipCodes (file) {
        if (file) {
          this.loadingFile = true
          this.$store.dispatch('search/validateZipCodesFile', file).then((response) => {
            this.social_reasons.validos = (response.validos)? response.validos: []
            this.social_reasons.invalidos = (response.invalidos)? response.invalidos: []
            this.selected_social_reasons = this.social_reasons.validos
            this.loadingFile = false
            this.search_edit = false
          }).catch(() => {
            this.loadingFile = false
            this.social_reasons = { validos: [], invalidos: [] }
            this.this.selected_social_reasons = 0
          })
        }
        return false
      },
      showModal () {
        this.modalVisible = true
        this.$v.$reset()
      },
      hideModal () {
        this.modalVisible = false
        this.$v.$reset()
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
