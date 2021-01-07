import { ActivityIndicator, View } from 'react-native'
import { COLORS } from 'infra/Colors'
import React from 'react'

export const ScreenSpinner = () => {
  return (
    <View
      style={{
        position: 'absolute',
        height: '100%',
        width: '100%',
        backgroundColor: '#ffffffcc',
        justifyContent: 'center',
      }}
    >
      <ActivityIndicator size={48} color={COLORS.primary500} />
    </View>
  )
}
