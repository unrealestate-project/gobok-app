import React, { useEffect, useRef, useState } from 'react'
import { Alert, ScrollView, Text, View } from 'react-native'
import { NavigationHeader } from 'component/NavigationHeader'
import { LdTextInputBorder } from 'component/LdTextInput'
import { COLORS } from 'infra/Colors'
import { observer } from 'mobx-react'
import { AddRoomImageButton } from 'component/AddRoomImageButton'
import { LdButton } from 'component/LdButton'
import { LdImagePickerBottomSheet } from 'component/LdImagePickerBottomSheet'
import { AddRoomImage } from 'component/AddRoomImage'
import { toast } from 'infra/Util'
import {
  CommonActions,
  useNavigation,
  useRoute,
} from '@react-navigation/native'
import { Room } from 'infra/Types'
import { dataStore } from 'store/DataStore'
import { AddRoomStore } from 'store/AddRoomStore'
import { getBottomSpace } from 'react-native-iphone-x-helper'

let ignoreReset = false

export const AddRoomScreen = observer(() => {
  const route = useRoute()
  const { roomData } = route.params
    ? (route.params as { roomData?: Room })
    : { roomData: undefined }
  const isEdit = roomData !== undefined

  useEffect(() => {
    if (roomData) store.current.feedData(roomData)
    return () => {
      ignoreReset = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const store = useRef(new AddRoomStore())
  const navigation = useNavigation()
  const [bottomSheet, setBottomSheet] = useState(false)

  useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      if (store.current.isEmpty || ignoreReset) return
      e.preventDefault()
      Alert.alert('작성하던 내용이 사라집니다!', '정말 뒤로 돌아갈까요?', [
        { text: '취소', style: 'cancel' },
        {
          text: '확인',
          style: 'destructive',
          onPress: () => navigation.dispatch(e.data.action),
        },
      ])
    })
  }, [navigation, isEdit])

  return (
    <>
      <NavigationHeader
        title={isEdit ? '내 방 수정하기' : '내 방 올리기'}
        showBackButton
      />
      <ScrollView
        contentContainerStyle={{
          padding: 16,
          paddingBottom: 16 + getBottomSpace(),
        }}
      >
        <LdTextInputBorder
          placeholder='제목'
          placeholderTextColor={COLORS.gray1}
          style={{ marginBottom: 16 }}
          value={store.current.title}
          onChangeText={(v) => {
            store.current.title = v
          }}
        />
        <LdTextInputBorder
          placeholder='내용'
          placeholderTextColor={COLORS.gray1}
          value={store.current.content}
          onChangeText={(v) => {
            store.current.content = v
          }}
          multiline
          style={{ marginBottom: 16, height: 24 * 10 + 16 * 2 }}
          textAlignVertical='top'
        />
        <View
          style={{
            flexDirection: 'row',
            marginBottom: 16,
            flexWrap: 'wrap',
          }}
        >
          <AddRoomImageButton onPress={() => setBottomSheet(true)} />
          {store.current.displayImages.map((img, index) => (
            <AddRoomImage
              image={img.path}
              key={img.path}
              loading={img.isLoading}
              index={index}
              onPress={() => store.current.removeImage(index)}
            />
          ))}
        </View>
        <View>
          <Text style={{ color: COLORS.gray1 }}>
            - 사진을 누르면 삭제할 수 있어요.
          </Text>
        </View>
        <View style={{ marginTop: 16 }}>
          <LdButton
            title={isEdit ? '수정하기' : '올리기'}
            onPress={async () => {
              const roomId = await store.current.done()
              if (roomId) {
                isEdit
                  ? toast('잘 수정되었어요 :)')
                  : toast('와~ 내 방이 올라갔어요! 🎉')
                ignoreReset = true
                if (isEdit) {
                  navigation.dispatch((state) => {
                    const routes = [...state.routes]
                    routes.splice(routes.length - 2)
                    // @ts-ignore
                    routes.push({
                      name: 'RoomItem',
                      params: { roomId },
                    })
                    return CommonActions.reset({
                      ...state,
                      routes,
                      index: routes.length - 1,
                    })
                  })
                } else {
                  // @ts-ignore
                  navigation.replace('RoomItem', { roomId })
                }
                dataStore.updateRoomList()
              }
            }}
            style={{ paddingVertical: 16 }}
            textStyle={{ fontSize: 16 }}
            loading={store.current.loading}
            disabled={store.current.loading}
          />
        </View>
      </ScrollView>
      <LdImagePickerBottomSheet
        isOpen={bottomSheet}
        onClose={() => {
          setBottomSheet(false)
        }}
        onImages={(images) => {
          store.current.addImages(images)
          setBottomSheet(false)
        }}
      />
    </>
  )
})
