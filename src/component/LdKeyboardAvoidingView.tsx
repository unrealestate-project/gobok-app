import React from 'react'
import { KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native'
import { keyboardStore } from 'store/KeyboardStore'

export const LdKeyboardAvoidingView: React.FC = ({ children }) => {
  return (
    <TouchableWithoutFeedback onPress={() => keyboardStore.hide()}>
      <KeyboardAvoidingView behavior='padding' style={{ flex: 1 }}>
        {children}
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}
