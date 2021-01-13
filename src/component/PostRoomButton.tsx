import { useNavigation } from '@react-navigation/native'
import { View } from 'react-native'
import { LdButton } from 'component/LdButton'
import { COLORS } from 'infra/Colors'
import React from 'react'
import { observer } from 'mobx-react'
import { dataStore } from 'store/DataStore'

export const PostRoomButton = observer(() => {
  const navigation = useNavigation()
  return (
    <View
      style={{
        position: 'absolute',
        right: 36,
        bottom: 36,
      }}
    >
      <LdButton
        title={dataStore.hasUploadedRoom ? '내가 올린 방' : '내 방 올리기'}
        onPress={() => {
          navigation.navigate(
            dataStore.hasUploadedRoom ? 'RoomItem' : 'AddRoom',
          )
        }}
        style={{
          shadowColor: COLORS.black,
          shadowOffset: {
            width: 1,
            height: 1,
          },
          shadowRadius: 2,
          shadowOpacity: 0.25,
          elevation: 4,
          padding: 16,
        }}
        textStyle={{
          fontSize: 16,
        }}
      />
    </View>
  )
})
