import { StackNavigator } from 'react-navigation'

import AccountsList from '../AccountsList'
import AccountView from '../AccountView'
import AccountHelp from '../AccountHelp'
import AccountFederate from '../AccountFederate'
import TransactionView from '../TransactionView'

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
    },
    TransactionView: {
      screen: TransactionView
    }
  },
  {
    initialRouteName: 'AccountsList',
    headerMode: 'none'
  }
)
