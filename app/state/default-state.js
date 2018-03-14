export const session = { uuid: null }
export const assets = { loaded: false, data: [] }
export const accounts = {
  data: [],
  selected: null,
  loaded: false,
  adding: true,
  selectedTransaction: null
}
export const transaction = {
  status: null,
  amount: null,
  asset: null,
  from: null,
  to: null,
  memo: null,
  createdAt: null,
  hash: null,
  type: null
}

export const network = {
  env: 'live'
}
