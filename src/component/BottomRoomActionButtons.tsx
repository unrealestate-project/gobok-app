import { LdButton } from 'component/LdButton'
import { roomApi } from 'api/RoomApi'
import { showError, toast } from 'infra/Util'
import { Alert, View } from 'react-native'
import React from 'react'

export const BottomRoomActionButtons: React.FC<{
  roomId: number
}> = ({ roomId }) => {
  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        height: 80,
        paddingHorizontal: 8,
        paddingVertical: 8,
      }}
    >
      <LdButton
        title='끌올'
        onPress={() => {
          roomApi
            .bumpRoom(roomId)
            .then(() => {
              toast('방이 끌올되었어요!')
            })
            .catch((e) => showError(e))
        }}
        style={{ flex: 1 }}
      />
      <LdButton
        title='수정'
        onPress={() => {}}
        style={{ flex: 1, marginLeft: 8 }}
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
                  roomApi
                    .deleteRoom(roomId)
                    .then(() => {
                      toast('방이 삭제되었어요!')
                    })
                    .catch((e) => showError(e))
                },
              },
            ],
            {
              cancelable: true,
            },
          )
        }}
        style={{ flex: 1, marginLeft: 8 }}
      />
    </View>
  )
}
