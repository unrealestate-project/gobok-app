import { Toast } from 'component/Toast'
import { Alert } from 'react-native'
import { isIOS } from 'infra/Constants'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'

export const toast = Toast.show

export const showError = (error: string | Error) => {
  Alert.alert('오류', error instanceof Error ? error.message : error)
}

export const getSafeStatusBarHeight = () => {
  return isIOS ? getStatusBarHeight(true) : 0
}
