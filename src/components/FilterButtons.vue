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
							<router-link
								to="/visualizar-resultados"
								:disabled="applied_filters.length === 0"
								class="btn btn-orange btn-lg link-disabled">
								<i class="fa fa-list-alt"></i>
								Visualizar
								<span class="hidden-xs hidden-sm">resultados</span>
							</router-link>
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
									:disabled="applied_filters.length === 0"
									@click="saveFilter">
									<i class="fa fa-save"></i> Guardar <span class="hidden-xs hidden-sm"> búsqueda</span>
								</button>
								<button class="btn btn-primary"
									@click="getFilter">
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
	</div>
</template>

<script>
	import { handleScroll, howAnimation, orderFilters } from './../utils'
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
        selected_companies: 'filters/selected_companies',
        applied_filters: 'filters/applied_filters',
        filters: 'filters/filters',
        form: 'filters/form',
        cantidades: 'filters/cantidades',
      }),
      orderFilters: function () {
        let order = orderFilters(this.filters, this.applied_filters, this.form)
        let cantidades = {...this.cantidades}
        for (const prop in cantidades) {
          let split = prop.split('.')
          if(split && split[0] === 'filtro' && split[1] && order && order[split[1]]) {
            order[split[1]].quantity = cantidades[prop].cantidad
          } 
        }
        return order
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
	saveFilter() {
		this.loadingFrm = true;
		var idUser = 1;
		var type = 1;
		//console.debug(this.form);
		//let beforeForm = beforeOrderFilters(this.filters, this.applied_filters, this.form, 'Save Filter')
		this.$store.dispatch('search/saveFilter', { idUser, type, filter :this.form}).then(() => {
			//console.debug(response);
            this.loadingFrm = false
          }).catch(() => {
			this.loadingFrm = false;
			//console.debug('fail');
          })
	},
	getFilter() {
		this.loadingFrm = true;
		var idUser = 1;
		var type = 1;
		this.$store.dispatch('search/getFilter',{ idUser, type } ).then(() => {
			//console.debug(data);
            this.loadingFrm = false
          }).catch(() => {
			this.loadingFrm = false;
			//console.debug('fail');
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