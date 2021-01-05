import React, { useEffect } from 'react'
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import { COLORS } from 'infra/Colors'
import { LdButton } from 'component/LdButton'
import { observer } from 'mobx-react'
import { RoomListItem } from 'infra/Types'
import moment from 'moment'
import { dataStore } from 'store/DataStore'
import { userStore } from 'store/UserStore'
import { when } from 'mobx'

const dummyData = {
  id: 1,
  title: '고려대역 3분거리 가격 좋은 원룸 양도해요! (200/33)',
  bumped_at: new Date().toISOString(),
  thumb_img:
    'data:image/png;base64,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',
  view_count: 24,
}

const PostRoomButton = () => {
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
        onClick={() => {}}
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
        }}
        textStyle={{
          fontSize: 16,
        }}
      />
    </View>
  )
}

const RoomItem: React.FC<{
  data: RoomListItem
}> = ({ data }) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        padding: 16,
        backgroundColor: COLORS.white,
      }}
    >
      <Image
        source={{ uri: data.thumb_img }}
        style={{
          width: 72,
          height: 72,
          borderRadius: 8,
          marginRight: 16,
          backgroundColor: COLORS.gray2,
        }}
      />
      <View
        style={{ flex: 1, justifyContent: 'space-between', paddingVertical: 6 }}
      >
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

export const RoomListScreen = observer(() => {
  useEffect(() => {
    when(
      () => userStore.hasToken,
      () => dataStore.updateRoomList(),
    )
  }, [])
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.gray3,
        position: 'relative',
      }}
    >
      <FlatList
        data={dataStore.roomList}
        renderItem={(v) => {
          return <RoomItem data={v.item} />
        }}
        keyExtractor={(v) => `${v.id}`}
      />
      <PostRoomButton />
    </View>
  )
})
