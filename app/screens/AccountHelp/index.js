import React from 'react'
import { Container, Content, Text, H1 } from 'native-base'

import styles from './style'
import HeaderBar from '../../components/HeaderBar'

export default props => (
  <Container>
    <HeaderBar
      title="Help"
      leftButton
      leftButtonIcon="arrow-back"
      leftButtonAction={() => props.navigation.goBack()}
    />
    <Content>
      <H1>Account federation</H1>
      <Text>On the Stellar network, accounts are given a very long and hard to remember identifier. But luckily, there is another way! You can claim a more human readable address that is similar to an email, which works just as well!</Text>
      <Text>Lumenocity offers you the use of our federation server, so you can have an address like me*lumenocity.io!</Text>
      <H1>Inflation</H1>
      <Text>The Stellar network charges a small fee on each transaction. But it does not keep those funds - instead it re-distributes that amount back to its users automatically, and it does so depending on how many XLM you currently hold. The only catch is that other users have to vote for you to get them before you can!</Text>
      <Text>But since it is a difficult task to get thousands of people to willingly vote, several inflation pools have been made by the community. These pools allow you to vote for them to receive the inflation amount, which they then pay back to you to your account.</Text>
      <Text>The terms vary between pools, but for example Lumenaut is a pool that has 0 fees, so it will give you 100% of your entitled inflation amount, provided you configure it to be your inflation vote.</Text>
    </Content>
  </Container>
)
