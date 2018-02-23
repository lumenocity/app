import MainScreen from '../screens/Main'
import SendScreen from '../screens/Send'
import SettingsScreen from '../screens/Settings'
import TransactionsScreen from '../screens/Transactions'
import WalletsScreen from '../screens/Wallets'
import SettingsIcon from '../svgs/Settings'
import HomeIcon from '../svgs/Home'
import SendIcon from '../svgs/Send'
import WalletsIcon from '../svgs/Wallets'
import TransactionsIcon from '../svgs/Transactions'

export default {
  Main: {
    screen: MainScreen,
    icon: HomeIcon
  },
  Send: {
    screen: SendScreen,
    icon: SendIcon
  },
  Settings: {
    screen: SettingsScreen,
    icon: SettingsIcon
  },
  Transactions: {
    screen: TransactionsScreen,
    icon: TransactionsIcon
  },
  Wallets: {
    screen: WalletsScreen,
    icon: WalletsIcon
  }
}