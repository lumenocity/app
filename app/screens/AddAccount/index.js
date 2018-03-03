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
    const { i18n } = this.context

    return (
      <Modal visible={this.props.isVisible} onRequestClose={() => this.onRequestClose()}>
        <Container>
          <HeaderBar
            title={i18n.t('onboarding.header')}
            leftButton={this.props.canBeClosed}
            leftButtonIcon="arrow-back"
            leftButtonAction={() => this.props.closeDialog()}
          />
          <Content>
            <Tabs initialPage={0}>
              <Tab heading="New">
                <Text>
                  {i18n.t('onboarding.new_caption')}
                </Text>
              </Tab>
              <Tab heading="Add Via Private Key">
                <Text>
                  {i18n.t('onboarding.private_key_caption')}
                </Text>
                <Text>
                  {i18n.t('onboarding.existing_key_message')}
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
                    <Text>{i18n.t('onboarding.add_btn')}</Text>
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

AddAccount.contextTypes = {
  i18n: PropTypes.object
}

AddAccount.propTypes = {
  onAddAccount: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired,
  canBeClosed: PropTypes.bool.isRequired,
  closeDialog: PropTypes.func.isRequired
}
