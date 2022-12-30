export default {
  name: 'SubjectList',
  data() {
    return {
      major: {},
      subjectList: []
    }
  },
  mounted() {
    this.getSubjects()
  },
  methods: {
    async getSubjects() {
      const majorId = this.$route.query.id
      if (!majorId) return

      this.$root.majors.forEach(element => {
        if (element.majorId == majorId)
          this.major = element
        
          console.log(element.majorId)
      })

      const web3 = this.$root.web3
      const factory = new this.MajorFactory(this, web3)
      const result = await factory.methods.getSubjects({
        majorId: majorId
      })

      const {subjectAddrs, subjectURIs} = result

      for (let i = 0; i < subjectAddrs.length; i++) {
        const data = await this.$root.axios.get(subjectURIs[i])
        var element = data.data
        element.subjectAddr = subjectAddrs[i]

        this.subjectList.push(element)
        this.$root.subjects.push(element)
      }
    }
  }
}