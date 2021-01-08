import React from 'react'
import { View } from 'react-native'
import { NavigationHeader } from 'component/NavigationHeader'

export const AddRoomScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <NavigationHeader title='내 방 올리기' showBackButton />
    </View>
  )
}
