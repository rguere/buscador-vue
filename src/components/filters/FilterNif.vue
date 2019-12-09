<template>
  <div class="panel panel-default cd" id="filter_nif">
    <div class="panel-heading">
      <p class="panel-title roboto white">
        {{ title }}
        <span class="span-info-right" v-if="selected_by_list_nif !== 0"> ({{ selected_by_list_nif | numeral('0,0') }} seleccionadas)</span>
      </p>
    </div>
    <div class="panel-body">
      <div class="form-group" v-if="(list_nif && list_nif.validos.length === 0) || (search_edit)">
        <textarea v-model="dataFrm" id="list_nif" class="form-control"></textarea>
      </div>
      <div class="panel panel-default cd" v-if="list_nif && list_nif.validos.length !== 0 && !search_edit">
        <div class="panel-body">
          <button
            type="button"        
            v-if="list_nif && list_nif.validos.length !== 0 && !search_edit"
            class="btn btn-xs btn-info pull-right" @click="editSearch" 
            :disabled="dataFrm.length === 0 || loadingValidar">
              Editar búsqueda <i :class="(loadingValidar)?'fa  fa-spinner fa-spin':'fa  fa-edit'"></i>
          </button>
          <div v-for="(item, key) in list_nif.validos" :key="key">
              <label class="custon-checkboxs">
                  <input type="checkbox"
                    :name="`checkbox_${item.id}`"
                    v-model="selected_list_nif"
                    :id="`checkbox_${item.id}`"
                    :value="item">
                  <span class="geekmark"></span>
                  <span class="name-checkbox">{{ item.label }}</span>
                  <span class="num-fil">({{ item.data | numeral('0,0') }})</span>
              </label>
          </div>
        </div>
      </div>
      <div class="form-group" v-if="list_nif && list_nif.invalidos.length !== 0 && !search_edit">
        <p>NIF no encontrados</p>
        <span v-for="(item, key) in list_nif.invalidos" :key="key" class="label label-danger label-no-encontrados">{{ item }}</span>
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
              v-if="list_nif && list_nif.validos.length !== 0 && !search_edit"
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
          <button
            type="button"
            v-if="list_nif && list_nif.validos.length === 0 || search_edit" 
            class="btn btn-info" @click="validateNif" 
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
                  v-if="list_nif && list_nif.validos.length !== 0 && !search_edit"
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
          <div class="conten-flex-70-30">
            <div>
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
                        <el-upload
                          :disabled="loadingFile"
                          action=""
                          accept=".txt, .xls, .csv"
                          :show-file-list="false"
                          :before-upload="uploadFileZipCodes">
                          <button 
                            class="btn btn-success"
                            :disabled="loadingFile">
                            <i :class="(loadingFile)?'fa fa-spinner fa-spin': 'fa fa-paperclip'"></i>
                            {{(loadingFile)? 'Cargando archivo ' : 'Adjuntar Archivo (.txt, .xls, .csv)'}}
                          </button>
                        </el-upload>
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
                        Introduce o pega un máximo de 1.000 NIF. En caso de querer incluir una mayor cantidad, adjunte un archivo con un máximo de 1.000.000 de NIF clicando en “Adjuntar Archivo”
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="panel panel-default cd">
                <div class="panel-heading">
                  <p class="panel-title roboto white">
                    Introduce el rango de NIF y clica en “BUSCAR”
                  </p>
                </div>
                <div class="panel-body">
                  <div class="row text-center">
                    <div class="col-md-4">
                      <div class="form-group" :class="{ 'has-error has-feedback': $v.from_listNIF.$error }">
                        <label class="control-label" for="from_listNIF">Del NIF:</label>
                        <input type="text"
                          v-model.trim="$v.from_listNIF.$model"
                          required
                          class="form-control"
                          name="from_listNIF"
                          id="from_listNIF">
                      </div>
                      <!-- <div class="error" v-if="!$v.from_listNIF.required">el campo es requerido</div> -->
                    </div>
                    <div class="col-md-4">
                      <div class="form-group" :class="{ 'has-error has-feedback': $v.to_listNIF.$error }">
                        <label class="control-label" for="to_listNIF">Al NIF:</label>
                        <input type="text"
                          v-model.trim="$v.to_listNIF.$model"
                          required
                          class="form-control"
                          name="to_listNIF"
                          id="to_listNIF">
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
                  <ul class="ul_selected_provinces_localidad"  id="ul_selected_provinces_localidad">
                    <li v-for="(item, key) in list_nif.validos" :key="key">
                      <label class="custon-checkboxs">
                        <input type="checkbox"
                          :name="`checkbox_list_${item.id}`"
                          v-model="selected_list_nif"
                          @change="handleChangeList(item, $event)"
                          :id="`checkbox_list_${item.id}`"
                          :value="item">
                        <span class="geekmark"></span>
                        <span class="name-checkbox">{{ item.label }}</span>
                        <span class="num-fil">
                          ({{ item.data | numeral('0,0') }})
                        </span>
                      </label>
                    </li>
                  </ul>
                  <div class="form-group" v-if="list_nif && list_nif.invalidos.length !== 0 && !search_edit">
                    <p>NIF no encontrados</p>
                    <span v-for="(item, key) in list_nif.invalidos" :key="key" class="label label-danger label-no-encontrados">{{ item }}</span>
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
  import { required, between } from 'vuelidate/lib/validators'
  import swal from 'sweetalert2'
  export default {
    name: 'filter-nif',
    computed: mapGetters({
      search: 'search/search',
      loading: 'search/loading',
      form: 'filters/form',
      selected_companies: 'filters/selected_companies',
      applied_filters: 'filters/applied_filters',
    }),
    data: () => ({
      title: 'NIF',
      loadingValidar: false,
      search_edit: true,
      dataFrm: '',
      list_nif: {
        validos: [],
        invalidos: []
      },
      selected_list_nif: [],
      selected_by_list_nif: 0,
      areApplied: false,
      loadingApply: false,
      modalVisible: false,
      from_listNIF: '',
      to_listNIF: '',
      loadingFile: false,
      file: {},
    }),
    validations() {
      return {
        from_listNIF: {
          required,
          between: between(0, (this.to_listNIF)? this.to_listNIF: 9999999)
        },
        to_listNIF: {
          required,
          between: between((this.from_listNIF)? this.from_listNIF: 0, 9999999)
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
      selected_list_nif: function (newSelectedZipCodes) {
        this.selected_by_list_nif = this.numberSelectedNif(newSelectedZipCodes)
      }
    },
    methods: {
      validateNif(){
        this.loadingValidar = true  
        let sin_salto = this.dataFrm.replace(/(?:\r\n|\r|\n)/g, ',')
        this.$store.dispatch('search/validateNif', sin_salto).then((response) => {
          this.list_nif.validos = (response.validos)? response.validos: []
          this.list_nif.invalidos = (response.invalidos)? response.invalidos: []
          this.selected_list_nif = this.list_nif.validos
          this.loadingValidar = false
          this.search_edit = false
        }).catch(() => {
          this.loadingValidar = false
          this.list_nif = { validos: [], invalidos: [] }
          this.this.selected_list_nif = 0
        })
      },
      apply () {
        if (this.selected_list_nif && this.selected_list_nif.length !== 0) {
          this.hideModal()
          this.loadingApply = true
          this.search_edit = false
          this.form.listNIF = this.selected_list_nif.map((item) => {
            return item.id
          })
          this.$store.dispatch('search/filtrar', this.form).then((response) => {
            this.$store.dispatch('filters/addFilters', {
              name: this.title,
              quantity: this.selected_by_list_nif
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
        this.form.listNIF = []
        this.dataFrm = ''
        this.from_listNIF = ''
        this.to_listNIF = ''
        this.list_nif = { validos: [], invalidos: [] }
        if (this.applied_filters.length > 1) {
          this.$store.dispatch('search/filtrar', this.form).then((response) => {
            this.updateNumberSelectedCompanies(response.cantidad)
          })
        }else {
          let resta = (this.selected_list_nif.length === 0)? 0 : this.selected_companies - this.selected_by_list_nif
          this.updateNumberSelectedCompanies((resta < 0)? 0: resta)
        }
        this.selected_by_list_nif = 0
        this.$store.dispatch('filters/removeFilters', this.title)
        this.areApplied = false
        this.search_edit = true
      },
      emptyFilter () {
        this.form.listNIF = []
        this.list_nif = { validos: [], invalidos: [] }
        this.updateNumberSelectedCompanies(0)
        this.selected_by_list_nif = 0
        this.$store.dispatch('filters/removeFilters', this.title)
        this.areApplied = false
        this.search_edit = true
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
      handleChangeList (){ //province, event
      },
      validateRankSearchZipCodes () {//event
        this.$v.$touch()
        if (!this.$v.$invalid) {
          let from_listNIF = parseInt(this.from_listNIF, 10),
            to_listNIF = parseInt(this.to_listNIF, 10),
            ranks = [];
          let zero_on_left = (this.from_listNIF.charAt(0) === '0' || this.to_listNIF.charAt(0) === '0')? true: false
          for (var i = from_listNIF; i <= to_listNIF; i++) {
            ranks.push(`${(zero_on_left)?'0':''}${i}`)
          }
          let sin_salto = ranks.join(',')
          this.dataFrm = sin_salto
          this.loadingValidar = true
          this.$store.dispatch('search/validateNif', sin_salto).then((response) => {
            this.list_nif.validos = (response.validos)? response.validos: []
            this.list_nif.invalidos = (response.invalidos)? response.invalidos: []
            this.selected_list_nif = this.list_nif.validos
            this.loadingValidar = false
            this.search_edit = false
          }).catch(() => {
            this.loadingValidar = false
            this.list_nif = { validos: [], invalidos: [] }
            this.this.selected_list_nif = 0
          })

        }
      },
      uploadFileZipCodes (file) {
        if (file) {
          this.loadingFile = true
          this.$store.dispatch('search/validateNifFile', file).then((response) => {
            this.list_nif.validos = (response.validos)? response.validos: []
            this.list_nif.invalidos = (response.invalidos)? response.invalidos: []
            this.selected_list_nif = this.list_nif.validos
            this.loadingFile = false
            this.search_edit = false
          }).catch(() => {
            this.loadingFile = false
            this.list_nif = { validos: [], invalidos: [] }
            this.this.selected_list_nif = 0
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

.label-danger, .m-r-2 { margin-right: 2px; }
.label-no-encontrados {  display: inline-block!important; }

.attach-file > div {
  margin-right: 5px;
}

.attach-file {
  display: flex; justify-content: flex-end; align-items: flex-start; margin-bottom: 10px;
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
