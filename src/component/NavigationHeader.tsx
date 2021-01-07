import React from 'react'
import { Image, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import { COLORS } from 'infra/Colors'
import { ARROW_BACK } from 'image'
import { useNavigation } from '@react-navigation/native'

const Container = styled.View`
  height: 56px;
  background-color: ${COLORS.primary500};
  position: relative;
  justify-content: center;
  align-items: center;
`

const BackButton = () => {
  const navigation = useNavigation()
  return (
    <TouchableOpacity
      style={{ position: 'absolute', left: 16 }}
      onPress={() => navigation.goBack()}
    >
      <Image source={ARROW_BACK} style={{ width: 32, height: 32 }} />
    </TouchableOpacity>
  )
}

const Text = styled.Text`
  color: ${COLORS.white};
  font-size: 20px;
  font-weight: bold;
`

export const NavigationHeader: React.FC<{
  showBackButton?: boolean
  title: string
}> = (props) => {
  return (
    <Container>
      {!!props.showBackButton && <BackButton />}
      <Text>{props.title}</Text>
    </Container>
  )
}
