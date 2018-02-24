import { assets } from '../state/default-state'

export default (state = assets, action) => {
  switch (action.type) {
    case 'CLEAR_LOADED_INDICATORS':
      return { ...state, loaded: false }
    case 'LOAD_ASSET_TYPES':
      return { ...state, loaded: true, data: action.payload }
    default:
      return state
  }
}
