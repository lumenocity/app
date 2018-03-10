import { StyleSheet } from 'react-native'

import config from '../../config'

export default StyleSheet.create({
  inputField: {
    width: '100%'
  },

  accordionHeaderCheckmark: {
    width: 20,
    color: config.colors.brand,
    fontSize: 20
  },

  accordionHeaderSkipped: {
    width: 20,
    color: config.colors.accent,
    fontSize: 20
  }
})
