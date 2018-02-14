import React from 'react'
import { View, Text, ActivityIndicator, Image } from 'react-native'

import styles from './style'
import config from '../../config'

export default () => (
  <View style={styles.container}>
    <ActivityIndicator
      style={styles.spinny}
      animating
      size="large"
      color={config.colors.primary}
    />
  </View>
)
