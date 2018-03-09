import React, { Component } from 'react'
import {
  Container,
  Content,
  Text,
  H1,
  Button
} from 'native-base'
import PropTypes from 'prop-types'

import Actions from '../../actions'
import styles from './style'
import HeaderBar from '../../components/HeaderBar'
import Transaction from '../../components/Transaction'

export default class SendResult extends Component {

  constructor() {
    super()
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

  viewTransaction() {
    alert('this goes to the transaction in a browser')
  }

  newTransaction() {
    this.context.store.dispatch(Actions.Transaction.clear())
    this.props.navigation.goBack()
  }

  render() {
    const { transaction } = this.context.store.getState()
    const { i18n } = this.context

    return (
      <Container>
        <HeaderBar
          title={i18n.t('send.status_header')}
          leftButton={transaction.status === 'completed'}
          leftButtonIcon="arrow-back"
          leftButtonAction={() => this.newTransaction()}
        />
        <Content>
          <Transaction {...transaction} i18n={i18n} />
        </Content>
      </Container>
    )
  }

  static contextTypes = {
    store: PropTypes.object,
    network: PropTypes.object,
    i18n: PropTypes.object
  }

}
