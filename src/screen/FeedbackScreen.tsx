import React, { useState } from 'react'
import { View } from 'react-native'
import { NavigationHeader } from 'component/NavigationHeader'
import { COLORS } from 'infra/Colors'
import { LdButton } from 'component/LdButton'
import { LdKeyboardAvoidingView } from 'component/LdKeyboardAvoidingView'
import { LdTextInputBorder } from 'component/LdTextInput'
import { userApi } from 'api/UserApi'
import { showError, toast } from 'infra/Util'
import { useNavigation } from '@react-navigation/native'

export const FeedbackScreen = () => {
  const navigation = useNavigation()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  return (
    <>
      <NavigationHeader title='앱 개선사항 제안' showBackButton />
      <LdKeyboardAvoidingView>
        <View
          style={{
            flex: 1,
            position: 'relative',
            backgroundColor: COLORS.white,
            padding: 16,
          }}
        >
          <LdTextInputBorder
            placeholder='제목'
            placeholderTextColor={COLORS.gray1}
            style={{ marginBottom: 16 }}
            value={title}
            onChangeText={(v) => setTitle(v)}
          />
          <LdTextInputBorder
            placeholder='내용'
            placeholderTextColor={COLORS.gray1}
            style={{ flex: 1, marginBottom: 16 }}
            value={content}
            onChangeText={(v) => setContent(v)}
            multiline
            textAlignVertical='top'
          />
          <LdButton
            title='보내기'
            onPress={() => {
              if (!title.trim().length || !content.trim().length) return
              setLoading(true)
              userApi
                .feedback(title, content)
                .then(() => {
                  toast(
                    '피드백 주셔서 감사합니다 :)\n더 편리한 서비스 만들기 위해 최선을 다할게요!',
                  )
                  navigation.goBack()
                })
                .catch((e) => showError(e))
                .finally(() => setLoading(false))
            }}
            style={{ height: 56 }}
            textStyle={{ fontSize: 16 }}
            loading={loading}
            disabled={loading}
          />
        </View>
      </LdKeyboardAvoidingView>
    </>
  )
}
