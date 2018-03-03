import React, { Component } from 'react'
import { Container, Content, List, ListItem, Left, Body, Right, Icon, Text, H1, H2 } from 'native-base'
import PropTypes from 'prop-types'

import Actions from '../../actions'
import styles from './style'
import config from '../../config'
import HeaderBar from '../../components/HeaderBar'
import Tableau from '../../components/Tableau'

export default class Accounts extends Component {

  componentWillMount() {
    this.unsubscribe = this.context.store.subscribe(() => this.respondToStoreChanges())
    this.respondToStoreChanges()
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  respondToStoreChanges() {
    this.forceUpdate()
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

  gotoAccount(account) {
    this.context.store.dispatch(Actions.Accounts.select(account))
    this.props.navigation.navigate('AccountView')
  }

  renderAccount(account) {
    const { amount } = account.balances.find(balance => balance.asset === 'native')
    const { i18n } = this.context

    return (
      <ListItem
        key={`account-${account.address}`}
        onPress={() => this.gotoAccount(account.address)}
      >
        <Body>
          <Text>{account.title} ({account.address.slice(0, 5)}...{account.address.slice(-5)})</Text>
          <Text note>{i18n.t('accounts.current_balance')} {amount || 0} XLM</Text>
        </Body>
        <Right>
          <Icon name="arrow-forward" />
        </Right>
      </ListItem>
    )
  }

  render() {
    const { accounts } = this.context.store.getState()
    const { i18n } = this.context

    return (
      <Container>
        <HeaderBar
          title={i18n.t('accounts.list_header')}
          rightButton
          rightButtonIcon="add"
          rightButtonAction={() => this.addAccount()}
        />
        <Content>
          <Tableau>
            <H2 style={[ styles.inverseText, styles.centeredText ]}>
              {i18n.t('accounts.total_balance')}
            </H2>
            <H1>{this.totalBalance('native')} XLM</H1>
          </Tableau>
          {accounts && accounts.data.length > 0 ? (
            <List>
              {accounts.data.map(account => this.renderAccount(account))}
            </List>
          ) : (
            <Text>{i18n.t('accounts.no_accounts')}</Text>
          )}
        </Content>
      </Container>
    )
  }

  static contextTypes = {
    store: PropTypes.object,
    i18n: PropTypes.object
  }

  static navigationOptions = {
    title: 'Accounts'
  }

}
