<template>
  <div class="conten-flex-70-30">
    <div class="conten-flex-50-50">
      <div class="filter-actions-top_left">
        <p class="selected_companies">{{ selected_companies }} empresas seleccionadas</p>
      </div>
      <div class="filter-actions-top_center">
        <div>
          <button class="btn btn-vaciar-busqueda">
            <i class="fa fa-trash"></i> Vaciar Búsqueda
          </button>
        </div>
        <div>
          <button class="btn btn-guardar-busqueda">
            <i class="fa fa-save"></i> Guardar búsqueda
          </button>
        </div>
        <div>
          <button class="btn btn-historial">
            <i class="fa fa-alarm"></i> Historial
          </button>
        </div>
      </div>
    </div>
    <div>
      <div class="filter-actions-top_right">
        <div>
          <button class="btn btn-action-search">
            VISUALIZAR LISTA DE RESULTADOS
          </button>
        </div>
      </div>
    </div>
    <div class="filters-applied">
      <div>
        <div class="content-selected-filters">
          <p>Filtros aplicados: </p>
          <button v-for="(filter, key) in applied_filters" :key="key" class="btn">
            {{ filter }}
            <span @click="resetFilter">X</span>
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
      resetFilter() {
        this.$store.dispatch('filters/resetFilter')
      }
    }
  }
</script>

<style lang="scss" scoped>
p.selected_companies{
  font-weight: bold;
}
.conten-flex-70-30 {
  margin: 15px 0 0 0;
}

.filter-actions-top_center {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: minmax(auto, auto);
  
  div {
    padding: 0 5px;

    button {
      width: 100%;
      font-size: 12px;
      color: #000;
      font-weight: bold;
      padding: 2px 5px;
    }

    button.btn-vaciar-busqueda {
      background-color: #ffd966;
    }

    button.btn-guardar-busqueda {
      background-color: #ee7758;
    }

    button.btn-historial {
      background-color: #9dc3e6;
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
