<template>
  <div class="filter-btns">
    <div v-for="(filter, key) in filters" :key="key">
      <a
        :href="`#${filter.slug}`"
        class="btn btn-default"
        v-if="!filter.disabled"
        :data-offset="filter.offset"
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
import { handleScroll, howAnimation, scrollIt } from "./../utils";
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
    window.addEventListener("scroll", handleScroll);
    let links = document.querySelectorAll(".filter-btns a");
    links.forEach((item) => {
      item.addEventListener("click", (event) => {
        event.preventDefault();
        const target = event.target;
        const href = target.getAttribute("href");
        const element = document.querySelector(href);
        const offset =
          this.structure === "0.1" ? parseInt(target.dataset.offset) : 0;
        scrollIt(element, 300, "easeOutQuad", offset, () => {
          howAnimation(element);
        });
      });
    });
  },
  watch: {},
  destroyed() {},
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
</style>
