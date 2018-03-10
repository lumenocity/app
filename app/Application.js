import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/es/integration/react'
import { Root, StyleProvider } from 'native-base'
import PropTypes from 'prop-types'

import getTheme from '../native-base-theme/components'
import { persistor, store } from './state/store'
import Actions from './actions'
import Loading from './components/Loading'
import Navigator from './navigator/index'
import AddAccount from './screens/AddAccount'
import Network from './lib/stellar-network'
import config from './config'
import i18n from '../i18n'
import theme from './theme'

const onBeforeLift = () => {
  store.dispatch(Actions.Session.initSession())
  store.dispatch(Actions.Assets.loadAssetTypes())
  store.dispatch({ type: 'CLEAR_LOADED_INDICATORS' })
}

class Application extends Component {
  constructor() {
    super()
    this.network = Network(config.network, config.testnet)
  }

  getChildContext() {
    return { network: this.network, i18n }
  }

  componentWillMount() {
    this.unsubscribe = store.subscribe(() => this.respondToStoreChanges())
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  respondToStoreChanges() {
    this.forceUpdate()
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
          onBeforeLift={onBeforeLift}
          persistor={persistor}
        >
          <Root>
            <AddAccount
              isVisible={accounts.adding}
              onAddAccount={key => this.loadAccount(key)}
              canBeClosed={!this.noAccountYet()}
              closeDialog={() => this.toggleAddDialog()}
            />
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
