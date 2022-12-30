export default {
  name: 'UserProfile',
  data() {
    return {
      fields: [
        { key: 'icon', label: this.$t('USER.TAB_TOKEN') },
        { key: 'balance', label: this.$t('USER.TAB_BALANCE') },
        // { key: 'actions', label: this.$t('USER.TAB_ACTIONS') }
      ],
      balances: [
        { icon: 'busdt_32.png', symbol: 'GAMB', balance: '0.0000' },
        { icon: 'ethereum_32.png', symbol: 'ETH', balance: '0.0000' },
        { icon: 'wormholeusdtavax_32.png', symbol: 'USDT', balance: '0.0000' }
      ]
    }
  }
}