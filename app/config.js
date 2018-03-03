import env from 'react-native-config'

export default {

  network: 'https://horizon-testnet.stellar.org',
  testnet: true,

  assetList: 'https://api.stellarterm.com/v1/ticker.json',

  ephemeralState: [ 'session', 'transaction' ],

  colors: {
    brand: '#21E692',
    accent: '#CAE692'
  },

  federationDomain: 'lumenocity.io',
  federationApi: 'https://stellarid.io/api/',
  federationApiKey: env.STELLARID_KEY,

  inflationPools: [
    {
      name: 'Lumenaut',
      website: 'https://lumenaut.net/',
      address: 'GCCD6AJOYZCUAQLX32ZJF2MKFFAUJ53PVCFQI3RHWKL3V47QYE2BNAUT'
    }
  ]
}
