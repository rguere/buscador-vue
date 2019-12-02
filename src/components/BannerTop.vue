<template>
  <section class="wrapper cached wrap-ranking-ventas">
    <div id="page" class="clearfix container">
      <div class="pt20 pb20 dottedbottom">
        <div id="bloquetxtizquierda" class="col-md-4">
          <h1 id="supertituloranking" class="fs20"><strong class="title-lg">Buscador de Empresas</strong><br> Buscador de Empresas</h1>
        </div>
        <div class="col-md-8">
          <p class="title-md mnone tipo_link tipo_link_25">¿Le gustaría poder acceder a la <span class="fwb">información más completa y reciente de todas las empresas que operan en España</span> que sean de su interés?</p>
        </div>
        <div class="cb"></div>

        <span v-on:click.stop.prevent="show = !show"
              v-scroll-to="(show)?{
                  el: '#infocif_leer_mas',
                  offset: -100,
              }: {
                el: 'body'
              }" class="nav-toggle2 leermas cp db tipo_link pl15"> {{(show)? 'Leer menos' : 'Leer más...'}} </span>

      </div>
      <div class="cb"></div>

      <transition name="fade">
        <div class="pall resumen p15 pb20" v-if="show" id="infocif_leer_mas">
          <div class="row">
            <div class="col-md-6">
              <p>Infocif, la Red Social de Empresas, lanza su nuevo buscador ofreciendo la posibilidad al usuario de obtener, de una manera rápida y sencilla, toda la información relevante sobre cada una de las empresas que operan en España que le resulten de su interés.</p>
              <p>Esta nueva herramienta permite al usuario personalizar su búsqueda en base a los criterios financieros y/o no financieros que determine; teniendo, además, la opción de descargar sus búsquedas de una forma dinámica y segura.</p>
            </div>
            <div class="col-md-6">
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
  </section>
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
<style lang="scss" scoped>
  .banner-top {
    background-image: url('./../assets/bg-ranking-empresas-infocif-2.jpg');
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
    margin-bottom: 20px;
    .padding-top-130 {
      padding-top: 110px;
    }
    .padding-30 {
      padding: 20px 15px 5px 15px;
    }
  }
  .leermas {
    margin: 0;
  }
  .tipo_link_25 {
    font-size: 25px;
  }
  h1 { margin-top: 0; }
</style>
