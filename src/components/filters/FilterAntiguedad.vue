<template>
  <div class="panel panel-default cd" id="filter_antiguedad">

    <div class="panel-heading">
      <p class="panel-title roboto white">
        Antigüedad
      </p>
    </div>
    <div class="panel-body">
      <div class="grid-3-columns-1fr">
        <div v-for="(item, key) in search.antiguedad" :key="key">
          <label class="custon-checkboxs">
            <input type="checkbox"
              :name="`checkbox_antiguedad${item.id}`"
              v-model="selection_antique"
              @change="handleChange(item, $event)"
              :id="`checkbox_antiguedad${item.id}`"
              :value="item">
            <span class="geekmark"></span>
            <span class="name-checkbox">{{ item.label }}</span>
            <span class="num-fil">({{ item.data | numeral('0,0') }})</span>
          </label>
        </div>
      </div>
      <div class="flex-space-between-flex-end">
        <button class="btn btn-warning">Ver detalles <i class="fa fa-plus-circle"></i></button>
        <p class="text-help">* Puede elegir más de una opción</p>
      </div>
      <div>
        <div class="bg-g">
          <label class="custon-checkboxs">
            <input type="checkbox" name="">
            <span class="geekmark"></span>
            <span class="title">
              Incluir aquellas empresas en las que se desconoce su antigüedad
            </span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import swal from 'sweetalert2'
  export default {
    name: 'filter-antiguedad',
    computed: mapGetters({
      search: 'search/search',
      loading: 'search/loading',
      form: 'filters/form',
      selected_companies: 'filters/selected_companies',
      applied_filters: 'filters/applied_filters',
    }),
    data: () => ({
      title: 'Antigüedad',
      selection_antique: [],
    }),
    watch: { },
    mounted() {
      this.$root.$on('clean_filter', (filter) => {
        if (filter === this.title) { this.clean() }
      })
      this.$root.$on('show_modal_filter', (filter) => {
        if (filter === this.title) { this.showModal() }
      })
      this.$root.$on('empty_filter', (filter) => {
        if (filter === this.title) { this.emptyFilter() }
      })
    },
    methods: {
      showModal () {
        this.modalVisible = true
      },
      hideModal () {
        this.modalVisible = false
      },
      apply () { },
      confirmClean () {
        swal.fire({
          icon: 'question',
          title: 'Estas seguro?',
          html: `deseas vaciar el filtro ${this.title}?`,
          showCancelButton: true,
          cancelButtonText: 'Cancelar',
          cancelButtonColor: '#d9534f',
          showConfirmButton: true,
          confirmButtonColor: '#337ab7',
          confirmButtonText: 'Si, seguro'
        }).then((result) => {
          if (result.value) {
            this.clean()
          }
        })
      },
      clean () { },
      emptyFilter () { },
      handleChange () { }
    }
  }
</script>

<style lang="scss" scoped>

  @import './../../sass/filters/filters';

  .bg-g {
    width: 50%;
    float: right;
  }

</style>
