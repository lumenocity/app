import { createAction } from 'redux-actions'
import { Operation, Keypair } from 'stellar-sdk'
import randomName from 'project-name-generator'

import config from '../config'

export default {

  generateKeys: createAction('GENERATE_KEYS', () => Keypair.random),
  toggleAdding: createAction('TOGGLE_ADDING_MODE'),
  select: createAction('SELECT_ACCOUNT'),

  create: createAction('CREATE_ACCOUNT', async (server, keys) => {
    try {
      const op = Operation.createAccount({
        destination: keys.publicKey(),
        startingBalance: '10'
      })

      return await server.operations().operation(op)
    } catch (error) {
      error.action = 'CREATE_ACCOUNT'
      return error
    }
  }),

  load: createAction('GRAB_ACCOUNT', async (server, { address, secret }) => {
    try {
      const accountAddress = (secret) ? Keypair.fromSecret(secret).publicKey() : address
      const account = await server.loadAccount(accountAddress)
      const title = randomName().raw.map(word => `${word[0].toUpperCase()}${word.slice(1)}`).join(' ')

      return {
        title,
        address: account.account_id,
        balances: account.balances.map(({ asset_type, balance }) => (
          { asset: asset_type, amount: Number(balance) }
        )),
        secret,
        txs: [],
        txLoaded: false
      }
    } catch (error) {
      error.action = 'GRAB_ACCOUNT'
      return error
    }
  }),

  rename: createAction('RENAME_ACCOUNT'),

  testnetFund: createAction('TESTNET_FUND', async (server, address) => {
    try {
      await server.friendbot(address).call()
      return await server.loadAccount(address)
    } catch (error) {
      error.action = 'TESTNET_FUND'
      return error
    }
  }),

  getTransactions: createAction('GET_TRANSACTIONS', async (server, address) => {
    try {
      const { records } = await server
        .operations()
        .forAccount(address)
        .limit(100)
        .order('desc')
        .call()

      const txs = []

      for (const op of records) {
        const formatted = {
          id: op.id,
          createdAt: op.created_at,
          hash: op.transaction_hash
        }

        if (op.type === 'payment') {
          const paidOut = op.source_account === address
          formatted.type = `account_${paidOut ? 'debited' : 'credited'}`
          formatted[paidOut ? 'to' : 'from'] = paidOut ? op.to : op.source_account
        } else formatted.type = op.type

        if (op.amount) formatted.amount = Number(op.amount)
        if (op.asset_type) formatted.assetType = op.asset_type
        if (op.starting_balance) formatted.startingBalance = Number(op.starting_balance)

        txs.push(formatted)
      }

      return { address, txs }
    } catch (error) {
      error.action = 'GET_TRANSACTIONS'
      return error
    }
  }),

  federate: createAction('FEDERATE_ACCOUNT', async (
    username, account, domain = config.federationDomain
  ) => {
    try {
      const endpoint = `${config.federationApi}/addresses`
      const request = await fetch(endpoint, {
        headers: {
          method: 'POST',
          Authorization: `Token ${config.federationApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, domain, account_id: account })
      })

      const response = await request.json()

      if (!request.ok && response.non_field_errors) {
        const [ error ] = response.non_field_errors

        switch (error) {
          case 'The fields username, domain must make a unique set.':
            throw new Error('Username has already been taken')
          default: throw new Error('Sorry, an error has occurred')
        }
      } else if (!request.ok) {
        throw new Error('REQUEST_FAILED')
      }

      return { account, federatedAddress: response.fulladdress }
    } catch (error) {
      error.action = 'FEDERATE_ACCOUNT'
      return error
    }
  })

}
