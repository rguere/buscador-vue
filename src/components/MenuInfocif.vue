<template>
  <div class="nav-fixed">
    <div class="nav-menu">
      <div class="container-fluid">
        <div class="logo">
          <img src="../assets/images/buscador-de-empresas.png"> La Red Social de Empresas
        </div>
        <div class="nav-top">
          <a href=""><i class="fa fa-user"></i> Iniciar sesión</a>
          <a href=""><i class="fa fa-bars"></i> Menu</a>
        </div>
      </div>
    </div>
    <div class="wrap-menu">
      <div class="container-fluid">
        <div class="nav-menu2">
          <router-link to="/">
            <img src="../assets/images/icono-informes-comerciales-infocif.png">
            Informes de empresas
          </router-link>
          <router-link to="/" class="active">
            <img src="../assets/images/icono-noticias-infocif.png">
            Buscardor de empresas
          </router-link>
          <router-link to="/">
            <img src="../assets/images/icono-ranking-empresas-infocif.png">
            Ranking de empresas
          </router-link>
          <router-link to="/">
            <img src="../assets/images/icono-base-de-datos-infocif.png">
            Servicios infocif
          </router-link>
          <router-link to="/">
            <img src="../assets/images/icono-licitaciones.png">
            Licitaciones
          </router-link>
          <router-link to="/">
            <img src="../assets/images/icono-noticias-infocif.png">
            Noticias de empresas
          </router-link>
          <router-link to="/">
            <img src="../assets/images/icono-opiniones-de-empresas-infocif.png">
            Opiniones de empresas
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'menu-infocif',
    mounted() {}
  }
</script>
<style scoped>
.nav-fixed {
  position: fixed;
  width: 100%;
  z-index: 111;
}

.nav-menu {
  background-color: #363636;
  color: #fff;
}

.nav-menu>div {
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  height: auto;
  padding: 10px;
}

.nav-menu>div .nav-top a {
  padding: 15px;
  color: #eaeaea;
  text-decoration: none;
}

.nav-menu>div .nav-top a:hover {
  color: #fff;
}

.wrap-menu {
  box-shadow: 0.5px 0.866px 4px 0px rgba(4, 1, 0, 0.5);
  border-bottom: 3px solid #eeeeee;
  background-color: white;
  font-family: 'Roboto CR', 'Uga LT', Arial, Helvetica, sans-serif;
  text-transform: uppercase;
}

.nav-menu2 {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

.nav-menu2 a {
  color: #000;
  font-size: 10px;
  padding: 5px 2px;
  text-decoration: none;
  transition: all 0.5s;
}

.nav-menu2 a:hover,
.nav-menu2 a:focus,
.nav-menu2 a.active {
  background-color: #e6e6e6;
  border-color: #adadad;
}

@media (max-width: 950px) {
  .wrap-menu {
    display: none;
  }
}

</style>
