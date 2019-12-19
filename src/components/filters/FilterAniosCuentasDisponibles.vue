<template>
  <div class="panel panel-default cd" id="filter_anios_con_cuentas_disponibles">
    <div class="panel-heading">
      <p class="panel-title roboto white">
        Años con cuentas disponibles
      </p>
    </div>
    <div class="panel-body">
      <div class="grid-2-columns-1fr">
        <div>
          <div class="grid-2-columns-1fr">
            <div>
              <label class="custon-checkboxs">
                <input type="checkbox" name="">
                <span class="geekmark"></span>
                <span class="name-checkbox">2018</span>
                <span class="num-fil"> (300.000)</span>
              </label>
            </div>
            <div>
              <label class="custon-checkboxs">
                <input type="checkbox" name="">
                <span class="geekmark"></span>
                <span class="name-checkbox">2017</span>
                <span class="num-fil"> (200.000)</span>
              </label>
            </div>
            <div>
              <label class="custon-checkboxs">
                <input type="checkbox" name="">
                <span class="geekmark"></span>
                <span class="name-checkbox">2016</span>
                <span class="num-fil"> (50.000)</span>
              </label>
            </div>
            <div>
              <label class="custon-checkboxs">
                <input type="checkbox" name="">
                <span class="geekmark"></span>
                <span class="name-checkbox">2015</span>
                <span class="num-fil"> (7.000)</span>
              </label>
            </div>
          </div>
        </div>
        <div>
          <div class="">
            <label class="custon-checkboxs">
              <input type="checkbox" name="">
              <span class="geekmark"></span>
              <span class="title">Aplicar en la búsqueda <i>al menos uno</i> de los años seleccionados</span>
            </label>
          </div>
          <div class="">
            <label class="custon-checkboxs">
              <input type="checkbox" name="">
              <span class="geekmark"></span>
              <span class="title">Aplicar en la búsqueda <i>TODOS</i> los años seleccionados</span>
            </label>
          </div>
        </div>
      </div>
      <div class="flex-space-between-flex-end">
        <p></p>
        <p class="text-help">* Puede elegir más de una opción</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'filter-anios-cuentas-disponibles',
  }
</script>

<style lang="scss" scoped>
  @import './../../sass/filters/filters';
</style>
