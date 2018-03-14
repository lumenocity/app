import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    padding: 10
  },

  fieldFolder: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10
  },

  amountContainer: {
    flex: 1,
    flexDirection: 'column'
  },

  amountEntryContainer: {
    flex: 1,
    flexDirection: 'row'
  },

  amountEntry: {
    flex: 4
  },

  amountAssetName: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  amountInAccount: {
    flex: 1
  },

  label: {
    fontWeight: 'bold',
    fontSize: 12,
    paddingTop: 20
  }
})
