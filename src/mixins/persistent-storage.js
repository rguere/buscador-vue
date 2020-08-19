import { mapGetters } from "vuex";

export const persistentStorage = {
  data: () => ({
    isSetData: false,
  }),
  computed: {
    ...mapGetters({
      localDatas: "localDatas/localDatas",
    }),
  },
  mounted: function() {},
  beforeDestroy: function() {},
  methods: {
    saveAppliedFilters() {
      this.$storage.set("localDatas", this.localDatas);
    },
    getAppliedFilters() {
      return this.$storage.get("localDatas");
    },
  },
};
