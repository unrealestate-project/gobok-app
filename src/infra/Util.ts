import { Toast } from 'component/Toast'
import { Alert } from 'react-native'

export const toast = Toast.show

export const showError = (error: string) => {
  Alert.alert('오류', error)
}
