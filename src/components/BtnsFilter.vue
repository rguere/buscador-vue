<template>
  <div class="filter-btns">
    <div v-for="(filter, key) in filters" :key="key">
      <a
        :href="`#${filter.slug}`"
        class="btn btn-default"
        v-if="!filter.disabled"
        v-scroll-to="{
          el: `#${filter.slug}`,
          offset: structure === '0.1' ? filter.offset : filter.offset_v2,
          onDone: onDone,
        }"
        :data-offset="filter.offset"
        :data-offsetv2="filter.offset_v2"
        :class="filter.apply ? 'active' : ''"
        >{{ filter.name }}</a
      >
      <el-badge v-if="filter.disabled" value="Próximamente" class="item">
        <div class="btn btn_disabled">{{ filter.name }}</div>
      </el-badge>
      <span
        class="fa fa-close"
        v-if="filter.apply"
        v-on:click.stop="resetFilter(filter)"
      ></span>
    </div>
  </div>
</template>

<script>
import { handleScroll, howAnimation } from "./../utils";
import { mapGetters } from "vuex";
import swal from "sweetalert2";
export default {
  name: "btns-filter",
  data() {
    return {
      modalVisible: false,
    };
  },
  computed: {
    ...mapGetters({
      filters: "filters/filters",
      structure: "structure/structure",
    }),
  },
  mounted() {
    if (this.structure === "0.1") {
      window.addEventListener("scroll", handleScroll);
    }
  },
  watch: {},
  destroyed() {
    if (this.structure === "0.1") {
      window.removeEventListener("scroll", handleScroll);
    }
  },
  methods: {
    resetFilter(filter) {
      swal
        .fire({
          icon: "question",
          title: "Estas seguro?",
          html: `deseas vaciar el filtro ${filter.name}?`,
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          cancelButtonColor: "#d9534f",
          showConfirmButton: true,
          confirmButtonColor: "#337ab7",
          confirmButtonText: "Si, seguro",
        })
        .then((result) => {
          if (result.value) {
            this.$root.$emit("clean_filter", filter.name);
          }
        });
    },
    onDone(element) {
      howAnimation(element);
    },
  },
};
</script>

<style lang="scss" scoped>
.filter-btns {
  display: flex;
  flex-wrap: wrap;
  div {
    flex-grow: 1;
    width: 14%;
    display: flex;
    justify-content: flex-end;
    min-height: 52px;
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

@media (max-width: 672px) {
  .affix-div.v-0-2_col_main.fixed-top {
    width: 100% !important;
    .filter-btns {
      flex-wrap: nowrap;
      overflow-x: scroll;
      width: 100% !important;
      margin-bottom: 15px !important;
      &::-webkit-scrollbar {
        width: 6px !important;
        height: 6px !important;
      }
      > div {
        min-height: 40px !important;
        width: 100% !important;
        min-width: 200px;
        flex: 1;
        .btn {
          white-space: nowrap !important;
          width: 100% !important;
        }
      }
    }
  }
}
</style>
