import React, { Component } from 'react'
import { View, Text } from 'react-native'
import PropTypes from 'prop-types'

import Actions from '../../actions'
import Network from '../../lib/stellar-network'
import styles from './style'
import config from '../../config'

export default class Main extends Component {

  constructor() {
    super()
    this.network = Network(config.network, config.testnet)
  }

  getChildContext() {
    return { network: this.network }
  }

  render() {
    return (
      <View>
        <Text>Cocks</Text>
      </View>
    )
  }

}

Main.contextTypes = {
  store: PropTypes.object
}
