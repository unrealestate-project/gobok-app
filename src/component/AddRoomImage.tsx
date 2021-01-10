import React from 'react'
import { Image, Text, TouchableOpacity } from 'react-native'
import { ACTIVE_OPACITY, ADD_IMAGE_SIDE } from 'infra/Constants'
import { COLORS } from 'infra/Colors'
import styled from 'styled-components/native'

const CONTAINER_WIDTH = 20

const CountContainer = styled.View`
  position: absolute;
  top: -${CONTAINER_WIDTH / 2}px;
  left: -${CONTAINER_WIDTH / 2}px;
  width: ${CONTAINER_WIDTH}px;
  height: ${CONTAINER_WIDTH}px;
  border-radius: ${CONTAINER_WIDTH}px;
  background-color: ${COLORS.primary500};
  justify-content: center;
  align-items: center;
`

export const AddRoomImage: React.FC<{
  image: string
  index: number
  onPress: () => void
}> = ({ image, index, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        position: 'relative',
        marginRight: (index + 1) % 3 !== 2 ? 16 : 0,
        marginTop: index > 1 ? 16 : 0,
      }}
      onPress={onPress}
      activeOpacity={ACTIVE_OPACITY}
    >
      <Image
        source={{ uri: image }}
        style={{
          width: ADD_IMAGE_SIDE,
          height: ADD_IMAGE_SIDE,
          borderRadius: 8,
        }}
      />
      <CountContainer>
        <Text style={{ color: COLORS.white, fontSize: 12 }}>{index + 1}</Text>
      </CountContainer>
    </TouchableOpacity>
  )
}
