import React from 'react'
import { KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native'
import { keyboardStore } from 'store/KeyboardStore'
import { isIOS } from 'infra/Constants'

export const LdKeyboardAvoidingView: React.FC = ({ children }) => {
  return (
    <TouchableWithoutFeedback onPress={() => keyboardStore.hide()}>
      <KeyboardAvoidingView
        behavior={isIOS ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        {children}
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}
