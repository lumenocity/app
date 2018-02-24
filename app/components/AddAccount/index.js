import React, { Component } from 'react'
import { Modal } from 'react-native'
import { Container, Content, H1, Text, Form, Item, Input, Button } from 'native-base'
import PropTypes from 'prop-types'

import style from './style'

import { WALLET_SECRET } from '../../../fixtures/testnet'

export default class AddAccount extends Component {
  constructor() {
    super()
    this.key = WALLET_SECRET
  }

  appendKey(key) {
    this.key = key
  }

  render() {
    return (
      <Modal visible={this.props.isVisible}>
        <Container style={style.inner}>
          <Content>
            <H1>Looks like you don&apos;t yet have any accounts yet...</H1>
            <Text>
              An account is similar to a traditional bank's account in that it holds funds 
              and allows you to send and receive them.
            </Text>
            <Text>
              If you have an existing private key, you can input it here to load it into Interstellar.
            </Text>
            <Form>
              <Item>
                <Input
                  onChangeText={key => this.appendKey(key)}
                  placeholder="private key"
                  value={this.key}
                />
              </Item>
              <Button
                block
                onPress={() => this.props.onAddAccount(this.key)}
              >
                <Text>Load Account</Text>
              </Button>
            </Form>
          </Content>
        </Container>
      </Modal>
    )
  }
}

AddAccount.propTypes = {
  onAddAccount: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired
}
