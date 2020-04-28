<template>
  <section class="wrapper warp-menu-top">
    <div class="container-fluid">
      <div class="row clearfix ">
        <div class="col-xs-6 col-sm-3 col-md-3">
          <div class="logo">
            <a href="/">
              <img
                class="bloque fl ml15"
                src="./../assets/images/infocif-logo-126x28.png"
                alt="Infocif"
                width="126"
                height="28"
              />
            </a>
            <span class="hidden-xs hidden-sm hidden-md slogan"
              >La Red Social de Empresas</span
            >
          </div>
        </div>

        <div
          class="hidden-xs col-sm-7 col-md-6 height30"
          tabindex="-1"
          id="contenedorformtop"
        >
          <form
            action="http://www.infocif.es/general/buscador-de-empresas.asp"
            method="post"
            class="form-top"
          >
            <div class="form-group">
              <div class="input-group">
                <input
                  id="txt-busqueda"
                  name="txtEmpresaBuscada"
                  class="form-control input-sm"
                  placeholder="Escribe aquí NIF o Razón Social..."
                  type="text"
                />
                <div class="input-group-btn">
                  <button
                    type="submit"
                    class="btn btn_search btn-sm"
                    tabindex="-1"
                  >
                    <i class="fa fa-search"></i>
                  </button>
                </div>
              </div>
              <div
                id="formtop-buscador"
                class="form-radios cp"
                style="display:none;"
              >
                <span><i class="fa fa-angle-down ml10 mr5 fa-2x fl"></i></span>
                <span class="db mt5 mr10 fl">Buscar por</span>
              </div>
            </div>
            <div
              id="desplegableoptions"
              class="form-options-search"
              style="display:none;"
            >
              <label class="radio-inline">
                <input
                  class="form-radio"
                  id="edit-icif-large-options-cif"
                  name="opcbusqueda"
                  value="RazonSocial"
                  checked="checked"
                  type="radio"
                />NIF/Razón Social </label
              ><br />
              <label class="radio-inline mt10">
                <input
                  class="form-radio"
                  id="edit-icif-large-options-cargo"
                  name="opcbusqueda"
                  value="Cargo"
                  type="radio"
                />Directivo
              </label>
            </div>
          </form>
        </div>
        <div class="col-xs-6 col-sm-2 col-md-3">
          <div class="header-icons">
            <div
              class="sb-toggle sb-toggle-right navbar-right"
              style="float: right"
            >
              <span
                class="glyphicon glyphicon-menu-hamburger"
                @click="showSlidebar"
              ></span>
              <span class="hidden-xs hidden-sm" @click="showSlidebar"
                >Menu</span
              >
            </div>
            <div
              class="sb-toggle login-header navbar-right"
              style="float: right"
            >
              <a
                v-if="!this.user"
                class="hidden-xs hidden-sm"
                :href="url_acceso"
              >
                <span class="glyphicon glyphicon-user"></span>
                <span class="hidden-xs hidden-sm">Iniciar sesión</span>
              </a>

              <a
                v-if="this.user && this.user.username"
                :href="url_micartera"
                class="hidden-xs hidden-sm"
              >
                <span class="glyphicon glyphicon-user"></span>
                <span
                  class="hidden-xs hidden-sm"
                  style="text-transform: capitalize;"
                  >{{ user.username }}</span
                >
              </a>
            </div>
            <div
              class="sb-toggle search-header navbar-right hidden-sm hidden-md hidden-lg"
              style="float: right"
            >
              <span class="glyphicon glyphicon-search"></span>
              <span class="hidden-xs hidden-sm">Buscador de empresas</span>
            </div>
          </div>
        </div>
      </div>

      <div style="display: none;" class="search-active col-sx-12">
        <div class="buscador_header">
          <form
            class="icif-search-large-form"
            action="http://www.infocif.es/general/buscador-de-empresas.asp"
            method="post"
            id="icif2-search-large-form"
            accept-charset="UTF-8"
            _lpchecked="1"
          >
            <div>
              <div
                class="form-item form-type-textfield form-item-icif-search-large"
              >
                <input
                  class="icif-search-large form-text"
                  type="text"
                  id="edit-icif-search-large"
                  name="txtEmpresaBuscada"
                  value=""
                  size="60"
                  maxlength="128"
                />
              </div>
              <div
                id="edit-icif-large-options"
                class="form-radios icif-large-options"
              >
                <div
                  class="form-item form-type-radio form-item-icif-large-options"
                >
                  <input
                    class="icif-large-options form-radio"
                    type="radio"
                    id="edit-icif-large-options-cif2"
                    name="opcbusqueda"
                    value="RazonSocial"
                    checked="checked"
                  />
                  <label class="option" for="edit-icif-large-options-cif2"
                    >NIF/Razón Social
                  </label>
                </div>
                <div
                  class="form-item form-type-radio form-item-icif-large-options"
                >
                  <input
                    class="icif-large-options form-radio"
                    type="radio"
                    id="edit-icif-large-options-cargo2"
                    name="opcbusqueda"
                    value="Cargo"
                  />
                  <label class="option" for="edit-icif-large-options-cargo2"
                    >Directivo
                  </label>
                </div>
              </div>
              <input
                type="image"
                id="edit-submit--3"
                name="submit"
                value="Buscar"
                src="./../assets/images/ib_search_home.png"
                class="form-submit"
              /><input
                type="hidden"
                name="form_build_id"
                value="form-MfLmKr9E-rqn7Cttfn96E3SWu6uC4gsLyT-cs_LeZO4"
              />
              <input
                type="hidden"
                name="form_id"
                value="icif2_search_large_form"
              />
            </div>
          </form>
        </div>
      </div>

      <div class="sb-slidebar sb-right sb-style-overlay sb-active">
        <ul class="list-unstyled">
          <li class="sb-close" @click="showSlidebar">
            <span
              ><i class="glyphicon glyphicon glyphicon-minus"></i> Cerrar</span
            >
          </li>
          <li>
            <a href="http://www.infocif.es/informes/" class="text-left"
              ><i class="fa fa-chevron-left"></i> Informes Comerciales</a
            >
          </li>
          <li>
            <a
              href="http://www.infocif.es/ranking/ventas-empresas/espana"
              class="text-left"
              ><i class="fa fa-chevron-left"></i> Ranking empresas</a
            >
          </li>
          <li>
            <a href="http://www.infocif.es/servicios/"
              ><i class="fa fa-chevron-left"></i> Servicios</a
            >
            <ul>
              <li>
                <a
                  href="http://www.infocif.es/servicios/calcula-descuento-de-pagares.asp"
                >
                  Tarificador descuento de pagarés</a
                >
              </li>
              <li>
                <a href="http://www.infocif.es/empresas-nuevas/espana.asp">
                  Empresas nuevas</a
                >
              </li>
              <li>
                <a href="http://www.infocif.es/registro-mercantil">
                  Registro Mercantil</a
                >
              </li>
              <li>
                <a href="http://www.infocif.es/servicios/calcular-iban">
                  Calculadora IBAN</a
                >
              </li>
              <li>
                <a
                  href="http://www.infocif.es/ranking/administradores-concursales.asp"
                >
                  Ranking concursal</a
                >
              </li>
            </ul>
          </li>
          <li>
            <a href="http://www.infocif.es/licitaciones/"
              ><i class="fa fa-chevron-left"></i> Licitaciones</a
            >
          </li>
          <li>
            <a href="http://noticias.infocif.es"
              ><i class="fa fa-chevron-left"></i> Noticias</a
            >
          </li>

          <li>
            <a href="http://www.infocif.es/opiniones-empresas/"
              ><i class="fa fa-chevron-left"></i> Opiniones</a
            >
          </li>

          <li>
            <a :href="url_acceso"
              ><i class="fa fa-chevron-left"></i> Iniciar sesión</a
            >
          </li>
        </ul>
      </div>
    </div>
    <section class="wrapper wrap-menu hidden-xs">
      <div class=" container paddingnone">
        <div
          class="btn-group btn-group-justified"
          role="group"
          aria-label="Justified button group with nested dropdown"
        >
          <a
            href="http://www.infocif.es/informes/"
            class="btn btn-noborder"
            role="button"
            title="Informes de Empresas"
          >
            <img
              src="./../assets/images/icono-informes-comerciales-infocif.png"
              class="alignmiddle"
              alt="Informes de Empresas"
            />
            Informes
            <span class="hidden-xs hidden-sm hidden-md ">de empresas</span>
          </a>
          <router-link
            to="/"
            class="btn btn-noborder"
            role="button"
            title="Buscardor de Empresas"
          >
            <img
              src="./../assets/images/buscador.png"
              style="width: 35px; height: 35px;"
              class="alignmiddle"
              alt="Informes de Empresas"
            />
            Buscardor
            <span class="hidden-xs hidden-sm hidden-md ">de empresas</span>
          </router-link>
          <a
            href="http://www.infocif.es/ranking/ventas-empresas/espana"
            class="btn btn-noborder"
            role="button"
            title="Ranking de empresas"
          >
            <img
              src="./../assets/images/icono-ranking-empresas-infocif.png"
              class="alignmiddle"
              alt="Ranking de Empresas Infocif"
            />
            Ranking
            <span class="hidden-xs hidden-sm hidden-md ">de empresas</span>
          </a>
          <a
            href="http://www.infocif.es/servicios/"
            class="btn btn-noborder"
            role="button"
            title="Servicios Infocif"
          >
            <img
              src="./../assets/images/icono-base-de-datos-infocif.png"
              class="alignmiddle"
              alt="Servicios Infocif"
            />
            Servicios
            <span class="hidden-xs hidden-sm hidden-md ">infocif</span>
          </a>
          <a
            href="http://www.infocif.es/licitaciones/"
            class="btn btn-noborder"
            role="button"
            title="Licitaciones"
          >
            <img
              src="./../assets/images/icono-licitaciones.png"
              class="alignmiddle"
              alt="Licitaciones"
            />
            Licitaciones
          </a>

          <a
            href="http://noticias.infocif.es"
            class="btn btn-noborder"
            role="button"
            title="Noticias"
          >
            <img
              src="./../assets/images/icono-noticias-infocif.png"
              class="alignmiddle"
              alt="Noticias Infocif"
            />
            Noticias
            <span class="hidden-xs hidden-sm hidden-md ">de empresas</span>
          </a>
          <a
            href="http://www.infocif.es/opiniones-empresas/"
            class="btn btn-noborder"
            role="button"
            title="Opiniones de Empresas"
          >
            <img
              src="./../assets/images/icono-opiniones-de-empresas-infocif.png"
              class="alignmiddle"
              alt="Opiniones de Empresas"
            />
            Opiniones
            <span class="hidden-xs hidden-sm hidden-md ">de empresas</span>
          </a>
        </div>
      </div>
    </section>
  </section>
</template>
<script>
import $ from "jquery";
import { mapGetters } from "vuex";
export default {
  name: "menu-infocif",
  computed: mapGetters({
    user: "auth/user",
  }),
  data: () => ({
    url_acceso: `http://${window.location.host}/gestion/gestion-acceso.asp?b=1`,
    url_micartera: `http://${window.location.host}/gestion/micartera.asp`,
  }),
  mounted() {},
  methods: {
    showSlidebar() {
      $(".sb-slidebar").toggleClass("show-slidebar", 300, "easeOutSine");
    },
    async logout() {
      // Log out the user.
      await this.$store.dispatch("auth/logout");

      // Redirect to home.
      this.$router.push({ name: "home" });
    },
  },
};
</script>
<style scoped>
.sb-slidebar {
  margin-right: -700px;
  transition: all 1s;
}
.sb-slidebar.show-slidebar {
  margin-right: 0 !important;
  transition: all 1s;
}
.dropdown-menu a {
  color: #333 !important;
}
a:hover {
  text-decoration: none;
}
</style>
