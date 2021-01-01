import React from 'react'
import { StatusBar } from 'react-native'
import { COLORS } from 'infra/Colors'

export const LdStatusBar = () => {
  return (
    <StatusBar backgroundColor={COLORS.primary300} barStyle='light-content' />
  )
}
