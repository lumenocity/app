import React from 'react'
import { Header, Right, Left, Body, Title, Button, Icon } from 'native-base'
import PropTypes from 'prop-types'
import { Platform } from 'react-native'

import config from '../../config'

const buttonStyle = Platform.OS === 'android' ? { color: 'white' } : {}

const HeaderBar = props => (
  <Header
    backgroundColor={config.colors.brand}
    iosBarStyle="dark-content"
    androidStatusBarColor={config.colors.brand}
  >
    <Left>
      {props.leftButton ? (
        <Button
          transparent
          dark
          onPress={() => props.leftButtonAction()}
        >
          <Icon
            ios={`ios-${props.leftButtonIcon}`}
            android={`md-${props.leftButtonIcon}`}
            style={buttonStyle}
          />
        </Button>
      ) : null}
    </Left>
    <Body>
      <Title>
        {props.title || 'Interstellar.cash'}
      </Title>
    </Body>
    <Right>
      {props.rightButton ? (
        <Button
          transparent
          dark
          onPress={() => props.rightButtonAction()}
        >
          <Icon
            ios={`ios-${props.rightButtonIcon}`}
            android={`md-${props.rightButtonIcon}`}
            style={buttonStyle}
          />
        </Button>
      ) : null}
    </Right>
  </Header>
)

HeaderBar.propTypes = {
  title: PropTypes.string.isRequired,
  rightButton: PropTypes.bool,
  rightButtonIcon: PropTypes.string,
  rightButtonAction: PropTypes.func,
  leftButton: PropTypes.bool,
  leftButtonIcon: PropTypes.string,
  leftButtonAction: PropTypes.func
}

export default HeaderBar
