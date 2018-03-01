import React, { Component } from 'react'
import { View } from 'react-native'
import { Input, Button, Icon } from 'native-base'
import PropTypes from 'prop-types'
import QRCodeScanner from 'react-native-qrcode-scanner'

class InputAddress extends Component {
  constructor() {
    super()
    this.state = { qrCodeScannerOpen: false, value: null }
  }

  componentWillMount() {
    if (this.props.value && this.props.value !== this.state.value) {
      this.setState({ value: this.props.value })
    }
  }

  onUpdateValue(address) {
    this.setState({ qrCodeScannerOpen: false, value: address })
    this.props.onUpdate(address)
  }

  toggleScanner() {
    this.setState({ qrCodeScannerOpen: !this.state.qrCodeScannerOpen })
  }

  renderScanner() {
    return (
      <QRCodeScanner
        onRead={({ data }) => this.onUpdateValue(data)}
      />
    )
  }

  render() {
    return (
      <View>
        {this.state.qrCodeScannerOpen ? this.renderScanner() : null}
        <Input
          value={this.state.value}
          placeholder="Enter address"
          onChangeText={address => this.onUpdateValue(address)}
        />
        <Button
          onPress={() => this.toggleScanner()}
        >
          <Icon
            ios="ios-qr-scanner"
            android="md-qr-scanner"
          />
        </Button>
      </View>
    )
  }
}

InputAddress.propTypes = {
  onUpdate: PropTypes.func.isRequired,
  value: PropTypes.string
}

InputAddress.contextTypes = {
  i18n: PropTypes.object
}

export default InputAddress
