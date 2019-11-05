<template>
  <div id="filter_sector_actividad">
    <div class="filter-title">
      Sector/Actividad
    </div>
    <div class="bg-fff">
      <div class="content">
        <div>
          <label class="custon-checkboxs">
            <input type="checkbox" name="">
            <span class="geekmark"></span>
            <span class="name-checkbox">Checkbox</span>
            <span class="num-fil">(100.000)</span>
          </label>
        </div>

        <div class="flex-space-between-center">
          <button class="btn btn-ver-mas">Ver más</button>
          <treeselect class="select-treeselect" :multiple="true" :options="options" placeholder="Seleccionar" v-model="value" />
        </div>

        <div>
          <label class="custon-checkboxs">
            <input type="checkbox" name="">
            <span class="geekmark"></span>
            <span class="name-checkbox">Checkbox</span>
            <span class="num-fil">(100.000)</span>
          </label>
        </div>

        <div class="flex-space-between-center">
          <button class="btn btn-ver-mas">Ver más</button>
          <treeselect class="select-treeselect" :multiple="true" :options="options" placeholder="Seleccionar" v-model="value2" />
        </div>

        <div class="flex-space-between-flex-end">
          <p></p>
          <p class="text-help">
            * Puede elegir más de una opción
          </p>
        </div>


      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'filter-sector-actividad',
  data: () => ({
    value: [],
    value2: [],
    options: [{
      id: 'fruits',
      label: 'Fruits',
      children: [{
        id: 'apple',
        label: 'Apple 🍎',
        isNew: true,
      }, {
        id: 'grapes',
        label: 'Grapes 🍇',
      }, {
        id: 'pear',
        label: 'Pear 🍐',
      }, {
        id: 'strawberry',
        label: 'Strawberry 🍓',
      }, {
        id: 'watermelon',
        label: 'Watermelon 🍉',
      }],
    }, {
      id: 'vegetables',
      label: 'Vegetables',
      children: [{
        id: 'corn',
        label: 'Corn 🌽',
      }, {
        id: 'carrot',
        label: 'Carrot 🥕',
      }, {
        id: 'eggplant',
        label: 'Eggplant 🍆',
      }, {
        id: 'tomato',
        label: 'Tomato 🍅',
      }],
    }],
  }),
}
</script>

<style lang="scss" scoped>

@import './../../sass/filters/filters';
.flex-space-between-center {
  button {
    width: auto;
  }
  .select-treeselect {
    width: 65%;
  }
}

</style>
