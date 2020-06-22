<template>
  <div class="panel panel-default cd" id="filter_directivos_y_vinculaciones">
    <div class="panel-heading">
      <p class="panel-title roboto white">
        {{ title }}
        <span class="span-info-right" v-if="selected_by_direc_vinc !== 0"
          >({{ selected_by_direc_vinc | numeral("0,0") }} vinculaciones
          seleccionadas)</span
        >
      </p>
    </div>
    <div class="panel-body">
      <div class="row">
        <div class="col-md-8">
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
                  <i :class="iconLoadingValidar"></i>
                </button>
              </span>
            </div>
          </form>
        </div>
        <div class="col-md-4" v-if="!loadingValidar">
          <div v-if="dataFrm.length !== 0">
            <el-switch
              v-model="active"
              :disabled="both"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="Activos"
              inactive-text="Inactivos"
              @change="changeActive"
            >
            </el-switch>
            <el-checkbox
              style="margin-left: 20px;"
              @change="changeActive"
              v-model="both"
              >Ambos</el-checkbox
            >
          </div>
        </div>
      </div>
      <div
        class="panel panel-default cd"
        v-if="direc_vinc && direc_vinc.empresas && !search_edit"
      >
        <div class="panel-body">
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label class>{{ dataFrm }}</label>
              </div>
            </div>
          </div>
          <div class="div-scroll-400">
            <el-card
              shadow="hover"
              v-for="(items, key) in direc_vinc.empresas"
              :key="key"
              :name="key"
            >
              <div class="item-direc_vinc">
                <div class="t-t-capitalize">
                  <label class="custon-checkboxs">
                    <input
                      type="checkbox"
                      :name="`checkbox_list_${items[0].Nif}`"
                      v-model="selected_direc_vinc"
                      @change="handleChangeList(items[0], $event)"
                      :id="`checkbox_list_${items[0].Nif}`"
                      :value="items"
                    />
                    <span class="geekmark"></span>
                    <span class="name-checkbox">{{ items[0].Nombre }}</span>
                  </label>
                </div>
                <div class="z-popover">
                  <el-popover
                    placement="right"
                    width="700"
                    trigger="click"
                    popper-class="z-popover"
                  >
                    <div class="div-scroll-200">
                      <el-table :data="items" style="width: 100%">
                        <el-table-column prop="Nombre" label="Persona">
                        </el-table-column>
                        <el-table-column
                          prop="RazonSocial"
                          label="Razón social de la empresa"
                        >
                          <template slot-scope="scope">
                            <a :href="scope.row.urlInfocif" target="_blank">{{
                              scope.row.RazonSocial
                            }}</a>
                          </template>
                        </el-table-column>
                        <el-table-column prop="CargoEspejo" label="Cargo">
                        </el-table-column>
                        <el-table-column
                          width="150"
                          prop="EstadoActivo"
                          label="Status"
                        >
                          <template slot-scope="scope">
                            <div :class="classEstatus(scope.row.EstadoActivo)">
                              {{ getEstado(scope.row.EstadoActivo) }}
                            </div>
                          </template>
                        </el-table-column>
                      </el-table>
                    </div>
                    <el-button slot="reference">
                      Ver Vinculaciones
                      <span class="num-fil"> ({{ items.length }})</span>
                    </el-button>
                  </el-popover>
                </div>
              </div>
            </el-card>
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
            <i :class="iconLoadingApply"></i>
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
        v-if="list_selected_direc_vinc && list_selected_direc_vinc.length !== 0"
      >
        <div class="col-md-12">
          <br />
          <el-collapse v-model="collapseResumen">
            <el-collapse-item
              title="Resumen vinculaciones seleccionadas"
              name="1"
            >
              <div class="div-scroll-200">
                <div
                  v-for="(items, key) in list_selected_direc_vinc"
                  :key="key"
                >
                  <div class="item-direc_vinc" style="margin-bottom: 10px;">
                    <div class="t-t-capitalize">
                      <label class="custon-checkboxs">
                        <input
                          type="checkbox"
                          :name="`checkbox_list_${items[0].Nif}`"
                          v-model="selected_direc_vinc"
                          @change="handleChangeList(items[0], $event)"
                          :id="`checkbox_list_${items[0].Nif}`"
                          :value="items"
                        />
                        <span class="geekmark"></span>
                        <span class="name-checkbox">{{ items[0].Nombre }}</span>
                      </label>
                    </div>
                    <div class="z-popover">
                      <el-popover
                        placement="right"
                        width="700"
                        trigger="click"
                        popper-class="z-popover"
                      >
                        <div class="div-scroll-200">
                          <el-table :data="items" style="width: 100%">
                            <el-table-column prop="Nombre" label="Persona">
                            </el-table-column>
                            <el-table-column
                              prop="RazonSocial"
                              label="Razón social de la empresa"
                            >
                              <template slot-scope="scope">
                                <a
                                  :href="scope.row.urlInfocif"
                                  target="_blank"
                                  >{{ scope.row.RazonSocial }}</a
                                >
                              </template>
                            </el-table-column>
                            <el-table-column prop="CargoEspejo" label="Cargo">
                            </el-table-column>
                            <el-table-column
                              width="150"
                              prop="EstadoActivo"
                              label="Status"
                            >
                              <template slot-scope="scope">
                                <div
                                  :class="classEstatus(scope.row.EstadoActivo)"
                                >
                                  {{ getEstado(scope.row.EstadoActivo) }}
                                </div>
                              </template>
                            </el-table-column>
                          </el-table>
                        </div>
                        <el-button slot="reference">
                          Ver Vinculaciones
                          <span class="num-fil"> ({{ items.length }})</span>
                        </el-button>
                      </el-popover>
                    </div>
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
                <i :class="iconLoadingApply"></i>
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
                              <i :class="iconLoadingValidar"></i>
                            </button>
                          </span>
                        </div>
                      </form>
                    </div>
                    <div class="col-md-5" v-if="!loadingValidar">
                      <div v-if="dataFrm.length !== 0">
                        <el-switch
                          v-model="active"
                          :disabled="both"
                          active-color="#13ce66"
                          inactive-color="#ff4949"
                          active-text="Activos"
                          inactive-text="Inactivos"
                          @change="changeActive"
                        >
                        </el-switch>
                        <el-checkbox
                          style="margin-left: 20px;"
                          @change="changeActive"
                          v-model="both"
                          >Ambos</el-checkbox
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="col-md-12"
              v-if="direc_vinc && direc_vinc.empresas && !search_edit"
            >
              <div class="panel panel-default cd">
                <div class="panel-heading">
                  <p class="panel-title roboto white">
                    Resultados de la búsqueda
                    <span
                      class="span-info-right"
                      v-if="selected_by_direc_vinc !== 0"
                      >({{
                        selected_by_direc_vinc | numeral("0,0")
                      }}
                      vinculaciones seleccionadas)</span
                    >
                  </p>
                </div>
                <div class="panel-body">
                  <div class="div-scroll-400">
                    <el-card
                      shadow="hover"
                      v-for="(items, key) in direc_vinc.empresas"
                      :key="key"
                      :name="key"
                    >
                      <div class="item-direc_vinc">
                        <div class="t-t-capitalize">
                          <label class="custon-checkboxs">
                            <input
                              type="checkbox"
                              :name="`checkbox_list_${items[0].Nif}`"
                              v-model="selected_direc_vinc"
                              @change="handleChangeList(items[0], $event)"
                              :id="`checkbox_list_${items[0].Nif}`"
                              :value="items"
                            />
                            <span class="geekmark"></span>
                            <span class="name-checkbox">{{
                              items[0].Nombre
                            }}</span>
                          </label>
                        </div>
                        <div>
                          <el-popover
                            placement="right"
                            width="700"
                            trigger="click"
                            popper-class="z-popover"
                          >
                            <div class="div-scroll-200">
                              <el-table :data="items" style="width: 100%">
                                <el-table-column prop="Nombre" label="Persona">
                                </el-table-column>
                                <el-table-column
                                  prop="RazonSocial"
                                  label="Razón social de la empresa"
                                >
                                  <template slot-scope="scope">
                                    <a
                                      :href="scope.row.urlInfocif"
                                      target="_blank"
                                      >{{ scope.row.RazonSocial }}</a
                                    >
                                  </template>
                                </el-table-column>
                                <el-table-column
                                  prop="CargoEspejo"
                                  label="Cargo"
                                >
                                </el-table-column>
                                <el-table-column
                                  width="150"
                                  prop="EstadoActivo"
                                  label="Status"
                                >
                                  <template slot-scope="scope">
                                    <div
                                      :class="
                                        classEstatus(scope.row.EstadoActivo)
                                      "
                                    >
                                      {{ getEstado(scope.row.EstadoActivo) }}
                                    </div>
                                  </template>
                                </el-table-column>
                              </el-table>
                            </div>
                            <el-button slot="reference">
                              Ver Vinculaciones
                              <span class="num-fil"> ({{ items.length }})</span>
                            </el-button>
                          </el-popover>
                        </div>
                      </div>
                    </el-card>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-12">
              <div class="panel panel-default cd">
                <div class="panel-body">
                  <el-collapse v-model="collapseResumen">
                    <el-collapse-item
                      title="Resumen vinculaciones seleccionadas"
                      name="1"
                    >
                      <div class="div-scroll-200">
                        <div
                          v-for="(items, key) in list_selected_direc_vinc"
                          :key="key"
                        >
                          <div
                            class="item-direc_vinc"
                            style="margin-bottom: 10px;"
                          >
                            <div class="t-t-capitalize">
                              <label class="custon-checkboxs">
                                <input
                                  type="checkbox"
                                  :name="`checkbox_list_${items[0].Nif}`"
                                  v-model="selected_direc_vinc"
                                  @change="handleChangeList(items[0], $event)"
                                  :id="`checkbox_list_${items[0].Nif}`"
                                  :value="items"
                                />
                                <span class="geekmark"></span>
                                <span class="name-checkbox">{{
                                  items[0].Nombre
                                }}</span>
                              </label>
                            </div>
                            <div class="z-popover">
                              <el-popover
                                placement="right"
                                width="700"
                                trigger="click"
                                popper-class="z-popover"
                              >
                                <div class="div-scroll-200">
                                  <el-table :data="items" style="width: 100%">
                                    <el-table-column
                                      prop="Nombre"
                                      label="Persona"
                                    >
                                    </el-table-column>
                                    <el-table-column
                                      prop="RazonSocial"
                                      label="Razón social de la empresa"
                                    >
                                      <template slot-scope="scope">
                                        <a
                                          :href="scope.row.urlInfocif"
                                          target="_blank"
                                          >{{ scope.row.RazonSocial }}</a
                                        >
                                      </template>
                                    </el-table-column>
                                    <el-table-column
                                      prop="CargoEspejo"
                                      label="Cargo"
                                    >
                                    </el-table-column>
                                    <el-table-column
                                      width="150"
                                      prop="EstadoActivo"
                                      label="Status"
                                    >
                                      <template slot-scope="scope">
                                        <div
                                          :class="
                                            classEstatus(scope.row.EstadoActivo)
                                          "
                                        >
                                          {{
                                            getEstado(scope.row.EstadoActivo)
                                          }}
                                        </div>
                                      </template>
                                    </el-table-column>
                                  </el-table>
                                </div>
                                <el-button slot="reference">
                                  Ver Vinculaciones
                                  <span class="num-fil">
                                    ({{ items.length }})</span
                                  >
                                </el-button>
                              </el-popover>
                            </div>
                          </div>
                        </div>
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
  </div>
