import React, { Component } from 'react'
import { Content, H1, H2 } from 'native-base'
import PropTypes from 'prop-types'

import Actions from '../../actions'
import styles from './style'
import config from '../../config'

export default class Main extends Component {

  constructor() {
    super()
    this.state = { assetsLoaded: false }
  }

  componentWillMount() {
    this.unsubscribe = this.context.store.subscribe(() => this.respondToStoreChanges())
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  respondToStoreChanges() {
    this.forceUpdate()
  }

  totalBalance(onlyAsset) {
    const { accounts } = this.context.store.getState()

    return accounts.data.reduce((total, { balances }) => (
      total + balances.reduce((accountTotal, { amount, asset }) => (
        onlyAsset === asset ? accountTotal + amount : accountTotal
      ), 0)
    ), 0)
  }

  render() {
    return (
      <Content>
        <H2>Current Balance:</H2>
        <H1>{this.totalBalance('native')} XLM</H1>
      </Content>
    )
  }

  static contextTypes = {
    store: PropTypes.object
  }

  static navigationOptions = {
    title: 'Main',
  }

}
