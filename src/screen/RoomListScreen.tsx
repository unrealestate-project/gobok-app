import React, { useEffect } from 'react'
import { FlatList, View } from 'react-native'
import { COLORS } from 'infra/Colors'
import { observer } from 'mobx-react'
import { dataStore } from 'store/DataStore'
import { userStore } from 'store/UserStore'
import { when } from 'mobx'
import { RoomItem } from 'component/RoomItem'
import { PostRoomButton } from 'component/PostRoomButton'
import { NavigationHeader } from 'component/NavigationHeader'

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
      <NavigationHeader title='복덕방' />
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
