import { useNavigation } from '@react-navigation/native'
import { View } from 'react-native'
import { LdButton } from 'component/LdButton'
import { COLORS } from 'infra/Colors'
import React from 'react'

export const PostRoomButton = () => {
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
        title='방 올리기'
        onPress={() => navigation.navigate('AddRoom')}
        style={{
          height: 56,
          width: 100,
          shadowColor: COLORS.black,
          shadowOffset: {
            width: 1,
            height: 1,
          },
          shadowRadius: 2,
          shadowOpacity: 0.25,
          elevation: 4,
        }}
        textStyle={{
          fontSize: 16,
        }}
      />
    </View>
  )
}
