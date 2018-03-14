import { network } from '../state/default-state'

export default (state = network, action) => {
  switch (action.type) {
    case 'SET_NETWORK':
      return { ...state, env: action.payload }
    default:
      return state
  }
}
