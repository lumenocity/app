import React, { Component } from 'react'
import { Modal } from 'react-native'
import {
  Container,
  Content,
  Text,
  Form,
  Item,
  Button,
  Tab,
  Tabs
} from 'native-base'
import PropTypes from 'prop-types'

import style from './style'
import HeaderBar from '../../components/HeaderBar'
import InputAddress from '../../components/InputAddress'

import { WALLET_SECRET } from '../../../fixtures/testnet'

export default class AddAccount extends Component {
  constructor() {
    super()
    this.state = { privateKey: WALLET_SECRET }
  }

  onRequestClose() {

  }

  addKey(privateKey) {
    this.setState({ privateKey })
  }

  render() {
    return (
      <Modal visible={this.props.isVisible} onRequestClose={() => this.onRequestClose()}>
        <Container>
          <HeaderBar
            title="Add account"
            leftButton={this.props.canBeClosed}
            leftButtonIcon="arrow-back"
            leftButtonAction={() => this.props.closeDialog()}
          />
          <Content>
            <Tabs initialPage={0}>
              <Tab heading="New">
                <Text>
                  An account can be created for you on the Stellar network. It is free, but 
                  a small minimum balance of 5 XLM must be in the account for you to be able 
                  to use it.
                </Text>
              </Tab>
              <Tab heading="Add Via Private Key">
                <Text>
                  An account is similar to a traditional bank's account in that it holds funds 
                  and allows you to send and receive them.
                </Text>
                <Text>
                  If you have an existing private key, you can input it here to load it into Interstellar.
                </Text>
                <Form>
                  <Item>
                    <InputAddress
                      value={this.state.privateKey}
                      onUpdate={key => this.addKey(key)}                    
                    />
                  </Item>
                  <Button
                    block
                    onPress={() => this.props.onAddAccount(this.key)}
                  >
                    <Text>Load Account</Text>
                  </Button>
                </Form>
              </Tab>
            </Tabs>
          </Content>
        </Container>
      </Modal>
    )
  }
}

AddAccount.propTypes = {
  onAddAccount: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired,
  canBeClosed: PropTypes.bool.isRequired,
  closeDialog: PropTypes.func.isRequired
}
