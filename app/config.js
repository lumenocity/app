import env from 'react-native-config'

export default {

  network: 'https://horizon-testnet.stellar.org',
  testnet: true,

  assetList: 'https://api.stellarterm.com/v1/ticker.json',

  ephemeralState: [ 'session', 'transaction' ],

  colors: {
    brand: '#21E692',
    accent: '#CAE692',
    subtle: '#e6e9ee',
    text: '#383838'
  },

  federationDomain: 'lumenocity.io',
  federationApi: 'https://stellarid.io/api',
  federationApiKey: env.STELLARID_KEY,

  inflationPools: [
    {
      title: 'Lumenaut',
      website: 'https://lumenaut.net/',
      address: 'GCCD6AJOYZCUAQLX32ZJF2MKFFAUJ53PVCFQI3RHWKL3V47QYE2BNAUT'
    },
    {
      title: 'Stellarpool',
      website: 'https://stellarpool.io',
      address: 'GASSTNBC4WDTQUEQ2FHIQ4BSSVNIH5QSBH5JDAD4U7LITK3BVXROS3A2'
    },
    {
      title: 'Moonpool',
      website: 'https://moonpool.space/',
      address: 'GB56YLTH5SDOYTUGPWY5MXJ7VQTY7BEM2YVJZTN5O555VA6DJYCTY2MP'
    },
    {
      title: 'Inflationpool.com',
      website: 'https://inflationpool.com/',
      address: 'GA3FUYFOPWZ25YXTCA73RK2UGONHCO27OHQRSGV3VCE67UEPEFEDCOPA'
    },
    {
      title: 'FutureTense.io',
      website: 'https://pool.futuretense.io/',
      address: 'GBL7AE2HGRNQSPWV56ZFLILXNT52QWSMOQGDBBXYOP7XKMQTCKVMX2ZL'
    }
  ]
}
