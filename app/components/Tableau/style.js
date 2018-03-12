import { StyleSheet, Dimensions } from 'react-native'

import config from '../../config'

const { width: viewportWidth } = Dimensions.get('window')

export default StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingBottom: 40
  },

  centeredText: {
    textAlign: 'center',
    fontFamily: config.fontFamily
  },

  bigText: {
    paddingTop: 20,
    paddingBottom: 20,
    fontFamily: config.fontFamily
  },

  inverseText: {
    color: 'white',
    fontFamily: config.fontFamily
  },

  subText: {
    fontWeight: 'bold',
    fontSize: 20,
    fontFamily: config.fontFamily
  },

  button: {
    color: 'white',
    position: 'relative',
    left: viewportWidth - 50,
    borderWidth: 1,
    borderColor: 'red',
    borderStyle: 'solid'
  }
})
