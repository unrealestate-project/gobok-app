import React from 'react'
import styled from 'styled-components/native'
import { COLORS } from 'infra/Colors'
import {
  ActivityIndicator,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native'
import { ACTIVE_OPACITY } from 'infra/Constants'

const ButtonContainer = styled.TouchableOpacity`
  background-color: ${(props: { disabled: boolean }) =>
    props.disabled ? COLORS.gray1 : COLORS.gray2};
  justify-content: center;
  align-items: center;
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
  loading?: boolean
  disabled?: boolean
  style?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
}> = ({
  title,
  onPress,
  loading = false,
  disabled = false,
  style,
  textStyle,
}) => {
  return (
    <ButtonContainer
      onPress={onPress}
      disabled={disabled}
      style={style}
      activeOpacity={ACTIVE_OPACITY}
    >
      {loading ? (
        <ActivityIndicator size={22} color={COLORS.primary500} />
      ) : (
        <ButtonText style={textStyle}>{title}</ButtonText>
      )}
    </ButtonContainer>
  )
}
