export default {
  name: 'MajorList',
  data() {
    return {
      majorList: []
    }
  },
  mounted() {
    this.getMajors()
  },
  methods: {
    async getMajors() {
      const web3 = this.$root.web3
      const factory = new this.MajorFactory(this, web3)
      const result = await factory.methods.getMajors()
      const {majorIds, majorURIs} = result

      this.$root.majors = []

      for (let i = 0; i < majorIds.length; i++) {
        const data = await this.$root.axios.get(majorURIs[i])
        var element = data.data
        element.majorId = majorIds[i]

        this.majorList.push(element)
        this.$root.majors.push(element)
      }
    }
  }
}