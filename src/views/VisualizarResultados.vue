<template>
	<div class="home">
		<div class="container">
      <loading-full-page></loading-full-page>
			<div class="banner">
				<div class="text-center">
					<h2>Visualizar resultados</h2>
				</div>
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
							<button class="btn btn-info">
								<i class="fa fa-envelope"></i>
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
								<!--<th>Ventas ultimo año disponible(en miles de €)</th>-->
								<th>Tipo de cuentas</th>
							</tr>
							</thead>
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
      let data = {}
      for (let key in this.form) {
        if(key !== 'filtros' && this.form[key].length !== 0){
          data[key] = this.form[key]
        }
      }
      this.$store.dispatch('search/visualizarResultados', data)
    },
    descargarExcel () {
      this.loadingExcel = true
      let data = {}
      for (let key in this.form) {
        if(key !== 'filtros' && this.form[key].length !== 0){
          data[key] = this.form[key]
        }
      }
      this.$store.dispatch('search/archivoExcel', data).then((response) => {
        this.loadingExcel = false
        const url = window.URL.createObjectURL(new Blob([response], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        }))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', 'resultados.xlsx')
        document.body.appendChild(link)
        link.click()
      }).catch(() => {
        this.loadingExcel = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
	.banner { padding: 95px 0 0 0; }
</style>
