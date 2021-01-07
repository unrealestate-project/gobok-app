import React from 'react'
import { View } from 'react-native'
import { NavigationHeader } from 'component/NavigationHeader'

export const RoomScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <NavigationHeader title={''} showBackButton />
    </View>
  )
}
