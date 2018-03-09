import React, { Component } from 'react'
import {
  Container,
  Content,
  Text,
  Input,
  Button,
  Item
} from 'native-base'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import ModalDropdown from '../../../../react-native-modal-dropdown'

import Actions from '../../actions'
import style from './style'
import HeaderBar from '../../components/HeaderBar'
import InputAddress from '../../components/InputAddress'

import { TEST_PEER } from '../../../fixtures/testnet'

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

  getAccount(address) {
    const { accounts } = this.context.store.getState()
    return accounts.data.find(account => account.address === address)
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
        <Content>
          <View style={style.fieldFolder}>
            <ModalDropdown
              ref={self => { this.accountPicker = self }}
              defaultValue={i18n.t('ui.inputs.account_picker.placeholder')}
              options={accounts.data}
              onSelect={({ address }) => this.updateTxField({ from: address })}
              renderRow={({ title }) => <Text>{title}</Text>}
              renderButtonText={({ title }) => title}
              style={style.dropdownContainer}
              textStyle={style.dropdownText}
              dropdownStyle={style.dropdownStyle}
            />
            <View style={style.fieldFolder}>
              <InputAddress
                value={transaction.to || TEST_PEER}
                onUpdate={value => this.updateTxField({ to: value })}
              />
            </View>
            <View style={style.amountContainer}>
              <View style={style.amountEntryContainer}>
                <Item regular style={style.amountEntry}>
                  <Input
                    placeholder={i18n.t('ui.inputs.asset_amount.placeholder')}
                    keyboardType="numeric"
                    onChangeText={value => this.updateTxField({ amount: value })}
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
          <Button onPress={() => this.send()} block>
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
