import React, { Component } from 'react'
import { Container, Content, Text, H1, Button } from 'native-base'
import PropTypes from 'prop-types'

import HeaderBar from '../../components/HeaderBar'
import Federate from '../../components/Federate'

export default class AccountFederate extends Component {
  constructor() {
    super()
    this.state = { username: null }
  }

  onSubmit() {
    this.cn
  }

  onUpdate(username) {
    this.setState({ username })
  }

  render() {
    return (
      <Container>
        <HeaderBar
          title="Federate"
          leftButton
          leftButtonIcon="arrow-back"
          leftButtonAction={() => this.props.navigation.goBack()}
        />
        <Content>
          <H1>Federate Address</H1>
          <Federate onUpdate={username => this.onUpdate(username)} />
          <Button
            onPress={() => this.onSubmit()}
          >
            <Text>Federate</Text>
          </Button>
        </Content>
      </Container>
    )
  }
}

AccountFederate.contextTypes = {
  store: PropTypes.object
}