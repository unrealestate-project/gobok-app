import React from 'react'
import { StatusBar, View } from 'react-native'
import { COLORS } from 'infra/Colors'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import { isIOS } from 'infra/Constants'

export const LdStatusBar = () => {
  return (
    <View
      style={{
        height: isIOS ? getStatusBarHeight(true) : 0,
        backgroundColor: COLORS.primary500,
      }}
    >
      <StatusBar backgroundColor={COLORS.primary600} barStyle='light-content' />
    </View>
  )
}
