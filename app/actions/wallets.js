import { createAction } from 'redux-actions'
import { Operation } from 'stellar-sdk'

import config from '../config'

export default {

  generateKeys: createAction('GENERATE_KEYS', () => Keypair.random),

  create: createAction('CREATE_WALLET', async (server, keys) => {
    try {
      const op = Operation.createAccount({
        destination: keys.publicKey(),
        startingBalance: '10'
      })

      return await server.operations().operation(op)
    } catch (error) {
      error.action = 'CREATE_WALLET'
      return error
    }
  }),

  load: createAction('GRAB_WALLET', async (server, address) => {
    try {
      return await server.loadAccount(address)
    } catch (error) {
      error.action = 'GRAB_WALLET'
      return error
    }
  }),

  testnetFund: createAction('TESTNET_FUND', async (server, address) => {
    try {
      await server.friendbot(address).call()
      return await server.loadAccount(address)
    } catch (error) {
      error.action = 'TESTNET_FUND'
      return error
    }
  })

}
