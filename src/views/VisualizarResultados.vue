<template>
	<div class="home" id="page-wrapper">
    <banner-top banner-title="Buscador de Empresas" banner-subtitle="Visualizar resultados"></banner-top>
		<div class="container">
      <loading-full-page></loading-full-page>
			<div class="banner">
				<div class="panel panel-default cd min-height-200">
					<div class="panel-body">
            <div class="m-b-10">
              <!-- botones -->
            </div>
            <div class="row m-b-10">
              <div class="col-md-6">
                <router-link
                  to="/"
                  class="btn btn-warning">
                  <i class="fa fa-arrow-left"></i> Vover
                </router-link>
                <button class="btn btn-primary m-l-5">
                  <i class="fa fa-print"></i>
                  Imprimir
                </button>
              </div>
              <div class="col-md-6">
                <div class="pull-right">
                  <button
                    @click="dialogCorreoVisible = true"
                    :disabled="loadingCorreo"
                    class="btn btn-info">
                    <i :class="(loadingCorreo)?'fa  fa-spinner fa-spin':'fa  fa-envelope'"></i>
                    Enviar al correo
                  </button>
                  <el-dialog
                    title="Enviar al correo"
                    :visible.sync="dialogCorreoVisible"
                    width="30%">
                      <el-alert
                        title="Ingrese el correo al que se enviaran los resultados, esto es a manera de prueba hasta que tengamos la información del usuario autenticado."
                        type="info"
                        center
                        show-icon>
                      </el-alert>
                      <br>
                      <div class="form-group">
                        <input type="email" class="form-control" placeholder="Ingresa un correo" v-model="correo" ref="correo" required>
                      </div>
                      <div class="form-group">
                        <input type="text" class="form-control" placeholder="Nombre de archivo" v-model="nombreArchivo" ref="nombreArchivoEmail" required>
                      </div>
                    <span slot="footer" class="dialog-footer">
                      <button @click="dialogCorreoVisible = false"
                        class="btn btn-danger">Cerrar</button>
                      <button
                        @click="enviarResultadosCorreo"
                        :disabled="loadingCorreo"
                        class="btn btn-info m-l-5">
                        <i :class="(loadingCorreo)?'fa  fa-spinner fa-spin':'fa  fa-envelope'"></i>
                        Enviar al correo
                      </button>
                    </span>
                  </el-dialog>
                  <button
                    @click="dialogCorreoVisible2  = true"
                    :disabled="loadingExcel"
                    class="btn btn-success m-l-5">
                    <i :class="(loadingExcel)?'fa  fa-spinner fa-spin':'fa  fa-file-excel-o'"></i>
                    Descargar en excel
                  </button>
                  <el-dialog
                    title="Ingrese el nombre del archivo para iniciar la descarga"
                    :visible.sync="dialogCorreoVisible2"
                    width="30%">
                      <div class="form-group">
                        <input type="text" class="form-control" placeholder="Nombre de archivo" v-model="nombreArchivo" ref="nombreArchivo" required>
                      </div>
                    <span slot="footer" class="dialog-footer">
                      <button @click="dialogCorreoVisible2 = false"
                        class="btn btn-danger">Cerrar</button>
                      <button
                        @click="descargarExcel"
                        :disabled="loadingExcel"
                        class="btn btn-success m-l-5">
                        <i :class="(loadingExcel)?'fa  fa-spinner fa-spin':'fa  fa-file-excel-o'"></i>
                        Iniciar la descarga
                      </button>
                    </span>
                  </el-dialog>
                </div>
              </div>
            </div>
            <div class="row">
              <!-- <div class="col-md-12">
                <div class="text-center m-b-10">
                  <button class="btn btn-warning">
                    <i class="fa fa-save"></i>
                    Guardar Columnas
                  </button>
                  <button class="btn btn-warning m-l-5">
                    <i class="fa fa-save"></i>
                    Listados Columnas Guardados
                  </button>
                  <button class="btn btn-warning m-l-5">
                    <i class="fa fa-list"></i>
                    Seleccionar Columnas
                  </button>
                </div>
              </div> -->
              <div class="col-md-12">
                <h5 class="flex_div">
                  <b>Resultados de la búsqueda</b>
                  <el-tooltip content="Ver resumen de los filtros aplicados" placement="top">
                    <span @click="showModal">
                      <filter-tree></filter-tree>
                    </span>
                  </el-tooltip>
                </h5>
                <el-dialog
                  :visible.sync="modalVisible"
                  width="95%"
                  :close-on-click-modal="true"
                  :show-close="true"
                  :destroy-on-close="true"
                  :center="true"
                  top="5vh">
                    <div class="row">
                      <div class="col-md-12">
                        <h2 class="text-center">Resumen de los filtros aplicados </h2>
                        <el-divider></el-divider>
                        <table class="table table-striped">
                          <thead>
                            <tr>
                              <th>
                                Estrategia de búsqueda
                              </th>
                              <th>
                                Criterios aplicados 
                              </th>
                              <th>
                                Cantidad resultante 
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(item, key) in filtros_aplicados" :key="key">
                              <td>
                                {{ item.title }}
                              </td>
                              <td>
                                <!-- <span class="num-fil"> ({{ item.data_quantity | numeral('0,0') }})</span> -->
                                <ul v-if="item.datas">
                                  <li v-for="(_item, _key) in item.datas" :key="_key">
                                    {{ (_item.label !== 'incluir_null')? _item.label: `Empresas en las que se desconoce su ${item.title.toLowerCase()}` }}
                                  </li>
                                </ul>
                              </td>
                              <td>
                                <span class="num-fil"> ({{ item.quantity | numeral('0,0') }})</span>
                              </td>
                            </tr>
                            <tr>
                              <td colspan="2"> 
                              </td>
                              <td>
                                <b>Total: </b> <span class="num-fil"> ({{ total | numeral('0,0') }})</span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                </el-dialog>
              </div>
              <div class="col-md-12" v-if="results && results.empresas">
                <el-table
                  border
                  stripe
                  :data="results.empresas"
                  style="width: 100%">
                  <el-table-column
                    prop="RazonSocial"
                    label="Razón social">
                  </el-table-column>
                  <el-table-column
                    prop="Provincia"
                    label="Provincia">
                  </el-table-column>
                  <el-table-column
                    prop="Localidad"
                    label="Localidad">
                  </el-table-column>
                  <el-table-column
                    prop="CIF"
                    label="NIF">
                  </el-table-column>
                  <el-table-column
                    prop="Codigo_Postal"
                    label="Código Postal">
                  </el-table-column>
                  <el-table-column
                    prop="FechaConstitucionOrigen"
                    label="Fecha de constitución">
                  </el-table-column>
                  <el-table-column
                    :prop="('UltimaCuentaAnual' && 'UltimaCuentaAnual.SumTotalEmpleados')? 'UltimaCuentaAnual.SumTotalEmpleados': ''"
                    label="Número de empleados">
                  </el-table-column>
                </el-table>
                <el-pagination
                  layout="total, prev, sizes, pager, next"
                  :total="results.total"
                  :page-size="size"
                  :current-page.sync="currentPage"
                  @current-change="pageChange"
                  @size-change="sizeChange">
                </el-pagination>
              </div>
            </div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
