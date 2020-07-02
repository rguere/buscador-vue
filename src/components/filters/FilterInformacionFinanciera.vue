<template>
  <div class="panel panel-default cd" id="filter_informacion_financiera">
    <div class="panel-heading">
      <p class="panel-title roboto white">
        {{ title }}
        <span
          class="span-info-right"
          v-if="selected_by_code_cnae_and_industria !== 0"
          >({{ selected_by_code_cnae_and_industria | numeral("0,0") }} empresas
          seleccionadas)</span
        >
      </p>
    </div>
    <div class="panel-body">
      <div class="row">
        <div class="col-md-6">
          <div class="panel panel-default cd">
            <div class="panel-heading">
              <p class="panel-title roboto white">
                Seleccione la partida de balance que desee agregar a su
                estrategia de búsqueda
              </p>
            </div>
            <div style="height: 300px;">
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
                v-model="selected_informacion_financiera"
              >
                <label
                  slot="option-label"
                  slot-scope="{ node, shouldShowCount, count, labelClassName }"
                  :class="labelClassName"
                >
                  {{ node.label }}
                </label>
              </treeselect>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="panel panel-default cd">
            <div class="panel-heading">
              <p class="panel-title roboto white">Seleccionar año(s)</p>
            </div>
            <div>
              <div class="anios_checkboxs_content">
                <div class="anios_checkboxs">
                  <div>
                    <label class="custon-checkboxs">
                      <input
                        type="checkbox"
                        name
                        v-model="selected_anios"
                        value="2018"
                      />
                      <span class="geekmark"></span>
                      <span class="title">2018</span>
                    </label>
                  </div>
                  <div>
                    <label class="custon-checkboxs">
                      <input
                        type="checkbox"
                        name
                        v-model="selected_anios"
                        value="2017"
                      />
                      <span class="geekmark"></span>
                      <span class="title">2017</span>
                    </label>
                  </div>
                  <div>
                    <label class="custon-checkboxs">
                      <input
                        type="checkbox"
                        name
                        v-model="selected_anios"
                        value="2016"
                      />
                      <span class="geekmark"></span>
                      <span class="title">2016</span>
                    </label>
                  </div>
                </div>
                <div class="anios_checkboxs">
                  <div>
                    <label class="custon-checkboxs">
                      <input
                        type="checkbox"
                        name
                        v-model="selected_anios"
                        value="2015"
                      />
                      <span class="geekmark"></span>
                      <span class="title">2015</span>
                    </label>
                  </div>
                  <div>
                    <label class="custon-checkboxs">
                      <input
                        type="checkbox"
                        name
                        v-model="selected_anios"
                        value="2014"
                      />
                      <span class="geekmark"></span>
                      <span class="title">2014</span>
                    </label>
                  </div>
                  <div>
                    <label class="custon-checkboxs">
                      <input
                        type="checkbox"
                        name
                        v-model="selected_anios"
                        value="2013"
                      />
                      <span class="geekmark"></span>
                      <span class="title">2013</span>
                    </label>
                  </div>
                </div>
                <div class="anios_checkboxs">
                  <div>
                    <label class="custon-checkboxs">
                      <input
                        type="checkbox"
                        name
                        v-model="selected_anios"
                        value="2012"
                      />
                      <span class="geekmark"></span>
                      <span class="title">2012</span>
                    </label>
                  </div>
                  <div>
                    <label class="custon-checkboxs">
                      <input
                        type="checkbox"
                        name
                        v-model="selected_anios"
                        value="2011"
                      />
                      <span class="geekmark"></span>
                      <span class="title">2011</span>
                    </label>
                  </div>
                  <div>
                    <label class="custon-checkboxs">
                      <input
                        type="checkbox"
                        name
                        v-model="selected_anios"
                        value="2010"
                      />
                      <span class="geekmark"></span>
                      <span class="title">2010</span>
                    </label>
                  </div>
                </div>
              </div>

              <div class="flex-space-between-flex-end">
                <p></p>
                <p class="text-help m-t-10">
                  * Puedes elegir más de una opción
                </p>
              </div>
            </div>
          </div>
          <div class="panel panel-default cd">
            <div class="panel-heading">
              <p class="panel-title roboto white">Seleccionar rango</p>
            </div>
            <div class="row content_seleccionar_rango">
              <div class="col-md-6">
                <div class="item_rango">
                  <el-tag>Mínimo</el-tag>
                  <div class="content_input_tag">
                    <el-input
                      placeholder="Mínimo"
                      type="number"
                      min="1"
                      :max="monto2"
                      v-model="monto1"
                    ></el-input>
                    <el-tag type="info">{{ selected_unidad.label }}</el-tag>
                  </div>
                </div>
                <div class="item_rango">
                  <el-tag>Máximo</el-tag>
                  <div class="content_input_tag">
                    <el-input
                      placeholder="Mínimo"
                      type="number"
                      :min="monto1"
                      v-model="monto2"
                    ></el-input>
                    <el-tag type="info">{{ selected_unidad.label }}</el-tag>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="m-t-10">
                  <el-tag type="info">Unidad</el-tag>
                  <el-select v-model="selected_unidad" placeholder="Unidad">
                    <el-option
                      v-for="item in unidades"
                      :key="item.id"
                      :label="item.label"
                      :value="item"
                    >
                    </el-option>
                  </el-select>
                </div>
                <div class="m-t-10">
                  <div>
                    <label class="custon-checkboxs">
                      <input
                        type="checkbox"
                        name
                        v-model="todas_las_empresas"
                        :value="true"
                      />
                      <span class="geekmark"></span>
                      <span class="title"
                        >TODAS LAS EMPRESAS CON EL DATO DISPONIBLE.</span
                      >
                    </label>
                  </div>
                </div>
              </div>
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
          <button type="button" class="btn btn-success" @click="apply">
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
              <button type="button" class="btn btn-success" @click="apply">
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
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { persistentData } from "./../../mixins/persistent-data";
import swal from "sweetalert2";
import { beforeOrderFilters, sendEvent, sendPageView } from "./../../utils";

