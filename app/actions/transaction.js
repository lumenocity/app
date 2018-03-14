import { createAction } from 'redux-actions'
import { Operation, Asset, TransactionBuilder, Keypair } from 'stellar-sdk'

const XLM = Asset.native()

export default {

  clear: createAction('CLEAR_LAST_TRANSACTION'),
  set: createAction('SET_TRANSACTION_PARAM'),

  init: createAction('INIT'),

  send: createAction('SEND_FUNDS', async (server, secret, { to, from, amount }) => {
    try {
      const account = await server.loadAccount(from)

      const op = Operation.payment({
        destination: to,
        amount: amount.toString(),
        asset: XLM
      })

      const tx = new TransactionBuilder(account).addOperation(op).build()
      tx.sign(Keypair.fromSecret(secret))

      const response = await server.submitTransaction(tx)

      return { hash: response.hash }
    } catch (error) {
      error.action = 'SEND_FUNDS'
      return error
    }
  })

}
