import { StyleSheet } from 'react-native'

import config from '../../config'

export default StyleSheet.create({
  inputField: {
    width: '100%',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderBottomColor: config.colors.faint,
    paddingTop: 10,
    paddingBottom: 10
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
  },

  buttonHolder: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'space-between'
  },

  loadingBtn: {
    paddingLeft: 10,
    paddingRight: 10
  },

  greetingIcon: {
    width: 200,
    height: 200
  }
})
