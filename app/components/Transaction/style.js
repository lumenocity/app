import { StyleSheet } from 'react-native'

import config from '../../config'

export default StyleSheet.create({

  header: {
    justifyContent: 'center',
    alignItems: 'center'
  },

  iconWrapper: {
    backgroundColor: config.colors.brand,
    width: 60,
    height: 60,
    borderRadius: 50,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 30
  },

  icon: {
    textAlign: 'center',
    fontSize: 30,
    color: 'white'
  },

  indicatorIcon: {
    color: config.colors.brand,
    fontSize: 21
  },

  centerText: {
    textAlign: 'center'
  }

})
