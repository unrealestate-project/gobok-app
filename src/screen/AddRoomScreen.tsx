import React, { useEffect, useRef, useState } from 'react'
import { Alert, ScrollView, Text, View } from 'react-native'
import { NavigationHeader } from 'component/NavigationHeader'
import { LdTextInputBorder } from 'component/LdTextInput'
import { COLORS } from 'infra/Colors'
import { action, observable } from 'mobx'
import { observer } from 'mobx-react'
import { AddRoomImageButton } from 'component/AddRoomImageButton'
import { LdButton } from 'component/LdButton'
import { LdImagePickerBottomSheet } from 'component/LdImagePickerBottomSheet'
import { AddRoomImage } from 'component/AddRoomImage'
import { roomApi } from 'api/RoomApi'
import { Image } from 'react-native-image-crop-picker'
import { showError, toast } from 'infra/Util'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Room } from 'infra/Types'
import { dataStore } from 'store/DataStore'

class AddRoomStore {
  @observable title: string = ''
  @observable content: string = ''
  @observable displayImages: string[] = []
  internalImages: { url: string }[] = []
  @observable loading: boolean = false
  imageLoading: boolean = false

  @action async addImages(images: Image[]) {
    if (this.imageLoading) return
    this.imageLoading = true
    const startIndex = this.displayImages.length
    const imageCount = images.length
    this.displayImages = this.displayImages.concat(images.map((i) => i.path))
    try {
      const ts = new Date().toISOString()
      const res = await Promise.all(
        images.map((i, index) => {
          return roomApi.postRoomImage({
            uri: i.path,
            type: i.mime,
            name: `${ts}-${index}`,
          })
        }),
      )
      // set internal images
      this.internalImages = this.internalImages.concat(res)
    } catch (e) {
      showError(e)
      this.displayImages.splice(startIndex, imageCount)
      this.internalImages.splice(startIndex, imageCount)
    } finally {
      this.imageLoading = false
    }
  }

  @action removeImage(index: number) {
    Alert.alert(
      '사진 삭제',
      '사진을 삭제할까요?',
      [
        { text: '취소' },
        {
          text: '삭제',
          onPress: () => {
            this.displayImages.splice(index, 1)
            this.internalImages.splice(index, 1)
          },
        },
      ],
      {
        cancelable: true,
      },
    )
  }

  @action async done(isEdit: boolean): Promise<number | null> {
    if (this.imageLoading) {
      return null
    }
    if (!this.title.trim().length) {
      toast('제목을 입력해주세요!')
      return null
    }
    if (!this.content.trim().length) {
      toast('내용을 입력해주세요!')
      return null
    }
    this.loading = true
    let id
    const func = isEdit
      ? roomApi.putRoom.bind(roomApi)
      : roomApi.postRoom.bind(roomApi)
    try {
      id = await func(this.title, this.content, this.internalImages)
    } catch (e) {
      showError(e)
      id = null
    } finally {
      this.loading = false
    }
    return id
  }

  @action feedData(roomData: Room) {
    if (!roomData) return
    this.title = roomData.title
    this.content = roomData.content
    this.displayImages = roomData.images.map((i) => i.url)
    this.internalImages = [...roomData.images]
  }
}

export const AddRoomScreen = observer(() => {
  const route = useRoute()
  const { roomData } = route.params
    ? (route.params as { roomData?: Room })
    : { roomData: undefined }
  const isEdit = roomData !== undefined

  useEffect(() => {
    if (roomData) store.current.feedData(roomData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const store = useRef(new AddRoomStore())
  const navigation = useNavigation()
  const [bottomSheet, setBottomSheet] = useState(false)
  return (
    <>
      <NavigationHeader
        title={isEdit ? '내 방 수정하기' : '내 방 올리기'}
        showBackButton
      />
      <ScrollView contentContainerStyle={{ padding: 16 }}>
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
              image={img}
              key={img}
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
              const roomId = await store.current.done(isEdit)
              if (roomId) {
                isEdit
                  ? toast('잘 수정되었어요 :)')
                  : toast('와~ 내 방이 올라갔어요! 🎉')
                // @ts-ignore
                navigation.replace('RoomItem', { roomId })
                dataStore.updateRoomList()
              }
            }}
            style={{ height: 56 }}
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