export default {
  name: "filter-informacion-financiera",
  mixins: [persistentData],
  computed: {},
  data: () => ({
    title: "Información Financiera",
    loadingFrm: false,
    modalVisible: false,
    selected_informacion_financiera: [],
    selected_anios: [],
    monto1: "",
    monto2: "",
    selected_unidad: {
      id: 1000,
      label: "Miles de euros",
    },
    todas_las_empresas: false,
    unidades: [
      {
        id: 1,
        label: "Euros",
      },
      {
        id: 1000,
        label: "Miles de euros",
      },
      {
        id: 1000000,
        label: "Millones de euros",
      },
    ],
    options: [
      {
        id: "10000",
        label: "Activo",
        children: [
          {
            id: "11000",
            label: "ACTIVO NO CORRIENTE",
            children: [
              {
                id: "11100",
                label: "Inmovilizado intangible",
              },
              {
                id: "11200",
                label: "Inmovilizado material",
              },
              {
                id: "11300",
                label: "Inversiones inmobiliarias",
              },
              {
                id: "11400",
                label:
                  "Inversiones en empresas del grupo y asociadas a largo plazo",
              },
              {
                id: "11500",
                label: "Inversiones financieras a largo plazo",
              },
              {
                id: "11600",
                label: "Activos por impuesto diferido",
              },
              {
                id: "11700",
                label: "Deudas comerciales no corrientes",
              },
            ],
          },
          {
            id: "12000",
            label: "ACTIVO CORRIENTE",
            children: [
              {
                id: "12100",
                label: "Activos no corrientes mantenidos para la venta",
              },
              {
                id: "12200",
                label: "Existencias",
              },
              {
                id: "12300",
                label: "Deudores comerciales y otras cuentas a cobrar",
              },
              {
                id: "12400",
                label:
                  "Inversiones en empresas del grupo y asociadas a corto plazo",
              },
              {
                id: "12500",
                label: "Inversiones financieras a corto plazo",
              },
              {
                id: "12600",
                label: "Periodificaciones a corto plazo",
              },
              {
                id: "12700",
                label: "Efectivo y otros activos líquidos equivalentes",
              },
            ],
          },
        ],
      },
      {
        id: "20000",
        label: "Patrimonio Neto",
        children: [
          {
            id: "21000",
            label: "Fondos propios",
            children: [
              {
                id: "21200",
                label: "Prima de emisión",
              },
              {
                id: "21300",
                label: "Reservas",
              },
              {
                id: "21400",
                label: "(Acciones y participaciones en patrimonio propias)",
              },
              {
                id: "21500",
                label: "Resultados de ejercicios anteriores",
              },
              {
                id: "21600",
                label: "Otras aportaciones de socios",
              },
              {
                id: "21700",
                label: "Resultado del ejercicio",
              },
              {
                id: "21800",
                label: "(Dividendo a cuenta)",
              },
              {
                id: "21900",
                label: "Otros instrumentos de patrimonio neto",
              },
            ],
          },
          {
            id: "22000",
            label: "Ajustes por cambios de valor",
            children: [
              {
                id: "22100",
                label: "Activos financieros disponibles para la venta",
              },
              {
                id: "22200",
                label: "Operaciones de cobertura",
              },
              {
                id: "22300",
                label:
                  "Activos no corrientes y pasivos vinculados, mantenidos para la venta",
              },
              {
                id: "22400",
                label: "Diferencia de conversión",
              },
              {
                id: "22500",
                label: "Otros",
              },
            ],
          },
          {
            id: "23000",
            label: "Subvenciones, donaciones y legados recibidos",
          },
        ],
      },
      {
        id: "30000",
        label: "Pasivo",
        children: [
          {
            id: "31000",
            label: "PASIVO NO CORRIENTE",
            children: [
              {
                id: "31100",
                label: "Provisiones a largo plazo",
              },
              {
                id: "31200",
                label: "Deudas a largo plazo",
              },
              {
                id: "31300",
                label:
                  "Deudas con empresas del grupo y asociadas a largo plazo",
              },
              {
                id: "31400",
                label: "Pasivos por impuesto diferido",
              },
              {
                id: "31500",
                label: "Periodificaciones a largo plazo",
              },
              {
                id: "31600",
                label: "Acreedores comerciales no corrientes",
              },
              {
                id: "31700",
                label: "Deuda con características especiales a largo plazo",
              },
            ],
          },
          {
            id: "32000",
            label: "PASIVO CORRIENTE",
            children: [
              {
                id: "32100",
                label:
                  "Pasivos vinculados con activos no corrientes mantenidos para la venta",
              },
              {
                id: "32200",
                label: "Provisiones a corto plazo",
              },
              {
                id: "32300",
                label: "Deudas a corto plazo",
              },
              {
                id: "32400",
                label:
                  "Deudas con empresas del grupo y asociadas a corto plazo",
              },
              {
                id: "32500",
                label: "Acreedores comerciales y otras cuentas a pagar",
              },
              {
                id: "32600",
                label: "Periodificaciones a corto plazo",
              },
              {
                id: "32700",
                label: "Deuda con características especiales a corto plazo",
              },
            ],
          },
        ],
      },
    ],
  }),
  watch: {},
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
    apply() {},
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
      this.selected_provinces_localidad = [];
      this.valueSelect = [];
      this.selected_provinces_localidad_string = "";
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
      this.selected_provinces_localidad = [];
      this.valueSelect = [];
      this.selected_provinces_localidad_string = "";
      this.updateNumberSelectedCompanies(0);
      this.selected_by_location = 0;
      this.$store.dispatch("filters/removeFilters", this.title);
      this.areApplied = false;
      this.reapply = false;
      this.loadingSearchTheProvinceorTown = false;
      this.ResultTheProvinceorTown = [];
      this.SearchTheProvinceorTown = "";
    },
    fetchSearch() {},
    inputTreeselect() {},
    selectTreeselect() {
      //this.seeSeals(item, true);
    },
    deselectTreeselect() {
      //this.seeSeals(item, false);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./../../sass/filters/filters";

.anios_checkboxs_content {
  display: flex;
  justify-content: space-around;
  .anios_checkboxs {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    flex: 1;
    margin-left: 10px;
    div {
      margin: 0 10px 0 0;
      label {
        width: 100%;
        font-size: 14px;
        .title {
          font-weight: bold;
        }
      }
    }
  }
}

label.custon-checkboxs {
  width: 100%;
  font-size: 14px;
  .title {
    font-weight: bold;
  }
}

.content_seleccionar_rango {
  .el-tag {
    width: 100%;
    height: 36px;
    padding: 5px 10px;
    display: block;
  }

  .item_rango {
    margin-top: 10px;
  }

  .content_input_tag {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
