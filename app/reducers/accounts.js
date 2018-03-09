import { accounts } from '../state/default-state'

export default (state = accounts, action) => {
  switch (action.type) {
    case 'RENAME_ACCOUNT': {
      const data = state.data.map(account => {
        if (account.address !== action.payload.address) return account
        return { ...account, title: action.payload.title }
      })

      return {
        ...state,
        data
      }
    }
    case 'TOGGLE_ADDING_MODE':
      return { ...state, adding: !state.adding }
    case 'SELECT_ACCOUNT':
      return { ...state, selected: action.payload }
    case 'VIEW_TRANSACTION':
      return { ...state, selectedTransaction: action.payload }
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
      const data = state.data.map(account => {
        if (account.address !== action.payload.address) return account
        return { ...account, txLoaded: true, txs: action.payload.txs }
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
        data: newData.filter(account => {
          const inWallet = uniques.indexOf(account.address) > -1
          if (!inWallet) uniques.push(account.address)
          return !inWallet
        })
      }
    }
    case 'FEDERATE_ACCOUNT': {
      const data = state.data.map(account => {
        if (account.address !== action.payload.address) return account
        return { ...account, federatedAddress: action.payload.federatedAddress }
      })

      return { ...state, data }
    }
    case 'SET_INFLATION': {
      const data = state.data.map(account => {
        if (account.address !== action.payload.address) return account
        return { ...account, inflation: action.payload.target }
      })

      return { ...state, data }
    }
    default:
      return state
  }
}
