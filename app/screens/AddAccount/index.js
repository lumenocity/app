import React, { Component } from 'react'
import { Modal, View } from 'react-native'
import {
  Container,
  Content,
  Text,
  List,
  ListItem,
  Button,
  Icon,
  Body,
  Left
} from 'native-base'
import PropTypes from 'prop-types'
import Accordion from 'react-native-collapsible/Accordion'
import TextInputMask from 'react-native-text-input-mask'
import { Keypair } from 'stellar-sdk'
import ModalDropdown from 'react-native-modal-dropdown'

import style from './style'
import HeaderBar from '../../components/HeaderBar'
import InputAddress from '../../components/InputAddress'
import config from '../../config'
import Actions from '../../actions'

import { WALLET_SECRET } from '../../../fixtures/testnet'

export default class AddAccount extends Component {
  constructor() {
    super()
    this.state = {
      step: 0,
      privateKey: WALLET_SECRET,
      address: null,
      federatedAddress: null,
      inflationAddress: null
    }
  }

  componentWillMount() {
    this.unsubscribe = this.context.store.subscribe(() => this.respondToStoreChanges())
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  respondToStoreChanges() {
    const { accounts } = this.context.store.getState()
    const account = accounts.data.find(({ address }) => address === this.state.address)

    if (this.state.step === 0 && account) {
      this.setState({ step: 1 })
    }

    if (this.state.step === 1 && account && account.federatedAddress) {
      this.setState({ step: 2 })
    }

    if (this.state.step === 2 && account && account.inflation) {
      this.setState({ step: 3 })
    }

    this.forceUpdate()
  }

  addKey(privateKey) {
    this.setState({ privateKey })
  }

  importAccount() {
    const address = Keypair.fromSecret(this.state.privateKey).publicKey()
    this.setState({ address })

    this.context.store.dispatch(Actions.Accounts.load(
      this.context.network,
      { address }
    ))
  }

  federateAccount() {
    this.context.store.dispatch(Actions.Accounts.federate(
      this.state.federatedAddress,
      this.state.address
    ))
  }

  addInflation() {
    this.context.store.dispatch(Actions.Accounts.setInflation(
      this.context.network,
      this.state.address,
      this.state.privateKey,
      this.state.inflationAddress
    ))
  }

  finalise() {
    this.props.closeDialog()
  }

  renderHeader(section, index, isActive) {
    return (
      <View style={style.accordionHeader}>
        <Icon
          style={style.accordionHeaderIcon}
          name={isActive ? 'arrow-down' : 'arrow-forward'}
        />
        <Text style={style.accordionHeaderText}>{section.title}</Text>
        {this.state.step > index ? (
          <Icon
            style={style.accordionHeaderCheckmark}
            name="checkmark-circle"
          />
        ) : null}
      </View>
    )
  }

  renderContent(section) {
    return section.content
  }

  renderImportKey() {
    const { i18n } = this.context

    return (
      <View style={style.accordionBody}>
        <Text>{i18n.t('onboarding.about_import')}</Text>
        <InputAddress
          value={this.state.privateKey}
          onUpdate={key => this.addKey(key)}
        />
        <Button
          block
          onPress={() => this.importAccount()}
        >
          <Text>{i18n.t('onboarding.add_btn')}</Text>
        </Button>
      </View>
    )
  }

  renderFederation() {
    const { i18n } = this.context

    return (
      <View style={style.accordionBody}>
        <Text>{i18n.t('onboarding.about_federation')}</Text>
        <TextInputMask
          style={style.inputField}
          onChangeText={(formatted, extracted) => {
            this.setState({ federatedAddress: extracted.trim().toLowerCase() })
          }}
          mask="[___-----------------------------]{lumenocity}"
        />
        <Button
          onPress={() => this.federateAccount()}
          block
        >
          <Text>{i18n.t('onboarding.federate_btn')}</Text>
        </Button>
      </View>
    )
  }

  renderInflation() {
    const { i18n } = this.context

    return (
      <View style={style.accordionBody}>
        <Text>{i18n.t('onboarding.about_inflation')}</Text>
        <ModalDropdown
          defaultValue={i18n.t('ui.inputs.inflation_pools.placeholder')}
          options={config.inflationPools}
          onSelect={(i, { address }) => this.setState({ inflationAddress: address })}
          renderRow={({ title }) => <Text>{title}</Text>}
          renderButtonText={({ title }) => title}
          style={style.dropdownContainer}
          textStyle={style.dropdownText}
          dropdownStyle={style.dropdownStyle}
        />
        <Button
          onPress={() => this.addInflation()}
          block
        >
          <Text>{i18n.t('onboarding.set_inflation_btn')}</Text>
        </Button>
      </View>
    )
  }

  renderFinal() {
    const { i18n } = this.context

    return (
      <View style={style.accordionBody}>
        <Text>{i18n.t('onboarding.finalise')}</Text>
        <List>
          <ListItem avatar>
            <Left>
              <Icon name="cube" />
            </Left>
            <Body>
              <Text>{i18n.t('ui.common.account_address')}</Text>
              <Text note>
                {this.state.address}
              </Text>
            </Body>
          </ListItem>
          <ListItem avatar>
            <Left>
              <Icon name="at" />
            </Left>
            <Body>
              <Text>{i18n.t('ui.common.federated_address')}</Text>
              <Text note>
                {this.state.federatedAddress ? `${this.state.federatedAddress}*lumenocity.io` : 'none set'}
              </Text>
            </Body>
          </ListItem>
          <ListItem avatar>
            <Left>
              <Icon name="cash" />
            </Left>
            <Body>
              <Text>{i18n.t('ui.common.inflation_address')}</Text>
              <Text note>
                {this.state.inflationAddress || 'none set'}
              </Text>
            </Body>
          </ListItem>
        </List>
        <Button
          onPress={() => this.finalise()}
          block
        >
          <Text>{i18n.t('onboarding.finalise_btn')}</Text>
        </Button>
      </View>
    )
  }

  render() {
    const { i18n } = this.context

    console.log(this.state)

    return (
      <Modal visible={this.props.isVisible} onRequestClose={() => this.props.closeDialog()}>
        <Container>
          <HeaderBar
            title={i18n.t('onboarding.header')}
            rightButton={this.props.canBeClosed}
            rightButtonIcon="close"
            rightButtonAction={() => this.props.closeDialog()}
          />
          <Content>
            <Accordion
              sections={[
                { title: 'Import your account', content: this.renderImportKey() },
                { title: 'Federation', content: this.renderFederation() },
                { title: 'Inflation', content: this.renderInflation() },
                { title: 'Finalise', content: this.renderFinal() }
              ]}
              renderHeader={(...params) => this.renderHeader(...params)}
              renderContent={section => section.content}
              activeSection={this.state.step}
              onChange={step => this.setState({ step })}
              underlayColor="white"
              disabled
            />
          </Content>
        </Container>
      </Modal>
    )
  }
}

AddAccount.contextTypes = {
  i18n: PropTypes.object,
  store: PropTypes.object,
  network: PropTypes.object
}

AddAccount.propTypes = {
  onAddAccount: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired,
  canBeClosed: PropTypes.bool.isRequired,
  closeDialog: PropTypes.func.isRequired
}
