import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/es/integration/react'
import { Container, Header, Content, Button, Title, Body } from 'native-base'

import { persistor, store } from './state/store'
import config from './config'
import Actions from './actions'
import Loading from './components/Loading'
import Main from './screens/Main'

const onBeforeLift = () => {
  store.dispatch(Actions.Session.initSession())
  store.dispatch(Actions.Assets.loadAssetTypes())
}

export default () => (
  <Provider store={store}>
    <PersistGate
      loading={<Loading />}
      onBeforeLift={onBeforeLift}
      persistor={persistor}>
      <Container>
        <Header>
          <Body>
            <Title>Interstellar.cash</Title>
          </Body>
        </Header>
        <Content>
          <Main />
        </Content>
      </Container>
    </PersistGate>
  </Provider>
)
