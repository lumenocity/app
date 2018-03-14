import { StyleSheet } from 'react-native'

import config from '../../config'

export default StyleSheet.create({
  dropdownContainer: {
    flex: 1,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: config.colors.faint,
    borderStyle: 'solid',
    flexDirection: 'row'
  },

  dropdownText: {
    fontSize: 16,
    fontFamily: config.fontFamily,
    padding: 5
  },

  dropdownStyle: {
    flex: 1,
    padding: 10
  },

  dropdownButtonText: {
    flex: 1,
    flexGrow: 1
  },

  dropdownButtonIconContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: 20
  },

  dropdownButtonIcon: {
    fontSize: 12,
    color: config.colors.faint
  }
})
