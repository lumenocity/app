import React, { Component } from 'react'
import { Container, Content, List, ListItem, Left, Body, Right, Icon, Text, H1, H2 } from 'native-base'
import PropTypes from 'prop-types'

import Actions from '../../actions'
import styles from './style'
import config from '../../config'
import HeaderBar from '../../components/HeaderBar'

export default class Accounts extends Component {

  componentWillMount() {
    this.unsubscribe = this.context.store.subscribe(() => this.respondToStoreChanges())
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  respondToStoreChanges() {
  }

  addAccount() {
    this.context.store.dispatch(Actions.Accounts.toggleAdding())
  }

  renameAccount() {

  }

  totalBalance(onlyAsset) {
    const { accounts } = this.context.store.getState()

    return accounts.data.reduce((total, { balances }) => (
      total + balances.reduce((accountTotal, { amount, asset }) => (
        onlyAsset === asset ? accountTotal + amount : accountTotal
      ), 0)
    ), 0)
  }

  gotoAccount() {
    alert('cocks')
  }

  renderAccount(account) {
    const { amount } = account.balances.find(balance => balance.asset === 'native')

    return (
      <ListItem key={`account-${account.address}`} avatar onPress={() => this.gotoAccount()}>
        <Left>
          <Icon name="cube" />
        </Left>
        <Body>
          <Text>{account.title} ({account.address.slice(0, 5)}...{account.address.slice(-5)})</Text>
          <Text note>Current balance: {amount || 0} XLM</Text>
        </Body>
      </ListItem>
    )
  }

  render() {
    const { accounts } = this.context.store.getState()

    return (
      <Container>
        <HeaderBar
          title="Accounts"
          rightButton
          rightButtonIcon="add"
          rightButtonAction={() => this.addAccount()}
        />
        <Content>
          <H2>Total balance:</H2>
          <H1>{this.totalBalance('native')} XLM</H1>
          {accounts && accounts.data.length > 0 ? (
            <List>
              {accounts.data.map(account => this.renderAccount(account))}
            </List>
          ) : (
            <Text>You have no accounts, sucka</Text>
          )}
        </Content>
      </Container>
    )
  }

  static contextTypes = {
    store: PropTypes.object
  }

  static navigationOptions = {
    title: 'Accounts',
  }

}
