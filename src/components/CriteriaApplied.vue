<template>
  <div class="criteria-applied">
    <el-card
      class="box-card"
      v-if="filters && filters.length > 0"
      :body-style="{
        padding: '0px 20px 10px 20px',
        maxHeight: '250px',
        overflowY: 'scroll',
      }"
    >
      <div slot="header" class="clearfix">
        <span class="panel-title roboto white">Criterios Aplicados</span>
      </div>
      <div>
        <el-collapse v-model="activeNames">
          <el-collapse-item
            v-for="(item, key) in applyFilters(filters)"
            :title="item.name"
            :name="key"
            :key="key"
          >
            <div v-for="(_item, _key) in item.items" :key="_key">
              <div class="flex-2" v-if="item.name === 'Nombre o razón social'">
                <span class="name-checkbox">{{ _item.RazonSocial }}</span>
              </div>
              <div class="flex-2" v-if="item.name !== 'Nombre o razón social'">
                <span class="name-checkbox">{{ _item.label }}</span>
                <span class="num-fil">({{ _item.data | numeral("0,0") }})</span>
              </div>
              <hr />
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "criteria-applied",
  data() {
    return {
      activeNames: [],
    };
  },
  computed: {
    ...mapGetters({
      filters: "filters/filters",
    }),
  },
  mounted() {},
  methods: {
    applyFilters(filters) {
      return filters.filter((item) => item.apply);
    },
  },
};
</script>

<style lang="scss">
.criteria-applied {
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
}

.el-card__header {
  padding: 10px 20px !important;
  color: white !important;
  background-color: #337ab7 !important;
  border-color: #dddddd !important;
  height: 43px;
}
</style>
