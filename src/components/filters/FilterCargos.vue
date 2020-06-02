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
              v-if="
                (selected_cargos.length !== 0 && !areApplied) ||
                  (selected_cargos.length !== 0 && !compareWithNewtoApply)
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
                  v-if="
                    (selected_cargos.length !== 0 && !areApplied) ||
                      (selected_cargos.length !== 0 && !compareWithNewtoApply)
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
                          Seleccione el(los) cargo(s) que desee incorporar a su
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
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="panel panel-default cd">
                      <div class="panel-heading">
                        <p class="panel-title roboto white">
                          Seleccione si el(los) cargo(s) elegido(s) están
                          activos, inactivos o ambas
                        </p>
                      </div>
                      <div class="panel-body">
                        <!-- <div class="row">
                        <div class="col-md-12">
                          <div class="form-group">
                            <label class="control-label"
                              >Insertar la antigüedad de la(s) empresa(s) en
                              número de años</label
                            >
                          </div>
                        </div>
                        <div class="col-md-4">
                          <div
                            class="form-group"
                            :class="{
                              'has-error has-feedback': $v.employees_from.$error,
                            }"
                          >
                            <label class="control-label" for="employees_from">
                              De (incluido)
                              <img
                                src="./../../assets/images/user-tie.svg"
                                style="width: 20px;"
                                alt="user-tie"
                              />
                            </label>
                            <input
                              type="text"
                              v-model.trim="$v.employees_from.$model"
                              required
                              class="form-control"
                              name="employees_from"
                              id="employees_from"
                            />
                          </div>
                        </div>
                        <div class="col-md-4">
                          <div
                            class="form-group"
                            :class="{
                              'has-error has-feedback': $v.employees_to.$error,
                            }"
                          >
                            <label class="control-label" for="employees_to">
                              Hasta (incluido)
                              <img
                                src="./../../assets/images/user-tie.svg"
                                style="width: 20px;"
                                alt="user-tie"
                              />
                            </label>
                            <input
                              type="text"
                              v-model.trim="$v.employees_to.$model"
                              required
                              class="form-control"
                              name="employees_to"
                              id="employees_to"
                            />
                          </div>
                        </div>
                        <div class="col-md-4">
                          <button
                            type="button"
                            class="btn btn-info"
                            @click="applyCargos"
                            :disabled="$v.$invalid || loadingCargos"
                          >
                            BUSCAR
                            <i
                              :class="
                                loadingCargos
                                  ? 'fa  fa-spinner fa-spin'
                                  : 'fa  fa-search'
                              "
                            ></i>
                          </button>
                        </div>
                      </div> -->
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
                  <div
                    class="panel-body"
                    style="max-height: 300px; overflow-y: scroll;"
                  >
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
                          <span class="name-checkbox"
                            >{{ item.id }} - {{ item.label }}</span
                          >
                          <span class="num-fil" v-if="item.id != 'all'"
                            >({{ item.data | numeral("0,0") }})</span
                          >
                        </label>
                      </li>
                      <li
                        v-for="(item, key) in selected_industria"
                        :key="`_${key}`"
                      >
                        <label class="custon-checkboxs">
                          <input
                            type="checkbox"
                            :name="`checkbox_list_${item.id}`"
                            v-model="selected_industria"
                            @change="handleChangeList(item, $event)"
                            :id="`checkbox_list_${item.id}`"
                            :value="item"
                          />
                          <span class="geekmark"></span>
                          <span class="name-checkbox"
                            >{{ item.id }} - {{ item.label }}</span
                          >
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
    loadingDaterange: false,
    loadingCargos: false,
    daterange_incluir_null: false,
    employees_to: "",
    employees_from: "",
    incluir_null: false,
    all: false,
    active: true,
    both: false,
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
    selected_cargos: function(newProvincesLocalidad) {
      this.selected_by_cargos = this.numberCompaniesSelected(
        this.isAllProvincesLocalidad(newProvincesLocalidad)
          ? this.search.cargos
          : newProvincesLocalidad
      );
      if (this.reapply && newProvincesLocalidad.length === 0) {
        this.clean();
      }
    },
    selected_by_cargos: function(newValue) {
      if (newValue === 0) this.selected_cargos = [];
    },
    selected_companies: function() {
      howAnimation(document.querySelector(".selected_companies"));
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
    apply() {
      if (this.selected_cargos && this.selected_cargos.length !== 0) {
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
      }
    },
    applyCargos() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.hideModal();
        this.loadingCargos = true;
        this.form.cargo = [];
        this.selected_cargos = [];
        this.selected_cargos_string = JSON.stringify(this.selected_cargos);
        let employees_from = parseInt(this.employees_from, 10),
          employees_to = parseInt(this.employees_to, 10),
          mayor = 0,
          menor = 0;
        if (employees_from > employees_to) {
          mayor = employees_from;
          menor = employees_to;
        } else {
          mayor = employees_to;
          menor = employees_from;
        }
        this.form.cargo.push(`cargos:${menor}|${mayor}`);
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
              items: [],
            });
            this.areApplied = true;
            this.reapply = false;
            this.loadingCargos = false;
            this.selected_cargos_string = JSON.stringify(this.selected_cargos);
          })
          .catch(() => {
            this.loadingCargos = false;
          });
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
</style>
