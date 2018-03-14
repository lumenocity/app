import { StyleSheet } from 'react-native'

import config from '../../config'

export default StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: 'row'
  },

  textBox: {
    flex: 4,
    borderBottomWidth: 1,
    borderBottomColor: config.colors.faint,
    borderStyle: 'solid'
  },

  qrButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  }

})
