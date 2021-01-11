import { Dimensions, Platform } from 'react-native'

export const SERVER_BASE_URL = !__DEV__
  ? 'https://landproject-300105.du.r.appspot.com/v1'
  : 'https://landproject-300105.du.r.appspot.com/v1'

export const isIOS = Platform.OS === 'ios'
export const isAOS = Platform.OS === 'android'
export const WINDOW_WIDTH = Dimensions.get('window').width
export const WINDOW_HEIGHT = Dimensions.get('window').height
export const IMAGE_SIDE = Math.ceil(WINDOW_WIDTH / 3) + 16
export const ADD_IMAGE_SIDE = Math.floor((WINDOW_WIDTH - 16 * 4) / 3)
export const ITEM_PADDING = 16
export const ACTIVE_OPACITY = 0.4
