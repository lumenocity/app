import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/es/integration/react'
import { Container } from 'native-base'
import PropTypes from 'prop-types'

import { persistor, store } from './state/store'
import Actions from './actions'
import Loading from './components/Loading'
import Navigator from './navigator/index'
import HeaderBar from './components/HeaderBar'
import AddAccount from './components/AddAccount'
import Network from './lib/stellar-network'
import config from './config'

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
    return { network: this.network }
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

  showAddAccountModal() {
    const { accounts, _persist } = store.getState()
    return !_persist ? true : (accounts.data.length === 0 && _persist.rehydrated)
  }

  loadAccount(secret) {
    store.dispatch(Actions.Accounts.load(this.network, { secret }))
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate
          loading={<Loading />}
          onBeforeLift={onBeforeLift}
          persistor={persistor}
        >
          <AddAccount
            isVisible={this.showAddAccountModal()}
            onAddAccount={key => this.loadAccount(key)}
          />
          <Container>
            <HeaderBar />
            <Navigator />
          </Container>
        </PersistGate>
      </Provider>
    )
  }
}

Application.childContextTypes = {
  network: PropTypes.object
}

export default Application
