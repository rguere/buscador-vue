<template>
  <div class="btn-tools">
    <el-tooltip class="item" effect="light" content="Temas" placement="left">
      <div class="dropdown">
        <button
          class="btn btn-primary dropdown-toggle"
          type="button"
          data-toggle="dropdown"
        >
          <i class="el-icon-s-tools"></i>
        </button>
        <ul class="dropdown-menu" style="left: -57px; min-width: 100px;">
          <li :class="structure === `0.1` ? `active` : ``">
            <a href="#" @click="setTeme('0.1')">Tema 1</a>
          </li>
          <li :class="structure === `0.2` ? `active` : ``">
            <a href="#" @click="setTeme('0.2')">Tema 2</a>
          </li>
        </ul>
      </div>
    </el-tooltip>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "select-topic",
  props: {
    search: Object,
  },
  data: () => ({}),
  computed: {
    ...mapGetters({
      structure: "structure/structure",
    }),
  },
  mounted() {},
  methods: {
    setTeme(teme) {
      this.$store.dispatch("structure/setstructure", teme);
    },
  },
};
</script>

<style lang="scss" scoped>
.el-dropdown-menu__item.active,
.el-dropdown-menu__item:not(.is-disabled).active {
  background-color: #ecf5ff;
  color: #66b1ff;
}

.btn-tools {
  z-index: 99;
  position: fixed;
  top: 220px;
  right: 0px;
}
</style>
