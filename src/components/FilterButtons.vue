<template>
  <div class="panel panel-default cd margin-top-20">
    <div class="panel-body">
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
              offset: -185,
              onDone: onDone
          }">
            Ubicación
          </a>
          <a href="#" 
          class="btn btn-default"
          v-scroll-to="{
              el: '#filter_antiguedad',
              offset: -185,
              onDone: onDone
          }">
            Antigüedad
          </a>
          <a href="#" 
          class="btn btn-default"
          v-scroll-to="{
              el: '#filter_numero_de_empleados',
              offset: -185,
              onDone: onDone
          }">
            Número de empleados
          </a>
          <a href="#" 
          class="btn btn-default"
          v-scroll-to="{
              el: '#filter_estado',
              offset: -185,
              onDone: onDone
          }">
            Estado
          </a>
          <a href="#" 
          class="btn btn-default"
          v-scroll-to="{
              el: '#filter_tipo_de_cuentas',
              offset: -185,
              onDone: onDone
          }">
            Tipo de cuentas
          </a>
          <a href="#" 
          class="btn btn-default"
          v-scroll-to="{
              el: '#filter_sector_actividad',
              offset: -185,
              onDone: onDone
          }">
            Sector/Actividad
          </a>
          <a href="#" 
          class="btn btn-default"
          v-scroll-to="{
              el: '#filter_cargos',
              offset: -185,
              onDone: onDone
          }">
            Cargos
          </a>
          <a href="#" 
          class="btn btn-default"
          v-scroll-to="{
              el: '#filter_codigo_postal',
              offset: -185,
              onDone: onDone
          }">
            Código Postal
          </a>
          <a href="#" 
          class="btn btn-default"
          v-scroll-to="{
              el: '#filter_nombre_o_razon_social',
              offset: -185,
              onDone: onDone
          }">
            Nombre o razón social
          </a>
          <a href="#" 
          class="btn btn-default"
          v-scroll-to="{
              el: '#filter_nif',
              offset: -185,
              onDone: onDone
          }">
            NIF
          </a>
          <a href="#" 
          class="btn btn-default"
          v-scroll-to="{
              el: '#filter_anios_con_cuentas_disponibles',
              offset: -185,
              onDone: onDone
          }">
            Años con cuentas disponibles
          </a>
          <a href="#" 
          class="btn btn-default"
          v-scroll-to="{
              el: '#filter_informacion_financiera',
              offset: -185,
              onDone: onDone
          }">
            Información Financiera
          </a>
          <a href="#" 
          class="btn btn-default"
          v-scroll-to="{
              el: '#filter_auditores',
              offset: -185,
              onDone: onDone
          }">
            Auditores
          </a>
          <a href="#" 
          class="btn btn-default"
          v-scroll-to="{
              el: '#filter_directivos_y_vinculaciones',
              offset: -185,
              onDone: onDone
          }">
            Directivos y Vinculaciones
          </a>
        </div>
      </div>
      <filter-actions-top></filter-actions-top>
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

.filter-btns.is-fixed  {
  position: fixed;
  left: 0;
  top: 97px;
  width: 100%;
  z-index: 1;
  display: flex;
  a {
    font-size: 10px;
    padding: 6px;
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
