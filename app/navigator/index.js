import { TabNavigator } from 'react-navigation'

import routes from './routes'
import config from './config'

const tabs = {}

for (const [ name, { screen }] of Object.entries(routes)) tabs[name] = { screen }

export default TabNavigator(tabs, config(routes))
