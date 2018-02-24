import React, { Component } from 'react'
import { Container, Content, List, ListItem, Left, Body, Right, Icon, Text, H1, H2 } from 'native-base'
import PropTypes from 'prop-types'
import { StackNavigator } from 'react-navigation'

import AccountsList from '../AccountsList'
import AccountView from '../AccountView'

export default StackNavigator(
  {
    AccountsList: {
      screen: AccountsList
    },
    AccountView: {
      screen: AccountView
    }
  },
  {
    initialRouteName: 'AccountsList',
    headerMode: 'none'
  }
)
