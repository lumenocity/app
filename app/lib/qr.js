import { version } from '../../package.json'

/*
  QR codes are a bit of a bitch at the moment. Some wallets store JSON in them, some do not.
  This module determines if we have some JSON in the QR code, and then tests to see if we can
  extract a Stellar-like 56 character alpha-numeric string from it.
*/

const NON_ALPHA_NUMERIC = /[^a-zA-Z\d+]/g

const isJson = raw => {
  try {
    const json = JSON.parse(raw)
    return json
  } catch (_) {
    return false
  }
}

const isValidKey = raw => (
  raw.length === 56 && !NON_ALPHA_NUMERIC.test(raw)
)

export const qrParse = raw => {
  const json = isJson(raw)
  let extractedKey = raw

  // In case of JSON, we could have Stargazer or Lumenocity
  if (json && json.stellar && json.stellar.account && json.stellar.account.id) {
    extractedKey = json.stellar.account.id
  } else if (json && json.stellar && json.stellar.key) {
    extractedKey = json.stellar.key
  } else if (json && json.issuer && json.issuer.lumenocity) {
    extractedKey = json.body
  }

  return isValidKey(extractedKey) ? extractedKey : false
}

/*
  Lumenocity's QR code spec is easy. It looks like this:

  {
    issuer: { lumenocity: SEMVER_VERSION },
    type: 'address|private_key',
    body: THE_KEY
  }
*/
export const qrFormat = (body, type) => (
  JSON.stringify({
    issuer: { lumenocity: version },
    body,
    type
  })
)
