<template>
  <div class="panel panel-default cd" id="filter_codigo_postal">
    <div class="panel-heading">
      <p class="panel-title roboto white">
        {{ title }}
        <span class="span-info-right" v-if="selected_by_zip_codes !== 0"> ({{ selected_by_zip_codes | numeral('0,0') }} empresas seleccionadas)</span>
      </p>
    </div>
    <div class="panel-body">
      <div class="form-group" v-if="(zip_codes && zip_codes.validos.length === 0) || (search_edit)">
        <textarea v-model="dataFrm" id="zip_codes" class="form-control"></textarea>
      </div>
      <div class="panel panel-default cd" v-if="zip_codes && zip_codes.validos.length !== 0 && !search_edit">
        <div class="panel-body">
          <div class="div-scroll-200">
            <button
              type="button"        
              v-if="zip_codes && zip_codes.validos.length !== 0 && !search_edit && dataFrm.length !== 0"
              class="btn btn-xs btn-info pull-right" @click="editSearch" 
              :disabled="dataFrm.length === 0 || loadingValidar">
                Editar búsqueda <i :class="(loadingValidar)?'fa  fa-spinner fa-spin':'fa  fa-edit'"></i>
            </button>
            <button
              type="button"        
              v-if="zip_codes && zip_codes.validos.length !== 0 && !search_edit && dataFrm.length === 0"
              class="btn btn-xs btn-danger pull-right" @click="cleanFile">
                Limpiar búsqueda <i :class="(loadingValidar)?'fa  fa-spinner fa-spin':'fa  fa-undo'"></i>
            </button>
            <div v-for="(item, key) in zip_codes.validos" :key="key">
              <label class="custon-checkboxs">
                  <input type="checkbox"
                    :name="`checkbox_${item.id}`"
                    v-model="selected_zip_codes"
                    @change="handleChange(item, $event)"
                    :id="`checkbox_${item.id}`"
                    :value="item">
                  <span class="geekmark"></span>
                  <span class="name-checkbox">{{ item.label }}</span>
                  <span class="num-fil"> ({{ item.data | numeral('0,0') }})</span>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="form-group" style="overflow-y: scroll; max-height: 130px;" v-if="zip_codes && zip_codes.invalidos.length !== 0 && !search_edit">
        <p>Códigos no encontrados</p>
        <span v-for="(item, key) in zip_codes.invalidos.slice(0, limitCodeInvalidos)" :key="key" class="label label-danger label-no-encontrados">{{ item }}</span>
        <a href="" v-on:click.stop.prevent="showAllInvalidos" v-if="zip_codes.invalidos.length >= limitCodeInvalidos" class="btn" style="display: block;">{{ (zip_codes.invalidos.length == limitCodeInvalidos) ? 'Ver menos' : `Ver todos (${zip_codes.invalidos.length})` }} </a>
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
              v-if="zip_codes && zip_codes.validos.length !== 0 && !search_edit && !compareWithNewtoApply"
              :disabled="selected_zip_codes.length === 0 || loadingApply"
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
            v-if="zip_codes && zip_codes.validos.length === 0 || search_edit" 
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
                  v-if="zip_codes && zip_codes.validos.length !== 0 && !search_edit"
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
                @click="confirmClean">
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
                      <div class="attach-file">
                        <button type="button" class="btn btn-success m-r-5" @click="innerVisible = true" :disabled="loadingFile">
                          <i :class="(loadingFile)?'fa fa-spinner fa-spin': 'fa fa-paperclip'"></i>
                          Adjuntar Archivo
                        </button>
                        <el-dialog
                          width="55%"
                          :visible.sync="innerVisible"
                          append-to-body>
                          <div>
                            <el-alert
                              title="*NOTA"
                              type="info"
                              :closable="false"
                              description="El formato debe ser un archivo Excel en el que todos los códigos postales se encuentren en la primera columna; o un archivo CSV o TXT en el que todos los códigos postales se encuentren separados por coma."
                              show-icon>
                            </el-alert>
                            <div class="btn-upload-right">
                              <el-upload
                                :disabled="loadingFile"
                                action=""
                                accept=".txt, .xls, .csv"
                                :show-file-list="false"
                                :before-upload="uploadFileZipCodes">
                                <button 
                                  class="btn btn-primary"
                                  :disabled="loadingFile">
                                  <i :class="(loadingFile)?'fa fa-spinner fa-spin': 'fa fa-check'"></i>
                                  {{(loadingFile)? 'Cargando archivo ' : 'Aceptar'}}
                                </button>
                              </el-upload>
                            </div>
                          </div>
                        </el-dialog>

                        <button
                          type="button" 
                          class="btn btn-info"
                          @click="validateZipCodes" 
                          :disabled="dataFrm.length === 0 || loadingValidar">
                            BUSCAR <i :class="(loadingValidar)?'fa  fa-spinner fa-spin':'fa  fa-search'"></i>
                        </button>
                      </div>
                      <div style="">
                        <div class="form-group">
                          <textarea v-model="dataFrm" class="form-control"></textarea>
                        </div>
                      </div>
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
                      <div class="form-group" :class="{ 'has-error has-feedback': $v.from_zip_code.$error }">
                        <label class="control-label" for="from_zip_code">Del código postal:</label>
                        <input type="text"
                          v-model.trim="$v.from_zip_code.$model"
                          required
                          class="form-control"
                          name="from_zip_code"
                          id="from_zip_code">
                      </div>
                      <!-- <div class="error" v-if="!$v.from_zip_code.required">el campo es requerido</div> -->
                    </div>
                    <div class="col-md-4">
                      <div class="form-group" :class="{ 'has-error has-feedback': $v.to_zip_code.$error }">
                        <label class="control-label" for="to_zip_code">Al código postal:</label>
                        <input type="text"
                          v-model.trim="$v.to_zip_code.$model"
                          required
                          class="form-control"
                          name="to_zip_code"
                          id="to_zip_code">
                      </div>
                    </div>
                    <div class="col-md-4">
                      <button
                        type="button"
                        class="btn btn-info pull-right"
                        :disabled="$v.$invalid || loadingValidar"
                        @click="validateRankSearchZipCodes">
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
                  <div class="div-scroll-200">
                    <button
                      type="button"        
                      v-if="zip_codes && zip_codes.validos.length !== 0 && !search_edit && dataFrm.length === 0"
                      class="btn btn-xs btn-danger pull-right" @click="cleanFile">
                        Limpiar búsqueda <i :class="(loadingValidar)?'fa  fa-spinner fa-spin':'fa  fa-undo'"></i>
                    </button>
                    <ul class="ul_selected_provinces_localidad"  id="ul_selected_provinces_localidad">
                      <li v-for="(item, key) in zip_codes.validos" :key="key">
                        <label class="custon-checkboxs">
                          <input type="checkbox"
                            :name="`checkbox_list_${item.id}`"
                            v-model="selected_zip_codes"
                            @change="handleChangeList(item, $event)"
                            :id="`checkbox_list_${item.id}`"
                            :value="item">
                          <span class="geekmark"></span>
                          <span class="name-checkbox">{{ item.label }}</span>
                          <span class="num-fil"> ({{ item.data | numeral('0,0') }})</span>
                        </label>
                      </li>
                    </ul>
                  </div>
                  <div class="form-group" style="overflow-y: scroll; max-height: 130px;" v-if="zip_codes && zip_codes.invalidos.length !== 0 && !search_edit">
                    <p>Códigos no encontrados</p>
                    <span v-for="(item, key) in zip_codes.invalidos.slice(0, limitCodeInvalidos)" :key="key" class="label label-danger label-no-encontrados">{{ item }}</span>
                    <a href="" v-on:click.stop.prevent="showAllInvalidos" v-if="zip_codes.invalidos.length >= limitCodeInvalidos" class="btn" style="display: block;">{{ (zip_codes.invalidos.length == limitCodeInvalidos) ? 'Ver menos' : `Ver todos (${zip_codes.invalidos.length})` }} </a>
                    <hr>
                  </div>
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
  import { required, maxLength } from 'vuelidate/lib/validators'
  import { spacesByDashes, beforeOrderFilters } from './../../utils'
  import { persistentData } from './../../mixins/persistent-data'
  import swal from 'sweetalert2'
  export default {
    name: 'filter-codigo-postal',
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
        let stg = this.selected_zip_codes_string
        let obj = JSON.stringify(this.selected_zip_codes)
        return (stg === obj)
      }
    },
    data: () => ({
      title: 'Código Postal',
      loadingValidar: false,
      search_edit: true,
      dataFrm: '',
      zip_codes: {
        validos: [],
        invalidos: []
      },
      selected_zip_codes_string: '',
      selected_zip_codes: [],
      selected_by_zip_codes: 0,
      areApplied: false,
      reapply: false,
      loadingApply: false,
      modalVisible: false,
      from_zip_code: '',
      to_zip_code: '',
      loadingFile: false,
      innerVisible: false,
      limitCodeInvalidos: 8,
      file: {},
    }),
    validations() {
      return {
        from_zip_code: {
          required,
          maxLength: maxLength(5)
        },
        to_zip_code: {
          required,
          maxLength: maxLength(5)
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
      selected_zip_codes: function (newSelectedZipCodes) {
        this.selected_by_zip_codes = this.numberSelectedZipCodes(newSelectedZipCodes)
        if (this.reapply && newSelectedZipCodes.length === 0) {
          this.clean()
        }
      }
    },
    methods: {
      deleteInvalid (validos) {
        this.dataFrm = ''
        validos.map((item) => {
          this.dataFrm += `${item.id}\n`
        })
      },
      validateZipCodes(){
        this.loadingValidar = true  
        let sin_salto = spacesByDashes(this.dataFrm)
        this.$store.dispatch('search/validateZipCodes', sin_salto).then((response) => {
          this.zip_codes.validos = (response.validos)? response.validos: []
          this.zip_codes.invalidos = (response.invalidos)? response.invalidos: []
          this.selected_zip_codes = this.zip_codes.validos
          this.loadingValidar = false
          this.search_edit = false
          this.deleteInvalid(this.zip_codes.validos)
        }).catch(() => {
          this.loadingValidar = false
          this.zip_codes = { validos: [], invalidos: [] }
          this.selected_zip_codes = []
        })
      },
      apply () {
        if (this.selected_zip_codes && this.selected_zip_codes.length !== 0) {
          this.hideModal()
          this.loadingApply = true
          this.search_edit = false
          this.form.codigosPostales = this.selected_zip_codes.map((item) => {
            return item.id
          })
          let beforeForm = beforeOrderFilters(this.filters, this.applied_filters, this.form, this.title)
          this.$store.dispatch('search/filtrar', beforeForm).then((response) => {
            this.$store.dispatch('filters/addFilters', {
              name: this.title,
              quantity: this.selected_by_zip_codes,
              cantidades: response
            })
            this.updateNumberSelectedCompanies(response.cantidad)
            this.areApplied = true
            this.reapply = false
            this.loadingApply = false
            this.selected_zip_codes_string = JSON.stringify(this.selected_zip_codes)
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
        this.selected_zip_codes = []
        this.selected_zip_codes_string = ''
        this.dataFrm = ''
        this.from_zip_code = ''
        this.to_zip_code = ''
        this.zip_codes = { validos: [], invalidos: [] }
        if (this.applied_filters.length > 1) {
          let beforeForm = beforeOrderFilters(this.filters, this.applied_filters, this.form, this.title)
          this.$store.dispatch('search/filtrar', beforeForm).then((response) => {
            this.updateNumberSelectedCompanies(response.cantidad)
          })
        }else {
          this.updateNumberSelectedCompanies(0)
        }
        this.selected_by_zip_codes = 0
        this.$store.dispatch('filters/removeFilters', this.title)
        this.areApplied = false
        this.reapply = false
        this.search_edit = true
      },
      emptyFilter () {
        this.form.codigosPostales = []
        this.selected_zip_codes = []
        this.selected_zip_codes_string = ''
        this.zip_codes = { validos: [], invalidos: [] }
        this.updateNumberSelectedCompanies(0)
        this.selected_by_zip_codes = 0
        this.$store.dispatch('filters/removeFilters', this.title)
        this.areApplied = false
        this.reapply = false
        this.search_edit = true
      },
      cleanFile() {
        this.form.codigosPostales = []
        this.zip_codes = { validos: [], invalidos: [] }
        this.selected_by_zip_codes = 0
        this.areApplied = false
        this.reapply = false
        this.search_edit = true
      },
      editSearch () {
        this.search_edit = true
        setTimeout(() => { document.getElementById('zip_codes').focus() }, 100)
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
      handleChange () { //province, event
        this.reapply = (this.areApplied)? true: this.areApplied
      },
      handleChangeList (){ //province, event
      },
      validateRankSearchZipCodes () {//event
        this.$v.$touch()
        if (!this.$v.$invalid) {
          let from_zip_code = parseInt(this.from_zip_code, 10),
            to_zip_code = parseInt(this.to_zip_code, 10),
            ranks = [],
            mayor = 0, menor = 0;
          if(from_zip_code > to_zip_code){
            mayor = from_zip_code
            menor = to_zip_code
          }else {
            mayor = to_zip_code
            menor = from_zip_code
          }
          let zero_on_left = (this.from_zip_code.charAt(0) === '0' || this.to_zip_code.charAt(0) === '0')? true: false
          for (var i = menor; i <= mayor; i++) {
            ranks.push(`${(zero_on_left)?'0':''}${i}`)
          }
          let sin_salto = ranks.join(',')
          this.dataFrm = sin_salto
          this.loadingValidar = true
          this.$store.dispatch('search/validateZipCodes', sin_salto).then((response) => {
            this.zip_codes.validos = (response.validos)? response.validos: []
            this.zip_codes.invalidos = (response.invalidos)? response.invalidos: []
            this.selected_zip_codes = this.zip_codes.validos
            this.loadingValidar = false
            this.search_edit = false
            this.deleteInvalid(this.zip_codes.validos)
          }).catch(() => {
            this.loadingValidar = false
            this.zip_codes = { validos: [], invalidos: [] }
            this.this.selected_zip_codes = []
          })

        }
      },
      uploadFileZipCodes (file) {
        if (file) {
          this.loadingFile = true
          this.innerVisible = false
          this.$store.dispatch('search/validateZipCodesFile', file).then((response) => {
            this.zip_codes.validos = (response.validos)? response.validos: []
            this.zip_codes.invalidos = (response.invalidos)? response.invalidos: []
            this.selected_zip_codes = this.zip_codes.validos
            this.dataFrm = ''
            this.loadingFile = false
            this.search_edit = false
          }).catch(() => {
            this.loadingFile = false
            this.zip_codes = { validos: [], invalidos: [] }
            this.this.selected_zip_codes = []
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
      showAllInvalidos () {
        if (this.limitCodeInvalidos === 8){
          this.limitCodeInvalidos = this.zip_codes.invalidos.length
        }else {
          this.limitCodeInvalidos = 8
        }
        
      }
    }
  }
</script>

<style lang="scss" scoped>
@import './../../sass/filters/filters';

.label-danger, .m-r-2 { margin-right: 2px; }
.label-no-encontrados {  display: inline-block!important; }

.attach-file > div {
  margin-right: 5px;
}

.attach-file {
  display: flex; justify-content: flex-end; align-items: flex-start; margin-bottom: 10px;
}

.btn-upload-right {
  display: flex;
  margin-top: 10px;
  justify-content: flex-end;
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
