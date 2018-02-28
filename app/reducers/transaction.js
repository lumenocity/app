import { transaction } from '../state/default-state'

export default (state = transaction, action) => {
  switch (action.type) {
    case 'CLEAR_LAST_TRANSACTION':
      return { ...transaction }
    case 'SEND_FUNDS':
      return { ...transaction }
    case 'SET_TRANSACTION_PARAM':
      return { ...state, ...action.payload }
    default:
      return state
  }
}
