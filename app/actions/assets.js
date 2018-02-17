import { createAction } from 'redux-actions'

import config from '../config'

export default {

  loadAssetTypes: createAction('LOAD_ASSET_TYPES', async () => {
    try {
      const request = await fetch(config.assetList)
      const { assets } = await request.json()

      if (!request.ok) throw new Error('REQUEST_FAILED')

      const uniques = []

      return assets.filter(asset => {
        if (uniques.indexOf(asset.code) > -1) return false
        uniques.push(asset.code)
        return true
      })
    } catch (error) {
      error.action = 'LOAD_ASSET_TYPES'
      return error
    }
  })

}
