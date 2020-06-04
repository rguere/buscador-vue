<template>
  <div class="panel panel-default cd" id="filter_directivos_y_vinculaciones">
    <div class="panel-heading">
      <p class="panel-title roboto white">
        {{ title }}
        <span class="span-info-right" v-if="selected_by_direc_vinc !== 0"
          >({{ selected_by_direc_vinc | numeral("0,0") }} empresas
          seleccionadas)</span
        >
      </p>
    </div>
    <div class="panel-body">
      <form v-on:submit.prevent="validateCargo" class="m-b-10">
        <div class="input-group">
          <input
            type="text"
            v-model="dataFrm"
            id="direc_vinc1"
            class="form-control"
            placeholder='escribe aqui el nombre de la empresa o sociedad que pertenece al Organo de Administracion y clica en "Buscar"'
          />
          <span class="input-group-btn">
            <button
              title="BUSCAR"
              type="button"
              class="btn btn-info"
              @click="validateCargo"
              :disabled="dataFrm.length === 0 || loadingValidar"
            >
              BUSCAR
              <i
                :class="
                  loadingValidar ? 'fa  fa-spinner fa-spin' : 'fa  fa-search'
                "
              ></i>
            </button>
          </span>
        </div>
      </form>
      <div
        class="panel panel-default cd"
        v-if="direc_vinc && direc_vinc.empresas.length !== 0 && !search_edit"
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
            <div v-for="(item, key) in direc_vinc.empresas" :key="key">
              <label class="custon-checkboxs">
                <input
                  type="checkbox"
                  :name="`checkbox_${item.IdEmpresa}`"
                  v-model="selected_direc_vinc"
                  @change="handleChange(item, $event)"
                  :id="`checkbox_${item.IdEmpresa}`"
                  :value="item"
                />
                <span class="geekmark"></span>
                <span class="name-checkbox">{{ item.RazonSocial }}</span>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="flex-space-between-flex-end" style="align-items: flex-start;">
        <div>
          <button class="btn btn-warning m-r-5" @click="showModal">
            Ver detalles
            <i class="fa fa-plus-circle"></i>
          </button>
          <button
            v-if="
              selected_direc_vinc &&
                selected_direc_vinc.length !== 0 &&
                !search_edit &&
                !compareWithNewtoApply
            "
            :disabled="selected_direc_vinc.length === 0 || loadingApply"
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
        <div>
          <div class="checkboxs-resaldado">
            <label class="custon-checkboxs">
              <input type="checkbox" />
              <span class="geekmark"></span>
              <span class="title"
                >Aplicar en la búsqueda Solo sociedades o personas
                juriducas</span
              >
            </label>
          </div>
          <div class="checkboxs-resaldado m-t-10">
            <label class="custon-checkboxs">
              <input type="checkbox" />
              <span class="geekmark"></span>
              <span class="title"
                >Aplicar en la búsqueda Solo personas fisicas</span
              >
            </label>
          </div>
        </div>
      </div>
      <div v-if="direc_vinc_json && direc_vinc_json.length !== 0">
        <br />
        <hr />
        <b>Resultados: </b>
        <pre class="div-scroll-500">{{ direc_vinc_json }}</pre>
      </div>
      <div
        class="row"
        v-if="list_selected_direc_vinc && list_selected_direc_vinc.length !== 0"
      >
        <div class="col-md-12">
          <br />
          <el-collapse v-model="collapseResumen">
            <el-collapse-item
              title="Resumen de empresas seleccionadas"
              name="1"
            >
              <div class="div-scroll-200">
                <div v-for="(item, key) in list_selected_direc_vinc" :key="key">
                  <div class="checkbox" id="selected_em">
                    <label>
                      <input
                        type="checkbox"
                        :name="`checkbox_resumen${item.IdEmpresa}`"
                        v-model="selected_direc_vinc"
                        @change="handleChangeList(item, $event)"
                        :id="`checkbox_resumen${item.IdEmpresa}`"
                        :value="item"
                      />
                      {{ item.RazonSocial }} - {{ item.CIF }}
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
                  selected_direc_vinc &&
                    selected_direc_vinc.length !== 0 &&
                    !search_edit &&
                    !compareWithNewtoApply
                "
                :disabled="selected_direc_vinc.length === 0 || loadingApply"
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
                    Introduce el nombre de la persona o la sociedad en el Órgano
                    de Administración
                  </p>
                </div>
                <div class="panel-body">
                  <div class="row">
                    <div class="col-md-7">
                      <form v-on:submit.prevent="validateCargo">
                        <div class="input-group">
                          <input
                            type="text"
                            v-model="dataFrm"
                            id="direc_vinc"
                            class="form-control"
                            placeholder='escribe aqui el nombre de la empresa o sociedad que pertenece al Organo de Administracion y clica en "Buscar"'
                          />
                          <span class="input-group-btn">
                            <button
                              type="button"
                              class="btn btn-info"
                              @click="validateCargo"
                              :disabled="dataFrm.length === 0 || loadingValidar"
                            >
                              BUSCAR
                              <i
                                :class="
                                  loadingValidar
                                    ? 'fa  fa-spinner fa-spin'
                                    : 'fa  fa-search'
                                "
                              ></i>
                            </button>
                          </span>
                        </div>
                      </form>
                    </div>
                    <div class="col-md-5">
                      <div>
                        <div class="checkboxs-resaldado">
                          <label class="custon-checkboxs">
                            <input type="checkbox" />
                            <span class="geekmark"></span>
                            <span class="title"
                              >Aplicar en la búsqueda Solo sociedades o personas
                              juriducas</span
                            >
                          </label>
                        </div>
                        <div class="checkboxs-resaldado m-t-10">
                          <label class="custon-checkboxs">
                            <input type="checkbox" />
                            <span class="geekmark"></span>
                            <span class="title"
                              >Aplicar en la búsqueda Solo personas
                              fisicas</span
                            >
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="col-md-12"
              v-if="
                direc_vinc && direc_vinc.empresas.length !== 0 && !search_edit
              "
            >
              <div class="panel panel-default cd">
                <div class="panel-heading">
                  <p class="panel-title roboto white">
                    Selecciona una o varias empresas y clique en “Aplicar” para
                    incorporarlas a su búsqueda.
                    <span
                      class="span-info-right"
                      v-if="selected_by_direc_vinc !== 0"
                      >({{ selected_by_direc_vinc | numeral("0,0") }} empresas
                      seleccionadas)</span
                    >
                  </p>
                </div>
                <div class="panel-body div-scroll-200">
                  <table class="table table-hover">
                    <thead>
                      <tr>
                        <th scope="col">Razón social de la empresa</th>
                        <th scope="col">NIF</th>
                        <th scope="col">Provincia</th>
                        <th scope="col">Localidad</th>
                        <th scope="col">Último año cuentas disponibles</th>
                        <!--<th scope="col">Ventas último año disponible (miles de €)</th>-->
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, key) in direc_vinc.empresas" :key="key">
                        <th scope="row">
                          <div class="checkbox">
                            <label>
                              <input
                                type="checkbox"
                                :name="`checkbox_table_${item.IdEmpresa}`"
                                v-model="selected_direc_vinc"
                                @change="handleChange(item, $event)"
                                :id="`checkbox_table_${item.IdEmpresa}`"
                                :value="item"
                              />
                              {{ item.RazonSocial }}
                            </label>
                          </div>
                        </th>
                        <td>{{ item.CIF }}</td>
                        <td>{{ item.Provincia }}</td>
                        <td>{{ item.Localidad }}</td>
                        <td>
                          {{
                            item.UltimaCuentaAnual
                              ? item.UltimaCuentaAnual.Ejercicio
                              : ""
                          }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div
              class="col-md-12"
              v-if="
                list_selected_direc_vinc &&
                  list_selected_direc_vinc.length !== 0
              "
            >
              <div class="panel panel-default cd">
                <div class="panel-heading">
                  <p class="panel-title roboto white">
                    Resumen de empresas seleccionadas
                    <span
                      class="span-info-right"
                      v-if="selected_by_direc_vinc !== 0"
                      >({{ selected_by_direc_vinc | numeral("0,0") }} empresas
                      seleccionadas)</span
                    >
                  </p>
                </div>
                <div class="panel-body div-scroll-200">
                  <table class="table table-hover">
                    <thead>
                      <tr>
                        <th scope="col">Razón social de la empresa</th>
                        <th scope="col">NIF</th>
                        <th scope="col">Provincia</th>
                        <th scope="col">Localidad</th>
                        <th scope="col">Último año cuentas disponibles</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(item, key) in list_selected_direc_vinc"
                        :key="key"
                      >
                        <th scope="row">
                          <div class="checkbox" id="selected_em">
                            <label>
                              <input
                                type="checkbox"
                                :name="`checkbox_table_${item.IdEmpresa}`"
                                v-model="selected_direc_vinc"
                                @change="handleChangeList(item, $event)"
                                :id="`checkbox_table_${item.IdEmpresa}`"
                                :value="item"
                              />
                              {{ item.RazonSocial }}
                            </label>
                          </div>
                        </th>
                        <td>{{ item.CIF }}</td>
                        <td>{{ item.Provincia }}</td>
                        <td>{{ item.Localidad }}</td>
                        <td>
                          {{
                            item.UltimaCuentaAnual
                              ? item.UltimaCuentaAnual.Ejercicio
                              : ""
                          }}
                        </td>
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
  beforeOrderFilters,
  // removeDuplicates,
  sendPageView,
  sendEvent,
} from "./../../utils";
import { persistentData } from "./../../mixins/persistent-data";
export default {
  name: "filter-directivos-vinculaciones",
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
      let stg = this.selected_direc_vinc_string;
      let obj = JSON.stringify(this.selected_direc_vinc);
      return stg === obj;
    },
  },
  data: () => ({
    title: "Directivos y Vinculaciones",
    loadingValidar: false,
    search_edit: true,
    search_add: false,
    dataFrm: "Antonio Aynat Eknes",
    direc_vinc: {
      total: 0,
      cantidad: 0,
      empresas: [],
    },
    direc_vinc_json: [],
    selected_direc_vinc_string: "",
    selected_direc_vinc: [],
    list_selected_direc_vinc: [],
    selected_by_direc_vinc: 0,
    areApplied: false,
    reapply: false,
    loadingApply: false,
    modalVisible: false,
    from_direc_vinc: "",
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
    selected_direc_vinc: function(newRazonSocial) {
      this.selected_by_direc_vinc = this.numberRazonSocial(newRazonSocial);
      this.list_selected_direc_vinc = [...this.selected_direc_vinc];
      if (this.reapply && newRazonSocial.length === 0) {
        this.clean();
      }
    },
  },
  methods: {
    validateCargo() {
      if (this.dataFrm.length !== 0) {
        this.loadingValidar = true;
        this.$store
          .dispatch("search/validateCargo", this.dataFrm)
          .then((response) => {
            if (
              response &&
              response.empresas &&
              this.direc_vinc.empresas.length !== 0 &&
              this.search_add
            ) {
              // response.empresas.map((item) => {
              //   console.log(item);
              //   this.direc_vinc.empresas.unshift(item);
              // });
              // this.direc_vinc.empresas = removeDuplicates(
              //   this.direc_vinc.empresas,
              //   "RazonSocial"
              // );
            }
            this.direc_vinc_json = [];
            response.empresas.map((item) => {
              this.direc_vinc_json.unshift(item);
            });
            // else {
            //   this.direc_vinc.empresas = response.empresas
            //     ? response.empresas
            //     : [];
            // }
            this.loadingValidar = false;
            this.search_edit = false;
            this.search_add = false;
            if (response.empresas.length === 0) {
              swal.fire(
                "Advertencia",
                "Nombre o razón social no existe",
                "warning"
              );
            } else {
              //this.dataFrm = "";
            }
          })
          .catch(() => {
            this.loadingValidar = false;
            this.direc_vinc = {
              total: 0,
              cantidad: 0,
              empresas: [],
            };
            this.selected_direc_vinc = [];
          });
      }
    },
    apply() {
      if (this.selected_direc_vinc && this.selected_direc_vinc.length !== 0) {
        this.loadingApply = true;
        this.search_edit = false;
        this.search_add = false;
        this.form.razonSocial = this.selected_direc_vinc.map((item) => {
          return item.RazonSocial;
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
              quantity: this.selected_by_direc_vinc,
              cantidades: response,
              items: this.selected_direc_vinc,
            });
            this.updateNumberSelectedCompanies(response.cantidad);
            this.areApplied = true;
            this.reapply = false;
            this.loadingApply = false;
            this.dataFrm = "";
            this.selected_direc_vinc_string = JSON.stringify(
              this.selected_direc_vinc
            );
            this.direc_vinc = {
              total: 0,
              cantidad: 0,
              empresas: [],
            };
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
      this.form.razonSocial = [];
      this.dataFrm = "";
      this.to_social_reason = "";
      this.selected_direc_vinc = [];
      this.selected_direc_vinc_string = "";
      this.direc_vinc = { total: 0, cantidad: 0, empresas: [] };
      this.list_selected_direc_vinc = [];
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
      this.selected_by_direc_vinc = 0;
      this.$store.dispatch("filters/removeFilters", this.title);
      this.areApplied = false;
      this.reapply = false;
      this.search_edit = true;
      this.search_add = false;
      sendEvent("filtro-limpiado", this.title);
    },
    emptyFilter() {
      this.form.razonSocial = [];
      this.selected_direc_vinc = [];
      this.selected_direc_vinc_string = "";
      this.dataFrm = "";
      this.to_social_reason = "";
      this.direc_vinc = { total: 0, cantidad: 0, empresas: [] };
      this.list_selected_direc_vinc = [];
      this.updateNumberSelectedCompanies(0);
      this.selected_by_direc_vinc = 0;
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
        document.getElementById("direc_vinc").focus();
      }, 100);
    },
    addSearch() {
      this.search_edit = true;
      this.search_add = true;
      this.dataFrm = "";
      setTimeout(() => {
        document.getElementById("direc_vinc").focus();
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
