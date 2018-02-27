import { createAction } from 'redux-actions'
import { Operation, Asset, TransactionBuilder } from 'stellar-sdk'

const XLM = Asset.native()

export default {

  create: createAction('SEND_FUNDS', async (server, keys, destination, amount, asset = XLM) => {
    try {
      const op = Operation.payment({ destination, amount: amount.toString(), asset })
      const tx = new TransactionBuilder(keys.publicKey()).addOperation(op).build()

      tx.sign(keys)

      const result = await server.submitTransaction(tx)

      console.log(result)

      return {}
    } catch (error) {
      error.action = 'SEND_FUNDS'
      return error
    }
  })

}
