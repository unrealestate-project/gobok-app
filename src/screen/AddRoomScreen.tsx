import React, { useRef } from 'react'
import { ScrollView, View } from 'react-native'
import { NavigationHeader } from 'component/NavigationHeader'
import { LdTextInputBorder } from 'component/LdTextInput'
import { COLORS } from 'infra/Colors'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { LdKeyboardAvoidingView } from 'component/LdKeyboardAvoidingView'

class AddRoomStore {
  @observable title: string = ''
  @observable content: string = ''
  @observable images: string[] = []
}

export const AddRoomScreen = observer(() => {
  const store = useRef(new AddRoomStore())
  return (
    <>
      <NavigationHeader title='내 방 올리기' showBackButton />
      <LdKeyboardAvoidingView>
        <ScrollView
          contentContainerStyle={{
            flex: 1,
            padding: 16,
            backgroundColor: 'blue',
          }}
        >
          <LdTextInputBorder
            placeholder='제목'
            placeholderTextColor={COLORS.gray2}
            style={{ marginBottom: 16 }}
            value={store.current.title}
            onChangeText={(v) => {
              store.current.title = v
            }}
          />
          <LdTextInputBorder
            placeholder='내용'
            placeholderTextColor={COLORS.gray2}
            value={store.current.content}
            onChangeText={(v) => {
              store.current.content = v
            }}
            multiline
            style={{ flex: 1 }}
            textAlignVertical='top'
          />
          <View
            style={{
              backgroundColor: 'red',
            }}
          ></View>
        </ScrollView>
      </LdKeyboardAvoidingView>
    </>
  )
})
