<template>
  <div class="panel panel-default cd min-height-200">
    <div class="panel-body">
      <div id="filter-buttons">
        <div class="my_container">
          <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-9">
              <p class="filter-buttons_description text-center">
                ¡Incorpora a tus búsquedas tantos filtros como quieras!. Hay
                múltiples posibilidades.
              </p>
            </div>
          </div>
          <div class="row">
            <div class="col-md-3">
              <btn-visualizar-resultados></btn-visualizar-resultados>
              <selected-companies></selected-companies>
            </div>
            <div class="col-md-9">
              <btns-filter></btns-filter>
              <div class="actions-btns">
                <btn-empty-filter></btn-empty-filter>
              </div>
            </div>
            <div class="col-md-12">
              <h5>
                <b>Buscador Empresas de Infocif</b>
                <span>
                  <filter-tree></filter-tree>
                </span>
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { handleScroll } from "./../utils";
export default {
  name: "filter-buttons",
  data() {
    return {};
  },
  computed: {},
  mounted() {
    //window.addEventListener("scroll", handleScroll);
  },
  watch: {},
  destroyed() {
    //window.removeEventListener("scroll", handleScroll);
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
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
