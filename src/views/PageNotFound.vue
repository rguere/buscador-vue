<template>
  <div class="home">
    <div class="banner-page-not-found">
      <div class="container-fluid">
        <div class="text-center">
          <h2>Page Not Found</h2>
          <router-link to="/">Regresar</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import { sendPageView } from "./../utils";

export default {
  /*middleware: 'guest',*/
  metaInfo() {
    return {
      title: "Buscador - Page Not Found",
    };
  },
  name: "page-not-found",
  layout: "basic",
  mounted() {
    sendPageView(this.$route.path, "Buscador - Page Not Found");
  },
};
</script>

<style type="text/css">
.banner-page-not-found {
  padding: 200px 0 0 0;
}
</style>
