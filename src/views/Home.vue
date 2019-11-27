<template>
<div class="container show-container mt20">
  <div class="row clearfix show-grid">
    <div class="col-xs-12 title-margin text-center">
      <img src="http://www.infocif.es/images/logo-infocif-243x59.gif" class="" />
    </div>
    <div class="cb"></div>

    <div id="registro" style="max-width: 344px;" class="center-block thumbnail panel-body">

      <p class="title-xs center-block title-margin text-center">Iniciar sesi&oacute;n</p>
      <form @submit.prevent="login">
        <button type="button" class="btn btn-default btn-circle btn-xxl center-block mb20 mt20"><i class="fa fa-user fa-2x color999"></i> </button>

        <div class="center-block" style="width: 304px;">
          <div class="form-group">
            <input type="text" v-model="form.email" name="txtusuario" id="txtusuario" placeholder="Usuario" class="form-control center-block" style="width: 304px;" />
          </div>

          <div class="form-group">
            <input type="password" v-model="form.password" name="txtpassword" id="txtpassword" placeholder="Password" class="form-control center-block" style="width: 304px;" />
          </div>

          <input type="submit" class="btn btn-primary btn-block" name="acceder" id="acceder" value="Acceder">
          <div id="anadido_boton_pagar">
            <a href="http://www.infocif.es/gestion/gestion-registro.asp" class="pull-right title-margin">Registrarse</a>
            <a href="http://www.infocif.es/gestion/gestion-recuperar-password.asp" class="pull-left title-margin">Recuperar contrase&ntilde;a</a>
          </div>
        </div>
      </form>

    </div>
    <div class="col-xs-12" style="text-align:center;">
      <router-link to="/buscador">
        <i class="fa fa-long-arrow-left fa-1x mr5"></i>Buscador
      </router-link>
    </div>
  </div>
</div>
</template>

<script>
// @ is an alias to /src
import toastr from 'toastr'
export default {
  name: 'home',
  middleware: 'guest',
  layout: 'basic',

  data: () => ({
    form: {
      email: 'test@example.app',
      password: 'qwerty'
    },
    remember: false
  }),

  methods: {
    login () {
      if (this.form.email === 'test@example.app' && this.form.password === 'qwerty') {
        const { data } = {
          data: {
            token: 'iayeda8wydo8aedno83yrn837yd'
          }
        }
        this.$store.dispatch('auth/saveToken', {
          token: data.token,
          remember: this.remember
        })
        this.$store.dispatch('auth/fetchUser')
        this.$router.push({ name: 'buscador' })
      } else {
        toastr.error('Usuario o Password incorectos', 'Error')
      }
    }
  }

}
</script>

<style type="text/css">
  .banner-page-not-found { padding: 200px 0 0 0; }
</style>