</template>

<script>
import slugify from "slugify";
import { mapGetters } from "vuex";
import swal from "sweetalert2";
import {
  beforeOrderFilters,
  // removeDuplicates,
  sendPageView,
  sendEvent,
  capitalize,
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
    iconLoadingValidar: function() {
      return this.loadingValidar ? "fa  fa-spinner fa-spin" : "fa  fa-search";
    },
    iconLoadingApply: function() {
      return this.loadingApply ? "fa  fa-spinner fa-spin" : "fa  fa-search";
    },
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
    dataFrm: "",
    direc_vinc: {
      total: 0,
      cantidad: 0,
      empresas: null,
    },
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
    active: true,
    both: false,
    activeCollapse: [],
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
    getActiveCollapse(key) {
      return this.activeCollapse.includes(key)
        ? "glyphicon glyphicon-minus"
        : "glyphicon glyphicon-plus";
    },
    changeActive() {
      if (this.direc_vinc.empresas && this.dataFrm.length !== 0) {
        this.direc_vinc.empresas = null;
        this.validateCargo();
      }
    },
    classEstatus(EstadoActivo) {
      return EstadoActivo === 1
        ? "alert-success text-center"
        : "alert-danger text-center";
    },
    getEstado(estado) {
      if (estado == 1) {
        return "Activo";
      } else if (estado == 0) {
        return "Inactivo";
      } else {
        return "Ambos";
      }
    },
    validateCargo() {
      if (this.dataFrm.length !== 0) {
        this.loadingValidar = true;
        let status = 1;
        if (this.both) {
          status = 2;
        } else {
          if (this.active) {
            status = 1;
          } else {
            status = 0;
          }
        }
        this.$store
          .dispatch("search/validateCargo", { cargo: this.dataFrm, status })
          .then((response) => {
            if (
              response &&
              Array.isArray(response) &&
              response.length === 1 &&
              Array.isArray(response[0])
            ) {
              const empresas = response[0];
              const items = {};
              this.activeCollapse = [];
              for (const key in empresas) {
                if (empresas.hasOwnProperty(key)) {
                  const element = empresas[key];
                  if (element.Nombre) {
                    const slug = slugify(element.Nombre.toLowerCase());
                    this.activeCollapse.push(slug);
                    element.CargoEspejo = capitalize(element.CargoEspejo);
                    element.label = `${element.Nombre} - ${element.CargoEspejo}`;
                    element.data = 0;
                    if (element.razonSocialNormalizadaURL301) {
                      element.urlInfocif = `http://www.infocif.es/ficha-empresa/${element.razonSocialNormalizadaURL301}`;
                    } else {
                      let nameRazonSocial = slugify(
                        element.RazonSocial.toLowerCase()
                      );
                      element.urlInfocif = `http://www.infocif.es/ficha-empresa/${nameRazonSocial}`;
                    }
                    if (items[slug] && Array.isArray(items[slug])) {
                      items[slug].push(element);
                    } else {
                      items[slug] = [];
                      items[slug].push(element);
                    }
                  }
                }
              }
              // for (const key in items) {
              //   if (items.hasOwnProperty(key)) {
              //     const element = items[key];
              //     console.log(element);
              //   }
              // }
              this.direc_vinc.empresas = items;
            } else {
              swal.fire("Advertencia", "Datos no encontrados", "warning");
              this.direc_vinc.empresas = null;
            }
            this.loadingValidar = false;
            this.search_edit = false;
            this.search_add = false;
            // this.dataFrm = "";
          })
          .catch(() => {
            this.loadingValidar = false;
            this.direc_vinc = {
              total: 0,
              cantidad: 0,
              empresas: null,
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
        for (const items of this.selected_direc_vinc) {
          for (const item of items) {
            this.form.vinculaciones.push(item.Nif);
          }
        }
        if (this.both) {
          this.form.vinculaciones.push("status:2");
        } else {
          if (this.active) {
            this.form.vinculaciones.push("status:1");
          } else {
            this.form.vinculaciones.push("status:0");
          }
        }
        let beforeForm = beforeOrderFilters(
          this.filters,
          this.applied_filters,
          this.form,
          this.title
        );
        this.$store
          .dispatch("search/filtrar", beforeForm)
          .then((response) => {
            this.loadingApply = false;
            this.areApplied = true;
            this.reapply = false;
            this.dataFrm = "";
            this.$store.dispatch("filters/addFilters", {
              name: this.title,
              quantity: this.selected_by_direc_vinc,
              cantidades: response,
              items: this.selected_direc_vinc,
            });
            this.updateNumberSelectedCompanies(response.cantidad);
            this.selected_direc_vinc_string = JSON.stringify(
              this.selected_direc_vinc
            );
            this.direc_vinc = {
              total: 0,
              cantidad: 0,
              empresas: null,
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
      this.form.vinculaciones = [];
      this.dataFrm = "";
      this.to_social_reason = "";
      this.selected_direc_vinc = [];
      this.selected_direc_vinc_string = "";
      this.activeCollapse = [];
      this.direc_vinc = { total: 0, cantidad: 0, empresas: null };
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
      this.form.vinculaciones = [];
      this.selected_direc_vinc = [];
      this.selected_direc_vinc_string = "";
      this.activeCollapse = [];
      this.dataFrm = "";
      this.to_social_reason = "";
      this.direc_vinc = { total: 0, cantidad: 0, empresas: null };
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

.item-direc_vinc {
  display: flex;
  align-items: center;
  justify-content: space-between;
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
