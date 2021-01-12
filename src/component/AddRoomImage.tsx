import React from 'react'
import { ActivityIndicator, Image, Text, TouchableOpacity } from 'react-native'
import { ACTIVE_OPACITY, ADD_IMAGE_SIDE } from 'infra/Constants'
import { COLORS } from 'infra/Colors'
import styled from 'styled-components/native'
import { observer } from 'mobx-react'

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
  z-index: 2;
`

const LoadingContainer = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: ${COLORS.white}cc;
  z-index: 1;
`

export const AddRoomImage: React.FC<{
  image: string
  loading: boolean
  index: number
  onPress: () => void
}> = observer(({ image, index, onPress, loading }) => {
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
      {loading && (
        <LoadingContainer>
          <ActivityIndicator size={20} color={COLORS.primary500} />
        </LoadingContainer>
      )}
    </TouchableOpacity>
  )
})
