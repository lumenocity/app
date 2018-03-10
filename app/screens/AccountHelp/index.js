import React, { Component } from 'react'
import { Container, Content, Text } from 'native-base'
import { View } from 'react-native'
import PropTypes from 'prop-types'

import style from './style'
import HeaderBar from '../../components/HeaderBar'
import Accordion from '../../components/Accordion'

export default class AccountHelp extends Component {
  goBack() {
    this.props.navigation.goBack()
  }

  helpContent(text) {
    return (
      <View style={style.helpContent}>
        <Text>{text}</Text>
      </View>
    )
  }

  render() {
    const { i18n } = this.context

    return (
      <Container style={style.container}>
        <HeaderBar
          title={i18n.t('account_help.header')}
          leftButton
          leftButtonIcon="arrow-back"
          leftButtonAction={() => this.goBack()}
        />
        <Content>
          <Accordion
            sections={[
              {
                title: i18n.t('account_help.federation_header'),
                content: this.helpContent(i18n.t('account_help.federation_explanation'))
              },
              {
                title: i18n.t('account_help.inflation_header'),
                content: this.helpContent(i18n.t('account_help.inflation_explanation'))
              },
              {
                title: i18n.t('account_help.rename_header'),
                content: this.helpContent(i18n.t('account_help.rename_explanation'))
              }
            ]}
          />
        </Content>
      </Container>
    )
  }
}

AccountHelp.contextTypes = {
  i18n: PropTypes.object.isRequired
}
