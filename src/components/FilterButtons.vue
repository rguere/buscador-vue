<template>
  <div class="filter-buttons">
    <div class="filter-buttons_description">
      ¡Incorpore a sus búsqueda tantos filtros como quiera, dentro de nuestras múltiples posibilidades!
    </div>
    <div class="filter-btns">
      <a href="#" v-scroll-to="{
                  el: '#filter_ubicacion',
                  offset: -100,
                  onDone: onDone
              }" @click="addFilter($event)">
        Ubicación
      </a>
      <a href="#" v-scroll-to="{
                  el: '#filter_antiguedad',
                  offset: -100,
                  onDone: onDone
              }" @click="addFilter($event)">
        Antigüedad
      </a>
      <a href="#" v-scroll-to="{
                  el: '#filter_numero_de_empleados',
                  offset: -100,
                  onDone: onDone
              }" @click="addFilter($event)">
        Número de empleados
      </a>
      <a href="#" v-scroll-to="{
                  el: '#filter_estado',
                  offset: -100,
                  onDone: onDone
              }" @click="addFilter($event)">
        Estado
      </a>
      <a href="#" v-scroll-to="{
                  el: '#filter_tipo_de_cuentas',
                  offset: -100,
                  onDone: onDone
              }" @click="addFilter($event)">
        Tipo de cuentas
      </a>
      <a href="#" v-scroll-to="{
                  el: '#filter_sector_actividad',
                  offset: -100,
                  onDone: onDone
              }" @click="addFilter($event)">
        Sector/Actividad
      </a>
      <a href="#" v-scroll-to="{
                  el: '#filter_cargos',
                  offset: -100,
                  onDone: onDone
              }" @click="addFilter($event)">
        Cargos
      </a>
      <a href="#" v-scroll-to="{
                  el: '#filter_codigo_postal',
                  offset: -100,
                  onDone: onDone
              }" @click="addFilter($event)">
        Código Postal
      </a>
      <a href="#" v-scroll-to="{
                  el: '#filter_nombre_o_razon_social',
                  offset: -100,
                  onDone: onDone
              }" @click="addFilter($event)">
        Nombre o razón social
      </a>
      <a href="#" v-scroll-to="{
                  el: '#filter_nif',
                  offset: -100,
                  onDone: onDone
              }" @click="addFilter($event)">
        NIF
      </a>
      <a href="#" v-scroll-to="{
                  el: '#filter_anios_con_cuentas_disponibles',
                  offset: -100,
                  onDone: onDone
              }" @click="addFilter($event)">
        Años con cuentas disponibles
      </a>
      <a href="#" v-scroll-to="{
                  el: '#filter_informacion_financiera',
                  offset: -100,
                  onDone: onDone
              }" @click="addFilter($event)">
        Información Financiera
      </a>
      <a href="#" v-scroll-to="{
                  el: '#filter_auditores',
                  offset: -100,
                  onDone: onDone
              }" @click="addFilter($event)">
        Auditores
      </a>
      <a href="#" v-scroll-to="{
                  el: '#filter_directivos_y_vinculaciones',
                  offset: -100,
                  onDone: onDone
              }" @click="addFilter($event)">
        Directivos y Vinculaciones
      </a>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'filter-buttons',
    computed: mapGetters({
      filters_labels: 'filters/filters_labels',
    }),
    data() {
      return {}
    },
    mounted() {},
    methods: {
      addFilter(event) {
        this.$store.dispatch('filters/addFilters', event.target.innerText);
      },
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
  font-size: 18px;
}

.filter-buttons .filter-btns {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

.filter-buttons .filter-btns a {
  margin: 2.5px;
  border: 2px solid #1b4973;
  color: #1b4973;
  font-weight: bold;
  border-radius: 8px;
  padding: 5px;
  background-color: #deebf7;
  font-size: 13px;
  text-align: center;
  text-decoration: none;
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
