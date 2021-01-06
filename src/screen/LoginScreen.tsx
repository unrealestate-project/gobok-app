import React, { useRef } from 'react'
import { Text, TextInput, View } from 'react-native'
import { COLORS } from 'infra/Colors'
import { HeaderText } from 'component/HeaderText'
import { LdTextInput } from 'component/LdTextInput'
import { LdButton } from 'component/LdButton'
import { LdKeyboardAvoidingView } from 'component/LdKeyboardAvoidingView'
import { userStore } from 'store/UserStore'
import { showError, toast } from 'infra/Util'
import { action, observable } from 'mobx'
import { observer } from 'mobx-react'

class LoginStore {
  @observable email: string = ''
  @observable codeDisabled: boolean = false
  @observable code: string = ''
  @observable time: number = 30
  @observable loginDisabled: boolean = false
  interval: NodeJS.Timeout | undefined

  clearInterval() {
    if (this.interval) clearInterval(this.interval)
    this.time = 30
    this.codeDisabled = false
  }

  @action tick() {
    const newTime = this.time - 1
    if (this.time === 0) {
      this.clearInterval()
    } else {
      this.time = newTime
    }
  }
}

export const LoginScreen = observer(() => {
  const store = useRef<LoginStore>(new LoginStore())
  const codeInputRef = useRef<TextInput>(null)
  const login = async () => {
    if (store.current.code.length === 0) return
    try {
      const { email, code } = store.current
      store.current.loginDisabled = true
      await userStore.login(email, code)
    } catch (e) {
      showError(e.message)
    } finally {
      store.current.loginDisabled = false
    }
  }
  return (
    <LdKeyboardAvoidingView>
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.primary500,
          justifyContent: 'center',
        }}
      >
        <View
          style={{
            width: '100%',
            paddingHorizontal: 24,
            alignItems: 'center',
          }}
        >
          <HeaderText style={{ marginBottom: 32 }}>
            학교 이메일로 로그인
          </HeaderText>
          <View style={{ flexDirection: 'row', marginBottom: 16 }}>
            <View
              style={{ position: 'relative', flexDirection: 'row', flex: 1 }}
            >
              <LdTextInput
                placeholderTextColor={COLORS.gray2}
                placeholder='아이디'
                style={{ marginRight: 8, paddingRight: 116 }}
                keyboardType='email-address'
                value={store.current.email}
                onChangeText={(v) => {
                  store.current.email = v
                }}
                onSubmitEditing={() => {
                  codeInputRef.current?.focus()
                }}
              />
              <Text
                style={{
                  position: 'absolute',
                  width: 100,
                  lineHeight: 56,
                  fontSize: 16,
                  color: COLORS.gray1,
                  right: 16,
                }}
              >
                @korea.ac.kr
              </Text>
            </View>
            <LdButton
              title={
                store.current.codeDisabled
                  ? `${store.current.time}초`
                  : '코드 받기'
              }
              onClick={async () => {
                if (store.current.email.length === 0) return
                try {
                  store.current.codeDisabled = true
                  store.current.interval = setInterval(() => {
                    store.current.tick()
                  }, 1000)
                  toast('인증코드가 이메일로 전송되었습니다!')
                  await userStore.getAuthCode(store.current.email)
                } catch (e) {
                  showError(e.message)
                  store.current.clearInterval()
                }
              }}
              disabled={store.current.codeDisabled}
            />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <LdTextInput
              ref={codeInputRef}
              placeholderTextColor={COLORS.gray2}
              placeholder='인증코드'
              style={{ marginRight: 8 }}
              keyboardType='number-pad'
              value={store.current.code}
              onChangeText={(v) => {
                store.current.code = v
              }}
              onSubmitEditing={login}
            />
            <LdButton
              title='로그인'
              onClick={login}
              disabled={store.current.loginDisabled}
            />
          </View>
        </View>
      </View>
    </LdKeyboardAvoidingView>
  )
})
