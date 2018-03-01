import { StackNavigator } from 'react-navigation'

import SendResult from '../SendResult'
import SendForm from '../SendForm'

export default StackNavigator(
  {
    SendResult: {
      screen: SendResult
    },
    SendForm: {
      screen: SendForm
    }
  },
  {
    initialRouteName: 'SendForm',
    headerMode: 'none'
  }
)
