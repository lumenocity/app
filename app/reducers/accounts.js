import { accounts } from '../state/default-state'

export default (state = accounts, action) => {
  switch (action.type) {
    case 'CLEAR_LOADED_INDICATORS':
      return {
        ...state,
        loaded: false,
        data: state.data.map(account => ({
          ...account,
          txLoaded: false,
          txs: []
        }))
      }
    case 'GET_TRANSACTIONS': {
      const data = state.data.map(wallet => {
        if (wallet.address !== action.payload.address) return wallet
        return { ...wallet, txLoaded: true, txs: action.payload.txs }
      })

      return {
        ...state,
        data
      }
    }
    case 'GRAB_ACCOUNT': {
      const newData = [ ...state.data, action.payload ]
      const uniques = []

      return {
        ...state,
        selected: action.payload.address,
        data: newData.filter(wallet => {
          const inWallet = uniques.indexOf(wallet.address) > -1
          if (!inWallet) uniques.push(wallet.address)
          return !inWallet
        })
      }
    }
    default:
      return state
  }
}
