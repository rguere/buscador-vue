<template>
	<div class="home" id="page-wrapper">
    <banner-top banner-title="Buscador de Empresas" banner-subtitle="Visualizar resultados"></banner-top>
		<div class="container">
      <loading-full-page></loading-full-page>
			<div class="banner">
				<div class="panel panel-default cd min-height-200">
					<div class="panel-body">
            <div class="m-b-10">
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
            <div class="row m-b-10">
              <div class="col-md-6">
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
                      class="btn btn-danger">Cancel</button>
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
                      class="btn btn-danger">Cancel</button>
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
              <div class="col-md-12">
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
              </div>
              <div class="col-md-12" v-if="results && results.empresas">
                <el-table
                  border
                  :data="results.empresas"
                  style="width: 100%">
                  <el-table-column
                    prop="RazonSocial"
                    label="Razón social de la empresa">
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
                    label="Antigüedad">
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
      }
    }),
  computed: mapGetters({
    loading: 'search/loading',
    form: 'filters/form',
  }),
  created () {
    this.$store.dispatch('layout/setLayout', 'default-layout')
  },
  mounted () {
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
      let data = {}
      for (let key in this.form) {
        if(key !== 'filtros' && this.form[key].length !== 0){
          data[key] = this.form[key]
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
    }
  }
}
</script>

<style lang="scss" scoped>
	.banner { padding: 15px 0 0 0; }
</style>
