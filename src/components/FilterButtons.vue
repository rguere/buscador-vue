<template>
	<div class="panel panel-default cd min-height-200">
		<div class="panel-body">
			<div id="filter-buttons">
				<div class="my_container">
					<div class="row">
						<div class="col-md-3"></div>
						<div class="col-md-9">
							<p class="filter-buttons_description text-center">¡Incorpore a sus búsqueda tantos filtros como quiera, dentro de nuestras múltiples posibilidades!</p>
						</div>
					</div>
					<div class="row">
						<div class="col-md-3">
							<button
								:disabled="applied_filters.length === 0"
								class="btn btn-orange btn-lg"
								@click="showResults">
								<i class="fa fa-list-alt"></i>
								Visualizar
								<span class="hidden-xs hidden-sm">resultados</span>
							</button>
							<h3 class="selected_companies">
								<span class="f-20">{{ selected_companies | numeral('0,0') }}</span>
								Empresas seleccionadas
							</h3>
						</div>
						<div class="col-md-9">
							<div class="filter-btns">
								<div v-for="(filter, key) in filters" :key="key">
									<a href="" 
										class="btn btn-default"
										:class="(filter.apply)? 'active': ''"
										v-scroll-to="{
											el: `#${filter.slug}`,
											offset: -290,
											onDone: onDone
										}">
										{{ filter.name }}
									</a>
									<span
										class="fa fa-close"
										v-if="filter.apply"
										v-on:click.stop="resetFilter(filter)"></span>
								</div>
							</div>
							<div class="actions-btns">
								<button
									class="btn btn-primary"
									:disabled="applied_filters.length === 0"
									@click="emptyFilter">
									<i class="fa fa-trash"></i> Vaciar <span class="hidden-xs hidden-sm"> resultados</span>
								</button>
								<button
									class="btn btn-primary"
									:disabled="applied_filters.length === 0">
									<i class="fa fa-save"></i> Guardar <span class="hidden-xs hidden-sm"> búsqueda</span>
								</button>
								<button class="btn btn-primary">
									<i class="fa fa-history"></i> Historial
								</button>
							</div>
						</div>
						<div class="col-md-12">
							<h5>
								<b>Buscador Empresas de Infocif</b>
								<span v-for="(filter, key) in orderFilters" :key="key" @click="showModalFilter(filter.name)" class="show-modal-filter">
									<span class="filter-apply" v-if="filter.apply">
										> {{ filter.name }} <span class="num-fil">( {{ filter.quantity | numeral('0,0') }} )</span>
									</span>
								</span>
							</h5>
						</div>
					</div>
				</div>
			</div>
		</div>
		<el-dialog
			:visible.sync="modalVisible"
			width="95%"
			:close-on-click-modal="false"
			:show-close="false"
			:destroy-on-close="true"
			:center="true"
			top="5vh">
			<div>
				<div class="btns-modal-header">
				<div class="m-b-10">
					<button class="btn btn-warning" @click="hideResults">
					<i class="fa fa-arrow-left"></i> Vover
					</button>
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
						<button class="btn btn-success m-l-5">
						<i class="fa fa-file-excel-o"></i>
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
							<th>Ventas ultimo año disponible(en miles de €)</th>
							<th>Tipo de cuentas</th>
						</tr>
						</thead>
					</table>
					</div>
				</div>
				</div>
			</div>
			</el-dialog>
	</div>
</template>

<script>
	import { handleScroll, howAnimation, inArrayObject } from './../utils'
	import { mapGetters } from 'vuex'
	import swal from 'sweetalert2'
	export default {
		name: 'filter-buttons',
		data() {
      return {
      modalVisible: false
      }
    },
    computed: {
      ...mapGetters({
        applied_filters: 'filters/applied_filters',
        selected_companies: 'filters/selected_companies',
        filters: 'filters/filters',
      }),
      orderFilters: function () {
        let arrayResult = this.applied_filters.map((item) => {
          return inArrayObject(this.filters, item, `name`)
        })
        return arrayResult
      }
    },
    mounted() {
      window.addEventListener('scroll', handleScroll); 
    },
    watch: {},
    destroyed () {
      window.removeEventListener('scroll', handleScroll);
    },
    methods: {
      onDone (element) {
        howAnimation(element)
      },
      activeFilter(filter) {
        let links = document.querySelectorAll('.filter-btns a')
        links.forEach((item) => {
          if(item.textContent.search(filter) !== -1) {
            item.classList.add('active')
          }
        })
      },
      resetFilter(filter) {
        swal.fire({
          icon: 'question',
          title: 'Estas seguro?',
          html: `deseas vaciar el filtro ${filter.name}?`,
          showCancelButton: true,
          cancelButtonText: 'Cancelar',
          cancelButtonColor: '#d9534f',
          showConfirmButton: true,
          confirmButtonColor: '#337ab7',
          confirmButtonText: 'Si, seguro'
        }).then((result) => {
          if (result.value) {
            this.$root.$emit('clean_filter', filter.name)
          }
        })
      },
      emptyFilter(){
        swal.fire({
          icon: 'question',
          title: 'Estas seguro?',
          html: `deseas vaciar los filtros aplicados?`,
          showCancelButton: true,
          cancelButtonText: 'Cancelar',
          cancelButtonColor: '#d9534f',
          showConfirmButton: true,
          confirmButtonColor: '#337ab7',
          confirmButtonText: 'Si, seguro'
        }).then((result) => {
          if (result.value) {
            this.applied_filters.forEach((item) => {
              this.$root.$emit('empty_filter', item)
            })
          }
        })
      },
      showModalFilter(filter) {
        this.$root.$emit('show_modal_filter', filter)
      },
      showResults () {
      this.modalVisible = true
      },
      hideResults () {
      this.modalVisible = false
      }
    }
	}
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
	.filter-btns {
		display: flex;
		flex-wrap: wrap;
		div {
			flex-grow: 1;
			width: 14%;
			display: flex;
			justify-content: flex-end;
			a.btn {
				width: 100%;
				justify-content: center;
				align-items: center;
				white-space: pre-wrap!important;
				font-size: 12px;
				display: flex;
				padding: 6px 4px;
				font-weight: bold;
				background-color: #dddddd;
				color: #555;
				border: 2px solid #ffffff;
				margin: 1px;
				&:hover, &.active {
					background-color: #deebf7;
					color: #0071BC;
					border-color: #1b4973;
				}
			}
			span.fa-close {
				position: absolute;
				background-color: red;
				color: #fff;
				font-weight: bold;
				border-radius: 50%;
				padding: 2px 4px;
				font-size: 11px;
				font-weight: 100;
				margin: 5px -5px;
				cursor: pointer;
			}
		}
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
		padding: 5px;
		z-index: 1;
		background: #ffffff;
		-webkit-box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
		box-shadow: 0 -2px 11px 0px rgba(0, 0, 0, 0.5);
		
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