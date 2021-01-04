import React from 'react'
import styled from 'styled-components/native'
import { COLORS } from 'infra/Colors'

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
  onClick: () => void
  disabled?: boolean
}> = ({ title, onClick, disabled = false }) => {
  return (
    <ButtonContainer onPress={onClick} disabled={disabled}>
      <ButtonText>{title}</ButtonText>
    </ButtonContainer>
  )
}
