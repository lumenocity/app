import { createAction } from 'redux-actions'
import { v4 } from 'uuid'

export default {
  initSession: createAction('INIT_NEW_SESSION', v4)
}
