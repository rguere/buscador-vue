<template>
  <div class="panel panel-default cd" id="filter_ubicacion">
    <div class="panel-heading">
      <p class="panel-title roboto white">
        {{ title }}
        <span class="span-info-right" v-if="selected_by_location !== 0"> ({{ selected_by_location | numeral('0,0') }} seleccionadas)</span>
      </p>
    </div>
    <div class="panel-body">
      <div v-if="search.provincia_localidad && search.provincia_localidad.length != 0">
        <div class="grid-3-columns-1fr" v-if="!areApplied || !(form.Provincias && form.Provincias.length !== 0) || (form.Localidades && form.Localidades.length !== 0)">
          <div v-for="(item, key) in search.provincia_localidad" :key="key">
            <label class="custon-checkboxs">
              <input type="checkbox"
                :name="`checkbox_${item.id}`"
                v-model="selected_provinces_localidad"
                @change="handleChange(item, $event)"
                :id="`checkbox_${item.id}`"
                :value="item">
              <span class="geekmark"></span>
              <span class="name-checkbox">{{ item.label }}</span>
              <span class="num-fil">({{ item.data | numeral('0,0') }})</span>
            </label>
          </div>
        </div>
        <div class="selected_children" v-if="areApplied && (form.Provincias && form.Provincias.length !== 0) || (form.Localidades && form.Localidades.length !== 0)">
          <ul class="grid-4-columns-1fr">
            <li v-for="(item, key) in selected_children" :key="key">
              <span class="name-checkbox">- {{ formatearLabel(item) }} </span>
              <span class="num-fil">({{ item.data | numeral('0,0') }})</span>
            </li>
          </ul>
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
              v-if="(selected_provinces_localidad.length !== 0 && !areApplied) || (selected_provinces_localidad.length !== 0 && reapply)"
              @click="apply">
                Aplicar <i :class="(loadingFrm)?'fa  fa-spinner fa-spin':'fa  fa-send'"></i>
            </button>
            <button type="button" class="btn btn-info" v-if="areApplied" @click="confirmClean">Limpiar <i class="fa fa-undo"></i></button>
          </div>
          <p class="text-help">* Puede elegir más de una opción</p>
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
                <button type="button" class="btn btn-success" v-if="selected_provinces_localidad.length !== 0" @click="apply">Aplicar <i :class="(loadingFrm)?'fa  fa-spinner fa-spin':'fa  fa-send'"></i></button>
                <button type="button" class="btn btn-info" v-if="areApplied" @click="confirmClean">Limpiar <i class="fa fa-undo"></i></button>
              </div>
            </div>
            <div class="conten-flex-70-30" v-if="search.provincia_localidad && search.provincia_localidad.length != 0">
              <div>
                <div class="panel panel-default cd" style="border-color: transparent;">
                  <div class="panel-heading">
                    <p class="panel-title roboto white">
                      CCAA, Provincia o Localidad encontradas en base a el (los) nombre(s) introducido(s).
                    </p>
                  </div>
                  <div style="height: 400px;">
                    <label class="control-label" for="options">Selecciona la comunidad, provincia o localidad </label>
                    <treeselect
                      valueFormat="object"
                      name="options"
                      id="options"
                      :multiple="true"
                      :options="options"
                      :always-open="true"
                      :default-expand-level="1"
                      :load-options="fetchSearch"
                      :limit="0"
                      :limitText="t => ''"
                      :disableFuzzyMatching="true"
                      @input="inputTreeselect"
                      @select="selectTreeselect"
                      @deselect="deselectTreeselect"
                      placeholder="Seleccionar"
                      search-nested
                      v-model="selected_provinces_localidad"
                      >
                      <label slot="option-label" slot-scope="{ node, shouldShowCount, count, labelClassName, countClassName }" :class="labelClassName">
                        {{ node.label }} <span class="num-fil" v-if="node.raw.id != 'all'">({{ node.raw.data | numeral('0,0') }})</span>
                        <span v-if="shouldShowCount" :class="countClassName">({{ count }})</span>
                      </label>
                    </treeselect>
                  </div>
                </div>
              </div>
              <div>
                <div class="panel panel-default cd">
                  <div class="panel-heading">
                    <p class="panel-title roboto white">
                      Ubicaciones seleccionadas <span class="span-info-right">{{ selected_provinces_localidad.length }}</span>
                    </p>
                  </div>
                </div>
                <div class="panel panel-default">
                  <div class="panel-heading">
                    <p class="panel-title roboto white">
                      Empresas seleccionadas <span class="span-info-right">{{ selected_by_location | numeral('0,0') }}</span>
                    </p>
                  </div>
                  <div class="panel-body">
                    <ul class="ul_selected_provinces_localidad" id="ul_selected_provinces_localidad">
                      <li v-for="(item, key) in selected_provinces_localidad" :key="key">
                        <label class="custon-checkboxs">
                          <input type="checkbox"
                            :name="`checkbox_list_${item.id}`"
                            v-model="selected_provinces_localidad"
                            @change="handleChangeList(item, $event)"
                            :id="`checkbox_list_${item.id}`"
                            :value="item">
                          <span class="geekmark"></span>
                          <span class="name-checkbox">{{ item.label }}</span>
                          <span class="num-fil" v-if="item.id != 'all'">({{ item.data | numeral('0,0') }})</span>
                        </label> 
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-dialog>
      </div>
      <div v-if="search.provincia_localidad && search.provincia_localidad.length === 0 && !loading" class="alert alert-dismissible alert-primary">
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
    name: 'filter-ubicacion',
    computed: mapGetters({
      search: 'search/search',
      loading: 'search/loading',
      form: 'filters/form',
      selected_companies: 'filters/selected_companies',
      applied_filters: 'filters/applied_filters',
    }),
    data: () => ({
      title: 'Ubicación',
      selected_provinces_localidad: [],
      list_provinces_localidad: [],
      selected_children: [],
      selected_by_location: 0,
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
      modalVisible: false
    }),
    watch: {
      selected_provinces_localidad: function (newProvincesLocalidad) {
        this.selected_by_location = this.numberCompaniesSelected((this.isAllProvincesLocalidad(newProvincesLocalidad))? this.search.provincia_localidad : newProvincesLocalidad)
      },
      selected_by_location: function(newValue) {
      if (newValue === 0) this.selected_provinces_localidad = []
      },
      selected_companies: function () {
        howAnimation(document.querySelector('.selected_companies'))
      },
      search: function (newSearch) {
        this.options[0].children = (newSearch && newSearch.provincia_localidad) ? newSearch.provincia_localidad : []
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
          this.options[0].children = (this.search && this.search.provincia_localidad) ? this.search.provincia_localidad : []
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
            let result = inArrayObjectTreeselect(this.search.provincia_localidad, item.id)
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
        if (this.selected_provinces_localidad && this.selected_provinces_localidad.length !== 0) {
          this.hideModal()
          this.loadingFrm = true
          this.formatearDataPOST()
          this.$store.dispatch('search/filtrar', this.form).then((response) => {
            //this.options[0].children = (this.search && this.search.provincia_localidad) ? this.search.provincia_localidad : []
            this.updateNumberSelectedCompanies(response.cantidad)
            this.$store.dispatch('filters/addFilters', this.title)
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
        this.selected_children = []
        this.form.comunidades = []
        this.form.Provincias = []
        this.form.Localidades = []
        if (this.applied_filters.length > 1) {
          this.$store.dispatch('search/filtrar', this.form).then((response) => {
            this.updateNumberSelectedCompanies(response.cantidad)
          })
        }else {
          let resta = (this.selected_provinces_localidad.length === 0)? 0 : this.selected_companies - this.selected_by_location
          this.updateNumberSelectedCompanies((resta < 0)? 0: resta)
        }
        this.selected_by_location = 0
        this.$store.dispatch('filters/removeFilters', this.title)
        this.areApplied = false
        this.reapply = false
      },
      emptyFilter () {
        this.selected_children = []
        this.form.comunidades = []
        this.form.Provincias = []
        this.form.Localidades = []
        this.updateNumberSelectedCompanies(0)
        this.selected_by_location = 0
        this.$store.dispatch('filters/removeFilters', this.title)
        this.areApplied = false
        this.reapply = false
      },
      handleChange () { //province, event
        this.reapply = (this.areApplied)? true: this.areApplied
      },
      handleChangeList (province, event){
        event.preventDefault()
        let checkboxs = document.querySelectorAll('#ul_selected_provinces_localidad input[type="checkbox"]')
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
      formatearLabel (item){
      let arr = item.id.split('|');
      arr.reverse();
      if (arr.length === 1) {
      return item.label
      }else if (arr.length > 1){
      let primero = arr[0]
      arr.shift()
      return `${primero} (${arr.join(',')})`}
      },
      formatearDataPOST (){
      this.selected_children = []
      this.selected_provinces_localidad.forEach((item) => {
        let result = inArrayObjectTreeselect(this.search.provincia_localidad, item.id)
        if (result && result.id) {
          let resultIdSplit = result.id.split("|")
          let level = resultIdSplit.length
          if (level === 1) {
            this.form.comunidades.push(result.id); this.selected_children.push(result)
          }else if (level === 2) {
            this.form.Provincias.push(result.id)
            this.selected_children.push(result)
          }
          else if (level === 3) {
            this.form.Localidades.push(result.id)
            this.selected_children.push(result)
          }
        }
        })
        return this.form
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import './../../sass/filters/filters';
</style>
