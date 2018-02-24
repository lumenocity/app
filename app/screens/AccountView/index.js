import React, { Component } from 'react'
import { Container, Content, List, ListItem, Left, Body, Right, Icon, Text, H1, H2 } from 'native-base'
import PropTypes from 'prop-types'

import Actions from '../../actions'
import styles from './style'
import config from '../../config'
import HeaderBar from '../../components/HeaderBar'

export default class Accounts extends Component {

  componentWillMount() {
    this.unsubscribe = this.context.store.subscribe(() => this.respondToStoreChanges())
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  respondToStoreChanges() {
  }

  addAccount() {
    this.context.store.dispatch(Actions.Accounts.toggleAdding())
  }

  renameAccount() {

  }

  goBack() {
    this.context.store.dispatch(Actions.Accounts.select(null))
    this.props.navigation.goBack()
  }

  currentAccount() {
    const { accounts } = this.context.store.getState()
    return accounts.data.find(account => account.address === accounts.selected)
  }

  render() {
    const account = this.currentAccount()

    return (
      <Container>
        <HeaderBar
          title="Viewing Account"
          leftButton
          leftButtonIcon="arrow-back"
          leftButtonAction={() => this.goBack()}
        />
        <Content>
          <H2>{account.title}</H2>
        </Content>
      </Container>
    )
  }

  static contextTypes = {
    store: PropTypes.object
  }

}
