import React, { Component } from 'react'
import { View, Modal } from 'react-native'
import { Input, Button, Icon } from 'native-base'
import PropTypes from 'prop-types'
import QRCodeScanner from 'react-native-qrcode-scanner'

import HeaderBar from '../HeaderBar'
import style from './style'
import { qrParse } from '../../lib/qr'

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

  onScan(raw) {
    const key = qrParse(raw)

    if (!key) return

    this.setState({ qrCodeScannerOpen: false, value: key })
    this.props.onUpdate(key)
  }

  onType(value) {
    this.setState({ value })
    this.props.onUpdate(value)
  }

  toggleScanner() {
    this.setState({ qrCodeScannerOpen: !this.state.qrCodeScannerOpen })
  }

  renderScanner() {
    const { i18n } = this.context

    return (
      <Modal
        visible={this.state.qrCodeScannerOpen}
        animationType="fade"
        onRequestClose={() => {}}
      >
        <HeaderBar
          title={i18n.t('ui.common.scan_qr_code')}
          rightButton
          rightButtonIcon="close"
          rightButtonAction={() => this.toggleScanner()}
        />
        <QRCodeScanner
          onRead={({ data }) => this.onScan(data)}
          showMarker
        />
      </Modal>
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
            onChangeText={address => this.onType(address)}
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
