import React from 'react'
import { StatusBar, View } from 'react-native'
import { COLORS } from 'infra/Colors'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import { isIOS, WINDOW_HEIGHT, WINDOW_WIDTH } from 'infra/Constants'

export const LdStatusBar = () => {
  return (
    <View
      style={{
        height:
          isIOS && WINDOW_HEIGHT / WINDOW_WIDTH > 1.6
            ? getStatusBarHeight(true)
            : 0,
        backgroundColor: COLORS.primary500,
      }}
    >
      <StatusBar backgroundColor={COLORS.primary600} barStyle='light-content' />
    </View>
  )
}
