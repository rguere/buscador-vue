<template>
  <div class="panel panel-default cd" id="filter_estado">
    <div class="panel-heading">
      <p class="panel-title roboto white">
        {{ title }}
        <span class="span-info-right" v-if="selected_by_estados !== 0">
          ({{ selected_by_estados | numeral("0,0") }} empresas
          seleccionadas)
        </span>
      </p>
    </div>
    <div class="panel-body">
      <div v-if="search.estados && search.estados.length !== 0">
        <div class="panel panel-default cd">
          <div class="panel-heading">
            <p class="panel-title roboto white">
              Seleccione los estados que desee agregar a su estrategia de
              búsqueda.
            </p>
          </div>
          <div class="treeselect_estado m-b-10">
            <ul class="nav nav-tabs">
              <li
                v-for="(item, key) in search.estados"
                :key="key"
                :class="tabActivo === item.id ? 'active' : ''"
              >
                <a
                  data-toggle="tab"
                  @click="setTabActivo(item.id)"
                  class="text-white"
                  href="#"
                >{{ item.label }}</a>
              </li>
            </ul>
            <div class="panel-body">
              <div class="tab-content m-t-10">
                <div
                  v-for="(item, key) in search.estados"
                  :key="key"
                  :class="tabActivoClassClass(item.id)"
                >
                  <div>
                    <el-select
                      value-key="id"
                      v-model="selected_estados"
                      filterable
                      placeholder="Selecciona"
                      :disabled="disabledselected_estados"
                    >
                      <el-option
                        v-for="_item in item.children"
                        :key="_item.id"
                        :label="_item.label"
                        :value="_item"
                        :class="_item.special ? 'special' : ''"
                      >
                        <span>{{ _item.label }}</span>
                      </el-option>
                    </el-select>
                    <el-tooltip
                      v-if="ifSelectedTal"
                      class="item"
                      effect="dark"
                      content="Limpiar selección"
                      placement="top-start"
                    >
                      <el-button
                        type="danger"
                        style="float: right; float: right; position: absolute; right: 33px; opacity: 0;"
                        icon="el-icon-delete"
                        circle
                        @click="resteSelet"
                      ></el-button>
                    </el-tooltip>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="panel-body">
            <div class="row" v-if="showSelecCustomEstados">
              <div class="col-md-12">
                <el-collapse v-model="collapseResumen">
                  <el-collapse-item title="Resumen de Estado" name="1">
                    <div class="div-scroll-200 ul_selected_cnae">
                      <el-card
                        shadow="hover"
                        v-for="(item, key) in selected_custom_estados"
                        :key="key"
                      >
                        <label class="custon-checkboxs">
                          <input
                            type="checkbox"
                            v-model="selected_custom_estados"
                            @change="changeResumen($event)"
                            :name="`checkbox_list_${item.id}`"
                            :value="item"
                          />
                          <span class="geekmark"></span>
                          <span class="name-checkbox">
                            <b>{{ item.label }}</b>
                          </span>
                        </label>
                      </el-card>
                    </div>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </div>
          </div>
        </div>
        <div class="flex-space-between-flex-end">
          <div class="btns">
            <button type="button" class="btn btn-warning" @click="showModal">
              Ver detalles
              <i class="fa fa-plus-circle"></i>
            </button>
            <button type="button" class="btn btn-success" v-if="showApplyBtn" @click="apply">
              Aplicar
              <i :class="loadingFrm ? 'fa  fa-spinner fa-spin' : 'fa  fa-send'"></i>
            </button>
            <button type="button" class="btn btn-info" v-if="areApplied" @click="confirmClean">
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
                <button type="button" class="btn btn-success" v-if="showApplyBtn" @click="apply">
                  Aplicar
                  <i
                    :class="
                      loadingFrm ? 'fa  fa-spinner fa-spin' : 'fa  fa-send'
                    "
                  ></i>
                </button>
                <button type="button" class="btn btn-info" v-if="areApplied" @click="confirmClean">
                  Limpiar
                  <i class="fa fa-undo"></i>
                </button>
              </div>
            </div>
            <div class="row" v-if="search.estados && search.estados.length !== 0">
              <div class="col-md-7">
                <div class="row">
                  <div class="col-md-12">
                    <div class="panel panel-default cd">
                      <div class="panel-heading">
                        <p class="panel-title roboto white">
                          Seleccione los estados que desee agregar a su
                          estrategia de búsqueda.
                        </p>
                      </div>
                      <div class="treeselect_estado m-b-10">
                        <ul class="nav nav-tabs">
                          <li
                            v-for="(item, key) in search.estados"
                            :key="key"
                            :class="tabActivo === item.id ? 'active' : ''"
                          >
                            <a
                              data-toggle="tab"
                              @click="setTabActivo(item.id)"
                              class="text-white"
                              href="#"
                            >{{ item.label }}</a>
                          </li>
                        </ul>
                        <div class="panel-body">
                          <div class="tab-content m-t-10">
                            <div
                              v-for="(item, key) in search.estados"
                              :key="key"
                              :class="tabActivoClassClass(item.id)"
                            >
                              <div>
                                <el-select
                                  value-key="id"
                                  v-model="selected_estados"
                                  filterable
                                  placeholder="Selecciona"
                                  :disabled="disabledselected_estados"
                                >
                                  <el-option
                                    v-for="_item in item.children"
                                    :key="_item.id"
                                    :label="_item.label"
                                    :value="_item"
                                    :class="_item.special ? 'special' : ''"
                                  >
                                    <span>{{ _item.label }}</span>
                                  </el-option>
                                </el-select>
                                <el-tooltip
                                  v-if="ifSelectedTal"
                                  class="item"
                                  effect="dark"
                                  content="Limpiar selección"
                                  placement="top-start"
                                >
                                  <el-button
                                    type="danger"
                                    style="float: right; float: right; position: absolute; right: 33px; opacity: 0;"
                                    icon="el-icon-delete"
                                    circle
                                    @click="resteSelet"
                                  ></el-button>
                                </el-tooltip>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-5">
                <div class="row" v-if="showSelecCustomEstados">
                  <div class="col-md-12">
                    <el-collapse v-model="collapseResumen2">
                      <el-collapse-item title="Resumen de Estado" name="1">
                        <div class="div-scroll-200 ul_selected_cnae">
                          <el-card
                            shadow="hover"
                            v-for="(item, key) in selected_custom_estados"
                            :key="key"
                          >
                            <label class="custon-checkboxs">
                              <input
                                type="checkbox"
                                v-model="selected_custom_estados"
                                @change="changeResumen($event)"
                                :name="`checkbox_list_${item.id}`"
                                :value="item"
                              />
                              <span class="geekmark"></span>
                              <span class="name-checkbox">
                                <b>{{ item.label }}</b>
                              </span>
                            </label>
                          </el-card>
                        </div>
                      </el-collapse-item>
                    </el-collapse>
                  </div>
                </div>
              </div>
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
import {
  howAnimation,
  beforeOrderFilters,
  removeDuplicates,
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
    compareWithNewtoApply: function () {
      let stg = this.selected_custom_estados_string;
      let obj = JSON.stringify(this.selected_custom_estados);
      return stg === obj;
    },
    compareWithNewtoApplySelectedEstados: function () {
      let stg = this.selected_estados_string;
      let obj = JSON.stringify(this.selected_estados);
      return stg === obj;
    },
    ifSelectedTal() {
      return (
        this.selected_estados &&
        this.selected_estados.label &&
        this.selected_estados.label.length !== 0
      );
    },
    showSelecCustomEstados() {
      return (
        this.selected_custom_estados && this.selected_custom_estados.length > 0
      );
    },
    showApplyBtn() {
      return (
        (this.selected_estados &&
          this.selected_estados.label &&
          this.selected_estados.label.length !== 0 &&
          !this.areApplied) ||
        (this.selected_estados &&
          this.selected_estados.label &&
          this.selected_estados.label.length !== 0 &&
          !this.compareWithNewtoApply)

        //   ||
        // (this.selected_estados &&
        //   this.selected_estados.label &&
        //   this.selected_estados.label.length !== 0 &&
        //   this.areApplied &&
        //   !this.compareWithNewtoApplySelectedEstados)
      );
    },
  },
  data: () => ({
    title: "Estado",
    collapseResumen: [],
    collapseResumen2: ["1"],
    tabActivo: "children_activas",
    disabledselected_estados: false,
    treDisabled: false,
    selected_custom_estados_string: "",
    selected_estados: null,
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
    custom_estados: [],
    selected_custom_estados: [],
  }),
  watch: {
    selected_estados: function (newEstado) {
      const isSE = newEstado && newEstado.label && newEstado.label.length > 0;
      this.selected_by_estados = newEstado && isSE ? 1 : 0;
      if (isSE) {
        this.disabledselected_estados = true;
        this.selected_estados.apply = false;
        this.selected_custom_estados = this.selected_custom_estados.filter(
          (item) => item.apply === true
        );
        if (
          this.selected_estados.id === 0 &&
          this.search &&
          this.search.estados[0] &&
          this.search.estados[0].children
        ) {
          const children = [...this.search.estados[0].children];
          for (const s_item of children) {
            this.selected_custom_estados.push({
              ...s_item,
              apply: true,
            });
          }
        }
        if (
          this.selected_estados.id === 70 &&
          this.search &&
          this.search.estados[0] &&
          this.search.estados[0].children
        ) {
          const children = [...this.search.estados[2].children];
          for (const s_item of children) {
            this.selected_custom_estados.push({
              ...s_item,
              apply: true,
            });
          }
        }
        this.selected_custom_estados.push(this.selected_estados);
        this.selected_custom_estados = removeDuplicates(
          this.selected_custom_estados,
          "id"
        );
      }
      if (this.reapply && !isSE) {
        this.clean();
      }
    },
    selected_custom_estados: function (selected_custom) {
      if (this.reapply && selected_custom.length === 0) {
        this.clean();
      }
    },
    selected_by_estados: function (newValue) {
      if (newValue === 0) this.selected_estados = null;
    },
    selected_companies: function () {
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
    changeResumen(event) {
      event.preventDefault();
      let checkboxs = document.querySelectorAll(
        '.ul_selected_cnae input[type="checkbox"]'
      );
      checkboxs.forEach((item) => {
        item.checked = true;
      });

      this.reapply = this.areApplied ? true : this.areApplied;

      if (
        this.selected_custom_estados &&
        this.selected_custom_estados.length === 0
      ) {
        this.clean();
      }
    },
    resteSelet() {
      this.treDisabled = false;
      this.disabledselected_estados = false;
      this.selected_estados = null;
      this.selected_custom_estados = this.selected_custom_estados.filter(
        (item) => item.apply === true
      );
    },
    setTabActivo(tab) {
      this.tabActivo = tab;
      this.resteSelet();
    },
    tabActivoClassClass(tap) {
      return this.tabActivo === tap
        ? "tab-pane fade in active"
        : "tab-pane fade";
    },
    showModal() {
      sendPageView(`filtro-estado`, `Buscador - Estado`);
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
    apply() {
      if (
        this.selected_estados &&
        this.selected_estados.label &&
        this.selected_estados.label.length !== 0
      ) {
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
            this.selected_custom_estados.push(this.selected_estados);
            this.selected_custom_estados = removeDuplicates(
              this.selected_custom_estados,
              "id"
            );
            this.selected_custom_estados.map((item) => {
              item.apply = true;
              return item;
            });
            this.updateNumberSelectedCompanies(response.cantidad);
            this.$store.dispatch("filters/addFilters", {
              name: this.title,
              quantity: this.selected_by_estados,
              cantidades: response,
              items: this.selected_custom_estados,
            });
            this.areApplied = true;
            this.reapply = false;
            this.loadingFrm = false;
            this.selected_custom_estados_string = JSON.stringify(
              this.selected_custom_estados
            );
            this.selected_estados_string = JSON.stringify(
              this.selected_estados
            );
            this.ahnos_from = "";
            this.ahnos_to = "";
            this.custom_estados = [];
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
      this.form.estado = [];
      this.selected_estados = null;
      this.selected_custom_estados_string = "";
      this.selected_estados_string = "";
      this.resteSelet();
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
      this.custom_estados = [];
      this.selected_custom_estados = [];
      sendEvent("filtro-limpiado", this.title);
    },
    emptyFilter() {
      this.form.estado = [];
      this.selected_estados = null;
      this.selected_custom_estados_string = "";
      this.selected_estados_string = "";
      this.resteSelet();
      this.updateNumberSelectedCompanies(0);
      this.selected_by_estados = 0;
      (this.daterange = [null, null]),
        this.$store.dispatch("filters/removeFilters", this.title);
      this.areApplied = false;
      this.reapply = false;
      this.incluir_null = false;
      this.ahnos_from = "";
      this.ahnos_to = "";
      this.custom_estados = [];
      this.selected_custom_estados = [];
    },
    handleChange() {
      //province, event
      this.reapply = this.areApplied ? true : this.areApplied;
    },
    formatearDataPOST() {
      let estados = [];
      this.form.estado = [];
      this.selected_custom_estados.forEach((item) => {
        if (item.id === 6) {
          estados.push(`17-${item.label}`);
        }
        estados.push(`${item.id}-${item.label}`);
      });
      this.form.estado = estados;
      return this.form;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./../../sass/filters/filters";
.nav.nav-tabs {
  li.active a {
    color: #fff !important;
  }
}
.nav-tabs {
  border-bottom: none !important;
}
.treeselect_estado {
  .el-select {
    width: 100%;
  }
}
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
