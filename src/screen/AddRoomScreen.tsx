import React, { useRef, useState } from 'react'
import { Alert, ScrollView, Text, View } from 'react-native'
import { NavigationHeader } from 'component/NavigationHeader'
import { LdTextInputBorder } from 'component/LdTextInput'
import { COLORS } from 'infra/Colors'
import { action, observable } from 'mobx'
import { observer } from 'mobx-react'
import { LdKeyboardAvoidingView } from 'component/LdKeyboardAvoidingView'
import { AddRoomImageButton } from 'component/AddRoomImageButton'
import { LdButton } from 'component/LdButton'
import { LdImagePickerBottomSheet } from 'component/LdImagePickerBottomSheet'
import { AddRoomImage } from 'component/AddRoomImage'

class AddRoomStore {
  @observable title: string = ''
  @observable content: string = ''
  @observable images: string[] = []
  @observable loading: boolean = false

  @action addImage(image: string) {
    this.images.push(image)
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
            this.images.splice(index, 1)
          },
        },
      ],
      {
        cancelable: true,
      },
    )
  }
}

export const AddRoomScreen = observer(() => {
  const store = useRef(new AddRoomStore())
  const [bottomSheet, setBottomSheet] = useState(false)
  return (
    <>
      <NavigationHeader title='내 방 올리기' showBackButton />
      <LdKeyboardAvoidingView>
        <ScrollView
          contentContainerStyle={{
            flex: 1,
            padding: 16,
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
            style={{ flex: 1, marginBottom: 16, minHeight: 24 * 10 + 16 * 2 }}
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
            {store.current.images.map((img, index) => (
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
              title='올리기'
              onPress={() => {}}
              style={{ height: 56 }}
              textStyle={{ fontSize: 16 }}
              loading={store.current.loading}
              disabled={store.current.loading}
            />
          </View>
        </ScrollView>
      </LdKeyboardAvoidingView>
      <LdImagePickerBottomSheet
        isOpen={bottomSheet}
        onClose={() => {
          setBottomSheet(false)
        }}
        onImage={(image) => {
          store.current.addImage(image)
          setBottomSheet(false)
        }}
      />
    </>
  )
})
