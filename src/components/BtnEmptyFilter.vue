<template>
  <button
    :class="class_btn_defaul"
    :disabled="applied_filters.length === 0"
    @click="emptyFilter"
  >
    <i class="fa fa-trash"></i> Vaciar
    <span class="hidden-xs hidden-sm">resultados</span>
  </button>
</template>

<script>
import { mapGetters } from "vuex";
import swal from "sweetalert2";
export default {
  name: "btn-empty-filter",
  props: ["class_btn"],
  data() {
    return {
      class_btn_defaul: "btn btn-primary btn-empty-filter",
    };
  },
  computed: {
    ...mapGetters({
      applied_filters: "filters/applied_filters",
    }),
  },
  mounted() {
    if (this.class_btn) {
      this.class_btn_defaul = `${this.class_btn_defaul} ${this.class_btn}`;
    }
  },
  methods: {
    emptyFilter() {
      swal
        .fire({
          icon: "question",
          title: "Estas seguro?",
          html: `deseas vaciar los filtros aplicados?`,
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          cancelButtonColor: "#d9534f",
          showConfirmButton: true,
          confirmButtonColor: "#337ab7",
          confirmButtonText: "Si, seguro",
        })
        .then((result) => {
          if (result.value) {
            this.applied_filters.forEach((item) => {
              this.$root.$emit("empty_filter", item);
            });
          }
        });
    },
  },
};
</script>

<style lang="scss">
.col_left {
  .btn-empty-filter {
    width: 100%;
  }
}
</style>
