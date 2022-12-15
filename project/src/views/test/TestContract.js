export default {
  name: 'TestContract',
  data() {
    return {
      wallet: {
        connected: false
      },
      form: {
        majorURI: undefined,
        majorID: undefined,
        subjectURI: undefined,
        subjectAddr: undefined
      }
    }
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
    openMajor() {
      if (!this.form.majorURI) throw new Error('Major URI Invalid.')

      const factory = new this.MajorFactory(this)
      factory.methods.openMajor({
        majorURI: this.form.majorURI
      }).then((res) => {
        const { admin, majorId } = res.events.OpenMajor.returnValues
        this.form.majorID = majorId;
        console.log('ADMIN: ', admin)
      })
    },
    addSubjectForMajor() {
      if (!this.form.majorID) throw new Error('Major Id Invalid.')
      if (!this.form.subjectURI) throw new Error('Subject URI Invalid.')

      const factory = new this.MajorFactory(this)
      factory.methods.addSubjectForMajor({
        majorId: this.form.majorID,
        subjectURI: this.form.subjectURI
      }).then((res) => {
        const { admin, subject } = res.events.AddSubjectForMajor.returnValues
        this.form.subjectAddr = subject;
        console.log('ADMIN: ', admin)
      })
    },
    askNewSubject() {
      const addr = '0xB8203996e09514FC7D7B42BFac57FBf866C31A43'
      const sub = new this.SubjectTemplate(this, addr)

      sub.methods.askNewSubject({
        tuitionToken: '0x04C8Fb8226AF2B0CfFADd56A0AfBE34b48A10a2d',
        parms: ['0','100000000000000000','1672404955','0','1'],
        descriptionURI: 'http://www.baidu.com',
        value: '0.1'
      }).then((res) => {
        console.log(res)
      })
    }
  }
}