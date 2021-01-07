import React from 'react'
import styled from 'styled-components/native'
import { COLORS } from 'infra/Colors'
import { StyleProp, TextStyle, ViewStyle } from 'react-native'

const ButtonContainer = styled.TouchableOpacity`
  background-color: ${(props: { disabled: boolean }) =>
    props.disabled ? COLORS.gray1 : COLORS.gray2};
  justify-content: center;
  align-items: center;
  width: 80px;
  border-radius: 8px;
`

const ButtonText = styled.Text`
  color: ${COLORS.primary500};
  font-weight: bold;
  font-size: 14px;
`

export const LdButton: React.FC<{
  title: string
  onPress: () => void
  disabled?: boolean
  style?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
}> = ({ title, onPress, disabled = false, style, textStyle }) => {
  return (
    <ButtonContainer
      onPress={onPress}
      disabled={disabled}
      style={style}
      activeOpacity={0.8}
    >
      <ButtonText style={textStyle}>{title}</ButtonText>
    </ButtonContainer>
  )
}
