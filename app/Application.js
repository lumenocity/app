import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/es/integration/react'
import { Root, StyleProvider } from 'native-base'
import PropTypes from 'prop-types'
import SplashScreen from 'react-native-splash-screen'

import getTheme from '../native-base-theme/components'
import { persistor, store } from './state/store'
import Actions from './actions'
import Loading from './components/Loading'
import Navigator from './navigator/index'
import AddAccount from './screens/AddAccount'
import initNetwork from './lib/stellar-network'
import config from './config'
import i18n from '../i18n'

class Application extends Component {
  constructor() {
    super()
    this.network = null
  }

  getChildContext() {
    return { network: this.network, i18n }
  }

  componentWillMount() {
    this.unsubscribe = store.subscribe(() => this.respondToStoreChanges())
  }

  componentDidMount() {
    const state = store.getState()
    SplashScreen.hide()

    if (!this.network) {
      this.initNetwork(state.network.env)
    }
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  onBeforeLift() {
    const state = store.getState()

    store.dispatch(Actions.Session.initSession())
    store.dispatch(Actions.Assets.loadAssetTypes())
    store.dispatch({ type: 'CLEAR_LOADED_INDICATORS' })

    if (!this.network) {
      this.initNetwork(state.network.env)
    }
  }

  respondToStoreChanges() {
    const { network } = store.getState()

    if (this.network) {
      if (this.network.serverURL.toString() !== config.networks[network.env]) {
        this.initNetwork(network.env)
      }
    }

    this.forceUpdate()
  }

  initNetwork(env) {
    if (!env) return
    this.network = initNetwork(config.networks[env], env === 'test')
  }

  noAccountYet() {
    const { accounts, _persist } = store.getState()
    return !_persist ? true : (accounts.data.length === 0 && _persist.rehydrated)
  }

  loadAccount(secret) {
    store.dispatch(Actions.Accounts.load(this.network, { secret }))
  }

  toggleAddDialog() {
    store.dispatch(Actions.Accounts.toggleAdding())
  }

  render() {
    const { accounts } = store.getState()

    return (
      <Provider store={store}>
        <PersistGate
          loading={<Loading />}
          onBeforeLift={() => this.onBeforeLift()}
          persistor={persistor}
        >
          <Root>
            <StyleProvider style={getTheme()}>
              <AddAccount
                showGreeting={this.noAccountYet()}
                isVisible={accounts.adding}
                onAddAccount={key => this.loadAccount(key)}
                canBeClosed={!this.noAccountYet()}
                closeDialog={() => this.toggleAddDialog()}
              />
            </StyleProvider>
            <StyleProvider style={getTheme()}>
              <Navigator />
            </StyleProvider>
          </Root>
        </PersistGate>
      </Provider>
    )
  }
}

Application.childContextTypes = {
  network: PropTypes.object,
  i18n: PropTypes.object
}

export default Application
