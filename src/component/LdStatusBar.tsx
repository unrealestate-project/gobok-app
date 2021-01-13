import React from 'react'
import { StatusBar, View } from 'react-native'
import { COLORS } from 'infra/Colors'
import { getSafeStatusBarHeight } from 'infra/Util'

export const LdStatusBar = () => {
  return (
    <View
      style={{
        height: getSafeStatusBarHeight(),
        backgroundColor: COLORS.primary500,
      }}
    >
      <StatusBar backgroundColor={COLORS.primary600} barStyle='light-content' />
    </View>
  )
}
