import { Server, Network } from 'stellar-sdk'

export default (uri, testNetwork = false) => {
  if (testNetwork) Network.useTestNetwork()
  return new Server(uri)
}
