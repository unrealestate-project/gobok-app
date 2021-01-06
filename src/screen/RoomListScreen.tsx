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
          elevation: 4,
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
        refreshing={dataStore.loading}
        onRefresh={() => dataStore.updateRoomList()}
      />
      <PostRoomButton />
    </View>
  )
})
