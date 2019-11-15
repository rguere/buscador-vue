<template>
  <div class="filter-buttons">
    <div class="filter-buttons_description">
      ¡Incorpore a sus búsqueda tantos filtros como quiera, dentro de nuestras múltiples posibilidades!
    </div>
    <div class="filter-btns">
      <a href="#" 
      class="btn btn-primary"
      v-scroll-to="{
          el: '#filter_ubicacion',
          offset: -100,
          onDone: onDone
      }">
        Ubicación
      </a>
      <a href="#" 
      class="btn btn-primary"
      v-scroll-to="{
          el: '#filter_antiguedad',
          offset: -100,
          onDone: onDone
      }">
        Antigüedad
      </a>
      <a href="#" 
      class="btn btn-primary"
      v-scroll-to="{
          el: '#filter_numero_de_empleados',
          offset: -100,
          onDone: onDone
      }">
        Número de empleados
      </a>
      <a href="#" 
      class="btn btn-primary"
      v-scroll-to="{
          el: '#filter_estado',
          offset: -100,
          onDone: onDone
      }">
        Estado
      </a>
      <a href="#" 
      class="btn btn-primary"
      v-scroll-to="{
          el: '#filter_tipo_de_cuentas',
          offset: -100,
          onDone: onDone
      }">
        Tipo de cuentas
      </a>
      <a href="#" 
      class="btn btn-primary"
      v-scroll-to="{
          el: '#filter_sector_actividad',
          offset: -100,
          onDone: onDone
      }">
        Sector/Actividad
      </a>
      <a href="#" 
      class="btn btn-primary"
      v-scroll-to="{
          el: '#filter_cargos',
          offset: -100,
          onDone: onDone
      }">
        Cargos
      </a>
      <a href="#" 
      class="btn btn-primary"
      v-scroll-to="{
          el: '#filter_codigo_postal',
          offset: -100,
          onDone: onDone
      }">
        Código Postal
      </a>
      <a href="#" 
      class="btn btn-primary"
      v-scroll-to="{
          el: '#filter_nombre_o_razon_social',
          offset: -100,
          onDone: onDone
      }">
        Nombre o razón social
      </a>
      <a href="#" 
      class="btn btn-primary"
      v-scroll-to="{
          el: '#filter_nif',
          offset: -100,
          onDone: onDone
      }">
        NIF
      </a>
      <a href="#" 
      class="btn btn-primary"
      v-scroll-to="{
          el: '#filter_anios_con_cuentas_disponibles',
          offset: -100,
          onDone: onDone
      }">
        Años con cuentas disponibles
      </a>
      <a href="#" 
      class="btn btn-primary"
      v-scroll-to="{
          el: '#filter_informacion_financiera',
          offset: -100,
          onDone: onDone
      }">
        Información Financiera
      </a>
      <a href="#" 
      class="btn btn-primary"
      v-scroll-to="{
          el: '#filter_auditores',
          offset: -100,
          onDone: onDone
      }">
        Auditores
      </a>
      <a href="#" 
      class="btn btn-primary"
      v-scroll-to="{
          el: '#filter_directivos_y_vinculaciones',
          offset: -100,
          onDone: onDone
      }">
        Directivos y Vinculaciones
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'filter-buttons',
    data() {
      return {}
    },
    mounted() {},
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
  background-color: #e4e4e4;
  border: 2px solid #1b4973;
  border-radius: 20px;
  padding: 3px 8px;
}

.filter-buttons .filter-buttons_description {
  color: #0c296a;
  font-weight: bold;
  font-size: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.filter-buttons .filter-btns {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

.filter-buttons .filter-btns a {
  margin: 2.5px;
  font-size: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
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
