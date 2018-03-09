import { StyleSheet, Dimensions } from 'react-native'

const { width: viewportWidth } = Dimensions.get('window')

export default StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingBottom: 40
  },

  centeredText: {
    textAlign: 'center'
  },

  bigText: {
    paddingTop: 20,
    paddingBottom: 20
  },

  inverseText: {
    color: 'white'
  },

  subText: {
    fontWeight: 'bold',
    fontSize: 20
  },

  button: {
    color: 'white',
    position: 'relative',
    left: viewportWidth - 50
  }
})
