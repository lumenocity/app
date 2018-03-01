import { transaction } from '../state/default-state'

export default (state = transaction, action) => {
  switch (action.type) {
    case 'CLEAR_LAST_TRANSACTION':
      return { ...transaction }
    case 'INIT':
      return { ...state, status: 'processing', submittedAt: new Date() }
    case 'SEND_FUNDS':
      return { ...state, status: 'completed', hash: action.payload.hash }
    case 'SET_TRANSACTION_PARAM':
      return { ...state, ...action.payload }
    default:
      return state
  }
}
