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
      console.log("saveAppliedFilters");
      this.$storage.set("localDatas", this.localDatas);
    },
    getAppliedFilters() {
      console.log("getAppliedFilters");
      return this.$storage.get("localDatas");
    },
  },
};
