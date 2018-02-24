import React, { Component } from 'react'
import { Container, Content, Text } from 'native-base'
import PropTypes from 'prop-types'

import Actions from '../../actions'
import styles from './style'
import config from '../../config'
import HeaderBar from '../../components/HeaderBar'

export default class Send extends Component {

  componentWillMount() {
    this.unsubscribe = this.context.store.subscribe(this.respondToStoreChanges)
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  respondToStoreChanges() {
  }

  render() {
    return (
      <Container>
        <HeaderBar title="Send Funds" />
        <Content>
          <Text>Send</Text>
        </Content>
      </Container>
    )
  }

  static contextTypes = {
    store: PropTypes.object
  }

  static navigationOptions = {
    title: 'Send',
  }

}
