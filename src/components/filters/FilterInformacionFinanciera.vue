<template>
  <div class="panel panel-default cd" id="filter_informacion_financiera">
    <div class="panel-heading">
      <p class="panel-title roboto white">Información Financiera</p>
    </div>
    <div class="panel-body">
      <div class="grid-2-columns-1fr">
        <div>
          <div class="flex">
            <div class="width-50-porcent">
              <div class="_flex-row">
                <div class="padding-0-5">
                  <div class="title-informacion-financiera">
                    Partida financiera
                  </div>
                  <div>
                    <treeselect
                      class="select-partida-financiera"
                      :multiple="true"
                      :options="options"
                      placeholder="Seleccionar"
                      v-model="value"
                    />
                  </div>
                </div>
                <div>
                  <button class="btn btn-warning">
                    Ver detalles
                    <i class="fa fa-plus-circle"></i>
                  </button>
                </div>
              </div>
            </div>
            <div class="width-50-porcent">
              <div class="padding-0-5">
                <div class="padding-0-0-10-0">
                  <div class="title-informacion-financiera">Minimo</div>
                  <div class="conten-input-informacion-financiera">
                    <input type="text" value="1000" name="min" id="min" />
                    <label for="min">Miles de Euros</label>
                  </div>
                </div>

                <div class="padding-0-0-10-0">
                  <div class="title-informacion-financiera">Maximo</div>
                  <div class="conten-input-informacion-financiera">
                    <input type="text" value="1000" name="max" id="max" />
                    <label for="max">Miles de Euros</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div>
            <div class="title-informacion-financiera">
              Seleccionar Ejercicio
            </div>
            <div class="anios_checkboxs">
              <div>
                <label class="custon-checkboxs">
                  <input type="checkbox" name />
                  <span class="geekmark"></span>
                  <span class="title">2018</span>
                </label>
              </div>
              <div>
                <label class="custon-checkboxs">
                  <input type="checkbox" name />
                  <span class="geekmark"></span>
                  <span class="title">2017</span>
                </label>
              </div>
              <div>
                <label class="custon-checkboxs">
                  <input type="checkbox" name />
                  <span class="geekmark"></span>
                  <span class="title">2016</span>
                </label>
              </div>
              <div>
                <label class="custon-checkboxs">
                  <input type="checkbox" name />
                  <span class="geekmark"></span>
                  <span class="title"
                    >Ultimo año con consultas disponibles</span
                  >
                </label>
              </div>
            </div>
            <div class="flex-space-between-flex-end">
              <p></p>
              <p class="text-help">* Puedes elegir más de una opción</p>
            </div>
          </div>
          <div>
            <div class>
              <label class="custon-checkboxs">
                <input type="checkbox" name />
                <span class="geekmark"></span>
                <span class="title">
                  Aplicar en la búsqueda
                  <i>al menos uno</i> de los años seleccionados
                </span>
              </label>
            </div>
            <div class>
              <label class="custon-checkboxs">
                <input type="checkbox" name />
                <span class="geekmark"></span>
                <span class="title">
                  Aplicar en la búsqueda
                  <i>TODOS</i> los años seleccionados
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "filter-informacion-financiera",
  data: () => ({
    value: [],
    options: [
      {
        id: "fruits",
        label: "Fruits",
        children: [
          {
            id: "apple",
            label: "Apple 🍎",
            isNew: true,
          },
          {
            id: "grapes",
            label: "Grapes 🍇",
          },
          {
            id: "pear",
            label: "Pear 🍐",
          },
          {
            id: "strawberry",
            label: "Strawberry 🍓",
          },
          {
            id: "watermelon",
            label: "Watermelon 🍉",
          },
        ],
      },
      {
        id: "vegetables",
        label: "Vegetables",
        children: [
          {
            id: "corn",
            label: "Corn 🌽",
          },
          {
            id: "carrot",
            label: "Carrot 🥕",
          },
          {
            id: "eggplant",
            label: "Eggplant 🍆",
          },
          {
            id: "tomato",
            label: "Tomato 🍅",
          },
        ],
      },
    ],
  }),
};
</script>

<style lang="scss" scoped>
@import "./../../sass/filters/filters";

.title-informacion-financiera {
  background-color: #dbe3f3;
  padding: 5px 20px;
  font-weight: bold;
  text-align: center;
  width: 100%;
}

.padding-0-5 {
  padding: 0 5px;
}

.padding-0-0-10-0 {
  padding: 0 0 10px 0;
}

._flex-row {
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  align-content: space-between;
}

._flex-row > div {
  width: 100%;
}

.flex {
  display: flex;
  flex-wrap: wrap;
}

.select-partida-financiera {
  width: 100%;
  margin: 5px 0;
}

.flex > div.width-50-porcent {
  width: 50%;
}

.conten-input-informacion-financiera {
  display: flex;
  text-justify: center;
  align-items: center;

  margin: 5px 0;

  input,
  label {
    width: 50%;
  }

  label {
    background: #eee;
    margin: 0;
    font-weight: bold;
    padding: 3px 2.5px;
    cursor: pointer;
  }
}

.anios_checkboxs {
  display: flex;
  flex-wrap: wrap;

  div {
    margin: 0 3px 0 0;

    label {
      font-size: 14px;
    }
  }
}

.bg-g {
  background-color: #aaa;
  margin: 5px 0;
  color: #fff;
  padding: 2px 5px;

  label.custon-checkboxs {
    margin: 0;

    font-size: 12px;

    span.title {
      i {
        text-decoration: underline;
      }
    }
  }
}
</style>
