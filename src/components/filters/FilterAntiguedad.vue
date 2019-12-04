<template>
  <div class="panel panel-default cd" id="filter_antiguedad">

    <div class="panel-heading">
      <p class="panel-title roboto white">
        {{ title }}
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
        <button class="btn btn-warning" @click="showModal">Ver detalles <i class="fa fa-plus-circle"></i></button>
        <p class="text-help">* Puede elegir más de una opción</p>
      </div>
      <div>
        <div class="bg-g float-right">
          <label class="custon-checkboxs">
            <input type="checkbox" name="">
            <span class="geekmark"></span>
            <span class="title">
              Incluir aquellas empresas en las que se desconoce su antigüedad
            </span>
          </label>
        </div>
      </div>
      <el-dialog :visible.sync="modalVisible"
        width="95%"
        :close-on-click-modal="false"
        :show-close="false"
        :destroy-on-close="true"
        :center="true"
        top="5vh">
          <div>
            <div class="btns-modal-header">
              <div>
                <button class="btn btn-warning" @click="hideModal"><i class="fa fa-arrow-left"></i> Vover</button>
                <button class="btn btn-a">
                  {{ title }}
                </button>
              </div>
              <div>
                <button type="button" class="btn btn-success" v-if="selection_antique.length !== 0" @click="apply">Aplicar <i :class="(loadingFrm)?'fa  fa-spinner fa-spin':'fa  fa-send'"></i></button>
                <button type="button" class="btn btn-info" v-if="areApplied" @click="confirmClean">Limpiar <i class="fa fa-undo"></i></button>
              </div>
            </div>
            <div class="row" v-if="search.antiguedad && search.antiguedad.length !== 0">
              <div class="col-md-12">
                <div class="panel panel-default cd">
                  <div class="panel-heading">
                    <p class="panel-title roboto white">
                      Seleccionar empresas por años de antigüedad.
                    </p>
                  </div>
                  <div class="panel-body">
                    <div class="row">
                      <div class="col-md-6">
                        <div class="conten-epa">
                          <div class="form-group">
                            <label class="control-label">Insertar la antigüedad de la(s) empresa(s) en número de años</label>
                          </div>
                          <div class="form-group anti-inputs">
                            <label>De (incluido)</label>
                            <input type="text" class="form-control" placeholder="(Introducir, en formato número, los años de antigüedad)">
                            <label>años de antigüedad</label>
                          </div>
                          <div class="form-group anti-inputs">
                            <label>De (incluido)</label>
                            <input type="text" class="form-control" placeholder="(Introducir, en formato número, los años de antigüedad)">
                            <label>años de antigüedad</label>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <button
                          type="button" 
                          class="btn btn-info"
                          :disabled="daterange.length === 0">
                            BUSCAR <i :class="(loadingDaterange)?'fa  fa-spinner fa-spin':'fa  fa-search'"></i>
                        </button>
                        <div class="panel panel-warning">
                          <div class="panel-heading">Seleccionar años, por búsqueda estándar</div>
                          <div class="panel-body">
                            <div class="checkbox">
                              <label>(Seleccionar todo) <input type="checkbox" value=""></label>
                            </div>
                            <div class="checkbox">
                              <label>Más de 50 años de antigüedad. <input type="checkbox" value=""></label>
                            </div>
                            <div class="checkbox">
                              <label>De 25 a 10 años de antigüedad. <input type="checkbox" value=""></label>
                            </div>
                            <div class="checkbox">
                              <label>De 10 a 25 años de antigüedad. <input type="checkbox" value=""></label>
                            </div>
                            <div class="checkbox">
                              <label>De 1 a 10 años de antigüedad. <input type="checkbox" value=""></label>
                            </div>
                            <div class="checkbox">
                              <label>Menos de un año. <input type="checkbox" value=""></label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-12">
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
                </div>
              </div>
              <div class="col-md-12">
                <div class="panel panel-default cd">
                  <div class="panel-heading">
                    <p class="panel-title roboto white">
                      Seleccionar empresas por años de antigüedad.
                    </p>
                  </div>
                  <div class="panel-body">
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">
                          <label class="control-label">Insertar la fecha de constitución de la(s) empresa(s)</label>
                          <el-date-picker
                            v-model="daterange"
                            class="form-control daterange"
                            type="daterange"
                            format="dd/MM/yyyy"
                            range-separator=""
                            start-placeholder="Desde (incluido)"
                            end-placeholder="Hasta (incluido)">
                          </el-date-picker>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <button
                          type="button" 
                          class="btn btn-info"
                          :disabled="daterange.length === 0">
                            BUSCAR <i :class="(loadingDaterange)?'fa  fa-spinner fa-spin':'fa  fa-search'"></i>
                        </button>
                      </div>
                      <div class="col-md-12">
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
                </div>
              </div>
            </div>
          </div>
        </el-dialog>
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
      daterange: '',
      selection_antique: [],
      loadingDaterange: false,
      areApplied: false,
      reapply: false,
      showBtnApply: false,
      loadingFrm: false,
      modalVisible: false
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

  .float-right {
    float: right;
  }
  .bg-g {
    width: 50%;
  }

  .el-range-editor--medium.el-input__inner {
    width: 100%;
  }

  .anti-inputs {
    display: flex;
    align-items: center;
    input {
      width: 50%;
      margin: 0 5px;
    }
  }

  .conten-epa {
    padding: 55px 0;
  }

  .checkbox input[type=checkbox]{
    margin-left: 15px;
  }

  .panel-warning {
    margin-top: 20px;
    width: 300px;
  }

</style>
