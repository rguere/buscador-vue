<template>
	<div class="home">
		<banner-top></banner-top>
		<div class="container-loading">
		<div v-if="loading" class="loading">Loading&#8230;</div>
		</div>
		<filter-list-checkboxs :search="search"></filter-list-checkboxs>
	</div>
</template>

<script>
// @ is an alias to /src

import { mapGetters } from 'vuex'

export default {
  name: 'home',
  computed: mapGetters({
    search: 'search/search',
    loading: 'search/loading',
  }),
  data: () => ({
  }),
  mounted() {
    this.fetchSearch()
  },
  methods: {
    fetchSearch (){
      this.$store.dispatch('search/fetchSearch').then(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>
	@import './../sass/loading';
</style>