<template>
  <div class="panel panel-default cd" id="filter_sector_actividad">
    <div class="panel-heading">
      <p class="panel-title roboto white">
        {{ title }}
        <span class="span-info-right" v-if="selected_by_location !== 0"
          >({{ selected_by_location | numeral("0,0") }} empresas
          seleccionadas)</span
        >
      </p>
    </div>
    <div class="panel-body">
      <ul class="nav nav-tabs">
        <li class="active">
          <a data-toggle="tab" href="#Codigo_CNAE">Código CNAE</a>
        </li>
        <li>
          <a data-toggle="tab" href="#Sector_INFOCIF">Sector INFOCIF</a>
        </li>
      </ul>

      <div class="tab-content">
        <div
          id="Codigo_CNAE"
          class="tab-pane fade in active"
          style="margin-bottom: 50px;"
        >
          <div v-if="search.cnae && search.cnae.length != 0">
            <div class="">
              <div class="row">
                <div class="col-md-12" style="height: 260px; margin-top: 0px;">
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
                    :limitText="(t) => ''"
                    :disableFuzzyMatching="true"
                    @input="inputTreeselect"
                    @select="selectTreeselect"
                    @deselect="deselectTreeselect"
                    placeholder="Seleccionar"
                    search-nested
                    v-model="selected_cnae"
                  >
                    <label
                      slot="option-label"
                      slot-scope="{
                        node,
                        shouldShowCount,
                        count,
                        labelClassName,
                        countClassName,
                      }"
                      :class="labelClassName"
                    >
                      {{ node.label }}
                      <span class="num-fil" v-if="node.raw.id != 'all'"
                        >({{ node.raw.data | numeral("0,0") }})</span
                      >
                      <span v-if="shouldShowCount" :class="countClassName"
                        >({{ count }})</span
                      >
                    </label>
                  </treeselect>
                </div>
              </div>
            </div>
          </div>
          <div
            v-if="search.cnae && search.cnae.length === 0 && !loading"
            class="alert alert-dismissible alert-primary"
          >
            <strong>Oh!</strong> datos no encontrados.
          </div>
        </div>
        <div id="Sector_INFOCIF" class="tab-pane fade">
          <div v-if="search.industria && search.industria.length != 0">
            <div class="max-height-400-overflow">
              <div class="grid-3-columns-1fr">
                <div v-for="(item, key) in search.industria" :key="key">
                  <label class="custon-checkboxs">
                    <input
                      type="checkbox"
                      :name="`checkbox_${item.id}`"
                      v-model="selected_industria"
                      @change="handleChange(item, $event)"
                      :id="`checkbox_${item.id}`"
                      :value="item"
                    />
                    <span class="geekmark"></span>
                    <span class="name-checkbox">{{ item.label }}</span>
                    <span class="num-fil"
                      >({{ item.data | numeral("0,0") }})</span
                    >
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <div class="flex-space-between-flex-end">
            <div class="btns">
              <button type="button" class="btn btn-warning" @click="showModal">
                Ver detalles
                <i class="fa fa-plus-circle"></i>
              </button>
              <button
                type="button"
                class="btn btn-success"
                v-if="
                  (selected_cnae.length !== 0 && !areApplied) ||
                    (selected_cnae.length !== 0 && !compareWithNewtoApply)
                "
                @click="apply"
              >
                Aplicar
                <i
                  :class="loadingFrm ? 'fa  fa-spinner fa-spin' : 'fa  fa-send'"
                ></i>
              </button>
              <button
                type="button"
                class="btn btn-info"
                v-if="areApplied"
                @click="confirmClean"
              >
                Limpiar
                <i class="fa fa-undo"></i>
              </button>
            </div>
            <p class="text-help">* Puedes elegir más de una opción</p>
          </div>
        </div>
        <el-dialog
          :visible.sync="modalVisible"
          width="95%"
          :modal-append-to-body="false"
          :close-on-click-modal="false"
          :show-close="false"
          :destroy-on-close="true"
          :center="true"
          top="5vh"
        >
          <div>
            <div class="btns-modal-header">
              <div>
                <button class="btn btn-warning" @click="hideModal">
                  <i class="fa fa-arrow-left"></i> Vover
                </button>
                <button class="btn btn-a">{{ title }}</button>
              </div>
              <div>
                <button
                  type="button"
                  class="btn btn-success"
                  v-if="
                    (selected_cnae.length !== 0 && !areApplied) ||
                      (selected_cnae.length !== 0 && !compareWithNewtoApply)
                  "
                  @click="apply"
                >
                  Aplicar
                  <i
                    :class="
                      loadingFrm ? 'fa  fa-spinner fa-spin' : 'fa  fa-send'
                    "
                  ></i>
                </button>
                <button
                  type="button"
                  class="btn btn-info"
                  v-if="areApplied"
                  @click="confirmClean"
                >
                  Limpiar
                  <i class="fa fa-undo"></i>
                </button>
              </div>
            </div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Asperiores, commodi adipisci sapiente, laudantium dignissimos natus
            ipsam veniam recusandae alias rerum eveniet aspernatur nisi ea error
            culpa optio necessitatibus odit ipsum.
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import swal from "sweetalert2";
import {
  inArrayObjectTreeselect,
  howAnimation,
  removeDuplicates,
  beforeOrderFilters,
  sendPageView,
  sendEvent,
} from "./../../utils";
import { persistentData } from "./../../mixins/persistent-data";
export default {
  name: "filter-sector-actividad",
  mixins: [persistentData],
  computed: {
    ...mapGetters({
      search: "search/search",
      loading: "search/loading",
      form: "filters/form",
      selected_companies: "filters/selected_companies",
      applied_filters: "filters/applied_filters",
      filters: "filters/filters",
    }),
    compareWithNewtoApply: function() {
      let stg = this.selected_cnae_string;
      let obj = JSON.stringify(this.sortData(this.selected_cnae));
      return stg === obj;
    },
  },
  data: () => ({
    title: "Sector/Actividad",
    selected_cnae_string: "",
    selected_cnae: [],
    selected_industria_string: "",
    selected_industria: [],
    list_provinces_localidad: [],
    selected_children: [],
    selected_by_location: 0,
    options: [],
    SearchTheProvinceorTown: "madrid",
    ResultTheProvinceorTown: [],
    loadingSearchTheProvinceorTown: false,
    areApplied: false,
    reapply: false,
    showBtnApply: false,
    loadingFrm: false,
    modalVisible: false,
    filterText: "",
    defaultProps: {
      children: "children",
      label: "label",
      data: "data",
    },
    optionsSelect: [],
    valueSelect: [],
    listSelect: [],
    loadingSelect: false,
    limitChildren: 3,
  }),
  watch: {
    selected_cnae: function(newProvincesLocalidad) {
      this.selected_by_location = this.numberCompaniesSelected(
        this.isAllProvincesLocalidad(newProvincesLocalidad)
          ? this.search.cnae
          : newProvincesLocalidad
      );
      if (this.reapply && newProvincesLocalidad.length === 0) {
        this.clean();
      }
    },
    selected_companies: function() {
      howAnimation(document.querySelector(".selected_companies"));
    },
    search: function(newSearch) {
      this.options = newSearch && newSearch.cnae ? newSearch.cnae : [];
    },
    filterText(val) {
      this.$refs.tree.filter(val);
    },
    valueSelect(newValueSelect, attValueSelect) {
      if (!(newValueSelect.length < attValueSelect.length)) {
        let respalSelectedPL = [];
        newValueSelect.forEach((item) => {
          let result = inArrayObjectTreeselect(this.search.cnae, item);
          if (result) {
            respalSelectedPL.push(result);
          }
        });
        respalSelectedPL = removeDuplicates(respalSelectedPL, "id");
        this.selected_cnae = this.selected_cnae.concat(respalSelectedPL);
        this.selected_cnae = removeDuplicates(this.selected_cnae, "id");
      } else {
        let eliminadas = attValueSelect.filter((item) => {
          return !newValueSelect.includes(item) ? item : null;
        });
        eliminadas.map((_item) => {
          this.selected_cnae = this.selected_cnae.filter(
            (item) => item.id !== _item
          );
        });
      }
    },
  },
  mounted() {
    this.$root.$on("clean_filter", (filter) => {
      if (filter === this.title) {
        this.clean();
      }
    });
    this.$root.$on("show_modal_filter", (filter) => {
      if (filter === this.title) {
        this.showModal();
      }
    });
    this.$root.$on("empty_filter", (filter) => {
      if (filter === this.title) {
        this.emptyFilter();
      }
      sendEvent("filtro-vaciado", "-");
    });
  },
  methods: {
    fetchSearch() {
      // this.$store.dispatch('search/fetchSearch').then(() => {
      //   this.options[0].children = (this.search && this.search.cnae) ? this.search.cnae : []
      // })
    },
    showModal() {
      sendPageView(`filtro-ubicacion`, `Buscador - Filtro de Ubicacion`);
      this.modalVisible = true;
    },
    hideModal() {
      sendPageView(``, `Buscador - Filtro`);
      this.modalVisible = false;
      let treeselect__input = document.querySelector(
        "#options input.vue-treeselect__input"
      );
      if (treeselect__input) treeselect__input.value = "";
    },
    /**
     * [updateNumberSelectedCompanies actualiza la cantidad de empresas selecionadas en el store de Vuex]
     * @param  {[number]} quantity [cantidad de empresas selecionadas]
     */
    updateNumberSelectedCompanies(quantity) {
      this.$store.dispatch("filters/updateNumberSelectedCompanies", {
        quantity,
      });
    },
    /**
     * [numberCompaniesSelected cuenta la cantidad de empresas selecionadas]
     * @param  {[Array<Object>]} newSelectedCompanies [description]
     * @return {[number]}        business_accountant  [description]
     */
    numberCompaniesSelected(newSelectedCompanies) {
      let business_accountant = 0;
      if (Array.isArray(newSelectedCompanies)) {
        newSelectedCompanies.forEach((item) => {
          let result = inArrayObjectTreeselect(this.search.cnae, item.id);
          if (result && result.data) {
            business_accountant = business_accountant + result.data;
          }
        });
      }
      return business_accountant;
    },
    /**
     * [isAllProvincesLocalidad saber si el valor del treeselect es TODA ESPAÑA]
     * @param  {[type]}  arrayProvincesLocalidad [description]
     * @return {Boolean}                         [description]
     */
    isAllProvincesLocalidad(arrayProvincesLocalidad) {
      return arrayProvincesLocalidad[0] &&
        arrayProvincesLocalidad[0].id === "all"
        ? true
        : false;
    },
    apply() {
      // if (this.selected_cnae && this.selected_cnae.length !== 0) {
      //   this.hideModal();
      //   this.loadingFrm = true;
      //   this.formatearDataPOST();
      //   let beforeForm = beforeOrderFilters(
      //     this.filters,
      //     this.applied_filters,
      //     this.form,
      //     this.title
      //   );
      //   this.$store
      //     .dispatch("search/filtrar", beforeForm)
      //     .then((response) => {
      //       this.updateNumberSelectedCompanies(response.cantidad);
      //       this.$store.dispatch("filters/addFilters", {
      //         name: this.title,
      //         quantity: this.selected_by_location,
      //         cantidades: response,
      //       });
      //       this.areApplied = true;
      //       this.reapply = false;
      //       this.loadingFrm = false;
      //       this.selected_cnae_string = JSON.stringify(
      //         this.sortData(this.selected_cnae)
      //       );
      //       sendEvent(`filtro-aplicado`, this.title);
      //     })
      //     .catch(() => {
      //       this.loadingFrm = false;
      //     });
      // }
    },
    confirmClean() {
      swal
        .fire({
          icon: "question",
          title: "Estas seguro?",
          html: `deseas vaciar el filtro ${this.title}?`,
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          cancelButtonColor: "#d9534f",
          showConfirmButton: true,
          confirmButtonColor: "#337ab7",
          confirmButtonText: "Si, seguro",
        })
        .then((result) => {
          if (result.value) {
            this.clean();
          }
        });
    },
    clean() {
      this.selected_children = [];
      this.form.comunidades = [];
      this.form.Provincias = [];
      this.form.Localidades = [];
      this.selected_cnae = [];
      this.valueSelect = [];
      this.selected_cnae_string = "";
      if (this.applied_filters.length > 1) {
        let beforeForm = beforeOrderFilters(
          this.filters,
          this.applied_filters,
          this.form,
          this.title
        );
        this.$store.dispatch("search/filtrar", beforeForm).then((response) => {
          this.updateNumberSelectedCompanies(response.cantidad);
          this.$store.dispatch("filters/setCantidades", {
            cantidades: response,
          });
        });
      } else {
        this.updateNumberSelectedCompanies(0);
      }
      this.selected_by_location = 0;
      this.$store.dispatch("filters/removeFilters", this.title);
      this.areApplied = false;
      this.reapply = false;
      this.loadingSearchTheProvinceorTown = false;
      this.ResultTheProvinceorTown = [];
      this.SearchTheProvinceorTown = "";
      sendEvent("filtro-limpiado", this.title);
    },
    emptyFilter() {
      this.selected_children = [];
      this.form.comunidades = [];
      this.form.Provincias = [];
      this.form.Localidades = [];
      this.selected_cnae = [];
      this.valueSelect = [];
      this.selected_cnae_string = "";
      this.updateNumberSelectedCompanies(0);
      this.selected_by_location = 0;
      this.$store.dispatch("filters/removeFilters", this.title);
      this.areApplied = false;
      this.reapply = false;
      this.loadingSearchTheProvinceorTown = false;
      this.ResultTheProvinceorTown = [];
      this.SearchTheProvinceorTown = "";
    },
    handleChange() {
      //province, event
      this.reapply = this.areApplied ? true : this.areApplied;
    },
    handleChangeList(province, event) {
      event.preventDefault();
      let checkboxs = document.querySelectorAll(
        '#ul_selected_cnae input[type="checkbox"]'
      );
      checkboxs.forEach((item) => {
        item.checked = true;
      });
    },
    searchProvinceorTown() {
      this.loadingSearchTheProvinceorTown = true;
      this.ResultTheProvinceorTown = [];
      this.$store
        .dispatch("search/searchLocalidades", this.SearchTheProvinceorTown)
        .then((response) => {
          if (response.results && Array.isArray(response.results)) {
            this.ResultTheProvinceorTown = response.results;
          }
          this.loadingSearchTheProvinceorTown = false;
        })
        .catch(() => {
          this.loadingSearchTheProvinceorTown = false;
          this.ResultTheProvinceorTown = [];
        });
    },
    handleCheck() {
      //data, checked
    },
    inputTreeselect() {
      //values
    },
    selectTreeselect() {},
    deselectTreeselect() {},
    formatearLabel(item) {
      let _item = { ...item };
      let arr = _item.id.split("|");
      arr.reverse();
      if (arr.length === 1) {
        return _item.label;
      } else if (arr.length > 1) {
        let primero = arr[0];
        arr.shift();
        return `${primero} (${arr.join(",")})`;
      }
    },
    formatearDataPOST() {
      this.selected_children = [];
      this.form.comunidades = [];
      this.form.Provincias = [];
      this.form.Localidades = [];
      this.selected_cnae.forEach((item) => {
        let result = inArrayObjectTreeselect(this.search.cnae, item.id);
        if (result && result.id) {
          let resultIdSplit = result.id.split("|");
          let level = resultIdSplit.length;
          if (level === 1) {
            this.form.comunidades.push(result.id);
            this.selected_children.push(result);
          } else if (level === 2) {
            this.form.Provincias.push(result.id);
            this.selected_children.push(result);
          } else if (level === 3) {
            this.form.Localidades.push(result.id);
            this.selected_children.push(result);
          }
        }
      });
      return this.form;
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.toLowerCase().indexOf(value.toLowerCase()) !== -1;
    },
    handleCheckChange(data, checked) {
      //data, checked, indeterminate
      if (checked) {
        let respalSelectedPL = [...this.selected_cnae];
        let result = inArrayObjectTreeselect(this.search.cnae, data.id);
        if (result) {
          respalSelectedPL.push(result);
        }
        respalSelectedPL = removeDuplicates(respalSelectedPL, "id");
        this.selected_cnae = [...respalSelectedPL];
      } else {
        this.changeRemoveTag(data.id);
      }
    },
    remoteMethod(query) {
      if (query !== "") {
        this.loadingSelect = true;
        this.$store
          .dispatch("search/searchLocalidades", query)
          .then((response) => {
            if (response.results && Array.isArray(response.results)) {
              this.optionsSelect = response.results;
            }
            this.loadingSelect = false;
          })
          .catch(() => {
            this.loadingSelect = false;
            this.optionsSelect = [];
          });
      } else {
        this.optionsSelect = [];
      }
    },
    changeRemoveTag(id_elemet) {
      this.selected_cnae = this.selected_cnae.filter(
        (item) => item.id !== id_elemet
      );
    },
    changeClear() {
      //element, checked
    },
    changeMethod() {},
    showAllInvalidos() {
      if (this.limitChildren === 3) {
        this.limitChildren = this.selected_children.length;
      } else {
        this.limitChildren = 3;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./../../sass/filters/filters";

.el-select.el-select--medium {
  width: 100%;
}

.max-height-400-overflow {
  overflow-y: auto;
  max-height: 400px;
}
.nav.nav-tabs {
  li.active a {
    color: #fff !important;
  }
}
</style>
