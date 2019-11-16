<template>
  <div class="padding-to-20">
    <div class="row">
      <div class="col-md-3">
        <p class="selected_companies">{{ selected_companies | numeral('0,0') }} empresas seleccionadas</p>
      </div>
      <div class="col-md-5">
        <div class="filter-actions-top_center">
          <div>
            <button class="btn btn-warning">
              <i class="fa fa-trash"></i> Vaciar Búsqueda
            </button>
          </div>
          <div>
            <button class="btn btn-danger">
              <i class="fa fa-save"></i> Guardar búsqueda
            </button>
          </div>
          <div>
            <button class="btn btn-info">
              <i class="fa fa-history"></i> Historial
            </button>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div>
          <button class="btn btn-warning btn-block">
            VISUALIZAR LISTA DE RESULTADOS <i class="fa fa-list-alt"></i>
          </button>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="content-selected-filters">
          <p>Filtros aplicados: </p>
          <button v-for="(filter, key) in applied_filters" :key="key" class="btn" v-on:click.stop="showModalFilter(filter)">
            {{ filter }}
            <span v-on:click.stop="resetFilter(filter)">X</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'filter-actions-top',
    computed: mapGetters({
      applied_filters: 'filters/applied_filters',
      selected_companies: 'filters/selected_companies',
    }),
    data() {
      return {}
    },
    mounted() {},
    methods: {
      resetFilter(filter) {
        this.$root.$emit('clean_filter', filter)
      },
      showModalFilter(filter) {
        this.$root.$emit('show_modal_filter', filter)
      }
    }
  }
</script>

<style lang="scss" scoped>
.padding-to-20 {
  padding-top: 20px;
}
p.selected_companies{
  font-weight: bold;
}
.filter-actions-top_center {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: minmax(auto, auto);
  
  div {
    padding: 0 5px;

    button {
      width: 100%;
    }
  }
}

.filters-applied {
  grid-column: 1/3;
}

.filters-applied p {
  font-size: 14px;
}

.content-selected-filters {
  width: 100%;
  display: flex;
  flex-wrap: wrap;

  .btn {
    list-style: none;
    margin: 2.5px;
    border: 2px solid #1b4973;
    color: #1b4973;
    font-weight: bold;
    border-radius: 8px;
    padding: 5px;
    background-color: #deebf7;
    font-size: 13px;
    cursor: initial;
    transition: all 0.2s;

    span {
      position: relative;
      background-color: red;
      color: #fff;
      top: -5px;
      border-radius: 50%;
      padding: 0px 3px;
      font-size: 10px;
      cursor: pointer;
    }

  }

}

@media (max-width: 750px) {
  .filter-actions-top_center {
    margin-bottom: 10px;
  }
  .content-selected-filters {
    margin-top: 10px;
  }
}

@media (max-width: 550px) {
  .filter-actions-top_center {
    grid-template-columns: repeat(1, 1fr);
    div {
      margin: 2.5px 0;
    }
  }
}
</style>
