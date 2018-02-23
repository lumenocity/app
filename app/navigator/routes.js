import React from 'react'

import MainScreen from '../screens/Main'
import SendScreen from '../screens/Send'
import SettingsScreen from '../screens/Settings'
import TransactionsScreen from '../screens/Transactions'
import WalletsScreen from '../screens/Wallets'

export default {
  Main: {
    screen: MainScreen,
    icon: require('../../assets/home.svg')
  },
  Send: {
    screen: SendScreen,
    icon: require('../../assets/home.svg')
  },
  Settings: {
    screen: SettingsScreen,
    icon: require('../../assets/home.svg')
  },
  Transactions: {
    screen: TransactionsScreen,
    icon: require('../../assets/home.svg')
  },
  Wallets: {
    screen: WalletsScreen,
    icon: require('../../assets/home.svg')
  }
}