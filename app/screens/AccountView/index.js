import React, { Component } from 'react'
import {
  Container,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Icon,
  Text,
  H1,
  H2,
  ActionSheet,
  Input
} from 'native-base'
import { Modal, View, RefreshControl } from 'react-native'
import PropTypes from 'prop-types'
import QRCode from 'react-native-qrcode-svg'

import Actions from '../../actions'
import styles from './style'
import config from '../../config'
import HeaderBar from '../../components/HeaderBar'
import Loading from '../../components/Loading'
import effects from '../../../language/effects'

const actionButtons = [

  { text: 'Email my payment address', icon: 'send', iconColor: config.colors.brand },
  { text: 'Set up inflation', icon: 'git-compare', iconColor: config.colors.brand },
  { text: 'Federate address', icon: 'person', iconColor: config.colors.brand },
  { text: 'Rename account', icon: '', iconColor: config.colors.brand },
  { text: 'What are these?', icon: 'help', iconColor: config.colors.brand },
  { text: 'Close', icon: 'close', iconColor: 'red' }

]

export default class AccountsView extends Component {

  constructor() {
    super()
    this.state = {
      showRenameModal: false,
      loadingTransactions: false,
      refreshing: false,
      lastFetch: null
    }
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

    if (this.state.refreshing && !this.state.loadingTransactions) {
      this.context.store.dispatch(Actions.Accounts.getTransactions(
        this.context.network,
        accounts.selected
      ))

      this.setState({ loadingTransactions: true })
    }

    if (this.state.refreshing && this.state.loadingTransactions) {
      this.context.store.dispatch(Actions.Accounts.getTransactions(
        this.context.network,
        accounts.selected
      ))

      this.setState({ loadingTransactions: false, refreshing: false })
    }

    if (this.state.refreshing && this.state.loadingTransactions) {

    }

    if (currentAccount && !currentAccount.txLoaded && !this.state.loadingTransactions) {
      this.context.store.dispatch(Actions.Accounts.getTransactions(
        this.context.network,
        accounts.selected
      ))

      this.setState({ loadingTransactions: true })
    }

    if (currentAccount && currentAccount.txLoaded && this.state.loadingTransactions) {
      this.setState({ loadingTransactions: false })
    }
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

    const [ dollars, cents ] = (amount * assetEntry.price_USD).toString().split('.')
    return `$${dollars}.${cents} USD`
  }

  openActionsMenu() {
    ActionSheet.show({
      title: 'Account actions',
      options: actionButtons,
      cancelButtonIndex: 5
    }, buttonIndex => this.actionMenuButtonClicked(actionButtons[buttonIndex]))
  }

  actionMenuButtonClicked({ text }) {
    switch (text) {
      case 'Email my payment address':
      case 'Set up inflation':
      case 'Federate address':
        alert(`You clicked: ${text}`)
      break
      case 'Rename account': return this.toggleRenameAccount()
      case 'What are these?': return this.props.navigation.navigate('AccountHelp')
    }
  }

  toggleRenameAccount() {
    this.setState({ showRenameModal: !this.state.showRenameModal })
  }

  refresh() {
    console.log('COCKS')
    this.setState({ refreshing: true })
  }

  renderRenameModal(oldTitle) {
    return (
      <Modal
        visible={this.state.showRenameModal}
        transparent
        animationType="fade"
      >
        <View>
          <H1>Rename Account</H1>
          <Input placeholder={oldTitle} />
        </View>
      </Modal>
    )
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
        <Content
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => this.refresh()}
            />
          }
        >
          <H1>{account.title}</H1>
          <H2>Balance</H2>
          {this.renderAssets(account.balances, assets.data)}
          <QRCode
            value={account.address}
            logo={require('../../../android/app/src/main/res/mipmap-mdpi/ic_launcher.png')}
            logoMargin={5}
            size={200}
          />
          {account && account.txs.length > 0 ? (
            <List>
              {account.txs.reverse().map(tx => this.renderTransaction(tx))}
            </List>
          ) : (account.txLoaded ? <Text>You have no transactions, sucka</Text> : <Loading />)}
        </Content>
        {this.renderRenameModal(account.title)}
      </Container>
    )
  }

  static contextTypes = {
    store: PropTypes.object,
    network: PropTypes.object
  }

}
