<template>
  <div class="home">
    <div class="container">
      <div class="row">
        <div class="col-md-8 col-md-offset-2">
          <div class="row">
            <div class="col-md-12">
              <div class="img_title_img">
                <img
                  src="./../assets/images/infocif.png"
                  class="img-responsive infocif"
                  alt="infocif"
                />
                <h1 class="text-center fs20">
                  <strong class="title-lg">Ficha Resumen de la Búsqueda</strong>
                </h1>
                <img
                  src="./../assets/images/buscador-logo.png"
                  class="img-responsive buscador-logo"
                  alt="Buscador de Empresas"
                />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-8">
              <h4>Estrategia de Búsqueda</h4>
              <ul class="ul_filtros_aplicados">
                <li v-for="(item, key) in filtros_aplicados" :key="key">
                  {{ item.title }}
                  <ul v-if="item.datas">
                    <li v-for="(_item, _key) in item.datas" :key="_key">
                      {{
                        _item.label !== "incluir_null"
                          ? _item.label
                          : `Empresas en las que se desconoce su ${item.title.toLowerCase()}`
                      }}
                    </li>
                  </ul>
                  <el-divider></el-divider>
                  <span class="_right">{{
                    item.quantity | numeral("0,0")
                  }}</span>
                </li>
              </ul>
            </div>
            <div class="col-md-4 text-right">
              <h4>Resultado Final de la búsqueda</h4>
              <p class="f25">
                <b>
                  <span class>{{ total | numeral("0,0") }}</span> Empresas
                </b>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import { sendPageView } from "./../utils";
import swal from "sweetalert2";
import { required, email } from "vuelidate/lib/validators";

export default {
  /*middleware: 'guest',*/
  metaInfo() {
    return {
      title: "Buscador - Ficha Resumen",
    };
  },
  name: "page-ficha-resumen",
  layout: "basic",
  data: () => ({
    dialogCorreoVisible: false,
    dialogCorreoVisible2: false,
    dialogCorreoVisible3: false,
    modalVisible: false,
    loadingExcel: false,
    loadingCorreo: false,
    correo: "",
    nombreArchivo: "",
    currentPage: 1,
    size: 10,
    results: {
      cantidad: 0,
      total: 0,
      empresas: [],
    },
    filtros_aplicados: [],
    total: 0,
    puedeDescargar: false,
    puedeEnviarCorreo: false,
  }),
  validations() {
    return {
      correo: {
        required,
        email,
      },
      nombreArchivo: {
        required,
      },
    };
  },
  computed: {},
  created() {
    this.$store.dispatch("layout/setLayout", "basic-layout");
  },
  mounted() {
    sendPageView("ficha-resumen", "Buscador - Ficha Resumen");
    const resumen = this.$storage.get("resumen");
    if (resumen) {
      for (let key in resumen) {
        this.$set(this.$data, key, resumen[key]);
      }
      this.$storage.remove("resumen");
      setTimeout(function() {
        window.print();
      }, 100);
    } else {
      swal.fire("Advertencia", "Aún no hay filtros aplicados", "warning");
      this.$router.push({ name: "buscador" });
    }
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.banner {
  padding: 15px 0 0 0;
}
.flex_div {
  display: flex;
  margin-left: 3px;
}
table {
  thead {
    background: #333;
    color: #fff;
    font-weight: bold;
    th {
      padding: 15px 10px !important;
    }
  }
}
._right {
  float: right;
}

.img_title_img {
  display: flex;
  justify-content: space-between;
  align-items: center;
  img.infocif {
    width: 140px;
    margin-right: 10px;
  }
  img.buscador-logo {
    width: 120px;
    margin-left: 10px;
  }
}
</style>
