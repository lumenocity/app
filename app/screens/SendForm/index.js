import React, { Component } from 'react'
import {
  Container,
  Content,
  Text,
  Input,
  Button,
  Item
} from 'native-base'
import { View, Alert } from 'react-native'
import PropTypes from 'prop-types'

import Actions from '../../actions'
import style from './style'
import HeaderBar from '../../components/HeaderBar'
import InputAddress from '../../components/InputAddress'
import Dropdown from '../../components/Dropdown'

export default class SendForm extends Component {
  constructor() {
    super()
    this.accountPicker = null
  }

  componentWillMount() {
    this.unsubscribe = this.context.store.subscribe(() => this.respondToStoreChanges())
    this.respondToStoreChanges()
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  getAccount(from) {
    const { accounts } = this.context.store.getState()
    return accounts.data.find(({ address }) => {
      return address === from
    })
  }

  respondToStoreChanges() {
    const { transaction, accounts } = this.context.store.getState()
    const currentAccountIndex = accounts.data.findIndex(account => (
      account.address === transaction.from
    ))

    if (this.accountPicker && currentAccountIndex !== this.accountPicker.state.selectedIndex) {
      this.accountPicker.select(currentAccountIndex)
    }

    if (!transaction.from && accounts.selected) {
      return this.updateTxField({ from: accounts.selected })
    }

    if (!transaction.from && !accounts.selected && accounts.data.length > 0) {
      return this.updateTxField({ from: accounts.data[0].address })
    }

    return this.forceUpdate()
  }

  updateTxField(prop) {
    this.context.store.dispatch(Actions.Transaction.set(prop))
  }

  readyToSend() {
    const { transaction } = this.context.store.getState()
    return !!transaction.amount && !!transaction.from && !!transaction.to
  }

  confirmSend() {
    const { i18n, store } = this.context
    const { transaction } = store.getState()

    Alert.alert(
      i18n.t('send.confirm_alert_title'),
      i18n.t('send.confirm_alert_text', transaction),
      [
        {
          text: i18n.t('send.confirm_sending_btn'),
          onPress: () => this.send()
        },
        {
          text: i18n.t('send.cancel_sending_btn'),
          style: 'cancel'
        }
      ],
      { cancelable: true }
    )
  }

  send() {
    const { store } = this.context
    const { transaction } = store.getState()
    const { secret } = this.getAccount(transaction.from)

    store.dispatch(Actions.Transaction.init())

    store
      .dispatch(Actions.Transaction.send(this.context.network, secret, transaction))

    this.props.navigation.navigate('SendResult')
  }

  render() {
    const { accounts, transaction } = this.context.store.getState()
    const account = this.getAccount(transaction.from)
    const xlmBalance = account && account.balances.find(({ asset }) => (asset === 'native'))
    const { i18n } = this.context

    return (
      <Container>
        <HeaderBar title={i18n.t('send.form_header')} />
        <Content style={style.container}>
          <View style={style.fieldFolder}>
            <Text style={style.label}>
              {i18n.t('send.from_address_label')}
            </Text>
            <Dropdown
              _ref={self => { this.accountPicker = self }}
              defaultValue={i18n.t('ui.inputs.account_picker.placeholder')}
              options={accounts.data}
              onSelect={({ address }) => this.updateTxField({ from: address })}
              renderRow={({ title, federatedAddress }) => <Text>{federatedAddress || title}</Text>}
              renderButtonText={({ title, federatedAddress }) => federatedAddress || title}
            />
            <View style={style.fieldFolder}>
              <Text style={style.label}>
                {i18n.t('send.to_address_label')}
              </Text>
              <InputAddress
                value={transaction.to}
                onUpdate={value => this.updateTxField({ to: value })}
              />
            </View>
            <View style={style.amountContainer}>
              <Text style={style.label}>
                {i18n.t('send.amount_label')}
              </Text>
              <View style={style.amountEntryContainer}>
                <Item style={style.amountEntry}>
                  <Input
                    placeholder={i18n.t('ui.inputs.asset_amount.placeholder')}
                    keyboardType="numeric"
                    onChangeText={value => this.updateTxField({ amount: Number(value) })}
                  />
                </Item>
                <View style={style.amountAssetName}>
                  <Text>XLM</Text>
                </View>
              </View>
              <View style={style.amountInAccount}>
                {xlmBalance ? (
                  <Text note>
                    {i18n.t('accounts.current_balance')} {xlmBalance.amount} XLM
                  </Text>
                ) : null}
              </View>
            </View>
          </View>
          <Button
            onPress={() => this.confirmSend()}
            block
            disabled={!this.readyToSend()}
          >
            <Text>{i18n.t('send.send_btn')}</Text>
          </Button>
        </Content>
      </Container>
    )
  }
}

SendForm.contextTypes = {
  store: PropTypes.object,
  network: PropTypes.object,
  i18n: PropTypes.object
}
