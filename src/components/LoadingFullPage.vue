<template>
  <div>
    <div v-if="loading" class="loading">
      Loading&#8230;
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "loading-full-page",
  computed: mapGetters({
    loading: "search/loading",
  }),
};
</script>
<!-- lang="scss" -->
<style lang="scss" scoped>
@import "./../sass/loading";
</style>
