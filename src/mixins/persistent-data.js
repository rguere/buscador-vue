import { mapGetters } from 'vuex'

export const persistentData = {
	data: () => ({
    isSetData: false
  }),
  computed: {
    ...mapGetters({
      localDatas: 'localDatas/localDatas',
    })
  },
  mounted: function () {
    if (!this.isSetData) {
      this.setData()
      this.isSetData = true
    }
  },
  beforeDestroy: function () {
    this.setLocalDatas()
  },
  methods: {
    setLocalDatas: function () {
      this.$store.dispatch('localDatas/setLocalDatas', {
        key: this.$options.name,
        data: this.$data,
      })
    },
    setData: function () {
      if ((this.localDatas) && (this.localDatas[this.$options.name])) {
        for (let key in this.localDatas[this.$options.name]) {
          this.$set(this.$data, key, this.localDatas[this.$options.name][key])
        }
      }
    },
    sortData(elements) {
      let _elements = [...elements]
      let array = _elements.map(item => {
        return item.id
      })
      return array.sort()
    }
  }
}