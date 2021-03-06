/* globals __DEV__ */

/*
  Here, we look up error texts associated with the error code we are given.

  The way it works is that some errors do not need specific text, and others do.

  So we look them up from the /language/errors.js first by the key:

  [action_type][error_code]

  And then if one of those is not found, we grab:

  [error_code]

  If that is still not found, grab the generic message.
*/
export default function errorHandler({ t }, failedAction) {
  const { type, payload } = failedAction
  let message = t(`errors.${type}`) || t('errors.fallback_message')

  if (payload.message === 'Network request failed') message = Errors.NO_INTERNET

  if (__DEV__) console.log(type, payload.message)

  // toast(message, true)
}
