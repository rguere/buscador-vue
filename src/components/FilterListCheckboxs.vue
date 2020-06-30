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
        <div :class="class_left">
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
        </div>
      </div>
      <div class="col-md-9">
        <div :class="class_main">
          <div class="panel panel-default cd" style="margin-bottom: 0px;">
            <btns-filter :class="class_btns_filter"></btns-filter>
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
              <el-button
                class="m-l-5 btn-toggleClassFilter"
                @click="toggleClassFilter"
                :type="getToggleClassFilter"
                size="mini"
              >
                <i :class="iconToggleClassFilter"></i> Filtros
              </el-button>
            </div>
          </div>
        </div>

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
export default {
  name: "filter-list-checkboxs",
  props: {
    search: Object,
  },
  data: () => ({
    class_main: "affix-div v-0-2_col_main",
    class_left: "affix-div v-0-2_col_left",
    class_btns_filter: "",
  }),
  computed: {
    getToggleClassFilter() {
      return this.class_btns_filter === "show_filter" ? "danger" : "primary";
    },
    iconToggleClassFilter() {
      return this.class_btns_filter === "show_filter"
        ? "fa fa-close"
        : "fa fa-filter";
    },
  },
  mounted() {
    let last_known_scroll_position = 0;
    let ticking = false;
    const self = this;
    window.addEventListener("scroll", () => {
      last_known_scroll_position = window.scrollY;
      if (!ticking) {
        window.requestAnimationFrame(function() {
          self.doSomething(last_known_scroll_position);
          ticking = false;
        });
      }
      ticking = true;
    });
  },
  methods: {
    doSomething(scroll_pos) {
      if (scroll_pos > 50) {
        this.class_main = "affix-div v-0-2_col_main fixed-top";
        this.class_left = "affix-div v-0-2_col_left fixed-top";
      } else {
        this.class_main = "affix-div v-0-2_col_main";
        this.class_left = "affix-div v-0-2_col_left";
      }
    },
    toggleClassFilter() {
      this.class_btns_filter =
        this.class_btns_filter === "" ? "show_filter" : "";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./../sass/filters/filters";
.space {
  width: 100%;
  height: 350px;
}
.btn-toggleClassFilter {
  display: none;
}
.affix-div.v-0-2_col_main {
  z-index: 1;
  background-color: rgb(255, 255, 255);
  max-width: 967.5px;
  .m-b-10 {
    margin: 0 !important;
  }
}

.affix-div.v-0-2_col_main.fixed-top {
  position: fixed;
  top: 96px;
}

.affix-div.v-0-2_col_left.fixed-top {
  position: fixed;
  top: 97px;
}

.affix-div.v-0-2_col_left {
  z-index: 1;
  background-color: rgb(255, 255, 255);
  max-width: 302.68px;
}

.btn_criteria_applied_movil {
  display: none;
  background-color: #fff;
  z-index: 7;
  width: 100%;
  margin: 0 3px 3px 3px;
  .m-l-5 {
    margin-left: 5px !important;
  }
}

@media (max-width: 1330px) {
  .affix-div.v-0-2_col_main.fixed-top {
    max-width: 72.5% !important;
  }
}

@media (max-width: 1212px) {
  .affix-div.v-0-2_col_left {
    max-width: 273px !important;
  }
}

@media (max-width: 1088px) {
  .affix-div.v-0-2_col_left {
    max-width: 249px !important;
  }
}

@media (max-width: 991px) {
  .btn_criteria_applied_movil {
    display: flex;
    justify-content: center;
    align-items: center !important;
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

  .affix-div.v-0-2_col_main.fixed-top {
    max-width: 97% !important;
  }

  .affix-div.v-0-2_col_left {
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
  .affix-div.v-0-2_col_main.fixed-top {
    max-width: 96.5% !important;
  }
}

@media (max-width: 791px) {
  .affix-div.v-0-2_col_main.fixed-top {
    max-width: 96% !important;
  }
}

@media (max-width: 767px) {
  .affix-div.v-0-2_col_main.fixed-top {
    top: 42px !important;
  }
}

@media (max-width: 672px) {
  .btn-toggleClassFilter {
    display: inline-block;
  }
  .affix-div.v-0-2_col_main.fixed-top {
    max-width: 100% !important;
    left: 0 !important;
    right: 0 !important;
    width: 100% !important;
    .btn_criteria_applied_movil {
      padding: 5px !important;

      .btn.btn-primary.btn-empty-filter.btn-xs {
        padding: 3px 5px !important;
      }
    }
  }
}

@media (max-width: 564px) {
  .btn_criteria_applied_movil {
    flex-wrap: wrap;
    h3 {
      width: 100% !important;
      text-align: center;
      font-size: 25px !important;
      padding: 0 0 5px 0 !important;
    }
  }
}
</style>
