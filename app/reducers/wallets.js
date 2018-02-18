import { wallets } from '../state/default-state'

export default (state = wallets, action) => {
  switch (action.type) {
    case 'LOAD_ASSET_TYPES':
      return { ...state, loaded: true, data: action.payload }
    default:
      return state
  }
}
