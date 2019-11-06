<template>
  <div id="filter_ubicacion">
    <div class="filter-title">
      {{ title }}
    </div>
    <div class="bg-fff">
      <div class="content">
        <div class="grid-4-columns-1fr">
          <div v-for="(item, key) in search.provincia" :key="key">
            <label class="custon-checkboxs">
              <input type="checkbox"
                :name="key"
                v-model="form.selected_provinces"
                @change="handleChange({ key, item }, $event)"
                :value="{key, item}">
              <span class="geekmark"></span>
              <span class="name-checkbox">{{ key }}</span>
              <span class="num-fil">({{ item }})</span>
            </label>
          </div>
        </div>
        <div class="flex-space-between-flex-end">
          <button class="btn btn-ver-mas" @click="showModal">Ver detalles</button>
          <p class="text-help">* Puede elegir más de una opción</p>
        </div>
        <modal name="hello-world"
          :width="'98%'"
          :height="'98%'"
          :clickToClose="false">
          <div class="content">
            <div class="conten-flex-70-30">
              <div>
                <div>
                  <button class="btn btn-volver" @click="hideModal"><i class="fa fa-arrow-left"></i> Vover</button>
                  <div class="filter-title">
                    Introduce el nombre de una o varias localidades, separados por una coma o por un espacio, y clica en “BUSCAR”.
                  </div>
                  <div class="flex-text-btn">
                    <input type="text" v-model="form.localidad" name="" placeholder="Ejemplo: Las Rozas de Madrid">
                    <button class="btn btn-naranja">BUSCAR</button>
                  </div>
                  <div class="filter-title">
                    CCAA, Provincia o Localidad encontradas en base a el (los) nombre(s) introducido(s).
                  </div>
                  <div class="flex-textarea">
                    <textarea></textarea>
                  </div>
                  <div class="filter-title">
                    CCAA, Provincia o Localidad encontradas en base a el (los) nombre(s) introducido(s).
                  </div>
                  <div>
                    <treeselect
                      class="select-partida-financiera"
                      :multiple="true"
                      :options="options"
                      placeholder="Seleccionar"
                      v-model="form.selected_provinces"
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
  export default {
    name: 'filter-ubicacion',
    computed: mapGetters({
      search: 'search/search',
      provincia_localidad: 'search/provincia_localidad',
      form: 'filters/form',
    }),
    data: () => ({
      title: 'Ubicación',
      selected_provinces: [],
      options: [],
      seeMore: false
    }),
    watch: {
      selected_provinces: function (newProvinces) {
        if (newProvinces.length) {
          this.$store.dispatch('filters/addFilters', this.title)
        }else {
          this.$store.dispatch('filters/removeFilters', this.title)
        }
      }
    },
    mounted() {
      for (const prop in this.provincia_localidad) {
        this.options.push({
          id: prop,
          label: prop,
        })
      }
      console.log(this.options); 
    },
    methods: {
      handleChange (province, event) {
        this.selected_provinces = this.form.selected_provinces
        this.$store.dispatch('filters/setSelectedCompanies', {
          quantity: province.item,
          isSum: event.target.checked
        })
      },
      showModal () {
        this.$modal.show('hello-world');
      },
      hideModal () {
        this.$modal.hide('hello-world');
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
