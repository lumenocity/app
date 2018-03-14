/* eslint react/prefer-stateless-function: "off" */

import React, { Component } from 'react'
import { View } from 'react-native'
import { Text, Icon } from 'native-base'
import ModalDropdown from 'react-native-modal-dropdown'
import PropTypes from 'prop-types'

import style from './style'

export default class Dropdown extends Component {
  constructor() {
    super()
    this.state = { displayText: null }
  }

  onSelect(option, value) {
    this.props.onSelect(value)

    this.setState({
      displayText: this.props.renderButtonText(value)
    })
  }

  render() {
    const passDownProps = {
      ...this.props,
      onSelect: (...params) => this.onSelect(...params),
      ref: this.props._ref
    }

    return (
      <ModalDropdown
        {...passDownProps}
        textStyle={style.dropdownText}
      >
        <View style={style.dropdownContainer}>
          <Text style={style.dropdownButtonText}>
            {this.state.displayText || this.props.defaultValue}
          </Text>
          <View style={style.dropdownButtonIconContainer}>
            <Icon style={style.dropdownButtonIcon} name="arrow-down" />
          </View>
        </View>
      </ModalDropdown>
    )
  }
}

Dropdown.propTypes = {
  defaultValue: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  renderButtonText: PropTypes.func.isRequired,
  _ref: PropTypes.func
}
