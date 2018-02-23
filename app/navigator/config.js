import React from 'react'

import config from '../config'

export default routes => ({
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => {
      const { icon: Icon } = routes[navigation.state.key]
      return <Icon stroke={config.colors.brand} width={24} height={24} />
    }
  }),

  tabBarOptions: {
    // activeTintColor: 'tomato',
    // inactiveTintColor: 'gray',
  },

  tabBarPosition: 'bottom',
  animationEnabled: false,
  swipeEnabled: false,
  initialRouteName: 'Main'
})
