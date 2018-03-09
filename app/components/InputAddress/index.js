import React, { Component } from 'react'
import { View } from 'react-native'
import { Input, Button, Icon } from 'native-base'
import PropTypes from 'prop-types'
import QRCodeScanner from 'react-native-qrcode-scanner'

import style from './style'

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
        showMarker
      />
    )
  }

  render() {
    const { i18n } = this.context

    return (
      <View style={style.container}>
        {this.state.qrCodeScannerOpen ? this.renderScanner() : null}
        <View style={style.textBox}>
          <Input
            value={this.state.value}
            placeholder={i18n.t('ui.inputs.stellar_address.placeholder')}
            onChangeText={address => this.onUpdateValue(address)}
          />
        </View>
        <View style={style.qrButton}>
          <Button
            onPress={() => this.toggleScanner()}
          >
            <Icon
              ios="ios-qr-scanner"
              android="md-qr-scanner"
            />
          </Button>
        </View>
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
