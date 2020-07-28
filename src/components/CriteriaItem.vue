<template>
  <div>
    <div class="flex-2" v-if="item_name === 'Antigüedad'">
      <span class="name-checkbox">{{
        item.label !== "incluir_null"
          ? item.label
          : "Incluir aquellas empresas en las que se desconoce su antigüedad"
      }}</span>
      <span class="num-fil">({{ item.data | numeral("0,0") }})</span>
    </div>

    <div class="flex-2" v-if="item_name === 'Número de empleados'">
      <span class="name-checkbox">{{
        item.label !== "incluir_null"
          ? item.label
          : "Incluir aquellas empresas en las que se desconoce su número de empleados"
      }}</span>
      <span class="num-fil">({{ item.data | numeral("0,0") }})</span>
    </div>

    <div class="flex-2" v-if="item_name === 'Años con cuentas disponibles'">
      <span class="name-checkbox">{{
        item.label !== "incluir_null"
          ? item.label
          : "Incluir aquellas empresas de las que no hay cuentas disponibles"
      }}</span>
      <span class="num-fil">({{ item.data | numeral("0,0") }})</span>
    </div>

    <div class="flex-2" v-if="ifItemName(item_name)">
      <span class="name-checkbox">{{ item.label }}</span>
      <span class="num-fil">({{ item.data | numeral("0,0") }})</span>
    </div>

    <div class="flex-2" v-if="item_name === 'Nombre o razón social'">
      <span class="name-checkbox">{{ item.RazonSocial }}</span>
    </div>

    <div class="flex-2" v-if="item_name === 'Estado'">
      <span class="name-checkbox">{{ item.label }}</span>
    </div>

    <div
      class="flex-item_IF"
      v-if="item_name === 'Información Financiera' && item"
    >
      <p class="">
        <span class="">
          <span>{{ item.label }}</span> </span
        >, <span v-if="item.anios">{{ item.anios }}</span
        >, <span v-if="item.unidad">{{ item.unidad }}</span
        >,
        <span v-if="item.rango">{{ item.rango }}</span>
      </p>
    </div>

    <div
      class="item-direc_vinc"
      v-if="item_name === 'Directivos y Vinculaciones'"
    >
      <div class="t-t-capitalize">
        <span class="name-checkbox">{{ item[0].Nombre }}</span>
      </div>
      <div style="margin-bottom: 10px;">
        <div class="z-popover">
          <el-popover
            placement="right"
            width="700"
            trigger="click"
            popper-class="z-popover"
          >
            <div class="div-scroll-200">
              <el-table :data="item" style="width: 100%">
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
                <el-table-column width="150" prop="EstadoActivo" label="Status">
                  <template slot-scope="scope">
                    <div :class="classEstatus(scope.row.EstadoActivo)">
                      {{ getEstado(scope.row.EstadoActivo) }}
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <el-button slot="reference" size="mini" title="Ver Vinculaciones">
              Ver
              <span class="num-fil"> ({{ item.length }})</span>
            </el-button>
          </el-popover>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["item_name", "item"],
  name: "criteria-item",
  data() {
    return {};
  },
  mounted() {},
  methods: {
    ifItemName(item_name) {
      return (
        item_name === "Ubicación" ||
        item_name === "Código Postal" ||
        item_name === "NIF" ||
        item_name === "Tipo de cuentas" ||
        item_name === "Sector/Actividad" ||
        item_name === "Auditores" ||
        item_name === "Cargos"
      );
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
  },
};
</script>

<style lang="scss" scoped>
.item-direc_vinc {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
