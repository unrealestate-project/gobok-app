import { TransitionPresets } from '@react-navigation/stack'

export const screenOptions = () => {
  return {
    ...TransitionPresets.SlideFromRightIOS,
    headerShown: false,
  }
}
