<template>
  <div class="panel panel-default cd" id="filter_nif">
    <div class="panel-heading">
      <p class="panel-title roboto white">
        {{ title }}
        <span class="span-info-right" v-if="selected_by_list_nif !== 0"> ({{ selected_by_list_nif | numeral('0,0') }} empresas seleccionadas)</span>
      </p>
    </div>
    <div class="panel-body">
      <div class="form-group">
        <textarea v-model="dataFrm" id="list_nif" class="form-control"></textarea>
      </div>
      <div class="flex-space-between-flex-end">
        <div></div>
        <div>
          <button
            type="button"
            class="btn btn-info" @click="validateNif" 
            :disabled="dataFrm.length === 0 || loadingValidar">
              BUSCAR <i :class="(loadingValidar)?'fa  fa-spinner fa-spin':'fa  fa-search'"></i>
          </button>
        </div>
      </div>
      <br>
      <div class="panel panel-default cd" v-if="list_nif && list_nif.validos.length !== 0 && !search_edit">
        <div class="panel-body">
          <div class="div-scroll-200">
            <!-- <button
              type="button"        
              v-if="list_nif && list_nif.validos.length !== 0 && !search_edit && dataFrm.length !== 0"
              class="btn btn-xs btn-info pull-right" @click="editSearch" 
              :disabled="dataFrm.length === 0 || loadingValidar">
                Editar búsqueda <i :class="(loadingValidar)?'fa  fa-spinner fa-spin':'fa  fa-edit'"></i>
            </button>
            <button
              type="button"        
              v-if="list_nif && list_nif.validos.length !== 0 && !search_edit && dataFrm.length === 0"
              class="btn btn-xs btn-danger pull-right" @click="cleanFile">
                Limpiar búsqueda <i :class="(loadingValidar)?'fa  fa-spinner fa-spin':'fa  fa-undo'"></i>
            </button> -->
            <div v-for="(item, key) in list_nif.validos" :key="key">
              <label class="custon-checkboxs">
                  <input type="checkbox"
                    :name="`checkbox_${item.id}`"
                    v-model="selected_list_nif"
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
      <div class="form-group" style="overflow-y: scroll; max-height: 130px;" v-if="list_nif && list_nif.invalidos.length !== 0 && !search_edit">
        <p>NIF no encontrados</p>
        <span v-for="(item, key) in list_nif.invalidos.slice(0, limitNifInvalidos)" :key="key" class="label label-danger label-no-encontrados">{{ item }}</span>
        <a href="" v-on:click.stop.prevent="showAllInvalidos" v-if="list_nif.invalidos.length >= limitNifInvalidos" class="btn" style="display: block;">{{ (list_nif.invalidos.length == limitNifInvalidos) ? 'Ver menos' : `Ver todos (${list_nif.invalidos.length})` }} </a>
        <hr>
      </div>
      <div class="form-group">
        <p class="text-help">
          *Puede incluir uno o más NIF separados por coma o por salto de línea
        </p>
      </div>
      <div class="flex-space-between-flex-end">
        <div>
          <button class="btn btn-warning m-r-2" @click="showModal">
            Ver detalles <i class="fa fa-plus-circle"></i>
          </button>
          <button
              v-if="list_nif && list_nif.validos.length !== 0 && !search_edit && !compareWithNewtoApply"
              :disabled="selected_list_nif.length === 0 || loadingApply"
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
        </div>
      </div>
      <div class="row" v-if="selected_list_nif && selected_list_nif.length !== 0">
        <div class="col-md-12">
          <br/>
          <el-collapse v-model="collapseResumen">
            <el-collapse-item title="Resumen de NIF seleccionadas" name="1">
              <div class="div-scroll-200" id="selected_resumen_NIF1">
                <div v-for="(item, key) in selected_list_nif" :key="key">
                  <label class="custon-checkboxs">
                    <input type="checkbox"
                      :name="`checkbox____list___NIF${item.id}`"
                      v-model="selected_list_nif"
                      @change="handleChangeList(item, $event)"
                      :id="`checkbox____list___NIF${item.id}`"
                      :value="item">
                    <span class="geekmark"></span>
                    <span class="name-checkbox">{{ item.label }}</span>
                    <span class="num-fil"> ({{ item.data | numeral('0,0') }})</span>
                  </label>
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
                  v-if="list_nif && list_nif.validos.length !== 0 && !search_edit && !compareWithNewtoApply"
                  :disabled="selected_list_nif.length === 0 || loadingApply"
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
            <div class="col-md-8">
              <div class="panel panel-default cd">
                <div class="panel-heading">
                  <p class="panel-title roboto white">
                    Introduce uno o varios NIF, separados por coma o salto de línea, y clica en “BUSCAR”.
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
                              description="El formato debe ser un archivo Excel en el que todos los NIF se encuentren en la primera columna; o un archivo CSV o TXT en el que todos los NIF se encuentren separados por coma."
                              show-icon>
                            </el-alert>
                            <div class="btn-upload-right">
                              <el-upload
                                :disabled="loadingFile"
                                action=""
                                accept=".txt, .xls, .csv"
                                :show-file-list="false"
                                :before-upload="uploadFileNif">
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
                          @click="validateNif" 
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
                        Introduce o pega de los NIF que desees, también puedes adjuntar un archivo con NIF clicando en “Adjuntar Archivo”
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="panel panel-default cd">
                <div class="panel-heading">
                  <p class="panel-title roboto white">
                    NIF seleccionadas <span class="span-info-right">{{ list_nif.validos.length }}</span>
                  </p>
                </div>
              </div>
              <div class="panel panel-default">
                <div class="panel-heading">
                  <p class="panel-title roboto white">
                    Empresas seleccionadas <span class="span-info-right">{{ selected_by_list_nif | numeral('0,0') }}</span>
                  </p>
                </div>
                <div class="panel-body">
                  <div class="div-scroll-200">
                    <button
                      type="button"        
                      v-if="list_nif && list_nif.validos.length !== 0 && !search_edit && dataFrm.length === 0"
                      class="btn btn-xs btn-danger pull-right" @click="cleanFile">
                        Limpiar búsqueda <i :class="(loadingValidar)?'fa  fa-spinner fa-spin':'fa  fa-undo'"></i>
                    </button>
                    <ul class="ul_selected_provinces_localidad"  id="ul_selected_provinces_localidad">
                      <li v-for="(item, key) in list_nif.validos" :key="key">
                        <label class="custon-checkboxs">
                          <input type="checkbox"
                            :name="`checkbox_list_${item.id}`"
                            v-model="selected_list_nif"
                            @change="handleChange(item, $event)"
                            :id="`checkbox_list_${item.id}`"
                            :value="item">
                          <span class="geekmark"></span>
                          <span class="name-checkbox">{{ item.label }}</span>
                          <span class="num-fil"> ({{ item.data | numeral('0,0') }})</span>
                        </label>
                      </li>
                    </ul>
                  </div>
                  <div class="form-group" style="overflow-y: scroll; max-height: 130px;" v-if="list_nif && list_nif.invalidos.length !== 0 && !search_edit">
                    <p>NIF no encontrados</p>
                    <span v-for="(item, key) in list_nif.invalidos.slice(0, limitNifInvalidos)" :key="key" class="label label-danger label-no-encontrados">{{ item }}</span>
                    <a href="" v-on:click.stop.prevent="showAllInvalidos" v-if="list_nif.invalidos.length >= limitNifInvalidos" class="btn" style="display: block;">{{ (list_nif.invalidos.length == limitNifInvalidos) ? 'Ver menos' : `Ver todos (${list_nif.invalidos.length})` }} </a>
                    <hr>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-12" v-if="selected_list_nif && selected_list_nif.length !== 0">
              <div class="panel panel-default cd">
                <div class="panel-heading">
                  <p class="panel-title roboto white">
                    Resumen de códigos postales seleccionadas
                    <span class="span-info-right" v-if="selected_list_nif !== 0"> ({{ selected_list_nif | numeral('0,0') }} empresas seleccionadas)</span>
                  </p>
                </div>
                <div class="panel-body div-scroll-200" id="selected_resumen_NIF2">
                  <div v-for="(item, key) in selected_list_nif" :key="key">
                    <label class="custon-checkboxs">
                      <input type="checkbox"
                        :name="`checkbox___list__${item.id}`"
                        v-model="selected_list_nif"
                        @change="handleChangeList(item, $event)"
                        :id="`checkbox___list__${item.id}`"
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
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { spacesByDashes, beforeOrderFilters } from './../../utils'
  import swal from 'sweetalert2'
  import { persistentData } from './../../mixins/persistent-data'
  export default {
    name: 'filter-nif',
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
        let stg = this.selected_list_nif_string
        let obj = JSON.stringify(this.selected_list_nif)
        return (stg === obj)
      }
    },
    data: () => ({
      title: 'NIF',
      loadingValidar: false,
      search_edit: true,
      dataFrm: '',
      list_nif: {
        validos: [],
        invalidos: []
      },
      selected_list_nif_string: '',
      selected_list_nif: [],
      selected_by_list_nif: 0,
      areApplied: false,
      reapply: false,
      loadingApply: false,
      modalVisible: false,
      loadingFile: false,
      innerVisible: false,
      file: {},
      limitNifInvalidos: 8,
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
      selected_list_nif: function (newSelectedZipCodes) {
        this.selected_by_list_nif = this.numberSelectedNif(newSelectedZipCodes)
        if (this.reapply && newSelectedZipCodes.length === 0) {
          this.clean()
        }
      }
    },
    methods: {
      validateNif(){
        this.loadingValidar = true  
        let sin_salto = spacesByDashes(this.dataFrm)
        this.$store.dispatch('search/validateNif', sin_salto.toUpperCase()).then((response) => {
          this.list_nif.validos = (response.validos)? response.validos: []
          this.list_nif.invalidos = (response.invalidos)? response.invalidos: []
          //this.selected_list_nif = this.list_nif.validos
          this.loadingValidar = false
          this.search_edit = false
          this.dataFrm = ''
        }).catch(() => {
          this.loadingValidar = false
          this.list_nif = { validos: [], invalidos: [] }
          this.selected_list_nif = []
        })
      },
      apply () {
        if (this.selected_list_nif && this.selected_list_nif.length !== 0) {
          this.hideModal()
          this.loadingApply = true
          this.search_edit = false
          this.form.cif = this.selected_list_nif.map((item) => {
            return item.id
          })
          let beforeForm = beforeOrderFilters(this.filters, this.applied_filters, this.form, this.title)
          this.$store.dispatch('search/filtrar', beforeForm).then((response) => {
            this.$store.dispatch('filters/addFilters', {
              name: this.title,
              quantity: this.selected_by_list_nif,
              cantidades: response
            })
            this.updateNumberSelectedCompanies(response.cantidad)
            this.areApplied = true
            this.reapply = false
            this.loadingApply = false
            this.dataFrm = ''
            this.selected_list_nif_string = JSON.stringify(this.selected_list_nif)
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
        this.form.cif = []
        this.dataFrm = ''
        this.selected_list_nif = []
        this.selected_list_nif_string = ''
        this.list_nif = { validos: [], invalidos: [] }
        if (this.applied_filters.length > 1) {
          let beforeForm = beforeOrderFilters(this.filters, this.applied_filters, this.form, this.title)
          this.$store.dispatch('search/filtrar', beforeForm).then((response) => {
            this.updateNumberSelectedCompanies(response.cantidad)
            this.$store.dispatch('filters/setCantidades', { cantidades: response })
          })
        }else {
          this.updateNumberSelectedCompanies(0)
        }
        this.selected_by_list_nif = 0
        this.$store.dispatch('filters/removeFilters', this.title)
        this.areApplied = false
        this.reapply = false
        this.search_edit = true
      },
      cleanFile() {
        this.form.cif = []
        this.selected_list_nif = []
        this.selected_list_nif_string = ''
        this.list_nif = { validos: [], invalidos: [] }
        this.selected_by_list_nif = 0
        this.areApplied = false
        this.reapply = false
        this.search_edit = true
        this.dataFrm = ''
      },
      emptyFilter () {
        this.form.cif = []
        this.selected_list_nif = []
        this.selected_list_nif_string = ''
        this.list_nif = { validos: [], invalidos: [] }
        this.updateNumberSelectedCompanies(0)
        this.selected_by_list_nif = 0
        this.$store.dispatch('filters/removeFilters', this.title)
        this.areApplied = false
        this.reapply = false
        this.search_edit = true
        this.dataFrm = ''
      },
      editSearch () {
        this.search_edit = true
        setTimeout(() => { document.getElementById('list_nif').focus() }, 100)
      },
      numberSelectedNif(newSelectedZipCodes) {
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
      handleChangeList (elemet, event){
        event.preventDefault()
        this.reapply = (this.areApplied)? true: this.areApplied
        let checkboxs = document.querySelectorAll('#selected_resumen_NIF1 input[type="checkbox"], #selected_resumen_NIF2 input[type="checkbox"]')
        checkboxs.forEach((item) => {
          item.checked = true
        })
      },
      uploadFileNif (file) {
        if (file) {
          this.loadingFile = true
          this.innerVisible = false
          this.$store.dispatch('search/validateNifFile', file).then((response) => {
            this.list_nif.validos = (response.validos)? response.validos: []
            this.list_nif.invalidos = (response.invalidos)? response.invalidos: []
            //this.selected_list_nif = this.list_nif.validos
            this.dataFrm = ''
            this.loadingFile = false
            this.search_edit = false
          }).catch(() => {
            this.loadingFile = false
            this.list_nif = { validos: [], invalidos: [] }
            this.selected_list_nif = []
          })
        }
        return false
      },
      showModal () {
        this.modalVisible = true
      },
      hideModal () {
        this.modalVisible = false
      },
      showAllInvalidos () {
        if (this.limitNifInvalidos === 8){
          this.limitNifInvalidos = this.list_nif.invalidos.length
        }else {
          this.limitNifInvalidos = 8
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
