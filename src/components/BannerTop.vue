<template>
  <div class="banner-top">
    <div>
      <div>
        <h2>Buscador de Empresas</h2>
        <h5>Buscador de Empresas</h5>
        <a href="" v-on:click.stop.prevent="show = !show">Leer más...</a>
      </div>
      <div>
        <p>¿Le gustaría poder acceder a la <b>información más completa y reciente de todas las empresas que operan en España</b> que sean de su interés?</p>
      </div>
    </div>
    <transition name="fade">
      <div class="container-fluid" v-if="show">
        <div class="flex-col-md-2">
          <div class="content">
            <p>Infocif, la Red Social de Empresas, lanza su nuevo buscador ofreciendo la posibilidad al usuario de obtener, de una manera rápida y sencilla, toda la información relevante sobre cada una de las empresas que operan en España que le resulten de su interés.</p>
            <p>Esta nueva herramienta permite al usuario personalizar su búsqueda en base a los criterios financieros y/o no financieros que determine; teniendo, además, la opción de descargar sus búsquedas de una forma dinámica y segura.</p>
          </div>
          <div class="content">
            <p>Utilice el nuevo Buscador de empresas de Infocif para:</p>
            <ul>
              <li>
                Realizar análisis exhaustivos del sector en el que opera su empresa en base a la recopilación e interpretación de la información de la compañías de la competencia
              </li>
              <li>
                Conocer mejor la solvencia de compañías que componen la cartera de clientes y proveedores de tu empresa, en base a su información financiera
              </li>
              <li>
                Descarga listados, que te faciliten la captación de nuevos clientes, en base a los criterios y a los perfiles que se adapten a tu target
              </li>
              <li>
                Conocer la posición de tu empresa dentro de su sector en la escala territorial que prefieras
              </li>
            </ul>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
    export default {
      name: 'banner-top',
      data: () => ({
        show: false
      }),
    }
</script>
<!-- lang="scss" -->
<style scoped>
  .flex-col-md-2 {
    display: flex;
  }

  .flex-col-md-2 > div {
    width: 50%;
  }
</style>
