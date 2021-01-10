import { LdButton } from 'component/LdButton'
import { Alert, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { RoomItemStore } from 'store/RoomItemStore'
import { observer } from 'mobx-react'
import { toJS } from 'mobx'
import { dataStore } from 'store/DataStore'

export const BottomRoomActionButtons: React.FC<{
  store: RoomItemStore
}> = observer(({ store }) => {
  const navigation = useNavigation()
  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 8,
        paddingVertical: 8,
      }}
    >
      <LdButton
        title='끌올'
        onPress={() => store.bump()}
        style={{ flex: 1, paddingVertical: 16 }}
        textStyle={{ fontSize: 16 }}
        loading={store.bumpLoading}
        disabled={store.bumpLoading}
      />
      <LdButton
        title='수정'
        onPress={() => {
          navigation.navigate('AddRoom', { roomData: toJS(store.data) })
        }}
        style={{ flex: 1, marginLeft: 8, paddingVertical: 16 }}
        textStyle={{ fontSize: 16 }}
      />
      <LdButton
        title='삭제'
        onPress={() => {
          Alert.alert(
            '내가 올린 방 삭제',
            '정말 방을 삭제할까요?',
            [
              { text: '취소' },
              {
                text: '삭제',
                onPress: () => {
                  store.delete(() => {
                    navigation.goBack()
                    dataStore.updateRoomList()
                  })
                },
              },
            ],
            {
              cancelable: true,
            },
          )
        }}
        style={{ flex: 1, marginLeft: 8, paddingVertical: 16 }}
        textStyle={{ fontSize: 16 }}
        loading={store.deleteLoading}
        disabled={store.deleteLoading}
      />
    </View>
  )
})
