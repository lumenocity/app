import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { Button, Icon } from 'native-base'
import PropTypes from 'prop-types'

import styles from './style'
import config from '../../config'

export const styling = {
  centeredText: styles.centeredText,
  inverseText: styles.inverseText,
  bigText: styles.bigText,
  subText: styles.subText
}

const Tableau = ({ children, buttonIcon, buttonOnPress }) => (
  <LinearGradient
    colors={[ config.colors.brand, config.colors.accent ]}
    start={{ x: 0.0, y: 0.25 }}
    end={{ x: 0.5, y: 1.0 }}
    style={styles.container}
  >
    {buttonIcon && buttonOnPress ? (
      <Button
        style={styles.button}
        transparent
        onPress={() => buttonOnPress()}
        small
      >
        <Icon
          ios={`ios-${buttonIcon}`}
          android={`md-${buttonIcon}`}
          style={styles.buttonIcon}
        />
      </Button>
     ) : null}
    {children}
  </LinearGradient>
)

Tableau.propTypes = {
  children: PropTypes.any,
  buttonIcon: PropTypes.string,
  buttonOnPress: PropTypes.func
}

export default Tableau
