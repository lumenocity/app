import { session } from '../state/default-state'

export default (state = session, action) => {
  switch (action.type) {
    case 'INIT_NEW_SESSION':
      return { ...state, uuid: action.payload }
    default:
      return state
  }
}
