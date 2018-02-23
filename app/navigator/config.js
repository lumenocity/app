import React from 'react'
import { Image } from 'react-native'

export default routes => ({
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => {
      const route = routes[navigation.state.key]
      const icon = <Image source={route.icon} width={25} height={25} />

      return icon
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