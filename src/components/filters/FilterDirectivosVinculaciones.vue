<template>
  <div id="filter_directivos_y_vinculaciones">
    <div class="filter-title">
      Directivos y Vinculaciones
    </div>
    <div class="bg-fff">
      <div class="content">

        <textarea class="filter_textarea" placeholder='Escriba aqui el nombre de la empresa o sociedad que pertenece al Organo de Administracion y clica en "Buscar"...'></textarea>

        <div class="flex-space-between-flex-end">
          <div></div>
          <button class="btn btn-action-search wi">BUSCAR</button>
        </div>

        <div>

          <div class="bg-g">
            <label class="custon-checkboxs">
              <input type="checkbox" name="">
              <span class="geekmark"></span>
              <span class="title">Aplicar en la búsqueda</span>
              <span class="description">Solo personas fisicas</span>
            </label>
          </div>
          <div class="bg-g">
            <label class="custon-checkboxs">
              <input type="checkbox" name="">
              <span class="geekmark"></span>
              <span class="title">Aplicar en la búsqueda</span>
              <span class="description">Solo sociedades o personas juriducas</span>
            </label>
          </div>


          <button class="btn btn-ver-mas">Ver más</button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'filter-directivos-vinculaciones',
  }
</script>

<style lang="scss" scoped>
  @import './../../sass/filters/filters';
  .filter_textarea {
    max-height: 70px;
  }
  .bg-g {
    background-color: #aaa;
    margin: 5px 0;
    color: #fff;
    padding: 2px 5px;

    label.custon-checkboxs {
      margin: 0;
    }

    span.description {
      display: block;
      text-decoration: underline;
      text-transform: uppercase;
    }
  }
  @media (min-width: 750px) and (max-width: 1100px) {
    .flex-space-between-flex-end {
      flex-wrap: wrap;
      :nth-child(1),
      :nth-child(2) {
        width: 100%;
        margin-bottom: 5px;
      }
    }
  }
</style>
