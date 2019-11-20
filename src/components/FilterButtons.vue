<template>
  <div class="panel panel-default cd margin-top-20">
    <div class="panel-body min-height-210">
      <div id="filter-buttons">
        <div class="filter-buttons">
          <div class="filter-buttons_description">
            <span class="fs12">
              ¡Incorpore a sus búsqueda tantos filtros como quiera, dentro de nuestras múltiples posibilidades!
            </span>
          </div>
          <div class="filter-btns">
            <a href="#" 
            class="btn btn-default"
            v-scroll-to="{
                el: '#filter_ubicacion',
                offset: -175,
                onDone: onDone
            }">
              Ubicación
            </a>
            <a href="#" 
            class="btn btn-default"
            v-scroll-to="{
                el: '#filter_antiguedad',
                offset: -175,
                onDone: onDone
            }">
              Antigüedad
            </a>
            <a href="#" 
            class="btn btn-default"
            v-scroll-to="{
                el: '#filter_numero_de_empleados',
                offset: -175,
                onDone: onDone
            }">
              Número de empleados
            </a>
            <a href="#" 
            class="btn btn-default"
            v-scroll-to="{
                el: '#filter_estado',
                offset: -175,
                onDone: onDone
            }">
              Estado
            </a>
            <a href="#" 
            class="btn btn-default"
            v-scroll-to="{
                el: '#filter_tipo_de_cuentas',
                offset: -175,
                onDone: onDone
            }">
              Tipo de cuentas
            </a>
            <a href="#" 
            class="btn btn-default"
            v-scroll-to="{
                el: '#filter_sector_actividad',
                offset: -175,
                onDone: onDone
            }">
              Sector/Actividad
            </a>
            <a href="#" 
            class="btn btn-default"
            v-scroll-to="{
                el: '#filter_cargos',
                offset: -175,
                onDone: onDone
            }">
              Cargos
            </a>
            <a href="#" 
            class="btn btn-default"
            v-scroll-to="{
                el: '#filter_codigo_postal',
                offset: -175,
                onDone: onDone
            }">
              Código Postal
            </a>
            <a href="#" 
            class="btn btn-default"
            v-scroll-to="{
                el: '#filter_nombre_o_razon_social',
                offset: -175,
                onDone: onDone
            }">
              Nombre o razón social
            </a>
            <a href="#" 
            class="btn btn-default"
            v-scroll-to="{
                el: '#filter_nif',
                offset: -175,
                onDone: onDone
            }">
              NIF
            </a>
            <a href="#" 
            class="btn btn-default"
            v-scroll-to="{
                el: '#filter_anios_con_cuentas_disponibles',
                offset: -175,
                onDone: onDone
            }">
              Años con cuentas disponibles
            </a>
            <a href="#" 
            class="btn btn-default"
            v-scroll-to="{
                el: '#filter_informacion_financiera',
                offset: -175,
                onDone: onDone
            }">
              Información Financiera
            </a>
            <a href="#" 
            class="btn btn-default"
            v-scroll-to="{
                el: '#filter_auditores',
                offset: -175,
                onDone: onDone
            }">
              Auditores
            </a>
            <a href="#" 
            class="btn btn-default"
            v-scroll-to="{
                el: '#filter_directivos_y_vinculaciones',
                offset: -175,
                onDone: onDone
            }">
              Directivos y Vinculaciones
            </a>
          </div>
        </div>
        <filter-actions-top></filter-actions-top>
      </div>
    </div>
  </div>
</template>

<script>
  import { handleScroll } from './../utils'
  export default {
    name: 'filter-buttons',
    data() {
      return {}
    },
    mounted() {
      window.addEventListener('scroll', handleScroll); 
    },
    destroyed () {
      window.removeEventListener('scroll', handleScroll);
    },
    methods: {
      onDone (element) {
        if (typeof element == 'object') {
          element.classList.add("bounce-leave-active")
          setTimeout(function () {
            element.classList.remove("bounce-leave-active")
          }, 1000)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
.filter-buttons {
  display: grid;
  grid-template-columns: 20% 80%;
}

.filter-buttons .filter-buttons_description {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 8px;
  border: 2px solid #ffffff;
}

.filter-buttons .filter-btns {
  transition:all 1s;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

.filter-buttons .filter-btns a {
  background-color: #dddddd;
  color: #555;
  font-weight: bold;
  border-radius: 0;
  border: 2px solid #ffffff;
  font-size: 13px;
  display: flex;
  white-space: pre-wrap!important;
  justify-content: center;
  align-items: center;
}

.min-height-210 {
  min-height: 185px;
}

#filter-buttons.is-fixed {
  position: fixed;
  left: 0;
  top: 72px;
  width: 100%;
  z-index: 1;
  background: #ffffff;
  -webkit-box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  box-shadow: 0 -2px 11px 0px rgba(0, 0, 0, 0.5);

  .panel-body {
    padding: 0;
  }

  .filter-buttons {
    grid-template-columns: 100%;

    .filter-buttons_description {
      display: none;
    }
  }

  .filter-btns  {
    background: #ffffff;
    transition:all 1s;
    display: flex;
    justify-content: space-between;
    a {
      font-size: 10px;
      padding: 4px;
    }
  }

  .padding-to-20 {
    padding: 0;
    margin: 0;
    display: flex;
  }

}

@media (max-width: 767px){
  .filter-btns.is-fixed  {
    top: 42px;
    overflow-x: scroll;
  }  
}

@media (max-width: 950px) {
  .filter-buttons {
    
    grid-template-columns: 100%;
    
    .filter-btns{
      grid-template-columns: repeat(4, 1fr);
    }

  }
}

@media (max-width: 550px) {
  .filter-buttons {
    .filter-btns{
      grid-template-columns: repeat(2, 1fr);
    }
  }
}

@media (max-width: 350px) {
  .filter-buttons {
    .filter-btns{
      grid-template-columns: repeat(1, 1fr);
    }
  }
}

</style>
