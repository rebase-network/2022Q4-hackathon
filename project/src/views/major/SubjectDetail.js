export default {
  name: 'SubjectDetail',
  data() {
    return {
      wallet: {
        connected: false
      },
      subject: {},
      courses: [],
      tokens: [
        { value: '0x0000000000000000000000000000000000000000', text: 'ETH' },
        { value: '0x6B26FB02763CBc226c7Fa56AB886F1Eee2635a6E', text: 'USDT' },
      ],
      endTimes: [
        { value: 1, text: '1个月之后' },
        { value: 3, text: '3个月之后' },
        { value: 6, text: '6个月之后' },
      ],
      freeTimes: [
        { value: 1, text: '1个月之后' },
        { value: 3, text: '3个月之后' },
        { value: 6, text: '6个月之后' },
      ],
      shares: [
        { value: 20, text: '20人' },
        { value: 50, text: '50人' },
        { value: 100, text: '100人' },
        { value: 500, text: '500人' },
      ],
      form: {
        tuitionToken: '0x6B26FB02763CBc226c7Fa56AB886F1Eee2635a6E',
        endTime: 1,
        freeTime: 1,
        totalShares: 500,
        joinShares: 1,
        uinAmount: 0,
        descriptionURI: undefined,
        real: 0
      }
    }
  },
  mounted() {
    this.getCourseList()
  },
  methods: {
    getAddress(account, len) {
      const length = account.length
      var address = account.substring(0, len || 16)
      return address + '...' + account.substring(length - 4, length)
    },
    connectWallet() {
      if (this.$root.connected == true) return
      const { ethereum } = window, self = this

      if (typeof ethereum === 'undefined')
        throw new Error(this.$t('ERROR.WALLET.NOT_METAMASK'))

      ethereum.on('accountsChanged', (accounts) => {
        this.$root.accounts = accounts
        self.$toast(self.getAddress(accounts[0]), 'success')
        if (localStorage.getItem('inviter') == accounts[0]) {
          localStorage.setItem('inviter', this.$root.inviter)
        }

        console.log('Current Account:', accounts[0])
        console.log('Current Inviter:', localStorage.getItem('inviter'))
      })

      ethereum.on('chainChanged', async (networkId) => {
        networkId = await ethereum.request({method: 'net_version'})
        this.$root.networkId = networkId
        console.log('Current NetworkId:', networkId)
      })

      ethereum.request({ method: 'eth_requestAccounts' }).then(async (accounts) => {
        let networkId = await ethereum.request({method: 'net_version'})
        this.wallet.connected = ethereum.isConnected()

        this.$root.accounts = accounts
        this.$root.networkId = networkId
        this.$root.connected = this.wallet.connected

        if (localStorage.getItem('inviter') == accounts[0]) {
          localStorage.setItem('inviter', this.$root.inviter)
        }

        console.log('Current Inviter:', localStorage.getItem('inviter'))
        self.$toast(self.getAddress(accounts[0], 16), 'success')
      }).catch((err) => { throw err })
    },
    async getCourseList() {
      const subjectAddr = this.$route.query.addr
      console.log(subjectAddr)
      if (!subjectAddr) return

      this.$root.subjects.forEach(element => {
        if (element.subjectAddr == subjectAddr)
          this.subject = element
      })

      const web3 = this.$root.web3
      const sub = new this.SubjectTemplate(this, subjectAddr, web3)
      const result = await sub.methods.getCourseList()

      const {proposers, subjectAddrs, descriptionURIs} = result
      console.log(proposers, subjectAddrs, descriptionURIs)

      // for (let i = 0; i < proposers.length; i++) {
      //   const data = await this.$root.axios.get(subjectURIs[i])
      //   var element = data.data
      //   element.subjectAddr = subjectAddrs[i]

      //   this.subjectList.push(element)
      //   this.$root.subjects.push(element)
      // }
    },
    calc() {
      const s = this.form.joinShares || 0;
      const u = this.form.uintAmount || 0;
      this.form.real = s * u;
    },
    async askNewSubject() {
      if (!this.form.descriptionURI) throw new Error('请填写描述URI')

      const sub = new this.SubjectTemplate(this, this.subject.subjectAddr)
      const amount = this.form.uinAmount == 0 ? 0 : sub.web3.utils(this.form.uinAmount.toString(), 'ether')
      const endTime = this.form.endTime * 24 * 60 * 60 + new Date().getTime()
      const freeTime = this.form.freeTime  * 24 * 60 * 60

      var data = {
        tuitionToken: this.form.tuitionToken,
        parms: [this.form.totalShares, amount, endTime, freeTime, this.form.joinShares || 1],
        descriptionURI: this.form.descriptionURI
      }

      if (this.form.tuitionToken == '0x0000000000000000000000000000000000000000') {
        data.value = this.form.uinAmount
      }

      // await sub.methods.askNewSubject(data).then((res) => {
      //   this.getCourseList()
      //   console.log(res)
      // })

      console.log(this.form.descriptionURI)
    }
  }
}