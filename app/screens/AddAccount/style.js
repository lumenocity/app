import { StyleSheet, Dimensions } from 'react-native'

import config from '../../config'

const viewport = {
  width: viewportWidth,
  height: viewportHeight
} = Dimensions.get('window')

export default StyleSheet.create({
  accordionHeader: {
    flexDirection: 'row',
    borderBottomColor: config.colors.subtle,
    borderBottomWidth: 1,
    padding: 5
  },

  accordionHeaderIcon: {
    width: 20,
    color: config.colors.subtle,
    fontSize: 20
  },

  accordionHeaderText: {
    width: viewportWidth - 50,
    color: config.colors.text,
    fontWeight: 'bold'
  },

  accordionHeaderCheckmark: {
    width: 20,
    color: config.colors.brand,
    fontSize: 20
  },

  accordionBody: {
    padding: 10
  },

  inputField: {
    width: '100%'
  }
})
