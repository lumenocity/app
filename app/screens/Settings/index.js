import React, { Component } from 'react'
import { Container, Content, Button, Text } from 'native-base'
import PropTypes from 'prop-types'

import Actions from '../../actions'
import styles from './style'
import config from '../../config'
import HeaderBar from '../../components/HeaderBar'

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
    const { i18n } = this.context

    return (
      <Container>
        <HeaderBar title={i18n.t('settings.header')} />
        <Content>
          <Button
            block
            onPress={() => this.resetStore()}
          >
            <Text>{i18n.t('settings.actions.purge')}</Text>
          </Button>
        </Content>
      </Container>
    )
  }

  static contextTypes = {
    store: PropTypes.object,
    i18n: PropTypes.object
  }

  static navigationOptions = {
    title: 'Settings',
  }

}
