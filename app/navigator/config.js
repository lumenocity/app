import React from 'react'
import { Platform } from 'react-native'
import { Icon } from 'native-base'

import config from '../config'

export default routes => ({
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => {
      const { icon } = routes[navigation.state.key]
      return (
        <Icon
          ios={`ios-${icon}`}
          android={`md-${icon}`}
          style={{ color: tintColor }}
        />
      )
    }
  }),

  tabBarOptions: {
    activeTintColor: config.colors.brand,
    showIcon: true,
    allowFontScaling: true,
    labelStyle: { fontFamily: config.fontFamily },
    style: { backgroundColor: 'white' },
    indicatorStyle: { backgroundColor: config.colors.brand },
    inactiveBackgroundColor: config.colors.subtle,
    inactiveTintColor: config.colors.text,
    upperCaseLabel: false
  },

  tabBarPosition: 'bottom',
  animationEnabled: false,
  swipeEnabled: false,
  initialRouteName: 'Accounts'
})
