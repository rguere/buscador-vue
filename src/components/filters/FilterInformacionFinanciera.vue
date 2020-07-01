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
        <div class="col-md-12">
          <div style="height: 300px; margin-top: 10px;">
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
                slot-scope="{ node, shouldShowCount, count, labelClassName }"
                :class="labelClassName"
              >
                {{ node.label }}
              </label>
            </treeselect>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { persistentData } from "./../../mixins/persistent-data";

import { sendEvent } from "./../../utils";

export default {
  name: "filter-informacion-financiera",
  mixins: [persistentData],
  computed: {},
  data: () => ({
    title: "Información Financiera",
    value: [],
    options: [
      {
        id: "activo",
        label: "Activo",
        children: [
          {
            id: "A) ACTIVO NO CORRIENTE",
            label: "A) ACTIVO NO CORRIENTE",
            children: [
              {
                id: "I. Inmovilizado intangible",
                label: "I. Inmovilizado intangible",
              },
              {
                id: "II. Inmovilizado material",
                label: "II. Inmovilizado material",
              },
              {
                id: "III. Inversiones inmobiliarias",
                label: "III. Inversiones inmobiliarias",
              },
              {
                id:
                  "IV. Inversiones en empresas del grupo y asociadas a largo plazo",
                label:
                  "IV. Inversiones en empresas del grupo y asociadas a largo plazo",
              },
              {
                id: "V. Inversiones financieras a largo plazo",
                label: "V. Inversiones financieras a largo plazo",
              },
              {
                id: "VI. Activos por impuesto diferido",
                label: "VI. Activos por impuesto diferido",
              },
              {
                id: "VII. Deudas comerciales no corrientes",
                label: "VII. Deudas comerciales no corrientes",
              },
            ],
          },
          {
            id: "B) ACTIVO CORRIENTE",
            label: "B) ACTIVO CORRIENTE",
            children: [
              {
                id: "I. Activos no corrientes mantenidos para la venta",
                label: "I. Activos no corrientes mantenidos para la venta",
              },
              {
                id: "II. Existencias",
                label: "II. Existencias",
              },
              {
                id: "III. Deudores comerciales y otras cuentas a cobrar",
                label: "III. Deudores comerciales y otras cuentas a cobrar",
              },
              {
                id:
                  "IV. Inversiones en empresas del grupo y asociadas a corto plazo",
                label:
                  "IV. Inversiones en empresas del grupo y asociadas a corto plazo",
              },
              {
                id: "V. Inversiones financieras a corto plazo",
                label: "V. Inversiones financieras a corto plazo",
              },
              {
                id: "VI. Periodificaciones a corto plazo",
                label: "VI. Periodificaciones a corto plazo",
              },
              {
                id: "VII. Efectivo y otros activos líquidos equivalentes",
                label: "VII. Efectivo y otros activos líquidos equivalentes",
              },
            ],
          },
        ],
      },
      {
        id: "patrimonio_neto",
        label: "Patrimonio Neto",
        children: [
          {
            id: "A-1) Fondos propios",
            label: "A-1) Fondos propios",
            children: [
              {
                id: "II. Prima de emisión",
                label: "II. Prima de emisión",
              },
              {
                id: "III. Reservas",
                label: "III. Reservas",
              },
              {
                id: "IV. (Acciones y participaciones en patrimonio propias)",
                label: "IV. (Acciones y participaciones en patrimonio propias)",
              },
              {
                id: "V. Resultados de ejercicios anteriores",
                label: "V. Resultados de ejercicios anteriores",
              },
              {
                id: "VI. Otras aportaciones de socios",
                label: "VI. Otras aportaciones de socios",
              },
              {
                id: "VII. Resultado del ejercicio",
                label: "VII. Resultado del ejercicio",
              },
              {
                id: "VIII. (Dividendo a cuenta)",
                label: "VIII. (Dividendo a cuenta)",
              },
              {
                id: "IX. Otros instrumentos de patrimonio neto",
                label: "IX. Otros instrumentos de patrimonio neto",
              },
            ],
          },
          {
            id: "A-2) Ajustes por cambios de valor",
            label: "A-2) Ajustes por cambios de valor",
            children: [
              {
                id: "I. Activos financieros disponibles para la venta",
                label: "I. Activos financieros disponibles para la venta",
              },
              {
                id: "II. Operaciones de cobertura",
                label: "II. Operaciones de cobertura",
              },
              {
                id:
                  "III. Activos no corrientes y pasivos vinculados, mantenidos para la venta",
                label:
                  "III. Activos no corrientes y pasivos vinculados, mantenidos para la venta",
              },
              {
                id: "IV. Diferencia de conversión",
                label: "IV. Diferencia de conversión",
              },
              {
                id: "V. Otros",
                label: "V. Otros",
              },
            ],
          },
          {
            id: "A-3) Subvenciones, donaciones y legados recibidos",
            label: "A-3) Subvenciones, donaciones y legados recibidos",
          },
        ],
      },
      {
        id: "pasivo",
        label: "Pasivo",
        children: [
          {
            id: "B) PASIVO NO CORRIENTE",
            label: "B) PASIVO NO CORRIENTE",
            children: [
              {
                id: "I. Provisiones a largo plazo",
                label: "I. Provisiones a largo plazo",
              },
              {
                id: "II. Deudas a largo plazo",
                label: "II. Deudas a largo plazo",
              },
              {
                id:
                  "III. Deudas con empresas del grupo y asociadas a largo plazo",
                label:
                  "III. Deudas con empresas del grupo y asociadas a largo plazo",
              },
              {
                id: "IV. Pasivos por impuesto diferido",
                label: "IV. Pasivos por impuesto diferido",
              },
              {
                id: "V. Periodificaciones a largo plazo",
                label: "V. Periodificaciones a largo plazo",
              },
              {
                id: "VI. Acreedores comerciales no corrientes",
                label: "VI. Acreedores comerciales no corrientes",
              },
              {
                id: "VII. Deuda con características especiales a largo plazo",
                label:
                  "VII. Deuda con características especiales a largo plazo",
              },
            ],
          },
          {
            id: "C) PASIVO CORRIENTE",
            label: "C) PASIVO CORRIENTE",
            children: [
              {
                id:
                  "I. Pasivos vinculados con activos no corrientes mantenidos para la venta",
                label:
                  "I. Pasivos vinculados con activos no corrientes mantenidos para la venta",
              },
              {
                id: "II. Provisiones a corto plazo",
                label: "II. Provisiones a corto plazo",
              },
              {
                id: "III. Deudas a corto plazo",
                label: "III. Deudas a corto plazo",
              },
              {
                id:
                  "IV. Deudas con empresas del grupo y asociadas a corto plazo",
                label:
                  "IV. Deudas con empresas del grupo y asociadas a corto plazo",
              },
              {
                id: "V. Acreedores comerciales y otras cuentas a pagar",
                label: "V. Acreedores comerciales y otras cuentas a pagar",
              },
              {
                id: "VI. Periodificaciones a corto plazo",
                label: "VI. Periodificaciones a corto plazo",
              },
              {
                id: "VII. Deuda con características especiales a corto plazo",
                label:
                  "VII. Deuda con características especiales a corto plazo",
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
</style>
