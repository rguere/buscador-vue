<template>
  <div class="btn-tools">
    <el-tooltip
      class="item"
      effect="light"
      content="Selecione Tema"
      placement="left"
    >
      <el-dropdown size="mini" @command="setTeme">
        <el-button
          type="primary"
          style="padding: 3px 5px 3px 0px; font-size: 15px;"
        >
          <i class="el-icon-s-tools el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            command="0.1"
            :class="structure === `0.1` ? `active` : ``"
            >Tema 1</el-dropdown-item
          >
          <el-dropdown-item
            command="0.2"
            :class="structure === `0.2` ? `active` : ``"
            >Tema 2</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
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
  top: 150px;
  right: 10px;
}
</style>
