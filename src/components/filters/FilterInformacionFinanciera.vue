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
      <!-- <div style="height: 260px; margin-top: 10px;">
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
            slot-scope="{
              node,
              shouldShowCount,
              count,
              labelClassName,
              countClassName,
            }"
            :class="labelClassName"
          >
            {{ node.id }} - {{ node.label }}
            <span class="num-fil" v-if="node.raw.id != 'all'"
              >({{ node.raw.data | numeral("0,0") }})</span
            >
            <span v-if="shouldShowCount" :class="countClassName"
              >({{ count }})</span
            >
          </label>
        </treeselect>
      </div> -->
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
        id: "fruits",
        label: "Fruits",
        children: [
          {
            id: "apple",
            label: "Apple 🍎",
            isNew: true,
          },
          {
            id: "grapes",
            label: "Grapes 🍇",
          },
          {
            id: "pear",
            label: "Pear 🍐",
          },
          {
            id: "strawberry",
            label: "Strawberry 🍓",
          },
          {
            id: "watermelon",
            label: "Watermelon 🍉",
          },
        ],
      },
      {
        id: "vegetables",
        label: "Vegetables",
        children: [
          {
            id: "corn",
            label: "Corn 🌽",
          },
          {
            id: "carrot",
            label: "Carrot 🥕",
          },
          {
            id: "eggplant",
            label: "Eggplant 🍆",
          },
          {
            id: "tomato",
            label: "Tomato 🍅",
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
