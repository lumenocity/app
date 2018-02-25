import { StackNavigator } from 'react-navigation'

import AccountsList from '../AccountsList'
import AccountView from '../AccountView'
import AccountHelp from '../AccountHelp'

export default StackNavigator(
  {
    AccountsList: {
      screen: AccountsList
    },
    AccountView: {
      screen: AccountView
    },
    AccountHelp: {
      screen: AccountHelp
    }
  },
  {
    initialRouteName: 'AccountsList',
    headerMode: 'none'
  }
)
