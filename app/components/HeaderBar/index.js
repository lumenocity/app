import React from 'react'
import { Header, Content, Right, Left, Body, Title } from 'native-base'

export default ({ title }) => (
  <Header>
    <Left>

    </Left>
    <Body>
      <Title>{title || 'Interstellar.cash'}</Title>
    </Body>
    <Right>

    </Right>
  </Header>
)
