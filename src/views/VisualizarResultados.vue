<template>
	<div class="home" id="page-wrapper">
    <banner-top banner-title="Buscador de Empresas" banner-subtitle="Visualizar resultados"></banner-top>
		<div class="container">
      <loading-full-page></loading-full-page>
			<div class="banner">
				<div>
					<div class="btns-modal-header">
					<div class="m-b-10">
						<router-link
							to="/"
							class="btn btn-warning">
							<i class="fa fa-arrow-left"></i> Vover
						</router-link>
						<button class="btn btn-orange m-l-5">
							<i class="fa fa-list-alt"></i>
							Visualizar
							<span class="hidden-xs hidden-sm">resultados</span>
						</button>
					</div>
					<div class="row m-b-10">
						<div class="col-md-6">
						<button class="btn btn-primary">
							<i class="fa fa-print"></i>
							Imprimir
						</button>
						</div>
						<div class="col-md-6">
						<div class="pull-right">
							<button
                @click="enviarResultadosCorreo"
                :disabled="loadingCorreo"
                class="btn btn-info">
                <i :class="(loadingCorreo)?'fa  fa-spinner fa-spin':'fa  fa-envelope'"></i>
								Enviar al correo
							</button>
							<button
                @click="descargarExcel"
                :disabled="loadingExcel"
                class="btn btn-success m-l-5">
                <i :class="(loadingExcel)?'fa  fa-spinner fa-spin':'fa  fa-file-excel-o'"></i>
								Descargar en excel
							</button>
						</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-12">
						<div class="text-center">
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
						<div class="col-md-12">
						<table class="table">
							<thead>
                <tr>
                  <th>Razón social de la empresa</th>
                  <th>NIF</th>
                  <th>Provincia</th>
                  <th>Localidad</th>
                  <th>Último año cuentas disponibles</th>
                </tr>
							</thead>
              <tbody v-if="results && results.empresas">
                <tr v-for="(item, key) in results.empresas" :key="key">
                  <td>{{ item.RazonSocial }}</td>
                  <td>{{ item.CIF }}</td>
                  <td>{{ item.Provincia }}</td>
                  <td>{{ item.Localidad }}</td>
                  <td>{{ (item.UltimaCuentaAnual)? item.UltimaCuentaAnual.Ejercicio : ''  }}</td>
                </tr>
              </tbody>
						</table>
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
      loadingExcel: false,
      loadingCorreo: false,
      correo: '',
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
      let data = this.formatearData()
      this.$store.dispatch('search/visualizarResultados', data).then((response) => {
        this.results = response;
      }).catch(() => {
      })
    },
    descargarExcel () {
      this.loadingExcel = true
      let data = this.formatearData()
      this.$store.dispatch('search/archivoExcel', data).then((response) => {
        this.loadingExcel = false
        const link = document.createElement('a')
        link.href = `http://dev.infocif.info/api/buscador/archivos/${response}`
        link.setAttribute('download', 'resultados.xlsx')
        document.body.appendChild(link)
        link.click()
      }).catch(() => {
        this.loadingExcel = false
      })
    },
    enviarResultadosCorreo () {
      if (this.correo.length !== 0) {
        this.loadingCorreo = true
        let data = this.formatearData()
        this.$store.dispatch('search/enviarResultadosCorreo', data).then(() => {
          this.loadingCorreo = false
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
    }
  }
}
</script>

<style lang="scss" scoped>
	.banner { padding: 15px 0 0 0; }
</style>
