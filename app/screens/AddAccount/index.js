import React, { Component } from 'react'
import { Modal, View, ActivityIndicator, TextInput } from 'react-native'
import {
  Container,
  Content,
  Text,
  List,
  ListItem,
  Button,
  Icon,
  Body,
  Left,
  H1
} from 'native-base'
import PropTypes from 'prop-types'
import { Keypair } from 'stellar-sdk'

import style from './style'
import HeaderBar from '../../components/HeaderBar'
import InputAddress from '../../components/InputAddress'
import config from '../../config'
import Actions from '../../actions'
import Accordion from '../../components/Accordion'
import Dropdown from '../../components/Dropdown'

export default class AddAccount extends Component {
  constructor() {
    super()
    this.state = {
      step: 0,
      skipped: [],
      showGreeting: false,

      privateKey: null,
      address: null,
      importing: false,

      federatedAddress: null,
      federating: false,

      inflationAddress: null,
      inflating: false
    }
  }

  componentWillMount() {
    this.unsubscribe = this.context.store.subscribe(() => this.respondToStoreChanges())
    if (this.props.showGreeting) this.setState({ showGreeting: true })
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  respondToStoreChanges() {
    const { accounts } = this.context.store.getState()
    const account = accounts.data.find(({ address }) => address === this.state.address)

    if (this.state.importing && account) {
      this.setState({ step: this.state.step + 1, importing: false })
    }

    if (this.state.federating && account.federatedAddress) {
      this.setState({ step: this.state.step + 1, federating: false })
    }

    if (this.state.inflating && account.inflation) {
      this.setState({ step: this.state.step + 1, inflating: false })
    }

    this.forceUpdate()
  }

  addKey(privateKey) {
    this.setState({ privateKey })
  }

  importAccount() {
    const address = Keypair.fromSecret(this.state.privateKey).publicKey()
    this.setState({ address, importing: true })

    this.context.store.dispatch(Actions.Accounts.load(
      this.context.network,
      { address, secret: this.state.privateKey }
    ))
  }

  federateAccount() {
    this.setState({ federating: true })
    this.context.store.dispatch(Actions.Accounts.federate(
      this.state.federatedAddress,
      this.state.address
    ))
  }

  addInflation() {
    this.setState({ inflating: true })
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

  skip() {
    const step = this.state.step + 1
    const skipped = this.state.skipped.concat([ this.state.step ])

    this.setState({ skipped, step })
  }

  renderGreeting() {
    const { i18n } = this.context

    return (
      <View style={style.accordionBody}>
        <H1>{i18n.t('onboarding.greeting_title')}</H1>
        <Text>{i18n.t('onboarding.greeting_body')}</Text>

        <Button
          onPress={() => this.setState({ step: this.state.step + 1 })}
          block
        >
          <Text>
            {i18n.t('onboarding.greeting_begin_btn')}
          </Text>
        </Button>
      </View>
    )
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
          onPress={() => this.importAccount()}
          block
          disabled={this.state.importing}
        >
          {this.state.importing ? (
            <ActivityIndicator style={style.loadingBtn} size="small" color="white" />
          ) : (
            <Text>
              {i18n.t('onboarding.add_btn')}
            </Text>
          )}
        </Button>
      </View>
    )
  }

  renderFederation() {
    const { i18n } = this.context

    return (
      <View style={style.accordionBody}>
        <Text>{i18n.t('onboarding.about_federation')}</Text>
        <TextInput
          style={style.inputField}
          placeholder="you*lumenocity.io"
          onChangeText={(text) => {
            this.setState({ federatedAddress: text.trim().toLowerCase() })
          }}
        />
        <View style={style.buttonHolder}>
          {this.state.federating ? <View /> : (
            <Button
              onPress={() => this.skip()}
              bordered
              style={style.skipBtn}
            >
              <Text>{i18n.t('onboarding.skip_btn')}</Text>
            </Button>
          )}
          <Button
            onPress={() => this.federateAccount()}
            block
            style={style.goBtn}
            disabled={this.state.federating}
          >
            {this.state.federating ? (
              <ActivityIndicator style={style.loadingBtn} size="small" color="white" />
            ) : (
              <Text>
                {i18n.t('onboarding.federate_btn')}
              </Text>
            )}
          </Button>
        </View>
      </View>
    )
  }

  renderInflation() {
    const { i18n } = this.context

    return (
      <View style={style.accordionBody}>
        <Text>{i18n.t('onboarding.about_inflation')}</Text>
        <Dropdown
          defaultValue={i18n.t('ui.inputs.inflation_pools.placeholder')}
          options={config.inflationPools}
          onSelect={({ address }) => this.setState({ inflationAddress: address })}
          renderRow={({ title }) => <Text>{title}</Text>}
          renderButtonText={({ title }) => title}
        />
        <View style={style.buttonHolder}>
          {this.state.inflating ? <View /> : (
            <Button
              onPress={() => this.skip()}
              bordered
              style={style.skipBtn}
            >
              <Text>{i18n.t('onboarding.skip_btn')}</Text>
            </Button>
          )}
          <Button
            onPress={() => this.addInflation()}
            block
            style={style.goBtn}
            disabled={this.state.inflating}
          >
            {this.state.inflating ? (
              <ActivityIndicator style={style.loadingBtn} size="small" color="white" />
            ) : (
              <Text>
                {i18n.t('onboarding.set_inflation_btn')}
              </Text>
            )}
          </Button>
        </View>
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

  renderRightIcon(index) {
    if (this.state.step <= index) return null
    const isSkipped = this.state.skipped.indexOf(index) > -1

    return (
      <Icon
        style={isSkipped ? style.accordionHeaderSkipped : style.accordionHeaderCheckmark}
        name={isSkipped ? 'alert' : 'checkmark-circle'}
      />
    )
  }

  render() {
    const { i18n } = this.context
    const sections = [
      { title: 'Import your account', content: this.renderImportKey() },
      { title: 'Federation', content: this.renderFederation() },
      { title: 'Inflation', content: this.renderInflation() },
      { title: 'Finalise', content: this.renderFinal() }
    ]

    if (this.state.showGreeting) {
      sections.unshift({
        title: 'Welcome to Lumenocity',
        content: this.renderGreeting()
      })
    }

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
              activeSection={this.state.step}
              sections={sections}
              onChange={step => this.setState({ step })}
              rightIcon={step => this.renderRightIcon(step)}
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
  isVisible: PropTypes.bool.isRequired,
  canBeClosed: PropTypes.bool.isRequired,
  closeDialog: PropTypes.func.isRequired,
  showGreeting: PropTypes.bool.isRequired
}
