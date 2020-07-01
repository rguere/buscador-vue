<template>
  <div
    :class="`panel panel-default cd structure02`"
    id="filter_tipo_de_cuentas"
  >
    <div class="panel-heading">
      <p class="panel-title roboto white">
        {{ title }}
        <span class="span-info-right" v-if="selected_by_tipo_cuentas !== 0"
          >({{ selected_by_tipo_cuentas | numeral("0,0") }} empresas
          seleccionadas)</span
        >
      </p>
    </div>
    <div class="panel-body">
      <div v-if="search.tipo_cuentas && search.tipo_cuentas.length !== 0">
        <div class="flex_tipoCuentas">
          <div
            v-for="(item, key) in orderItems(search.tipo_cuentas)"
            :key="key"
          >
            <label
              class="custon-checkboxs"
              v-if="item.label !== 'incluir_null'"
            >
              <input
                type="checkbox"
                :name="`checkbox_TipoCuentas_${item.id}`"
                v-model="tipo_cuentas"
                @change="handleChange()"
                :id="`checkbox_TipoCuentas_${item.id}`"
                :value="item"
              />
              <span class="geekmark"></span>
              <span class="name-checkbox">{{ inPlural(item.label) }}</span>
              <span class="num-fil">({{ item.data | numeral("0,0") }})</span>
            </label>
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
                (tipo_cuentas.length !== 0 && !areApplied) ||
                  (tipo_cuentas.length !== 0 && !compareWithNewtoApply)
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
          <div>
            <div class="float-right">
              <label class="custon-checkboxs" style="color: #333333c9;">
                <input type="checkbox" name="5MM" disabled checked />
                <span class="geekmark"></span>
                <span class="name-checkbox">solo cuentas con +5MM</span>
              </label>
            </div>
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
                    (tipo_cuentas.length !== 0 && !areApplied) ||
                      (tipo_cuentas.length !== 0 && !compareWithNewtoApply)
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
            <div
              class="row"
              v-if="search.tipo_cuentas && search.tipo_cuentas.length !== 0"
            >
              <div class="col-md-6">
                <div class="panel panel-default cd">
                  <div class="panel-heading">
                    <p class="panel-title roboto white">
                      Seleccionar empresas por tipo de cuentas.
                      <span
                        class="span-info-right"
                        v-if="selected_by_tipo_cuentas !== 0"
                        >({{
                          selected_by_tipo_cuentas | numeral("0,0")
                        }}
                        empresas seleccionadas)</span
                      >
                    </p>
                  </div>
                  <div class="panel-body">
                    <div class="row">
                      <div class="col-md-12">
                        <div
                          v-for="(item, key) in orderItems(search.tipo_cuentas)"
                          :key="key"
                        >
                          <label
                            class="custon-checkboxs"
                            v-if="item.label !== 'incluir_null'"
                          >
                            <input
                              type="checkbox"
                              :name="`checkbox_TipoCuentas___${item.id}`"
                              v-model="tipo_cuentas"
                              @change="handleChange()"
                              :id="`checkbox_TipoCuentas___${item.id}`"
                              :value="item"
                            />
                            <span class="geekmark"></span>
                            <span class="name-checkbox">{{
                              inPlural(item.label)
                            }}</span>
                            <span class="num-fil"
                              >({{ item.data | numeral("0,0") }})</span
                            >
                          </label>
                        </div>
                      </div>
                      <div class="col-md-12">
                        <div class="float-right">
                          <label
                            class="custon-checkboxs"
                            style="color: #333333c9;"
                          >
                            <input
                              type="checkbox"
                              name="5MM"
                              disabled
                              checked
                            />
                            <span class="geekmark"></span>
                            <span class="name-checkbox"
                              >solo cuentas con +5MM</span
                            >
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="row">
                  <div class="col-md-12">
                    <div class="panel panel-default cd">
                      <div class="panel-heading">
                        <p class="panel-title roboto white">
                          Tipo de cuentas seleccionados
                          <span
                            class="span-info-right"
                            v-if="tipo_cuentas.length !== 0"
                            >{{ tipo_cuentas.length }}</span
                          >
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="panel panel-default cd">
                      <div class="panel-heading">
                        <p class="panel-title roboto white">
                          Empresas seleccionadas
                          <span
                            class="span-info-right"
                            v-if="selected_by_tipo_cuentas !== 0"
                            >({{
                              selected_by_tipo_cuentas | numeral("0,0")
                            }}
                            empresas seleccionadas)</span
                          >
                        </p>
                      </div>
                      <div class="panel-body">
                        <div class id="selected_tipo_cuentas">
                          <div v-for="(item, key) in tipo_cuentas" :key="key">
                            <label
                              class="custon-checkboxs"
                              v-if="
                                item.label !== 'incluir_null' &&
                                  item.id !== 'todos:true' &&
                                  item.id !== 'todos:false'
                              "
                            >
                              <input
                                type="checkbox"
                                :name="
                                  `checkbox_cuentas_disponibles__${item.id}`
                                "
                                v-model="tipo_cuentas"
                                @change="handleChangeList(item, $event)"
                                :id="`checkbox_cuentas_disponibles__${item.id}`"
                                :value="item"
                              />
                              <span class="geekmark"></span>
                              <span class="name-checkbox">{{
                                inPlural(item.label)
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
            </div>
          </div>
        </el-dialog>
      </div>
      <div
        v-if="
          search.tipo_cuentas && search.tipo_cuentas.length === 0 && !loading
        "
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
import {
  inArrayObjectTreeselect,
  howAnimation,
  beforeOrderFilters,
  sendPageView,
  sendEvent,
} from "./../../utils";
import { persistentData } from "./../../mixins/persistent-data";
export default {
  name: "filter-tipo-cuentas",
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
      let stg = this.tipo_cuentas_string;
      let obj = JSON.stringify(this.tipo_cuentas);
      return stg === obj;
    },
  },
  data: () => ({
    title: "Tipo de cuentas",
    tipo_cuentas_string: "",
    tipo_cuentas: [],
    list_tipo_cuentas: [],
    selected_by_tipo_cuentas: 0,
    options: [
      {
        id: "all",
        label: "TODA ESPAÑA",
        isDefaultExpanded: true,
        children: [],
      },
    ],
    areApplied: false,
    reapply: false,
    showBtnApply: false,
    loadingFrm: false,
    modalVisible: false,
    all: false,
    custom_tipo_cuentas: [],
    selected_custom_tipo_cuentas: [],
  }),
  watch: {
    tipo_cuentas: function(newProvincesLocalidad) {
      this.selected_by_tipo_cuentas = this.numberCompaniesSelected(
        this.isAllProvincesLocalidad(newProvincesLocalidad)
          ? this.search.tipo_cuentas
          : newProvincesLocalidad
      );
      if (this.reapply && newProvincesLocalidad.length === 0) {
        this.clean();
      }
    },
    selected_custom_tipo_cuentas: function(selected_custom) {
      if (this.reapply && selected_custom.length === 0) {
        this.clean();
      }
    },
    selected_by_tipo_cuentas: function(newValue) {
      if (newValue === 0) this.tipo_cuentas = [];
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
    inPlural(text) {
      if (text === "Individual") {
        text = "Individuales";
      } else if (text === "Consolidada") {
        text = "Consolidadas";
      }
      return text;
    },
    orderItems(items) {
      let order = [{}, {}];
      for (const item of items) {
        if (item.id === "1") {
          order[0] = item;
        } else if (item.id === "5") {
          order[1] = item;
        }
        // else if (item.id === "100") {
        //   order[2] = item;
        // }
      }
      return order;
    },
    showModal() {
      sendPageView(`filtro-TipoCuentas`, `Buscador - Tipo de cuentas`);
      this.modalVisible = true;
    },
    hideModal() {
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
          let result = inArrayObjectTreeselect(
            this.search.tipo_cuentas,
            item.id
          );
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
      if (this.tipo_cuentas && this.tipo_cuentas.length !== 0) {
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
              quantity: this.selected_by_tipo_cuentas,
              cantidades: response,
              items: this.tipo_cuentas,
            });
            this.areApplied = true;
            this.reapply = false;
            this.loadingFrm = false;
            this.tipo_cuentas_string = JSON.stringify(this.tipo_cuentas);
            this.ahnos_from = "";
            this.ahnos_to = "";
            this.custom_tipo_cuentas = [];
            sendEvent(`filtro-aplicado`, this.title);
          })
          .catch(() => {
            this.loadingFrm = false;
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
      this.form.TipoCuentas = [];
      this.tipo_cuentas = [];
      this.tipo_cuentas_string = "";
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
      this.selected_by_tipo_cuentas = 0;
      (this.daterange = [null, null]),
        this.$store.dispatch("filters/removeFilters", this.title);
      this.areApplied = false;
      this.reapply = false;
      this.incluir_null = false;
      this.ahnos_from = "";
      this.ahnos_to = "";
      this.custom_tipo_cuentas = [];
      sendEvent("filtro-limpiado", this.title);
    },
    emptyFilter() {
      this.form.TipoCuentas = [];
      this.tipo_cuentas = [];
      this.tipo_cuentas_string = "";
      this.updateNumberSelectedCompanies(0);
      this.selected_by_tipo_cuentas = 0;
      (this.daterange = [null, null]),
        this.$store.dispatch("filters/removeFilters", this.title);
      this.areApplied = false;
      this.reapply = false;
      this.incluir_null = false;
      this.ahnos_from = "";
      this.ahnos_to = "";
      this.custom_tipo_cuentas = [];
    },
    handleChange() {
      //province, event
      this.reapply = this.areApplied ? true : this.areApplied;
    },
    handleChangeList(elemet, event) {
      event.preventDefault();
      this.reapply = this.areApplied ? true : this.areApplied;
      let checkboxs = document.querySelectorAll(
        '#selected_tipo_cuentas input[type="checkbox"]'
      );
      checkboxs.forEach((item) => {
        item.checked = true;
      });
    },
    formatearDataPOST() {
      this.form.TipoCuentas = [];
      this.tipo_cuentas.forEach((item) => {
        this.form.TipoCuentas.push(item.id);
      });
      return this.form;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./../../sass/filters/filters";

.block {
  display: flex;
  flex-direction: column;

  .demonstration {
    margin-bottom: 3px;
  }

  .el-date-editor {
    width: 100%;
  }
}

.float-right {
  float: right;
}
.bg-g {
  width: 50%;
}

.el-range-editor--medium.el-input__inner {
  width: 100%;
}

.anti-inputs {
  display: flex;
  align-items: center;
  input {
    width: 50%;
    margin: 0 5px;
  }
}

.conten-epa {
  padding: 55px 0;
}

.checkbox input[type="checkbox"] {
  margin-left: 15px;
}

.structure02 {
  .flex_tipoCuentas {
    display: flex;
    > div {
      margin-right: 30px;
    }
  }
}
</style>
