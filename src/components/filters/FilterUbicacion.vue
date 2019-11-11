<template>
  <div id="filter_ubicacion">
    <div class="filter-title">
      {{ title }}
    </div>
    <div class="bg-fff">
      <div class="content">
        <h3 v-if="loading" class="text-center"> <i class="fa fa-circle-o-notch fa-pulse fa-3x fa-fw upload-file"></i> </h3>
        <div v-if="!loading">
          <div class="grid-4-columns-1fr">
            <div v-for="(item, key) in search.provincia_localidad" :key="key">
              <label class="custon-checkboxs">
                <input type="checkbox"
                  :name="key"
                  v-model="selected_provinces_localidad"
                  @change="handleChange(item, $event)"
                  :id="`checkbox_${item.id}`"
                  :value="item">
                <span class="geekmark"></span>
                <span class="name-checkbox">{{ item.label }}</span>
                <span class="num-fil">({{ item.data }})</span>
              </label>
            </div>
          </div>
          <div v-if="search.provincia_localidad && search.provincia_localidad.length != 0" class="flex-space-between-flex-end">
            <div class="btns">
              <button type="button" class="btn btn-ver-mas" @click="showModal">Ver detalles</button>
              <button type="button" class="btn btn-aplicar" v-if="!areApplied" @click="apply">Aplicar</button>
              <button type="button" class="btn btn-limpiar" v-if="areApplied" @click="clean">Limpiar</button>
            </div>
            <p class="text-help">* Puede elegir más de una opción</p>
            <b-modal id="bv-modal-filter-ubicacion" hide-footer hide-header static no-close-on-backdrop scrollable size="lg">
              <div class="d-block">
                <div class="content" style="margin-bottom: 30px">
                  <button class="btn btn-volver" @click="hideModal"><i class="fa fa-arrow-left"></i> Vover</button>
                  <button class="btn btn-a">
                    {{ title }}
                  </button>
                  <div class="conten-flex-70-30">
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
                              {{ node.label }} <span class="num-fil" v-if="node.raw.id != 'all'">({{ node.raw.data }})</span>
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
                        Empresas seleccionadas <span class="span-info-right">{{ selected_companies }}</span>
                      </div>
                      <ul class="ul_selected_provinces_localidad"><li v-for="(item, key) in selected_provinces_localidad" :key="key">{{ item.label }} <span class="num-fil" v-if="item.id != 'all'">({{ item.data }})</span></li></ul>
                    </div>
                  </div>
                </div>
              </div>
            </b-modal>
          </div>
        </div>
        <div v-if="search.provincia_localidad && search.provincia_localidad.length === 0 && !loading" class="alert alert-dismissible alert-primary">
          <strong>Oh!</strong> datos no encontrados.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { inArrayObjectTreeselect, inArrayObject } from './../../utils'
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
        if (newProvincesLocalidad.length) {
          this.$store.dispatch('filters/addFilters', this.title)
        }else {
          this.$store.dispatch('filters/removeFilters', this.title)
        }
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
          this.search.provincia_localidad = this.selected_provinces_localidad.filter((item) => {
            let result = inArrayObject(this.search.provincia_localidad, item.id)
            if (result) {
              return result
            }
          })
          this.options[0].children = this.search.provincia_localidad
          this.areApplied = !this.areApplied
        }
      },
      clean () {
        this.$store.dispatch('filters/resetFilter')
        this.fetchSearch()
        this.areApplied = !this.areApplied
      },
      handleChange () { //province, event
      },
      inputTreeselect () { //values
      },
      selectTreeselect () {
      },
      deselectTreeselect () {
      },
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

</style>
