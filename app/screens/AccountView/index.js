import React, { Component } from 'react'
import { Container, Content, List, ListItem, Left, Body, Right, Icon, Text, H1, H2, ActionSheet } from 'native-base'
import PropTypes from 'prop-types'

import Actions from '../../actions'
import styles from './style'
import config from '../../config'
import HeaderBar from '../../components/HeaderBar'

const actionButtons = [

  { text: 'Email my payment address', icon: 'send', iconColor: config.colors.brand },
  { text: 'Set up inflation', icon: 'git-compare', iconColor: config.colors.brand },
  { text: 'Federate address', icon: 'person', iconColor: config.colors.brand },
  { text: 'What are these?', icon: 'help', iconColor: config.colors.brand },
  { text: 'Close', icon: 'close', iconColor: 'red' }

]

export default class AccountsView extends Component {

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

  goBack() {
    this.context.store.dispatch(Actions.Accounts.select(null))
    this.props.navigation.goBack()
  }

  currentAccount() {
    const { accounts } = this.context.store.getState()
    return accounts.data.find(account => account.address === accounts.selected)
  }

  showInFiat({ asset, amount }, assets) {
    const assetEntry = assets.find(anAsset => (
      asset === anAsset.code || asset === 'native' && anAsset.domain === 'native'
    ))

    if (!assetEntry) return

    const fiatAmount = new Intl.NumberFormat('en', {
      style: 'currency',
      currency: 'USD'
    }).format(amount * assetEntry.price_USD)

    return `${fiatAmount} USD`
  }

  openActionsMenu() {
    ActionSheet.show({
      title: 'Account actions',
      options: actionButtons,
      cancelButtonIndex: 4
    }, buttonIndex => this.actionMenuButtonClicked(actionButtons[buttonIndex]))
  }

  actionMenuButtonClicked({ text }) {
    switch (text) {
      case 'Email my payment address':
      case 'Set up inflation':
      case 'Federate address':
        alert(`You clicked: ${text}`)
      break
      case 'What are these?':
        return this.props.navigation.navigate('AccountHelp')
    }
  }

  renderAssets(balances, assets) {
    return (
      <List>
        {balances.filter(balance => balance.amount > 0).map(balance => (
          <ListItem key={`asset-${balance.asset}`}>
            <Body>
              <Text>{balance.amount} {balance.asset === 'native' ? 'XLM' : balance.asset}</Text>
              <Text note>({this.showInFiat(balance, assets)})</Text>
            </Body>
          </ListItem>
        ))}
      </List>
    )
  }

  render() {
    const account = this.currentAccount()
    const { assets } = this.context.store.getState()

    return (
      <Container>
        <HeaderBar
          title="Viewing Account"
          leftButton
          leftButtonIcon="arrow-back"
          leftButtonAction={() => this.goBack()}
          rightButton
          rightButtonIcon="more"
          rightButtonAction={() => this.openActionsMenu()}
        />
        <Content>
          <H1>{account.title}</H1>
          <H2>Balance</H2>
          {this.renderAssets(account.balances, assets.data)}
        </Content>
      </Container>
    )
  }

  static contextTypes = {
    store: PropTypes.object
  }

}
