<template>
  <div class="panel panel-default cd" id="filter_cargos">
    <div class="panel-heading">
      <p class="panel-title roboto white">
        {{ title }}
        <span class="span-info-right" v-if="selected_by_cargos !== 0"
          >({{ selected_by_cargos | numeral("0,0") }} empresas
          seleccionadas)</span
        >
      </p>
    </div>
    <div class="panel-body">
      <div v-if="search.cargos && search.cargos.length !== 0">
        <div class="grid-3-columns-1fr">
          <div v-for="(item, key) in search.cargos" :key="key">
            <label
              class="custon-checkboxs"
              v-if="item.label !== 'incluir_null'"
            >
              <input
                type="checkbox"
                :name="`checkbox_cargos_${item.id}`"
                v-model="selected_cargos"
                @change="handleChange()"
                :id="`checkbox_cargos_${item.id}`"
                :value="item"
              />
              <span class="geekmark"></span>
              <span class="name-checkbox">{{ item.label }}</span>
              <span class="num-fil">({{ item.data | numeral("0,0") }})</span>
            </label>
          </div>
        </div>
        <div class="flex-space-between-flex-end">
          <div></div>
          <div style="margin-top: 20px;">
            <el-switch
              v-model="active"
              :disabled="both"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="Activos"
              inactive-text="Inactivos"
            >
            </el-switch>
            <el-checkbox style="margin-left: 20px;" v-model="both"
              >Ambos</el-checkbox
            >
          </div>
        </div>
        <div class="flex-space-between-flex-end">
          <div class="btns">
            <button type="button" class="btn btn-warning" @click="showModal">
              Ver detalles
              <i class="fa fa-plus-circle"></i>
            </button>
            <button
              type="button"
              class="btn btn-success"
              v-if="activeAplicar"
              @click="apply"
            >
              Aplicar
              <i :class="iconLoadingFrm"></i>
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
        <div class="float-right margin-top-10">
          <p class="text-help">* Puedes elegir más de una opción</p>
        </div>
        <el-dialog
          :visible.sync="modalVisible"
          width="95%"
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
                  v-if="activeAplicar"
                  @click="apply"
                >
                  Aplicar
                  <i :class="iconLoadingFrm"></i>
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
            <div class="conten-flex-70-30">
              <div>
                <div
                  class="row"
                  v-if="search.cargos && search.cargos.length !== 0"
                >
                  <div class="col-md-12">
                    <div class="panel panel-default cd">
                      <div class="panel-heading">
                        <p class="panel-title roboto white">
                          Selecciona el(los) cargo(s) que desees incorporar a tu
                          estrategia de búsqueda
                          <span
                            class="span-info-right"
                            v-if="selected_by_cargos !== 0"
                            >({{ selected_by_cargos | numeral("0,0") }} empresas
                            seleccionadas)</span
                          >
                        </p>
                      </div>
                      <div class="panel-body">
                        <div class="row">
                          <div class="col-md-12">
                            <div
                              v-if="search.cargos.length !== 0"
                              class="div-scroll-300"
                            >
                              <div
                                v-for="(item, key) in search.cargos"
                                :key="key"
                                class="checkbox"
                              >
                                <label
                                  class="custon-checkboxs"
                                  v-if="item.label !== 'incluir_null'"
                                >
                                  <input
                                    type="checkbox"
                                    :name="`checkbox_cargos_${item.id}`"
                                    v-model="selected_cargos"
                                    @change="handleChange()"
                                    :id="`checkbox_cargos_${item.id}`"
                                    :value="item"
                                  />
                                  <span class="geekmark"></span>
                                  <span class="name-checkbox">{{
                                    item.label
                                  }}</span>
                                  <span class="num-fil"
                                    >({{ item.data | numeral("0,0") }})</span
                                  >
                                </label>
                              </div>
                            </div>
                            <div class="flex-space-between-flex-end">
                              <div></div>
                              <div style="margin-top: 20px;">
                                <el-switch
                                  v-model="active"
                                  :disabled="both"
                                  active-color="#13ce66"
                                  inactive-color="#ff4949"
                                  active-text="Activos"
                                  inactive-text="Inactivos"
                                >
                                </el-switch>
                                <el-checkbox
                                  style="margin-left: 20px;"
                                  v-model="both"
                                  >Ambos</el-checkbox
                                >
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="panel panel-default cd">
                      <div class="panel-heading">
                        <p class="panel-title roboto white">
                          Selecciona si el(los) cargo(s) elegido(s) están
                          activos, inactivos o ambas
                        </p>
                      </div>
                      <div class="panel-body">
                        <div class="div-nombramiento">
                          <div>
                            <div @click="clickPicker($event, 'desdePicker')">
                              <label class="demonstration"
                                >Fecha nombramiento Desde (incluido)</label
                              >
                              <el-date-picker
                                id="desdePicker"
                                @focus="focusPicker"
                                ref="desdePicker"
                                v-model="daterange[0]"
                                format="dd/MM/yyyy"
                                value-format="dd/MM/yyyy"
                                type="date"
                                popper-class="desdePicker"
                                placeholder="(Introducir, en formato dd/mm/aaaa)"
                                :picker-options="pickerOptions"
                              ></el-date-picker>
                            </div>
                          </div>
                          <div>
                            <div @click="clickPicker($event, 'hastaPicker')">
                              <label class="demonstration"
                                >Fecha nombramiento Hasta (incluido)</label
                              >
                              <el-date-picker
                                id="hastaPicker"
                                @focus="focusPicker"
                                ref="hastaPicker"
                                v-model="daterange[1]"
                                format="dd/MM/yyyy"
                                value-format="dd/MM/yyyy"
                                type="date"
                                popper-class="hastaPicker"
                                placeholder="(Introducir, en formato dd/mm/aaaa)"
                                :picker-options="pickerOptions"
                              ></el-date-picker>
                            </div>
                          </div>
                        </div>
                        <div class="div-nombramiento m-t-30">
                          <div>
                            <div @click="clickPicker($event, 'desdePicker')">
                              <label class="demonstration"
                                >Fecha destitución/renuncia Desde
                                (incluido)</label
                              >
                              <el-date-picker
                                id="desdePicker"
                                @focus="focusPicker"
                                ref="desdePicker"
                                v-model="daterange2[0]"
                                format="dd/MM/yyyy"
                                value-format="dd/MM/yyyy"
                                type="date"
                                popper-class="desdePicker"
                                placeholder="(Introducir, en formato dd/mm/aaaa)"
                                :picker-options="pickerOptions"
                              ></el-date-picker>
                            </div>
                          </div>
                          <div>
                            <div @click="clickPicker($event, 'hastaPicker')">
                              <label class="demonstration"
                                >Fecha destitución/renuncia Hasta
                                (incluido)</label
                              >
                              <el-date-picker
                                id="hastaPicker"
                                @focus="focusPicker"
                                ref="hastaPicker"
                                v-model="daterange2[1]"
                                format="dd/MM/yyyy"
                                value-format="dd/MM/yyyy"
                                type="date"
                                popper-class="hastaPicker"
                                placeholder="(Introducir, en formato dd/mm/aaaa)"
                                :picker-options="pickerOptions"
                              ></el-date-picker>
                            </div>
                          </div>
                        </div>
                        <div>
                          <button
                            type="button"
                            class="btn btn-info"
                            @click="applyRangeNombramiento"
                            :disabled="disabledRange && disabled2Range"
                          >
                            BUSCAR
                            <i :class="iconBtnBuscarDaterange"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div class="panel panel-default cd ressss">
                  <div class="panel-heading">
                    <p class="panel-title roboto white">
                      Cargos seleccionadas
                      <span class="span-info-right">{{
                        selected_cargos.length
                      }}</span>
                    </p>
                  </div>
                </div>
                <div class="panel panel-default">
                  <div class="panel-heading">
                    <p class="panel-title roboto white">
                      Empresas seleccionadas
                      <span class="span-info-right">{{
                        selected_by_cargos | numeral("0,0")
                      }}</span>
                    </p>
                  </div>
                  <div class="panel-body div-scroll-300">
                    <ul class="ul_selected_cargos" id="ul_selected_cargos">
                      <li v-for="(item, key) in selected_cargos" :key="key">
                        <label class="custon-checkboxs">
                          <input
                            type="checkbox"
                            :name="`checkbox_list_${item.id}`"
                            v-model="selected_cargos"
                            @change="handleChangeList(item, $event)"
                            :id="`checkbox_list_${item.id}`"
                            :value="item"
                          />
                          <span class="geekmark"></span>
                          <span class="name-checkbox">{{ item.label }}</span>
                          <span class="num-fil" v-if="item.id != 'all'"
                            >({{ item.data | numeral("0,0") }})</span
                          >
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
      <div
        v-if="search.cargos && search.cargos.length === 0 && !loading"
        class="alert alert-dismissible alert-primary"
      >
        <strong>Oh!</strong> datos no encontrados.
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import swal from "sweetalert2";
import { required, maxLength, numeric } from "vuelidate/lib/validators";
import {
  inArrayObjectTreeselect,
  howAnimation,
  beforeOrderFilters,
  sendPageView,
  sendEvent,
} from "./../../utils";
import { persistentData } from "./../../mixins/persistent-data";
export default {
  name: "filter-cargos",
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
      let stg = this.selected_cargos_string;
      let obj = JSON.stringify(this.selected_cargos);
      return stg === obj;
    },
    iconBtnBuscarDaterange: function() {
      return this.loadingDaterange ? "fa  fa-spinner fa-spin" : "fa  fa-search";
    },
    iconBtnBuscar: function() {
      return this.loadingCargos ? "fa  fa-spinner fa-spin" : "fa  fa-search";
    },
    iconLoadingFrm: function() {
      return this.loadingFrm ? "fa  fa-spinner fa-spin" : "fa  fa-send";
    },
    activeAplicar: function() {
      return (
        (this.selected_cargos.length !== 0 && !this.areApplied) ||
        (this.selected_cargos.length !== 0 && !this.compareWithNewtoApply)
      );
    },
    disabledRange: function() {
      return this.daterange[0] === null || this.daterange[1] === null;
    },
    disabled2Range: function() {
      return this.daterange2[0] === null || this.daterange2[1] === null;
    },
  },
  data: () => ({
    title: "Cargos",
    selected_cargos_string: "",
    selected_cargos: [],
    list_cargos: [],
    selected_by_cargos: 0,
    areApplied: false,
    reapply: false,
    showBtnApply: false,
    loadingFrm: false,
    modalVisible: false,
    daterange: [],
    daterange2: [],
    daterangeFnombramiento: null,
    daterangeFrenuncia: null,
    loadingDaterange: false,
    loadingCargos: false,
    daterange_incluir_null: false,
    employees_to: "",
    employees_from: "",
    incluir_null: false,
    all: false,
    active: true,
    both: false,
    pickerOptions: {
      disabledDate(time) {
        return time.getTime() > Date.now();
      },
    },
    eventApply: "apply",
  }),
  validations() {
    return {
      employees_from: {
        required,
        between: maxLength(6),
        numeric,
      },
      employees_to: {
        required,
        between: maxLength(6),
        numeric,
      },
    };
  },
  watch: {
    selected_cargos: function(newProvincesCargos) {
      this.selected_by_cargos = this.numberCompaniesSelected(
        this.isAllProvincesLocalidad(newProvincesCargos)
          ? this.search.cargos
          : newProvincesCargos
      );
      if (this.reapply && newProvincesCargos.length === 0) {
        this.clean();
      }
    },
    selected_by_cargos: function(newValue) {
      if (newValue === 0) this.selected_cargos = [];
    },
    selected_companies: function() {
      howAnimation(document.querySelector(".selected_companies"));
    },
    daterange: function(newDaterange) {
      if (newDaterange.length === 2 && newDaterange[0] && newDaterange[1]) {
        this.daterangeFnombramiento = `fnombramiento:${newDaterange.join("|")}`;
      } else {
        this.daterangeFnombramiento = null;
      }
    },
    daterange2: function(newDaterange2) {
      if (newDaterange2.length === 2 && newDaterange2[0] && newDaterange2[1]) {
        this.daterangeFrenuncia = `frenuncia:${newDaterange2.join("|")}`;
      } else {
        this.daterangeFrenuncia = null;
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
        this.modalVisible = true;
      }
    });
    this.$root.$on("empty_filter", (filter) => {
      if (filter === this.title) {
        this.emptyFilter();
      }
    });
  },
  methods: {
    fetchSearch() {},
    clickPicker(event, elementRefs) {
      let target = event.target;
      if (target.classList.contains("el-icon-date")) {
        this[elementRefs]++;
        if (this[elementRefs] == 2) {
          this.$refs[elementRefs].pickerVisible = false;
        }
      }
      if (this[elementRefs] >= 2) {
        this[elementRefs] = 0;
      }
    },
    focusPicker(el) {
      setTimeout(() => {
        let modal = document.querySelector(`.el-popper.${el.id}`);
        let LI = modal.querySelector(`._${el.id}`);
        if (!LI) {
          let node = document.createElement("LI");
          node.classList.add(`_${el.id}`);
          let textnode = document.createTextNode("X");
          node.appendChild(textnode);
          node.addEventListener("click", (event) => {
            let target = event.target;
            let _class = target.getAttribute("class");
            this.$refs[_class.replace("_", "")].pickerVisible = false;
          });
          modal.appendChild(node);
        }
      }, 100);
    },
    showModal() {
      this.$v.$reset();
      sendPageView(`filtro-cargos`, `Buscador - Filtro de Cargos`);
      this.modalVisible = true;
    },
    hideModal() {
      this.$v.$reset();
      sendPageView(``, `Buscador - Filtro`);
      this.modalVisible = false;
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
          let result = inArrayObjectTreeselect(this.search.cargos, item.id);
          if (result && result.data && result.data) {
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
    apply(apply = "apply") {
      this.eventApply = apply;
      this.hideModal();
      this.loadingFrm = true;
      this.formatearDataPOST();
      let beforeForm = beforeOrderFilters(
        this.filters,
        this.applied_filters,
        this.form,
        this.title
      );
      this.$store
        .dispatch("search/filtrar", beforeForm)
        .then((response) => {
          this.updateNumberSelectedCompanies(response.cantidad);
          this.$store.dispatch("filters/addFilters", {
            name: this.title,
            quantity: this.selected_by_cargos,
            cantidades: response,
            items: this.selected_cargos,
          });
          this.areApplied = true;
          this.reapply = false;
          this.loadingFrm = false;
          this.selected_cargos_string = JSON.stringify(this.selected_cargos);
          sendEvent(`filtro-aplicado`, this.title);
        })
        .catch(() => {
          this.loadingFrm = false;
        });
    },
    applyRangeNombramiento() {
      if (this.daterangeFnombramiento || this.daterangeFrenuncia) {
        this.apply("applyRangeNombramiento");
      }
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
      this.form.cargo = [];
      this.selected_cargos = [];
      this.selected_cargos_string = "";
      this.daterange = [];
      this.daterange2 = [];
      this.daterangeFnombramiento = null;
      this.daterangeFrenuncia = null;
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
      this.selected_by_cargos = 0;
      this.$store.dispatch("filters/removeFilters", this.title);
      this.areApplied = false;
      this.reapply = false;
      this.incluir_null = false;
      this.employees_from = "";
      this.employees_to = "";
      sendEvent("filtro-limpiado", this.title);
    },
    emptyFilter() {
      this.form.cargo = [];
      this.selected_cargos = [];
      this.selected_cargos_string = "";
      this.daterange = [];
      this.daterange2 = [];
      this.daterangeFnombramiento = null;
      this.daterangeFrenuncia = null;
      this.updateNumberSelectedCompanies(0);
      this.selected_by_cargos = 0;
      this.$store.dispatch("filters/removeFilters", this.title);
      this.areApplied = false;
      this.reapply = false;
      this.incluir_null = false;
      this.employees_from = "";
      this.employees_to = "";
    },
    handleChange() {
      //province, event
      this.reapply = this.areApplied ? true : this.areApplied;
    },
    formatearDataPOST() {
      this.form.cargo = [];
      this.selected_cargos.forEach((item) => {
        this.form.cargo.push(item.id);
      });
      if (this.both) {
        this.form.cargo.push("status:2");
      } else {
        if (this.active) {
          this.form.cargo.push("status:1");
        } else {
          this.form.cargo.push("status:0");
        }
      }
      if (this.eventApply === "applyRangeNombramiento") {
        if (this.daterangeFnombramiento) {
          this.form.cargo.push(this.daterangeFnombramiento);
        }
        if (this.daterangeFrenuncia) {
          this.form.cargo.push(this.daterangeFrenuncia);
        }
      }
      return this.form;
    },
    selectAll() {
      if (this.all) {
        this.selected_cargos = this.search.cargos;
      } else {
        this.selected_cargos = [];
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./../../sass/filters/filters";
.div-nombramiento {
  display: flex;
  align-items: center;
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 90% !important;
  }
}
</style>
