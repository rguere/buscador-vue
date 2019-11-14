<template>
  <div id="filter_ubicacion">
    <div class="filter-title">
      {{ title }}
    </div>
    <div class="bg-fff">
      <div class="content">
        <h3 v-if="loading" class="text-center"> <i class="fa fa-circle-o-notch fa-pulse fa-3x fa-fw upload-file"></i> </h3>
        <div v-if="!loading">
          <div class="grid-4-columns-1fr" v-if="!areApplied">
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
                <!-- {{ (item.isChecked)? 'si' : 'no' }} -->
              </label>
            </div>
          </div>
          <div class="selected_children" v-if="areApplied">
            <ul class="grid-4-columns-1fr">
              <li v-for="(item, key) in selected_children" :key="key">
                <span class="name-checkbox">- {{ formatearLabel(item) }} </span>
                <span class="num-fil">({{ item.data | numeral('0,0') }})</span>
              </li>
            </ul>
          </div>
          <div v-if="search.provincia_localidad && search.provincia_localidad.length != 0" class="flex-space-between-flex-end">
            <div class="btns">
              <button type="button" class="btn btn-ver-mas" @click="showModal">Ver detalles</button>
              <button type="button" class="btn btn-aplicar" v-if="selected_provinces_localidad.length !== 0 && !areApplied" @click="apply">Aplicar</button>
              <button type="button" class="btn btn-limpiar" v-if="areApplied" @click="clean">Limpiar</button>
            </div>
            <p class="text-help">* Puede elegir más de una opción</p>
          </div>
          <b-modal id="bv-modal-filter-ubicacion" hide-footer hide-header static no-close-on-backdrop scrollable size="lg">
            <div class="d-block">
              <div class="content" style="margin-bottom: 30px">
                <div class="btns-modal-header">
                  <div>
                    <button class="btn btn-volver" @click="hideModal"><i class="fa fa-arrow-left"></i> Vover</button>
                    <button class="btn btn-a">
                      {{ title }}
                    </button>
                  </div>
                  <div>
                    <button type="button" class="btn btn-aplicar" v-if="selected_provinces_localidad.length !== 0" @click="apply">Aplicar</button>
                    <button type="button" class="btn btn-limpiar" v-if="areApplied" @click="clean">Limpiar</button>
                  </div>
                </div>
                <div class="conten-flex-70-30" v-if="search.provincia_localidad && search.provincia_localidad.length != 0">
                  <div>
                    <div>
                      <div class="filter-title">
                        CCAA, Provincia o Localidad encontradas en base a el (los) nombre(s) introducido(s).
                      </div>
                      <div>
                        <treeselect
                          valueFormat="object"
                          :multiple="true"
                          :options="options"
                          :always-open="true"
                          :default-expand-level="1"
                          :load-options="fetchSearch"
                          @input="inputTreeselect"
                          @select="selectTreeselect"
                          @deselect="deselectTreeselect"
                          placeholder="Seleccionar"
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
                    <div class="filter-title">
                      Ubicaciones seleccionadas <span class="span-info-right">{{ selected_provinces_localidad.length }}</span>
                    </div>
                    <div class="filter-title">
                      Empresas seleccionadas <span class="span-info-right">{{ selected_companies | numeral('0,0') }}</span>
                    </div>
                    <ul class="ul_selected_provinces_localidad"><li v-for="(item, key) in selected_provinces_localidad" :key="key">{{ item.label }} <span class="num-fil" v-if="item.id != 'all'">({{ item.data | numeral('0,0') }})</span></li></ul>
                  </div>
                </div>
              </div>
            </div>
          </b-modal>
        </div>
        <div v-if="search.provincia_localidad && search.provincia_localidad.length === 0 && !loading" class="alert alert-dismissible alert-primary">
          <strong>Oh!</strong> datos no encontrados. <button type="button" class="btn" @click="fetchSearch">Recargar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { inArrayObjectTreeselect } from './../../utils'
  export default {
    name: 'filter-ubicacion',
    computed: mapGetters({
      search: 'search/search',
      form: 'filters/form',
      selected_companies: 'filters/selected_companies',
    }),
    data: () => ({
      title: 'Ubicación',
      selected_provinces_localidad: [],
      selected_children: [],
      options: [{
        id: 'all',
        label: 'TODA ESPAÑA',
        isDefaultExpanded: true,
        children: []
      }],
      areApplied: false,
      loading: false,
      seeMore: false
    }),
    watch: {
      selected_provinces_localidad: function (newProvincesLocalidad) {
        this.updateNumberSelectedCompanies(this.numberCompaniesSelected((this.isAllProvincesLocalidad(newProvincesLocalidad))? this.search.provincia_localidad : newProvincesLocalidad))
        this.form.selected_provinces_localidad = this.selected_provinces_localidad
      },
      selected_companies: function(newValue) {
      if (newValue === 0) this.selected_provinces_localidad = []
      }
    },
    mounted() {
      this.fetchSearch()
    },
    methods: {
      fetchSearch (){
        this.loading = true
        this.$store.dispatch('search/fetchSearch').then(() => {
          this.loading = false
          this.options[0].children = (this.search && this.search.provincia_localidad) ? this.search.provincia_localidad : []
        }).catch(() => { this.loading = false })
      },
      showModal () {
        this.$bvModal.show('bv-modal-filter-ubicacion')
      },
      hideModal () {
        this.$bvModal.hide('bv-modal-filter-ubicacion')
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
          this.loading = true
          this.hideModal()
          this.$store.dispatch('search/filtrarUbicacion', this.formatearDataPOST()).then((response) => {
            this.loading = false
            this.options[0].children = (this.search && this.search.provincia_localidad) ? this.search.provincia_localidad : []
            this.updateNumberSelectedCompanies(response.cantidad)
            this.$store.dispatch('filters/addFilters', this.title)
            this.areApplied = true
          }).catch(() => { 
            this.loading = false
          })
        }
      },
      clean () {
        this.selected_children = []
        this.$store.dispatch('filters/resetFilter')
        this.fetchSearch()
        this.areApplied = false
      },
      handleChange () { //province, event
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
      let dataPOST = {
        comunidades: [],
        Provincias: [],
        Localidades: []
      }
      this.selected_children = []
      this.selected_provinces_localidad.forEach((item) => {
        let result = inArrayObjectTreeselect(this.search.provincia_localidad, item.id)
        if (result && result.id) {
          let resultIdSplit = result.id.split("|")
          let level = resultIdSplit.length
          if (level === 1) {
            dataPOST.comunidades.push(result.id); this.selected_children.push(result)
          }else if (level === 2) {
            dataPOST.Provincias.push(result.id)
            this.selected_children.push(result)
          }
          else if (level === 3) {
            dataPOST.Localidades.push(result.id)
            this.selected_children.push(result)
          }
        }
        })
        return dataPOST
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import './../../sass/filters/filters';

  span.span-info-right { float: right; }
  span.num-fil { color: #2196f3; }
  ul.ul_selected_provinces_localidad {
    height: 280px;
    overflow-y: scroll;
  }
  .btns button { margin: 0 5px 0 0; }
  .btns-modal-header {
    display: flex;
    justify-content: space-between;
    button.btn-aplicar {
      background-color: #e2801d;
      color: #fff;
      padding: 5px;
      margin-right: 5px;
    }
    button.btn-limpiar { padding: 5px; }
  }
  .selected_children ul {
    list-style-type: disc;
    margin-block-start: 0;
    margin-block-end: 0;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 0;
    margin-bottom: 10px;
    li {
      display: inline-block;
      font-weight: bold;
    }
  }
</style>
