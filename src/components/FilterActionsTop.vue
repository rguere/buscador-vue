<template>
  <div class="padding-to-20">
    <div class="row">
      <div class="col-md-3">
        <p class="selected_companies"><span class="f-18">{{ selected_companies | numeral('0,0') }}</span> Empresas seleccionadas</p>
      </div>
      <div class="col-md-9">
        <div class="filter-actions-top_center">
          <div class="vaciar">
            <button class="btn btn-primary">
              <i class="fa fa-trash"></i> Vaciar <span class="hidden-xs hidden-sm">búsqueda</span>
            </button>
          </div>
          <div class="guardar">
            <button class="btn btn-primary">
              <i class="fa fa-save"></i> Guardar <span class="hidden-xs hidden-sm">búsqueda</span>
            </button>
          </div>
          <div class="historial">
            <button class="btn btn-primary">
              <i class="fa fa-history"></i> Historial
            </button>
          </div>
          <div class="visualizar">
            <button class="btn btn-primary btn-block">
              <i class="fa fa-list-alt"></i> Visualizar <span class="hidden-xs hidden-sm">resultados</span>
            </button>
          </div>
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
.f-18 { font-size: 18px; }
.padding-to-20 {
  padding-top: 20px;
}
p.selected_companies{
  font-weight: bold;
}
.filter-actions-top_center {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 2fr;
  grid-auto-rows: minmax(auto, auto);
  div {
    padding: 0 5px;
    button {
      width: 100%;
    }
  }
}

#filter-buttons.is-fixed {
  p {
    margin: 0;
    padding: 0;
  }
  .row {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    margin: 0;
    padding: 0;
    width: 49%;
    .col-md-3 {
      width: 100%;
    }
  }
  .row:before, .row:after {
    display: none;
  }

  .filter-actions-top_center {
    display: flex;
    justify-content: flex-end;
    span.hidden-xs { display: none; }
    div {
      padding: 0;
      button {
        width: auto;
        padding: 1px 4px;
        margin: 0 2px;
      }
    }
  }

  .content-selected-filters {
    padding: 0;
    margin: 0;
    button {
      width: auto;
      padding: 1px 4px;
      margin: 0 2px;
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
  margin-top: 10px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;

  .btn {
    color: #0071BC !important;
    list-style: none;
    margin: 2.5px;
    border: 1px solid #dddddd;
    color: #1b4973;
    border-radius: 4px;
    padding: 10px 15px;
    background-color: #eeeeee;
    font-size: 13px;
    transition: all 0.2s;

    span {
      position: relative;
      color: #333;
      font-weight: bold;
      top: -10px;
      right: -15px;
      padding: 2px 4px;
      font-size: 12px;
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
