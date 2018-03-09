import React, { Component } from 'react'
import { Container, Content } from 'native-base'
import PropTypes from 'prop-types'

import Actions from '../../actions'
import HeaderBar from '../../components/HeaderBar'
import Transaction from '../../components/Transaction'

export default class TransactionView extends Component {

  componentWillMount() {
    this.unsubscribe = this.context.store.subscribe(() => this.respondToStoreChanges())
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  respondToStoreChanges() {
  }

  transaction() {
    const { accounts } = this.context.store.getState()
    const { selected: selectedAccount, selectedTransaction } = accounts
    const affectedAccount = accounts.data.find(({ address }) => selectedAccount === address)

    return affectedAccount.txs.find(({ hash }) => selectedTransaction === hash)
  }

  goBack() {
    this.context.store.dispatch(Actions.Accounts.viewTransaction(null))
    this.props.navigation.goBack()
  }

  render() {
    const { i18n } = this.context
    const transaction = this.transaction()

    return (
      <Container>
        <HeaderBar
          title={i18n.t('transaction.header')}
          leftButton
          leftButtonIcon="arrow-back"
          leftButtonAction={() => this.goBack()}
        />
        <Content>
          <Transaction {...transaction} i18n={i18n} />
        </Content>
      </Container>
    )
  }
}

TransactionView.contextTypes = {
  store: PropTypes.object,
  i18n: PropTypes.object
}
