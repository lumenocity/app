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
    activeTintColor: Platform.OS === 'ios' ? config.colors.brand : 'white',
    showIcon: true,
    allowFontScaling: false,
    labelStyle: { fontSize: Platform.OS === 'ios' ? 12 : 9 }
  },

  tabBarPosition: 'bottom',
  animationEnabled: false,
  swipeEnabled: false,
  initialRouteName: 'Accounts'
})
