<template>
  <div class="panel panel-default cd" id="filter_estado">
    <div class="panel-heading">
      <p class="panel-title roboto white">
        {{ title }}
        <span class="span-info-right" v-if="selected_by_estados !== 0"
          >({{ selected_by_estados | numeral("0,0") }} empresas
          seleccionadas)</span
        >
      </p>
    </div>
    <div class="panel-body">
      <div v-if="search.estados && search.estados.length !== 0">
        <div class="grid-3-columns-1fr">
          <div v-for="(item, key) in search.estados" :key="key">
            <label
              class="custon-checkboxs"
              v-if="item.label !== 'incluir_null'"
            >
              <input
                type="checkbox"
                :name="`checkbox_antiguedad_${item.id}`"
                v-model="selected_estados"
                @change="handleChange()"
                :id="`checkbox_antiguedad_${item.id}`"
                :value="item"
              />
              <span class="geekmark"></span>
              <span class="name-checkbox">{{ item.label }}</span>
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
                (selected_estados.length !== 0 && !areApplied) ||
                  (selected_estados.length !== 0 && !compareWithNewtoApply)
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
            <!-- <div class="checkboxs-resaldado float-right" v-if="itemIncluirNull">
              <label class="custon-checkboxs">
                <input
                  type="checkbox"
                  v-model="selected_estados"
                  :value="itemIncluirNull"
                  @change="handleChange()"
                  name
                />
                <span class="geekmark"></span>
                <span class="title"
                  >Incluir aquellas empresas en las que se desconoce su
                  Estado</span
                >
              </label>
            </div> -->
          </div>
        </div>
        <div v-if="custom_antiquity.length !== 0">
          <hr />
          <p style="margin: 0 0 10px 19px;">Renglon personalizado</p>
          <div
            v-for="(item, key) in custom_antiquity"
            :key="key"
            class="checkbox"
          >
            <label
              class="custon-checkboxs"
              v-if="item.label !== 'incluir_null'"
            >
              <input
                type="checkbox"
                :name="`__checkbox_empleados__${item.id}`"
                v-model="selected_custom_estados"
                @change="handleChange()"
                :id="`__checkbox_empleados__${item.id}`"
                :value="item"
              />
              <span class="geekmark"></span>
              <span class="name-checkbox">{{ item.label }}</span>
              <span class="num-fil">({{ item.data | numeral("0,0") }})</span>
            </label>
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
                    (selected_estados.length !== 0 && !areApplied) ||
                      (selected_estados.length !== 0 && !compareWithNewtoApply)
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
              v-if="search.estados && search.estados.length !== 0"
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos
              voluptatum facilis atque optio, distinctio laborum. Repellat
              suscipit soluta fugit consequuntur velit quibusdam quidem est
              distinctio qui, nulla doloribus enim id.
            </div>
          </div>
        </el-dialog>
      </div>
      <div
        v-if="search.estados && search.estados.length === 0 && !loading"
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
  name: "filter-estado",
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
    itemIncluirNull: function() {
      let include = this.search.estados.filter(function(item) {
        return item.label === "incluir_null";
      });
      return include ? include[0] : null;
    },
    compareWithNewtoApply: function() {
      let stg = this.selected_estados_string;
      let obj = JSON.stringify(this.selected_estados);
      return stg === obj;
    },
  },
  data: () => ({
    title: "Estado",
    selected_estados_string: "",
    selected_estados: [],
    list_estados: [],
    selected_by_estados: 0,
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
    daterange: [null, null],
    loadingDaterange: false,
    loadingAhnos: false,
    daterange_incluir_null: false,
    ahnos_to: "",
    ahnos_from: "",
    incluir_null: false,
    all: false,
    pickerOptions: {
      disabledDate(time) {
        return time.getTime() > Date.now();
      },
    },
    desdePicker: 0,
    hastaPicker: 0,
    custom_antiquity: [],
    selected_custom_estados: [],
  }),
  validations() {
    return {
      ahnos_from: {
        required,
        between: maxLength(3),
        numeric,
      },
      ahnos_to: {
        required,
        between: maxLength(3),
        numeric,
      },
    };
  },
  watch: {
    selected_estados: function(newProvincesLocalidad) {
      this.selected_by_estados = this.numberCompaniesSelected(
        this.isAllProvincesLocalidad(newProvincesLocalidad)
          ? this.search.estados
          : newProvincesLocalidad
      );
      if (this.reapply && newProvincesLocalidad.length === 0) {
        this.clean();
      }
    },
    selected_custom_estados: function(selected_custom) {
      if (this.reapply && selected_custom.length === 0) {
        this.clean();
      }
    },
    selected_by_estados: function(newValue) {
      if (newValue === 0) this.selected_estados = [];
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
    fetchSearch() {
      // this.$store.dispatch('search/fetchSearch').then(() => {
      //   this.options[0].children = (this.search && this.search.estados) ? this.search.estados : []
      // })
    },
    showModal() {
      sendPageView(`filtro-estado`, `Buscador - Estado`);
      this.$v.$reset();
      this.modalVisible = true;
    },
    hideModal() {
      sendPageView(``, `Buscador - Filtro`);
      this.$v.$reset();
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
          let result = inArrayObjectTreeselect(this.search.estados, item.id);
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
      if (this.selected_estados && this.selected_estados.length !== 0) {
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
              quantity: this.selected_by_estados,
              cantidades: response,
              items: this.selected_estados,
            });
            this.areApplied = true;
            this.reapply = false;
            this.loadingFrm = false;
            this.selected_estados_string = JSON.stringify(
              this.selected_estados
            );
            this.ahnos_from = "";
            this.ahnos_to = "";
            this.custom_antiquity = [];
            this.$v.$reset();
            sendEvent(`filtro-aplicado`, this.title);
          })
          .catch(() => {
            this.loadingFrm = false;
          });
      }
    },
    applyRange() {
      if (
        this.daterange &&
        this.daterange.length !== 0 &&
        this.daterange[0] !== 0 &&
        this.daterange[1] !== 0
      ) {
        this.hideModal();
        this.loadingDaterange = true;
        this.form.antiguedad = [];
        this.form.antiguedad.push(`fechas:${this.daterange.join("|")}`);
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
              quantity: this.selected_by_estados,
              cantidades: response,
              items: this.selected_estados,
            });
            this.areApplied = true;
            this.reapply = false;
            this.loadingDaterange = false;
            this.selected_estados_string = JSON.stringify(
              this.selected_estados
            );
            this.ahnos_from = "";
            this.ahnos_to = "";
            this.custom_antiquity = [];
            this.$v.$reset();
            sendEvent(`filtro-aplicado`, this.title);
          })
          .catch(() => {
            this.loadingDaterange = false;
          });
      }
    },
    applyAhnos() {
      if (this.custom_antiquity && this.custom_antiquity.length > 0) {
        this.loadingAhnos = true;
        this.form.antiguedad = [];
        this.selected_estados = [];
        this.form.antiguedad.push(this.custom_antiquity[0].id);
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
              quantity: this.selected_by_estados,
              cantidades: response,
              items: this.selected_custom_estados,
            });
            this.areApplied = true;
            this.reapply = false;
            this.loadingAhnos = false;
            this.selected_estados_string = JSON.stringify(
              this.selected_estados
            );
            this.hideModal();
            sendEvent(`filtro-aplicado`, this.title);
          })
          .catch(() => {
            this.loadingAhnos = false;
          });
      }
    },
    searchAhnos() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.loadingAhnos = true;
        this.form.antiguedad = [];
        this.ahnos_to = Number.parseInt(this.ahnos_to);
        this.ahnos_from = Number.parseInt(this.ahnos_from);
        let major =
          this.ahnos_to > this.ahnos_from ? this.ahnos_to : this.ahnos_from;
        let smaller =
          this.ahnos_to > this.ahnos_from ? this.ahnos_from : this.ahnos_to;
        this.form.antiguedad.push(`ahnos:${smaller}|${major}`);
        let beforeForm = beforeOrderFilters(
          this.filters,
          this.applied_filters,
          this.form,
          this.title
        );
        this.$store
          .dispatch("search/filtrar", beforeForm)
          .then((response) => {
            if (response && response.cantidad) {
              this.custom_antiquity = [];
              this.selected_custom_estados = [];
              let item = {
                id: `ahnos:${smaller}|${major}`,
                data: response.cantidad,
                label: `De ${smaller} a ${major} años`,
              };
              this.custom_antiquity[0] = item;
              this.selected_custom_estados[0] = item;
            }
            this.loadingAhnos = false;
          })
          .catch(() => {
            this.loadingAhnos = false;
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
      this.form.antiguedad = [];
      this.selected_estados = [];
      this.selected_estados_string = "";
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
      this.selected_by_estados = 0;
      (this.daterange = [null, null]),
        this.$store.dispatch("filters/removeFilters", this.title);
      this.areApplied = false;
      this.reapply = false;
      this.incluir_null = false;
      this.ahnos_from = "";
      this.ahnos_to = "";
      this.custom_antiquity = [];
      sendEvent("filtro-limpiado", this.title);
    },
    emptyFilter() {
      this.form.antiguedad = [];
      this.selected_estados = [];
      this.selected_estados_string = "";
      this.updateNumberSelectedCompanies(0);
      this.selected_by_estados = 0;
      (this.daterange = [null, null]),
        this.$store.dispatch("filters/removeFilters", this.title);
      this.areApplied = false;
      this.reapply = false;
      this.incluir_null = false;
      this.ahnos_from = "";
      this.ahnos_to = "";
      this.custom_antiquity = [];
    },
    handleChange() {
      //province, event
      this.reapply = this.areApplied ? true : this.areApplied;
    },
    formatearDataPOST() {
      this.form.antiguedad = [];
      this.selected_estados.forEach((item) => {
        this.form.antiguedad.push(item.id);
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
</style>
