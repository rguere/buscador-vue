import { mapGetters } from "vuex";

export const persistentData = {
  data: () => ({
    isSetData: false,
  }),
  computed: {
    ...mapGetters({
      localDatas: "localDatas/localDatas",
    }),
  },
  mounted: function() {
    if (!this.isSetData) {
      this.setData();
      this.isSetData = true;
    }
  },
  beforeDestroy: function() {
    this.setLocalDatas();
  },
  methods: {
    setLocalDatas: function() {
      this.$store.dispatch("localDatas/setLocalDatas", {
        key: this.$options.name,
        data: this.$data,
        storage: this.$storage,
      });
    },
    setData: function() {
      if (this.localDatas && this.localDatas[this.$options.name]) {
        for (let key in this.localDatas[this.$options.name]) {
          this.$set(this.$data, key, this.localDatas[this.$options.name][key]);
        }
      }
    },
    sortData(elements) {
      let _elements = [...elements];
      let array = _elements.map((item) => {
        return item.id;
      });
      return array.sort();
    },
    saveAppliedFilters() {
      console.log("saveAppliedFilters");
      this.setLocalDatas();
      setTimeout(() => {
        this.$storage.set("localDatas", this.localDatas);
      }, 300);
    },
    getAppliedFilters() {
      //console.log("getAppliedFilters", this.$options.name);
      const localDatas = this.$storage.get("localDatas");
      if (localDatas && localDatas[this.$options.name]) {
        for (let key in localDatas[this.$options.name]) {
          this.$set(this.$data, key, localDatas[this.$options.name][key]);
        }
      }
    },
  },
};
