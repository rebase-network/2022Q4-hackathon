import Web3 from 'web3'
import axios from 'axios'

export default () => {
  const host = 'http://127.0.0.1:8545'

  return {
    connected: false,
    accounts: ['0x6e2CD657bc3B849FC06Ea10b70948dB3dccF481D'],
    networkId: 1671083358586,
    agent: '0x92F4D033e44576B8672C6F46B35f8aB803151413',
    inviter: '0x92F4D033e44576B8672C6F46B35f8aB803151413',
    majors: [],
    subjects: [],
    web3: new Web3(host),
    axios: axios
  }
}