import React, { Component } from 'react'
import { Content, List, ListItem, Left, Body, Right, Icon, Text, Button } from 'native-base'
import PropTypes from 'prop-types'

import Actions from '../../actions'
import styles from './style'
import config from '../../config'

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
    alert('Add a new account')
  }

  renderAccount(account) {
    const { amount } = account.balances.find(balance => balance.asset === 'native')

    return (
      <ListItem key={`account-${account.address}`} avatar>
        <Left>
          <Icon name='cube' />
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

    console.log(accounts)

    return (
      <Content>
        {accounts && accounts.data.length > 0 ? (
          <List>
            {accounts.data.map(account => this.renderAccount(account))}
          </List>
        ) : (
          <Text>You have no accounts, sucka</Text>
        )}
      <Button
        block
        onPress={() => this.addAccount()}
      >
        <Text>Add an account</Text>
      </Button>
      </Content>
    )
  }

  static contextTypes = {
    store: PropTypes.object
  }

  static navigationOptions = {
    title: 'Accounts',
  }

}
