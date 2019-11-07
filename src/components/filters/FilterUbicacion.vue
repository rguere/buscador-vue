<template>
  <div id="filter_ubicacion">
    <div class="filter-title">
      {{ title }}
    </div>
    <div class="bg-fff">
      <div class="content">
        <div class="grid-4-columns-1fr">
          <div v-for="(item, key) in search.provincia_localidad" :key="key">
            <label class="custon-checkboxs">
              <input type="checkbox"
                :name="key"
                v-model="form.selected_provinces"
                @change="handleChange(item, $event)"
                :id="`checkbox_${item.id}`"
                :value="item">
              <span class="geekmark"></span>
              <span class="name-checkbox">{{ item.label }}</span>
              <span class="num-fil">({{ item.data.number_companies }})</span>
            </label>
          </div>
        </div>
        <div class="flex-space-between-flex-end">
          <button class="btn btn-ver-mas" @click="showModal">Ver detalles</button>
          <p class="text-help">* Puede elegir más de una opción</p>
        </div>
        <modal name="modal_filter_ubicacion"
          :width="'95%'"
          :minHeight="450"
          :scrollable="true"
          :resizable="false"
          :adaptive="true"
          :draggable="false"
          :alwaysOpen="false"
          :clickToClose="false">
          <div class="content" style="margin-bottom: 30px;">
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
                      @input="inputTreeselect"
                      @select="selectTreeselect"
                      @deselect="deselectTreeselect"
                      placeholder="Seleccionar"
                      v-model="selected_provinces_treeselect"
                      />
                  </div>
                </div>
              </div>
              <div>
                <div class="filter-title">
                  Ubicaciones seleccionadas............3
                </div>
                <div class="filter-title">
                  Empresas seleccionadas....252.000
                </div>
              </div>
            </div>
          </div>
        </modal>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { inArrayObject } from './../../utils'
  export default {
    name: 'filter-ubicacion',
    computed: mapGetters({
      search: 'search/search',
      form: 'filters/form',
    }),
    data: () => ({
      title: 'Ubicación',
      selected_provinces: [],
      selected_provinces_treeselect: [],
      options: [{
        id: 'all',
        label: 'TODA ESPAÑA',
        isDefaultExpanded: true,
        children: []
      }],
      seeMore: false
    }),
    watch: {
      selected_provinces: function (newProvinces) {
        this.selected_provinces_treeselect = newProvinces
        if (newProvinces.length) {
          this.$store.dispatch('filters/addFilters', this.title)
        }else {
          this.$store.dispatch('filters/removeFilters', this.title)
        }
      },
      selected_provinces_treeselect: function (newValues) {
        this.updateNumberSelectedCompanies(this.numberCompaniesSelected(newValues))
      }
    },
    mounted() {
      this.options[0].children = this.search.provincia_localidad
    },
    methods: {
      handleChange () { //province, event
        this.selected_provinces = this.form.selected_provinces
      },
      inputTreeselect (value) {
        console.log(value, 'inputTreeselect')
      },
      selectTreeselect (value) {
        console.log(value, 'selectTreeselect')
      },
      deselectTreeselect (value) {
        console.log(value, 'deselectTreeselect')
      },
      showModal () {
        this.$modal.show('modal_filter_ubicacion');
      },
      hideModal () {
        this.$modal.hide('modal_filter_ubicacion');
      },
      updateNumberSelectedCompanies(quantity){
        this.$store.dispatch('filters/updateNumberSelectedCompanies', {
          quantity
        })
      },
      numberCompaniesSelected(newValues) {
        let business_accountant = 0;
        newValues.forEach((item) => {
          let results = inArrayObject(this.search.provincia_localidad, item.id)
          if (results) {
            business_accountant = business_accountant + item.data.number_companies
          } else {
            console.log(item)
          }
        })
        return business_accountant;
      }
    }
  }
</script>

<style lang="scss" scoped>

    @import './../../sass/filters/filters';

    .flex-text-btn {
      display: flex;
      width: 100%;
      input {
        width: 90%;
      }
      button {
        width: 10%;
      }
    }

    .flex-textarea {
      display: flex;
      width: 100%;
      textarea {
        width: 100%;
      }
    }

</style>
