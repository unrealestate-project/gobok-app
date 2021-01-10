import React from 'react'
import { RoomListItem } from 'infra/Types'
import { useNavigation } from '@react-navigation/native'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { COLORS } from 'infra/Colors'
import moment from 'moment'
import { ITEM_PADDING } from 'infra/Constants'

export const RoomItem: React.FC<{
  data: RoomListItem
}> = ({ data }) => {
  const navigation = useNavigation()
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        padding: ITEM_PADDING,
        backgroundColor: COLORS.white,
        borderTopWidth: 1,
        borderTopColor: COLORS.gray3,
      }}
      onPress={() => navigation.navigate('RoomItem', { roomId: data.id })}
    >
      <Image
        source={{ uri: data.thumbnail?.url }}
        style={{
          width: 84,
          height: 84,
          borderRadius: 8,
          marginRight: 16,
          backgroundColor: COLORS.gray2,
        }}
      />
      <View style={{ flex: 1, justifyContent: 'space-between' }}>
        <Text
          numberOfLines={2}
          style={{
            fontSize: 18,
            fontWeight: 'bold',
          }}
        >
          {data.title}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Text
            style={{
              fontSize: 14,
            }}
          >{`읽음 ${data.view_count}`}</Text>
          <Text
            style={{
              fontSize: 14,
            }}
          >
            {moment(data.bumped_at).fromNow()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}
