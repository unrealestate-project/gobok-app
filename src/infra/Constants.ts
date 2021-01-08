import { Dimensions, Platform } from 'react-native'

export const SERVER_BASE_URL = !__DEV__
  ? 'http://localhost'
  : 'https://landproject-300105.du.r.appspot.com/v1'

export const isIOS = Platform.OS === 'ios'
export const isAOS = Platform.OS === 'android'
export const WINDOW_WIDTH = Dimensions.get('window').width
export const WINDOW_HEIGHT = Dimensions.get('window').height
export const IMAGE_SIDE = Math.ceil(WINDOW_WIDTH / 3) + 16
export const ITEM_PADDING = 16
