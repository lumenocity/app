import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/es/integration/react'

import { persistor, store } from './state/store'
import config from './config'
import Actions from './actions'
import Loading from './components/Loading'
import Main from './screens/Main'

const onBeforeLift = () => {
  store.dispatch(Actions.Session.initSession())
}

export default () => (
  <Provider store={store}>
    <PersistGate
      loading={<Loading />}
      onBeforeLift={onBeforeLift}
      persistor={persistor}>
      <Main />
    </PersistGate>
  </Provider>
)
