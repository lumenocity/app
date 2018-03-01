import React, { Component } from 'react'
import { View } from 'react-native'
import { Input, Text } from 'native-base'
import PropTypes from 'prop-types'

import config from '../../config'

export default class FederateInput extends Component {
  constructor() {
    super()
    this.state = { value: null }
    this.regex = /^a-zA-Z\d/ // alpha-numeric chars only
  }

  onChangeText(value) {
    if (!this.validate(value)) return

    this.setState({ value })
    this.props.onUpdate(value)
  }

  validate(value = '') {
    return !this.regex.test(value)
  }

  render() {
    return (
      <View>
        <Text>The username must be alpha-numeric (a-z, 0-9) and contain no spaces.</Text>
        <Input
          placeholder="Enter a username"
          onChangeText={text => this.onChangeText(text)}
          value={this.state.value}
        />
        <Text>{this.state.value}*{config.federationDomain}</Text>
      </View>
    )
  }
}

FederateInput.propTypes = {
  onUpdate: PropTypes.func.isRequired
}