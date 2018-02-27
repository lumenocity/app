import React, { Component } from 'react'
import { Container, Content, Text, H1, Picker, Form, Item as FormItem, Label, Input } from 'native-base'
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
      to: null,
      amount: null,
      from: null,
      asset: null,
      memo: null
    }
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

  currentAccount() {
    const { accounts } = this.context.store.getState()
    return accounts.data.find(account => account.address === accounts.selected)
  }

  changeSelectedAccount(newAccount) {
    this.setState({ from: newAccount })
  }

  updateToAddress(newAddress) {
    this.setState({ to: newAddress })
  }

  render() {
    const { accounts } = this.context.store.getState()

    return (
      <Container>
        <HeaderBar title="Send Funds" />
        <Content>
          <H1>Send Funds</H1>
          <Form>
            <FormItem>
              <Picker
                placeholder="Select an account"
                iosHeader="Select an account"
                mode="dropdown"
                selectedValue={this.state.from}
                onValueChange={selected => this.changeSelectedAccount(selected)}
              >
                {accounts.data.map(({ address, title }) => (
                  <Picker.Item key={`acc-${address}`} label={title} value={address} />
                ))}
              </Picker>
            </FormItem>
            <FormItem>
              <InputAddress
                value={this.state.to}
                onUpdate={toAddress => this.updateToAddress(toAddress)}
              />
            </FormItem>
          </Form>
        </Content>
      </Container>
    )
  }

  static contextTypes = {
    store: PropTypes.object,
    network: PropTypes.object
  }

  static navigationOptions = {
    title: 'Send',
  }

}
