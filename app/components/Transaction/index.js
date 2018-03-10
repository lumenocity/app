import React, { Component } from 'react'
import {
  Text,
  List,
  ListItem,
  H2,
  H3,
  Body,
  Icon
} from 'native-base'
import { View, ActivityIndicator } from 'react-native'
import PropTypes from 'prop-types'
import dateFormat from 'date-fns/format'

import effects from '../../../language/effects'
import style from './style'

export default class Transaction extends Component {
  componentWillReceiveProps() {
    this.forceUpdate()
  }

  render() {
    const {
      type,
      status,
      asset,
      to,
      from,
      hash,
      createdAt,
      i18n
    } = this.props
    const effect = effects[type] || effects.fallback
    const i18nVars = {
      ...this.props,
      assetAbbreviation: asset && asset !== 'native' ? asset : 'XLM'
    }

    if (from) i18nVars.truncFrom = `${from.slice(0, 4)}...${from.slice(-4)}`
    if (to) i18nVars.truncTo = `${to.slice(0, 4)}...${to.slice(-4)}`

    return (
      <View>
        <View style={style.header}>
          <View style={style.iconWrapper}>
            <Icon style={style.icon} name={effect.icon} />
          </View>
          <H2 style={style.centerText}>
            {i18n.t(`transaction.effects.${type}`, i18nVars)}
          </H2>
          {status === 'processing' ? (
            <ActivityIndicator />
          ) : (
            <Icon style={style.indicatorIcon} name="checkmark-circle" />
          )}
          <H3 style={style.centerText}>
            {i18n.t(`send.status.${status}`)}
          </H3>
        </View>
        <List>
          <ListItem>
            <Body>
              <Text note>Created:</Text>
              <Text>
                {dateFormat(createdAt, i18n.t('ui.common.date'))}
              </Text>
            </Body>
          </ListItem>
          <ListItem>
            <Body>
              <Text note>Hash (transaction ID):</Text>
              <Text>
                {hash || i18n.t('transaction.no_hash')}
              </Text>
            </Body>
          </ListItem>
          {from ? (
            <ListItem>
              <Body>
                <Text note>From:</Text>
                <Text>
                  {from} {type === 'account_debited' ? '(you)' : null}
                </Text>
              </Body>
            </ListItem>
          ) : null}
          {to ? (
            <ListItem>
              <Body>
                <Text note>To:</Text>
                <Text>
                  {to} {type === 'account_credited' ? '(you)' : null}
                </Text>
              </Body>
            </ListItem>
          ) : null}
        </List>
      </View>
    )
  }
}

Transaction.propTypes = {
  status: PropTypes.string,
  amount: PropTypes.number,
  asset: PropTypes.string,
  to: PropTypes.string,
  from: PropTypes.string,
  hash: PropTypes.string,
  memo: PropTypes.string,
  createdAt: PropTypes.oneOfType([ PropTypes.string, PropTypes.instanceOf(Date) ]),
  i18n: PropTypes.object.isRequired,
  type: PropTypes.string
}
