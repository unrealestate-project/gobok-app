import React from 'react'
import { StatusBar, View } from 'react-native'
import { COLORS } from 'infra/Colors'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'

export const LdStatusBar = () => {
  return (
    <View
      style={{
        height: getStatusBarHeight(true),
        backgroundColor: COLORS.primary500,
      }}
    >
      <StatusBar backgroundColor={COLORS.primary600} barStyle='light-content' />
    </View>
  )
}
