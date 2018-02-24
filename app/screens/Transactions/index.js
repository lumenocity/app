import React, { Component } from 'react'
import { Container, Content, List, ListItem, Left, Body, Right, Icon, Text } from 'native-base'
import PropTypes from 'prop-types'

import Actions from '../../actions'
import styles from './style'
import config from '../../config'
import effects from '../../../language/effects'
import HeaderBar from '../../components/HeaderBar'

export default class Transactions extends Component {

  constructor() {
    super()
    this.state = { requestedLoad: false }
  }

  componentWillMount() {
    this.unsubscribe = this.context.store.subscribe(() => this.respondToStoreChanges())
    this.respondToStoreChanges()
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  respondToStoreChanges() {
    const { accounts } = this.context.store.getState()
    const currentAccount = this.currentAccount()

    if (currentAccount && !currentAccount.txLoaded && !this.state.requestedLoad) {
      this.context.store.dispatch(Actions.Accounts.getTransactions(
        this.context.network,
        accounts.selected
      ))

      this.setState({ requestedLoad: true })
    }

    if (currentAccount && currentAccount.txLoaded && this.state.requestedLoad) {
      this.setState({ requestedLoad: false })
    }
  }

  currentAccount() {
    const { accounts } = this.context.store.getState()
    return accounts.data.find(account => account.address === accounts.selected)
  }

  renderTransaction(tx) {
    const amount = tx.startingBalance || tx.amount
    const effect = effects[tx.type]
    
    return (
      <ListItem avatar key={`tx-${tx.id}`}>
        <Left>
          <Icon name={effect.icon} />
        </Left>
        <Body>
          <Text>{effect.label}</Text>
          {amount ? (<Text note>{tx.startingBalance || tx.amount} XLM</Text>) : null}
        </Body>
      </ListItem>
    )
  }

  render() {
    const account = this.currentAccount()

    return (
      <Container>
        <HeaderBar title="Transactions" />
        <Content>
          {account && account.txs.length > 0 ? (
            <List>
              {account.txs.reverse().map(tx => this.renderTransaction(tx))}
            </List>
          ) : (
            <Text>You have no transactions, sucka</Text>
          )}
        </Content>
      </Container>
    )
  }

  static contextTypes = {
    store: PropTypes.object,
    network: PropTypes.object
  }

  static navigationOptions = {
    title: 'Transfers',
  }

}
