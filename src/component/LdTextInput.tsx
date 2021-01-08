import styled from 'styled-components/native'
import { COLORS } from 'infra/Colors'

export const LdTextInputFill = styled.TextInput`
  flex: 1;
  height: 56px;
  background-color: ${COLORS.white};
  border-radius: 8px;
  padding: 0 16px;
  font-size: 16px;
`

export const LdTextInputBorder = styled.TextInput`
  height: 56px;
  border-color: ${COLORS.gray2};
  border-width: 1px;
  border-radius: 8px;
  padding: 16px;
  font-size: 16px;
`
