import { StyleSheet, Dimensions } from 'react-native'

import config from '../../config'

const { width: viewportWidth } = Dimensions.get('window')


export default StyleSheet.create({
  totalBalanceContainer: {
    backgroundColor: config.colors.brand,
    paddingTop: 20,
    paddingBottom: 40
  },

  centeredText: {
    textAlign: 'center'
  },

  totalBalanceWriting: {
    paddingTop: 20,
    paddingBottom: 20
  },

  inverseText: {
    color: 'white'
  },

  balances: {
    fontWeight: 'bold',
    fontSize: 20
  },

  qrButton: {
    color: 'white',
    position: 'relative',
    left: viewportWidth - 50
  },

  qrModal: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  qrCopy: {
    textAlign: 'center',
    padding: 10
  },

  addressCopyBtnText: {
    fontSize: 10
  }
})
