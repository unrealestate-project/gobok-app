import React from 'react'
import { KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native'
import { isIOS } from 'infra/Constants'
import { keyboardStore } from 'store/KeyboardStore'

export const LdKeyboardAvoidingView: React.FC = ({ children }) => {
  return (
    <KeyboardAvoidingView
      behavior={isIOS ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={() => keyboardStore.hide()}>
        {children}
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}
