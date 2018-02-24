import React from 'react'
import { Icon } from 'native-base'

import config from '../config'

export default routes => ({
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => {
      const { icon } = routes[navigation.state.key]
      return (
        <Icon
          name={focused ? `ios-${icon}` : `${icon}`}
          style={{ color: tintColor }}
        />
      )
    }
  }),

  tabBarOptions: {
    activeTintColor: config.colors.brand
  },

  tabBarPosition: 'bottom',
  animationEnabled: false,
  swipeEnabled: false,
  initialRouteName: 'Main'
})
