import React, { Component } from 'react'
import { Switch } from 'react-native'
import { Container, Content, Button, Text, List, ListItem } from 'native-base'
import PropTypes from 'prop-types'

import Actions from '../../actions'
import style from './style'
import config from '../../config'
import HeaderBar from '../../components/HeaderBar'
import { version } from '../../../package.json'

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

  changeNetwork() {
    const { network } = this.context.store.getState()
    this.context.store.dispatch(Actions.Network.set(network.env === 'test' ? 'live' : 'test'))
    this.forceUpdate()
  }

  render() {
    const { i18n } = this.context
    const { network } = this.context.store.getState()

    return (
      <Container>
        <HeaderBar title={i18n.t('settings.header')} />
        <Content style={style.container}>
          <List>
            <ListItem>
              <Text>Lumenocity v{version} (BETA)</Text>
            </ListItem>
            <ListItem>
              <Text>{i18n.t('settings.beta_message')}</Text>
            </ListItem>
            {/* <ListItem>
              <Switch
                onTintColor={config.colors.brand}
                onValueChange={() => this.changeNetwork()}
                value={network.env === 'test'}
              />
              <Text>{i18n.t('ui.common.testnet')}</Text>
            </ListItem> */}
            <ListItem>
              <Text>{i18n.t('settings.purge_warning')}</Text>
            </ListItem>
            <ListItem>
              <Button
                block
                onPress={() => this.resetStore()}
              >
                <Text>{i18n.t('settings.actions.purge')}</Text>
              </Button>
            </ListItem>
          </List>
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
