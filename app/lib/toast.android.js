import { ToastAndroid } from 'react-native'

export default function toast(message, isLong) {
  return ToastAndroid.show(message, isLong ? ToastAndroid.LONG : ToastAndroid.SHORT)
}
