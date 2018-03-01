import React, { Component } from 'react'
import {
  Container,
  Content,
  Text,
  H1,
  Picker,
  Form,
  Item as FormItem,
  Label,
  Input,
  Button
} from 'native-base'
import PropTypes from 'prop-types'

import Actions from '../../actions'
import styles from './style'
import config from '../../config'
import HeaderBar from '../../components/HeaderBar'
import InputAddress from '../../components/InputAddress'

export default class Send extends Component {

  constructor() {
    super()
    this.state = {
      validation: {
        to: null,
        from: null,
        amount: null
      }
    }
  }

  componentWillMount() {
    this.unsubscribe = this.context.store.subscribe(() => this.respondToStoreChanges())
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  respondToStoreChanges() {
    const { transaction, accounts } = this.context.store.getState()

    if (!transaction.from && accounts.selected) {
      return this.updateTxField({ from: accounts.selected })
    }

    if (!transaction.from && !accounts.selected) {
      return this.updateTxField({ from: accounts.data[0].address })
    }

    this.forceUpdate()
  }

  getAccount(address) {
    const { accounts } = this.context.store.getState()
    return accounts.data.find(account => account.address === address)
  }

  updateTxField(prop) {
    console.log('updateTxField()', prop)
    this.context.store.dispatch(Actions.Transaction.set(prop))
  }

  send() {
    const { transaction } = this.context.store.getState()
    const { secret } = this.getAccount(transaction.from)

    this.context.store.dispatch(Actions.Transaction.init())

    this.context.store.dispatch(Actions.Transaction.send(
      this.context.network, secret, transaction
    ))

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
          <Form>
            <FormItem>
              <Picker
                placeholder={i18n.t('ui.inputs.account_picker.placeholder')}
                iosHeader={i18n.t('ui.inputs.account_picker.placeholder')}
                mode="dropdown"
                style={{ width: 100 }}
                selectedValue={transaction.from}
                onValueChange={value => this.updateTxField({ from: value })}
              >
                {accounts.data.map(({ address, title }) => (
                  <Picker.Item key={`acc-${address}`} label={title} value={address} />
                ))}
              </Picker>
            </FormItem>
            <FormItem>
              <InputAddress
                value={transaction.to}
                onUpdate={value => this.updateTxField({ to: value })}
              />
            </FormItem>
            <FormItem>
              <Input
                placeholder={i18n.t('ui.inputs.asset_amount.placeholder')}
                keyboardType="numeric"
                onChangeText={value => this.updateTxField({ amount: value })}
              />
              <Text>XLM</Text>
              {xlmBalance ? (
                <Text>
                  {i18n.t('accounts.current_balance')} {xlmBalance.amount} XLM
                </Text>
              ) : null}
            </FormItem>
          </Form>
          <Button
            onPress={() => this.send()}
          >
            <Text>{i18n.t('send.send_btn')}</Text>
          </Button>
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
