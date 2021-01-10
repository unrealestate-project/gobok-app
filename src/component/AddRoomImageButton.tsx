import { COLORS } from 'infra/Colors'
import { Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { ACTIVE_OPACITY, ADD_IMAGE_SIDE } from 'infra/Constants'

export const AddRoomImageButton: React.FC<{
  onPress: () => void
}> = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={ACTIVE_OPACITY}>
      <View
        style={{
          width: ADD_IMAGE_SIDE,
          height: ADD_IMAGE_SIDE,
          borderRadius: 8,
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: COLORS.gray2,
        }}
      >
        <Text
          style={{
            color: COLORS.gray1,
            fontSize: 16,
            marginVertical: 8,
          }}
        >
          사진
        </Text>
        <Text style={{ color: COLORS.gray2, fontSize: 32, lineHeight: 32 }}>
          +
        </Text>
      </View>
    </TouchableOpacity>
  )
}
