import React, { Component } from 'react'
import { Icon } from 'native-base'
import { View, Text } from 'react-native'
import PropTypes from 'prop-types'
import CollapsibleAccordion from 'react-native-collapsible/Accordion'

import style from './style'
import config from '../../config'

export default class Accordion extends Component {
  constructor() {
    super()
    this.state = { open: 0 }
  }

  onChange(open) {
    this.setState({ open })
    if (this.props.onChange) this.props.onChange(open)
  }

  renderHeader(section, index, isActive) {
    return (
      <View style={style.accordionHeader}>
        <Icon
          style={style.accordionHeaderIcon}
          name={isActive ? 'arrow-down' : 'arrow-forward'}
        />
        <Text style={style.accordionHeaderText}>{section.title}</Text>
        {this.props.rightIcon ? this.props.rightIcon(index) : null}
      </View>
    )
  }

  renderContent({ content }) {
    return <View style={style.accordionBody}>{content}</View>
  }

  render() {
    const active = this.props.activeSection ? this.props.activeSection : this.state.open

    return (
      <CollapsibleAccordion
        sections={this.props.sections}
        renderHeader={(...params) => this.renderHeader(...params)}
        renderContent={(...params) => this.renderContent(...params)}
        activeSection={active}
        onChange={open => this.onChange(open)}
        underlayColor={config.colors.subtle}
        disabled={this.props.disabled}
      />
    )
  }
}

Accordion.propTypes = {
  sections: PropTypes.array,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  activeSection: PropTypes.number,
  rightIcon: PropTypes.func
}

Accordion.defaultProps = {
  disabled: false,
  sections: []
}
