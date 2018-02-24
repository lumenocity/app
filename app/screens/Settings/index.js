import React, { Component } from 'react'
import { Content, Button, Text } from 'native-base'
import PropTypes from 'prop-types'

import Actions from '../../actions'
import styles from './style'
import config from '../../config'

export default class Settings extends Component {

  componentWillMount() {
    this.unsubscribe = this.context.store.subscribe(this.respondToStoreChanges)
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  respondToStoreChanges() {
  }

  resetStore() {
    this.context.store.dispatch({ type: 'PURGE_EVERYTHING' })
  }

  render() {
    return (
      <Content>
        <Button
          block
          onPress={() => this.resetStore()}
        >
          <Text>Purge all store data</Text>
        </Button>
      </Content>
    )
  }

  static contextTypes = {
    store: PropTypes.object
  }

  static navigationOptions = {
    title: 'Settings',
  }

}
