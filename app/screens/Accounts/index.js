import { StackNavigator } from 'react-navigation'

import AccountsList from '../AccountsList'
import AccountView from '../AccountView'
import AccountHelp from '../AccountHelp'
import AccountFederate from '../AccountFederate'

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
    },
    Federate: {
      screen: AccountFederate
    }
  },
  {
    initialRouteName: 'AccountsList',
    headerMode: 'none'
  }
)
