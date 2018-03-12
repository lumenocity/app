import React, { Component } from 'react'
import {
  Container,
  Content,
  List,
  ListItem,
  Icon,
  Text,
  H1,
  H2,
  Input,
  Button,
  Left,
  Right,
  Body,
  ActionSheet
} from 'native-base'
import { Modal, View, RefreshControl } from 'react-native'
import PropTypes from 'prop-types'
import QRCode from 'react-native-qrcode-svg'
import { distanceInWords } from 'date-fns'

import Actions from '../../actions'
import styles from './style'
import config from '../../config'
import HeaderBar from '../../components/HeaderBar'
import Loading from '../../components/Loading'
import effects from '../../../language/effects'
import Tableau, { styling as TableauStyle } from '../../components/Tableau'
import { preciseRound } from '../../lib/view-helpers'

const SHOW_TYPES = [
  'create_account',
  'account_credited',
  'account_debited'
]

export default class AccountsView extends Component {

  constructor() {
    super()
    this.state = {
      showRenameModal: false,
      loadingTransactions: false,
      refreshing: false,
      lastFetch: null,
      showQRModal: false
    }
  }

  actionButtons() {
    const { i18n } = this.context

    return [
      { 
        action: 'send',
        text: i18n.t('accounts.actions.send'),
        icon: 'send',
        iconColor: config.colors.brand
      },
      {
        action: 'inflation',
        text: i18n.t('accounts.actions.inflation'),
        icon: 'git-compare',
        iconColor: config.colors.brand
      },
      {
        action: 'federate',
        text: i18n.t('accounts.actions.federate'),
        icon: 'person',
        iconColor: config.colors.brand
      },
      {
        action: 'rename',
        text: i18n.t('accounts.actions.rename'),
        icon: 'swap',
        iconColor: config.colors.brand
      },
      {
        action: 'help',
        text: i18n.t('accounts.actions.wut'),
        icon: 'help',
        iconColor: config.colors.brand
      },
      {
        text: i18n.t('ui.common.close'),
        icon: 'close',
        iconColor: 'red'
      }
    ]
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
    const { i18n } = this.context
    const buttons = this.actionButtons()

    ActionSheet.show({
      title: i18n.t('accounts.actions.title'),
      options: buttons,
      cancelButtonIndex: 5
    }, buttonIndex => this.actionMenuButtonClicked(buttons[buttonIndex]))
  }

  actionMenuButtonClicked({ action }) {
    switch (action) {
      case 'send':
      case 'inflation':
        alert(`You clicked: ${action}`)
      break
      case 'federate': return this.props.navigation.navigate('Federate')
      case 'rename': return this.toggleRenameAccount()
      case 'help': return this.props.navigation.navigate('AccountHelp')
    }
  }

  toggleRenameAccount() {
    this.setState({ showRenameModal: !this.state.showRenameModal })
  }

  toggleQRCode() {
    this.setState({ showQRModal: !this.state.showQRModal })
  }

  refresh() {
    this.setState({ refreshing: true })
  }

  gotoTransaction(hash) {
    this.context.store.dispatch(Actions.Accounts.viewTransaction(hash))
    this.props.navigation.navigate('TransactionView')
  }

  renderRenameModal(oldTitle) {
    return (
      <Modal
        visible={this.state.showRenameModal}
        transparent
        animationType="fade"
        onRequestClose={() => {}}
      >
        <View>
          <H1>Rename Account</H1>
          <Input placeholder={oldTitle} />
        </View>
      </Modal>
    )
  }

  renderQRModal(address) {
    return (
      <Modal
        visible={this.state.showQRModal}
        transparent
        animationType="fade"
        onRequestClose={() => this.toggleQRCode()}
        presentationStyle="overFullScreen"
      >
        <Button
          transparent
          onPress={() => this.toggleQRCode()}
          small
        >
          <Icon
            ios={`ios-close`}
            android={`md-close`}
            style={styles.qrModalCloseBtn}
          />
        </Button>
        <View style={styles.qrModal}>
          <QRCode
            value={address}
            logo={require('../../../android/app/src/main/res/mipmap-mdpi/ic_launcher.png')}
            logoMargin={5}
            size={300}
          />
        </View>
      </Modal>
    )
  }

  renderTransaction(tx) {
    const amount = tx.startingBalance || tx.amount
    const effect = effects[tx.type]
    const { i18n } = this.context
    const i18nVars = {
      ...tx,
      assetAbbreviation: tx.asset === 'native' ? 'XLM' : tx.asset
    }

    if (tx.from) i18nVars.truncFrom = `${tx.from.slice(0, 4)}...${tx.from.slice(-4)}`
    if (tx.to) i18nVars.truncTo = `${tx.to.slice(0, 4)}...${tx.to.slice(-4)}`
    
    return (
      <ListItem
        avatar
        key={`tx-${tx.id}`}
        onPress={() => this.gotoTransaction(tx.hash)}>
        <Left>
          <Icon name={effect.icon} />
        </Left>
        <Body>
          <Text>{i18n.t(`effects.${tx.type}`, i18nVars)}</Text>
          <Text note>
            {distanceInWords(new Date(), tx.createdAt, { addSuffix: 'ago', includeSeconds: true })}
          </Text>
        </Body>
        <Right>
          <Icon name="arrow-forward" />
        </Right>
      </ListItem>
    )
  }

  renderBalance(balances, assets) {
    const { amount } = balances.find(({ asset }) => asset === 'native')
    const { price_USD } = assets.find(({ domain }) => domain === 'native')
    const fiatValue = amount ? amount * price_USD : 0

    return (
      <View style={styles.totalBalanceWriting}>
        <Text
          key="xlm-balance"
          style={[ TableauStyle.inverseText, TableauStyle.subText, TableauStyle.centeredText ]}
        >
          {amount || 0} XLM
        </Text>
        <Text 
          note
          key="fiat-value"
          style={[ TableauStyle.inverseText, TableauStyle.subText, TableauStyle.centeredText ]}
        >
          (${preciseRound(fiatValue)})
        </Text>
      </View>
    )
  }

  render() {
    const account = this.currentAccount()
    const { assets } = this.context.store.getState()
    const { i18n } = this.context
    const txs = account.txs.filter(tx => SHOW_TYPES.indexOf(tx.type) > -1)

    return (
      <Container>
        <HeaderBar
          title={i18n.t('accounts.view_header')}
          leftButton
          leftButtonIcon="arrow-back"
          leftButtonAction={() => this.goBack()}
          rightButton={false} // next version, ran out of time for this!
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
          <Tableau
            buttonIcon="qr-scanner"
            buttonOnPress={() => this.toggleQRCode()}
          >
            <H1
              style={[ TableauStyle.inverseText, TableauStyle.centeredText ]}
            >
              {account.federatedAddress || account.title}
            </H1>
            {this.renderBalance(account.balances, assets.data)}
          </Tableau>
          {account && txs.length > 0 ? (
            <List>
              {txs.map(tx => this.renderTransaction(tx))}
            </List>
          ) : (account.txLoaded ? <Text>{i18n.t('accounts.no_transactions')}</Text> : <Loading />)}
        </Content>
        {this.renderRenameModal(account.title)}
        {this.renderQRModal(account.address)}
      </Container>
    )
  }

  static contextTypes = {
    store: PropTypes.object,
    network: PropTypes.object,
    i18n: PropTypes.object
  }

}