// @ is an alias to /src

import { mapGetters } from 'vuex'
import { orderFilters, inArrayObject, countByProperty } from './../utils'
import swal from 'sweetalert2'

export default {
	/*middleware: 'guest',*/
  name: 'visualizar-resultados',
  layout: 'basic',
  metaInfo () {
    return { 
      title: 'Visualizar resultados',
      titleTemplate: `%s | Información GRATIS de Empresas Españolas` 
    }
  },
  data: () => ({
      dialogCorreoVisible: false,
      dialogCorreoVisible2: false,
      modalVisible: false,
      loadingExcel: false,
      loadingCorreo: false,
      correo: '',
      nombreArchivo: '',
      currentPage: 1,
      size: 10,
      results: {
        cantidad: 0,
        total: 0,
        empresas: []
      },
      filtros_aplicados: [],
      total: 0
    }),
  computed: {
    ...mapGetters({
      loading: 'search/loading',
      form: 'filters/form',
      applied_filters: 'filters/applied_filters',
      localDatas: 'localDatas/localDatas',
      filters: 'filters/filters',
      cantidades: 'filters/cantidades',
    }),
    orderFilters: function () {
      let order = orderFilters(this.filters, this.applied_filters, this.form)
      for (const prop in this.cantidades) {
        let split = prop.split('.')
        if(split && split[0] === 'filtro' && split[1] && order && order[split[1]]) {
          order[split[1]].quantity = this.cantidades[prop].cantidad
        } 
      }
      return order
    }
  },
  created () {
    this.$store.dispatch('layout/setLayout', 'default-layout')
  },
  mounted () {
    if(!(this.applied_filters && this.applied_filters.length !== 0)){
      swal.fire(
        'Advertencia',
        'Aún no hay filtros aplicados',
        'warning'
      )
      this.$router.push({ name: 'buscador'})
    }else {
      this.applied_filters.forEach(item => {
        for (const key in this.localDatas) {
          if (this.localDatas.hasOwnProperty(key)) {
            const element = this.localDatas[key];
            let result = inArrayObject(this.orderFilters, element.title, 'name')
            if(element.title === item && result) {
              if(element.title === "Antigüedad"){
                this.filtros_aplicados.push({
                  title: element.title,
                  quantity: result.quantity,
                  key: result.key,
                  datas: element.selected_antiguedad,
                  data_quantity: countByProperty(element.selected_antiguedad, 'data')
                })
              }else if(element.title === "Ubicación"){
                this.filtros_aplicados.push({
                  title: element.title,
                  quantity: result.quantity,
                  key: result.key,
                  datas: element.selected_provinces_localidad,
                  data_quantity: countByProperty(element.selected_provinces_localidad, 'data')
                })
              }else if(element.title === "Número de empleados"){
                this.filtros_aplicados.push({
                  title: element.title,
                  quantity: result.quantity,
                  key: result.key,
                  datas: element.selected_empleados,
                  data_quantity: countByProperty(element.selected_empleados, 'data')
                })
              }else if(element.title === "Código Postal"){
                this.filtros_aplicados.push({
                  title: element.title,
                  quantity: result.quantity,
                  key: result.key,
                  datas: element.selected_zip_codes,
                  data_quantity: countByProperty(element.selected_zip_codes, 'data')
                })
              }else if(element.title === "Nombre o razón social"){
                this.filtros_aplicados.push({
                  title: element.title,
                  quantity: result.quantity,
                  key: result.key,
                  datas: element.selected_social_reasons,
                  data_quantity: countByProperty(element.selected_social_reasons, 'data')
                })
              }else if(element.title === "NIF"){
                this.filtros_aplicados.push({
                  title: element.title,
                  quantity: result.quantity,
                  key: result.key,
                  datas: element.selected_list_nif,
                  data_quantity: countByProperty(element.selected_list_nif, 'data')
                })
              }
            }
          }
        }
      })
      if (this.filtros_aplicados.length > 0){
        this.total = this.filtros_aplicados[(this.filtros_aplicados.length - 1)].quantity
      }
    }
    this.visualizarResultados()
  },
  methods: {
    visualizarResultados (){
      let size = this.size
      let page = this.currentPage - 1
      let filters = this.formatearData()
      this.$store.dispatch('search/visualizarResultados', {filters, page, size}).then((response) => {
        this.results = response
      }).catch(() => {
      })
    },
    descargarExcel () {
      if (this.nombreArchivo && this.nombreArchivo.length != 0) {
        this.loadingExcel = true
        let data = this.formatearData()
        this.$store.dispatch('search/archivoExcel', { filters: data, nombreArchivo: this.nombreArchivo }).then((response) => {
          const link = document.createElement('a')
          link.href = `http://dev.infocif.info/api/buscador/archivos/${response}`
          link.setAttribute('download', 'resultados.xlsx')
          document.body.appendChild(link)
          link.click()
          this.loadingExcel = false
          this.dialogCorreoVisible2 = false
          this.nombreArchivo = ''
        }).catch(() => {
          this.loadingExcel = false
        })
      }
    },
    enviarResultadosCorreo () {
      if (this.$refs["correo"].checkValidity() && this.$refs["nombreArchivoEmail"].checkValidity()) {
        this.loadingCorreo = true
        let filters = this.formatearData()
        this.$store.dispatch('search/enviarResultadosCorreo', { filters, email: this.correo, nombreArchivo: this.nombreArchivo }).then(() => {
          this.loadingCorreo = false
          this.dialogCorreoVisible = false
          this.correo = ''
          swal.fire(
            'Éxito',
            'Correo enviado',
            'success'
          )
        }).catch(() => {
          this.loadingCorreo = false
        })
      }
    },
    formatearData () {
      let data = {
        filtros: []
      }
      let arr = {}
      for (let key in this.form) {
        if(key !== 'filtros' && this.form[key].length !== 0){
          data[key] = this.form[key]
          let result = inArrayObject(this.filtros_aplicados, key, 'key')
          if (result) {
            arr[key] = this.form[key]
            let aux = {...arr}
            data.filtros.push({
              nombreFiltro: result.title,
              ...aux
            })
          }
        }
      }
      return data
    },
    pageChange() {
      this.visualizarResultados()
    },
    sizeChange (val) { 
      this.size = val
      this.visualizarResultados()
    },
    showModal () {
      this.modalVisible = true
    },
    hideModal () {
      this.modalVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
	.banner { padding: 15px 0 0 0; }
  .flex_div {
    display: flex;
    margin-left: 3px;
  }
  table {
    thead {
      background: #333;
      color: #fff;
      font-weight: bold;
      th {
        padding: 15px 10px!important;
      }
    }
  }
</style>
