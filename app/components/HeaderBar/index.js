import React from 'react'
import { Header, Right, Left, Body, Title, Subtitle, Button, Icon } from 'native-base'
import PropTypes from 'prop-types'

import config from '../../config'

const HeaderBar = props => (
  <Header
    backgroundColor={config.colors.brand}
    iosBarStyle="dark-content"
    hasSubtitle={!!props.subtitle}
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
          />
        </Button>
      ) : null}
    </Left>
    <Body>
      <Title style={{ fontFamily: config.fontFamily }}>
        {props.title}
      </Title>
      {props.subtitle ? (
        <Subtitle style={{ fontFamily: config.fontFamily }}>
          {props.subtitle}
        </Subtitle>
      ) : null}
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
          />
        </Button>
      ) : null}
    </Right>
  </Header>
)

HeaderBar.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  rightButton: PropTypes.bool,
  rightButtonIcon: PropTypes.string,
  rightButtonAction: PropTypes.func,
  leftButton: PropTypes.bool,
  leftButtonIcon: PropTypes.string,
  leftButtonAction: PropTypes.func
}

export default HeaderBar
