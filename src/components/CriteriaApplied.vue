<template>
  <div class="criteria-applied">
    <el-card
      class="box-card"
      v-if="orderFilters.length > 0"
      :body-style="{
        padding: '0px 20px 10px 20px',
        height: '48vh',
        overflowY: 'scroll',
      }"
    >
      <div slot="header" class="clearfix">
        <span class="panel-title roboto white">Criterios Aplicados</span>
      </div>
      <div>
        <el-collapse v-model="activeCollapse">
          <el-collapse-item
            v-for="(item, key) in orderFilters"
            :name="key"
            :key="key"
          >
            <template slot="title">
              <div class="flex-2" v-if="item.apply" :title="item.name">
                <div>
                  <span :class="getActiveCollapse(key)"></span>
                  <span style="font-size: 11px;">
                    {{ nameSubstring(item.name, 14) }}
                  </span>

                  <span class="num-fil" style="font-size: 11px;"
                    >( {{ item.quantity | numeral("0,0") }} )</span
                  >
                </div>
                <span class="span-el-button">
                  <el-button
                    @click="showModalFilter(item.name)"
                    type="warning"
                    icon="el-icon-edit"
                    title="Editar selección"
                    circle
                    size="mini"
                  ></el-button>
                </span>
              </div>
            </template>
            <div v-for="(_item, _key) in item.items" :key="_key">
              <criteria-item
                :item_name="item.name"
                :item="_item"
              ></criteria-item>
              <hr />
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </el-card>
    <div v-if="orderFilters.length === 0">
      <el-alert
        style="height: 55vh;"
        title="Aun no aplicado criterios a su búsqueda"
        type="info"
        :closable="false"
      >
      </el-alert>
    </div>
  </div>
</template>

<script>
import { orderFilters } from "./../utils";
import { mapGetters } from "vuex";
export default {
  name: "criteria-applied",
  data() {
    return {
      activeCollapse: [],
    };
  },
  computed: {
    ...mapGetters({
      applied_filters: "filters/applied_filters",
      filters: "filters/filters",
      form: "filters/form",
      cantidades: "filters/cantidades",
    }),
    orderFilters: function() {
      let order = orderFilters(this.filters, this.applied_filters, this.form);
      for (const prop in this.cantidades) {
        let split = prop.split(".");
        if (
          split &&
          split[0] === "filtro" &&
          split[1] &&
          order &&
          order[split[1]]
        ) {
          order[split[1]].quantity = this.cantidades[prop].cantidad;
        }
      }
      return order;
    },
  },
  mounted() {},
  methods: {
    nameSubstring(name, Substring) {
      if (name.length >= Substring) {
        return name.substring(0, Substring) + "...";
      } else {
        return name;
      }
    },
    showModalFilter(filter) {
      if (this.$route.name === "buscador") {
        this.$root.$emit("show_modal_filter", filter);
      }
    },
    getActiveCollapse(key) {
      return this.activeCollapse.includes(key)
        ? "glyphicon glyphicon-minus"
        : "glyphicon glyphicon-plus";
    },
  },
};
</script>

<style lang="scss">
.criteria-applied {
  height: 55vh;
  max-width: 55vh;
  .el-collapse {
    border-top: 1px solid #fff;
    border-bottom: 1px solid #fff;
    .el-collapse-item {
      div.el-collapse-item__header {
        font-weight: bold;
        font-size: 14px;
      }
    }
  }
}
.el-collapse-item__wrap {
  border-bottom: none;
}
.flex-2 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.el-card__header {
  padding: 10px 20px !important;
  color: white !important;
  background-color: #337ab7 !important;
  border-color: #dddddd !important;
  height: 43px;
}

.span-el-button {
  margin-left: 3px;
  display: flex;
}
</style>
