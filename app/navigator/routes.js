import SendScreen from '../screens/Send'
import SettingsScreen from '../screens/Settings'
import TransactionsScreen from '../screens/Transactions'
import AccountsScreen from '../screens/Accounts'

export default {
  Accounts: {
    screen: AccountsScreen,
    icon: 'cube'
  },
  Send: {
    screen: SendScreen,
    icon: 'send'
  },
  Transfers: {
    screen: TransactionsScreen,
    icon: 'pulse'
  },
  Settings: {
    screen: SettingsScreen,
    icon: 'settings'
  }
}
