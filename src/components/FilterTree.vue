<template>
  <span>
    <span
      v-for="(filter, key) in orderFilters"
      :key="key"
      @click="showModalFilter(filter.name)"
      class="show-modal-filter"
    >
      <span class="filter-apply" v-if="filter.apply">
        <span class="flecha_">></span> {{ filter.name }}
        <span class="num-fil">( {{ filter.quantity | numeral("0,0") }} )</span>
      </span>
    </span>
  </span>
</template>

<script>
import { orderFilters } from "./../utils";
import { mapGetters } from "vuex";
export default {
  name: "filter-tree",
  data() {
    return {};
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
  watch: {},
  destroyed() {},
  methods: {
    showModalFilter(filter) {
      if (this.$route.name === "buscador") {
        this.$root.$emit("show_modal_filter", filter);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.flecha_ {
  display: contents;
}
.show-modal-filter {
  cursor: pointer;
}
.m-l-5 {
  margin-left: 5px;
}
.m-b-10 {
  margin-bottom: 10px;
}
.negrita {
  font-weight: bold;
}
.margin-top-10 {
  margin-top: 10px;
}
.selected_companies {
  font-weight: bold;
}
.filter-buttons_description {
  font-size: 14px;
}
.filter-btns {
  display: flex;
  flex-wrap: wrap;
  div {
    flex-grow: 1;
    width: 14%;
    display: flex;
    justify-content: flex-end;
    .btn {
      width: 100%;
      justify-content: center;
      align-items: center;
      white-space: pre-wrap !important;
      font-size: 12px;
      display: flex;
      padding: 6px 4px;
      font-weight: bold;
      background-color: #dddddd;
      color: #555;
      border: 2px solid #ffffff;
      margin: 1px;
      &:hover,
      &.active {
        background-color: #deebf7;
        color: #0071bc;
        border-color: #1b4973;
      }
    }
    .btn_disabled,
    .btn_disabled:hover,
    .btn_disabled:active {
      width: 100%;
      color: -internal-light-dark-color(graytext, rgb(170, 170, 170));
      justify-content: center;
      align-items: center;
      white-space: pre-wrap !important;
      font-size: 12px;
      display: flex;
      padding: 6px 4px;
      font-weight: bold;
      background-color: #dddddd;
      color: #555;
      border: 2px solid #ffffff;
      margin: 1px;
      cursor: pointer;
      opacity: 0.5;
    }
    span.fa-close {
      position: absolute;
      background-color: red;
      color: #fff;
      font-weight: bold;
      border-radius: 50%;
      padding: 2px 4px;
      font-size: 11px;
      font-weight: 100;
      margin: 5px -5px;
      cursor: pointer;
    }
  }
}
.actions-btns {
  margin-top: 5px;
  button {
    margin-right: 3px;
  }
}
#filter-buttons.is-fixed {
  position: fixed;
  left: 0;
  top: 96px;
  width: 100%;
  padding-top: 5px;
  z-index: 2;
  background: #ffffff;
  -webkit-box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  box-shadow: 0 -2px 11px 0px rgba(0, 0, 0, 0.5);
  transition: all 1s;

  .filter-buttons_description {
    display: none;
  }
}
.min-height-200 {
  min-height: 200px;
  margin-top: 20px;
}
.filter-apply {
  margin-left: 5px;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
}
</style>
