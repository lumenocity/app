import React from 'react'
import { View, ActivityIndicator } from 'react-native'

import styles from './style'
import config from '../../config'

export default () => (
  <View style={styles.container}>
    <ActivityIndicator
      style={styles.spinner}
      color={config.colors.brand}
      size="large"
    />
  </View>
)
