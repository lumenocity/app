import React from 'react'
import { View, Text, ActivityIndicator, Image } from 'react-native'

import styles from './style'
import config from '../../config'

export default ({ assets }) => (
  <View style={styles.container}>
    {assets.map(asset => {
      return <Text key={asset.id}>{asset.code} ({asset.domain})</Text>
    })}
  </View>
)
