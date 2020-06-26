<template>
  <div>
    <div>
      <p
        class="filter-buttons_description text-center b"
        style="background-color: paleturquoise; padding: 5px;"
      >
        ¡Incorpora a tus búsquedas tantos filtros como quieras!. Hay múltiples
        posibilidades.
      </p>
    </div>
    <div class="row">
      <div class="col-md-3">
        <affix
          class="sidebar-menu v-0-2_col_left"
          :offset="offset_col_left"
          relative-element-selector="#example-content"
        >
          <div class="panel panel-default cd col_left">
            <div class="panel-body">
              <selected-companies></selected-companies>
              <btn-visualizar-resultados
                class="m-b-10"
              ></btn-visualizar-resultados>
              <btn-empty-filter class="m-b-10"></btn-empty-filter>
              <criteria-applied></criteria-applied>
            </div>
          </div>
        </affix>
      </div>
      <div class="col-md-9">
        <affix
          class="sidebar-menu v-0-2_col_main"
          :offset="offset_col_main"
          relative-element-selector="#example-content"
        >
          <div class="panel panel-default cd" style="margin-bottom: 0px;">
            <btns-filter></btns-filter>
            <div class="btn_criteria_applied_movil">
              <selected-companies></selected-companies>
              <btn-visualizar-resultados
                :class_btn="'btn-xs'"
              ></btn-visualizar-resultados>
              <btn-empty-filter :class_btn="'btn-xs'"></btn-empty-filter>
              <el-popover
                popper-class="popover_criteria-applied"
                placement="right"
                width="400"
                trigger="click"
              >
                <div>
                  <criteria-applied></criteria-applied>
                </div>
                <el-button slot="reference" type="primary" size="mini"
                  ><i class="el-icon-s-tools"></i> Criterios</el-button
                >
              </el-popover>
            </div>
          </div>
        </affix>

        <div id="example-content" class="panel panel-default cd m-t-20">
          <div class="panel-body">
            <div class="row">
              <div class="col-md-12">
                <filter-ubicacion></filter-ubicacion>
                <filter-codigo-postal></filter-codigo-postal>
                <filter-antiguedad></filter-antiguedad>
                <filter-razon-social></filter-razon-social>
                <filter-numero-empleados></filter-numero-empleados>
                <filter-nif></filter-nif>
                <filter-anios-cuentas-disponibles></filter-anios-cuentas-disponibles>
                <filter-tipo-cuentas></filter-tipo-cuentas>
                <filter-sector-actividad></filter-sector-actividad>
                <filter-auditores></filter-auditores>
                <filter-cargos></filter-cargos>
                <filter-directivos-vinculaciones></filter-directivos-vinculaciones>
                <filter-informacion-financiera></filter-informacion-financiera>
                <div class="space"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const offsetLeft = () => {
  return window.innerWidth <= 767
    ? { top: 170, bottom: 0 }
    : { top: 224, bottom: 0 };
};

const offsetMain = () => {
  return window.innerWidth <= 767
    ? { top: 170, bottom: 0 }
    : { top: 224, bottom: 0 };
};

export default {
  name: "filter-list-checkboxs",
  props: {
    search: Object,
  },
  data: () => ({
    offset_col_left: offsetLeft(),
    offset_col_main: offsetMain(),
  }),
  computed: {},
  mounted() {
    window.onresize = () => {
      this.offset_col_main = offsetMain();
      this.offset_col_left = offsetLeft();
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
@import "./../sass/filters/filters";
.space {
  width: 100%;
  height: 350px;
}
.sidebar-menu.v-0-2_col_main {
  z-index: 1;
  background-color: rgb(255, 255, 255);
  max-width: 967.5px;
  .m-b-10 {
    margin: 0 !important;
  }
}

.sidebar-menu.v-0-2_col_left {
  z-index: 1;
  background-color: rgb(255, 255, 255);
  max-width: 302.68px;
}

.btn_criteria_applied_movil {
  display: none;
  background-color: #fff;
  z-index: 7;
  margin: 0 3px 3px 3px;
}

@media (max-width: 1330px) {
  .sidebar-menu.v-0-2_col_main.vue-affix.affix {
    max-width: 72.5% !important;
  }
}

@media (max-width: 1212px) {
  .sidebar-menu.v-0-2_col_left {
    max-width: 273px !important;
  }
}

@media (max-width: 1088px) {
  .sidebar-menu.v-0-2_col_left {
    max-width: 249px !important;
  }
}

@media (max-width: 991px) {
  .btn_criteria_applied_movil {
    display: flex;
    justify-content: center;
    .selected_companies,
    .btn-empty-filter {
      margin: 0 5px 0 0 !important;
    }

    .btn-orange {
      padding: 3px 5px !important;
      margin: 0 5px 0 0 !important;
    }

    .criteria-applied {
      height: auto !important;
    }
  }

  .footerjsload {
    position: initial !important;
  }

  .sidebar-menu.v-0-2_col_main.vue-affix.affix {
    max-width: 97% !important;
  }

  .sidebar-menu.v-0-2_col_left {
    z-index: 5 !important;
    .panel.col_left {
      position: fixed;
      top: 97px;
      left: -400px !important;
      display: none !important;
      width: 0 !important;
      height: 0 !important;
      opacity: 0 !important;
    }
  }
}

@media (max-width: 891px) {
  .sidebar-menu.v-0-2_col_main.vue-affix.affix {
    max-width: 96.5% !important;
  }
}

@media (max-width: 791px) {
  .sidebar-menu.v-0-2_col_main.vue-affix.affix {
    max-width: 96% !important;
  }
}

@media (max-width: 691px) {
  .sidebar-menu.v-0-2_col_main.vue-affix.affix {
    max-width: 95% !important;
  }
}

@media (max-width: 591px) {
  .sidebar-menu.v-0-2_col_main.vue-affix.affix {
    max-width: 94.5% !important;
  }
}

@media (max-width: 491px) {
  .sidebar-menu.v-0-2_col_main.vue-affix.affix {
    max-width: 93% !important;
  }
}

@media (max-width: 391px) {
  .sidebar-menu.v-0-2_col_main.vue-affix.affix {
    max-width: 90% !important;
  }
}
</style>
