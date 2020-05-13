<template>
  <div class="panel panel-default cd" id="filter_auditores">
    <div class="panel-heading">
      <p class="panel-title roboto white">
        {{ title }}
        <span class="span-info-right" v-if="selected_by_auditores !== 0"
          >({{ selected_by_auditores | numeral("0,0") }} empresas
          seleccionadas)</span
        >
      </p>
    </div>
    <div class="panel-body">
      <form v-on:submit.prevent="validateBormeAuditor" class="m-b-10">
        <div class="form-group">
          <textarea
            v-model="dataFrm"
            id="auditores1"
            class="form-control"
            placeholder="Introduce los códigos Roac o nombres de los auditores, separados por coma o salto de línea, y clicar en “BUSCAR”"
            title="Introduce los códigos Roac o nombres de los auditores, separados por coma o salto de línea, y clicar en “BUSCAR”"
          ></textarea>
        </div>
        <div class="flex-space-between-flex-end">
          <div>
            <button
              title="Ver top 10"
              @click="show_top_10 = !show_top_10"
              type="button"
              class="btn btn-link"
            >
              Ver top 10 Auditores
            </button>
          </div>
          <div>
            <button
              title="BUSCAR"
              type="button"
              class="btn btn-info"
              @click="validateBormeAuditor"
              :disabled="dataFrm.length === 0 || loadingValidar"
            >
              BUSCAR
              <i :class="iconBtnBuscar"></i>
            </button>
          </div>
        </div>
      </form>
      <div v-show="show_top_10">
        <div class="row">
          <div class="col-md-12">
            <div class="div-scroll-200 mb-5">
              <div v-for="(item, key) in search.auditor" :key="key">
                <label class="custon-checkboxs">
                  <input
                    type="checkbox"
                    :name="`checkbox_top_10${item.id}`"
                    v-model="selected_auditores"
                    @change="handleChange(item, $event)"
                    :id="`checkbox_top_10${item.id}`"
                    :value="item"
                  />
                  <span class="geekmark"></span>
                  <span class="name-checkbox">{{ item.label }}</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="panel panel-default cd"
        v-if="auditores && auditores.empresas.length !== 0 && !search_edit"
      >
        <div class="panel-body">
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label class>{{ dataFrm }}</label>
              </div>
            </div>
          </div>
          <div class="div-scroll-200">
            <div v-for="(item, key) in auditores.empresas" :key="key">
              <label class="custon-checkboxs">
                <input
                  type="checkbox"
                  :name="`checkbox_${item.id}`"
                  v-model="selected_auditores"
                  @change="handleChange(item, $event)"
                  :id="`checkbox_${item.id}`"
                  :value="item"
                />
                <span class="geekmark"></span>
                <span class="name-checkbox">{{ item.label }}</span>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="flex-space-between-flex-end">
        <div>
          <button class="btn btn-warning m-r-5" @click="showModal">
            Ver detalles
            <i class="fa fa-plus-circle"></i>
          </button>
          <button
            v-if="
              selected_auditores &&
                selected_auditores.length !== 0 &&
                !compareWithNewtoApply
            "
            :disabled="selected_auditores.length === 0 || loadingApply"
            type="button"
            class="btn btn-success m-r-5"
            @click="apply"
          >
            Aplicar
            <i
              :class="loadingApply ? 'fa  fa-spinner fa-spin' : 'fa  fa-send'"
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
        v-if="list_selected_auditores && list_selected_auditores.length !== 0"
      >
        <div class="col-md-12">
          <br />
          <el-collapse v-model="collapseResumen">
            <el-collapse-item
              title="Resumen de empresas seleccionadas"
              name="1"
            >
              <div class="div-scroll-200">
                <div v-for="(item, key) in list_selected_auditores" :key="key">
                  <div class="checkbox" id="selected_em">
                    <label>
                      <input
                        type="checkbox"
                        :name="`checkbox_resumen${item.id}`"
                        v-model="selected_auditores"
                        @change="handleChangeList(item, $event)"
                        :id="`checkbox_resumen${item.id}`"
                        :value="item"
                      />
                      {{ item.label }}
                    </label>
                  </div>
                </div>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
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
                v-if="
                  selected_auditores &&
                    selected_auditores.length !== 0 &&
                    !search_edit &&
                    !compareWithNewtoApply
                "
                :disabled="selected_auditores.length === 0 || loadingApply"
                type="button"
                class="btn btn-success"
                @click="apply"
              >
                Aplicar
                <i
                  :class="
                    loadingApply ? 'fa  fa-spinner fa-spin' : 'fa  fa-send'
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
          <div class="row">
            <div class="col-md-12">
              <div class="panel panel-default cd">
                <div class="panel-heading">
                  <p class="panel-title roboto white">
                    Introduce los códigos Roac o nombres de los auditores,
                    separados por coma o salto de línea, y clicar en “BUSCAR”.
                  </p>
                </div>
                <div class="panel-body">
                  <div class="row">
                    <div class="col-md-12">
                      <form v-on:submit.prevent="validateBormeAuditor">
                        <div class="input-group">
                          <input
                            type="text"
                            v-model="dataFrm"
                            id="auditores"
                            class="form-control"
                            placeholder="Introduce los códigos Roac o nombres de los auditores, separados por coma o salto de línea, y clicar en “BUSCAR”"
                            title="Introduce los códigos Roac o nombres de los auditores, separados por coma o salto de línea, y clicar en “BUSCAR”"
                          />
                          <span class="input-group-btn">
                            <button
                              type="button"
                              class="btn btn-info"
                              @click="validateBormeAuditor"
                              :disabled="dataFrm.length === 0 || loadingValidar"
                            >
                              BUSCAR
                              <i :class="iconBtnBuscar"></i>
                            </button>
                          </span>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-12" v-if="showAuditores">
              <div class="panel panel-default cd">
                <div class="panel-heading">
                  <p class="panel-title roboto white">
                    Selecciona una o varias empresas y clique en “Aplicar” para
                    incorporarlas a su búsqueda.
                    <span
                      class="span-info-right"
                      v-if="selected_by_auditores !== 0"
                      >({{ selected_by_auditores | numeral("0,0") }} empresas
                      seleccionadas)</span
                    >
                  </p>
                </div>
                <div class="panel-body div-scroll-200">
                  <table class="table table-hover">
                    <thead>
                      <tr>
                        <th scope="col">Razón social de la empresa</th>
                        <!-- <th scope="col">NIF</th>
                        <th scope="col">Provincia</th>
                        <th scope="col">Localidad</th>
                        <th scope="col">Último año cuentas disponibles</th> -->
                        <!--<th scope="col">Ventas último año disponible (miles de €)</th>-->
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, key) in auditores.empresas" :key="key">
                        <th scope="row">
                          <div class="checkbox">
                            <label>
                              <input
                                type="checkbox"
                                :name="`checkbox_table_${item.id}`"
                                v-model="selected_auditores"
                                @change="handleChange(item, $event)"
                                :id="`checkbox_table_${item.id}`"
                                :value="item"
                              />
                              {{ item.label }}
                            </label>
                          </div>
                        </th>
                        <!-- <td>{{ item.CIF }}</td>
                        <td>{{ item.Provincia }}</td>
                        <td>{{ item.Localidad }}</td>
                        <td>
                          {{
                            item.UltimaCuentaAnual
                              ? item.UltimaCuentaAnual.Ejercicio
                              : ""
                          }}
                        </td> -->
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div
              class="col-md-12"
              v-if="
                list_selected_auditores && list_selected_auditores.length !== 0
              "
            >
              <div class="panel panel-default cd">
                <div class="panel-heading">
                  <p class="panel-title roboto white">
                    Resumen de empresas seleccionadas
                    <span
                      class="span-info-right"
                      v-if="selected_by_auditores !== 0"
                      >({{ selected_by_auditores | numeral("0,0") }} empresas
                      seleccionadas)</span
                    >
                  </p>
                </div>
                <div class="panel-body div-scroll-200">
                  <table class="table table-hover">
                    <thead>
                      <tr>
                        <th scope="col">Razón social de la empresa</th>
                        <!-- <th scope="col">NIF</th>
                        <th scope="col">Provincia</th>
                        <th scope="col">Localidad</th>
                        <th scope="col">Último año cuentas disponibles</th> -->
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(item, key) in list_selected_auditores"
                        :key="key"
                      >
                        <th scope="row">
                          <div class="checkbox" id="selected_em">
                            <label>
                              <input
                                type="checkbox"
                                :name="`checkbox_table_${item.id}`"
                                v-model="selected_auditores"
                                @change="handleChangeList(item, $event)"
                                :id="`checkbox_table_${item.id}`"
                                :value="item"
                              />
                              {{ item.label }}
                            </label>
                          </div>
                        </th>
                        <!-- <td>{{ item.CIF }}</td>
                        <td>{{ item.Provincia }}</td>
                        <td>{{ item.Localidad }}</td>
                        <td>
                          {{
                            item.UltimaCuentaAnual
                              ? item.UltimaCuentaAnual.Ejercicio
                              : ""
                          }}
                        </td> -->
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import swal from "sweetalert2";
import {
  spacesByDashes,
  beforeOrderFilters,
  sendPageView,
  sendEvent,
  objectToArray,
  removeDuplicates,
} from "./../../utils";
import { persistentData } from "./../../mixins/persistent-data";
export default {
  name: "filter-auditores",
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
      let stg = this.selected_auditores_string;
      let obj = JSON.stringify(this.selected_auditores);
      return stg === obj;
    },
    iconBtnBuscar: function() {
      return this.loadingValidar ? "fa  fa-spinner fa-spin" : "fa  fa-search";
    },
    showAuditores: function() {
      return (
        this.auditores &&
        this.auditores.empresas.length !== 0 &&
        !this.search_edit
      );
    },
  },
  data: () => ({
    title: "Auditores",
    loadingValidar: false,
    search_edit: true,
    search_add: false,
    show_top_10: false,
    dataFrm: "",
    auditores: {
      total: 0,
      cantidad: 0,
      empresas: [],
    },
    selected_auditores_string: "",
    selected_auditores: [],
    list_selected_auditores: [],
    selected_by_auditores: 0,
    areApplied: false,
    reapply: false,
    loadingApply: false,
    modalVisible: false,
    from_auditores: "",
    to_social_reason: "",
    loadingFile: false,
    file: {},
    collapseResumen: [],
  }),
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
    });
  },
  watch: {
    selected_auditores: function(newRazonSocial) {
      this.selected_by_auditores = this.numberRazonSocial(newRazonSocial);
      this.list_selected_auditores = [...this.selected_auditores];
      if (this.reapply && newRazonSocial.length === 0) {
        this.clean();
      }
    },
  },
  methods: {
    validateBormeAuditor() {
      if (this.dataFrm.length !== 0) {
        this.loadingValidar = true;
        this.dataFrm = spacesByDashes(this.dataFrm);
        this.$store
          .dispatch("search/validateBormeAuditor", this.dataFrm)
          .then((response) => {
            if (response && Array.isArray(response) && response.length > 0) {
              const result = objectToArray(response);
              response.empresas = result.map((item) => {
                return {
                  data: 0,
                  id: item.roac_codigo,
                  label: item.roac_Text,
                  situacion: item.situacion,
                };
              });
            }
            if (
              response &&
              response.empresas &&
              this.auditores.empresas.length !== 0 &&
              this.search_add
            ) {
              response.empresas.map((item) => {
                this.auditores.empresas.unshift(item);
              });
              this.auditores.empresas = removeDuplicates(
                this.auditores.empresas,
                "id"
              );
            } else {
              this.auditores.empresas = response.empresas
                ? response.empresas
                : [];
            }
            if (response.empresas.length === 0) {
              swal.fire("Advertencia", "Auditores no existe", "warning");
            } else {
              this.dataFrm = "";
            }
            this.loadingValidar = false;
            this.search_edit = false;
            this.search_add = false;
          })
          .catch(() => {
            this.loadingValidar = false;
            this.auditores = { total: 0, cantidad: 0, empresas: [] };
            this.selected_auditores = [];
          });
      }
    },
    apply() {
      if (this.selected_auditores && this.selected_auditores.length !== 0) {
        this.loadingApply = true;
        this.search_edit = false;
        this.search_add = false;
        this.form.auditores = this.selected_auditores.map((item) => {
          return item.id;
        });
        let beforeForm = beforeOrderFilters(
          this.filters,
          this.applied_filters,
          this.form,
          this.title
        );
        this.$store
          .dispatch("search/filtrar", beforeForm)
          .then((response) => {
            this.$store.dispatch("filters/addFilters", {
              name: this.title,
              quantity: this.selected_by_auditores,
              cantidades: response,
            });
            this.updateNumberSelectedCompanies(response.cantidad);
            this.areApplied = true;
            this.reapply = false;
            this.loadingApply = false;
            this.dataFrm = "";
            this.selected_auditores_string = JSON.stringify(
              this.selected_auditores
            );
            this.auditores = { total: 0, cantidad: 0, empresas: [] };
            sendEvent(`filtro-aplicado`, this.title);
          })
          .catch(() => {
            this.loadingApply = false;
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
      this.form.auditores = [];
      this.show_top_10 = false;
      this.dataFrm = "";
      this.to_social_reason = "";
      this.selected_auditores = [];
      this.selected_auditores_string = "";
      this.auditores = { total: 0, cantidad: 0, empresas: [] };
      this.list_selected_auditores = [];
      this.collapseResumen = [];
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
      this.selected_by_auditores = 0;
      this.$store.dispatch("filters/removeFilters", this.title);
      this.areApplied = false;
      this.reapply = false;
      this.search_edit = true;
      this.search_add = false;
      sendEvent("filtro-limpiado", this.title);
    },
    emptyFilter() {
      this.form.auditores = [];
      this.selected_auditores = [];
      this.selected_auditores_string = "";
      this.dataFrm = "";
      this.to_social_reason = "";
      this.auditores = { total: 0, cantidad: 0, empresas: [] };
      this.list_selected_auditores = [];
      this.updateNumberSelectedCompanies(0);
      this.selected_by_auditores = 0;
      this.$store.dispatch("filters/removeFilters", this.title);
      this.areApplied = false;
      this.reapply = false;
      this.search_edit = true;
      this.search_add = false;
      this.collapseResumen = [];
    },
    editSearch() {
      this.search_edit = true;
      this.search_add = true;
      this.dataFrm = this.areApplied ? "" : this.dataFrm;
      setTimeout(() => {
        document.getElementById("auditores").focus();
      }, 100);
    },
    addSearch() {
      this.search_edit = true;
      this.search_add = true;
      this.dataFrm = "";
      setTimeout(() => {
        document.getElementById("auditores").focus();
      }, 100);
    },
    numberRazonSocial(newRazonSocial) {
      let business_accountant = 0;
      if (Array.isArray(newRazonSocial)) {
        newRazonSocial.forEach(() => {
          business_accountant = business_accountant + 1;
        });
      }
      return business_accountant;
    },
    updateNumberSelectedCompanies(quantity) {
      this.$store.dispatch("filters/updateNumberSelectedCompanies", {
        quantity,
      });
    },
    handleChange() {
      //element, event
      this.reapply = this.areApplied ? true : this.areApplied;
    },
    handleChangeList(element, event) {
      event.preventDefault();
      this.reapply = this.areApplied ? true : this.areApplied;
      let checkboxs = document.querySelectorAll(
        '#selected_em input[type="checkbox"]'
      );
      checkboxs.forEach((item) => {
        item.checked = true;
      });
    },
    showModal() {
      sendPageView(`filtro-razon-social`, `Buscador - Filtro de Razón Social`);
      this.modalVisible = true;
    },
    hideModal() {
      sendPageView(``, `Buscador - Filtro`);
      this.modalVisible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./../../sass/filters/filters";
.filter_textarea {
  max-height: 60px;
}

.top-10 {
  margin-top: 10px;
}

@media (min-width: 750px) and (max-width: 1100px) {
  .flex-space-between-flex-end {
    flex-wrap: wrap;
    :nth-child(1),
    :nth-child(2) {
      width: 100%;
      margin-bottom: 5px;
    }
  }
}
</style>
