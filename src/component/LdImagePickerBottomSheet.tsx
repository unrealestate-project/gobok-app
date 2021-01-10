import { Image, View } from 'react-native'
import RBSheet from 'react-native-raw-bottom-sheet'
import React, { useEffect, useRef } from 'react'
import styled from 'styled-components/native'
import { CAMERA_ICON, GALLERY_ICON } from 'image'
import { COLORS } from 'infra/Colors'
// @ts-ignore
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'

const Container = styled.TouchableOpacity`
  height: 54px;
  align-items: center;
  flex-direction: row;
`

const ItemText = styled.Text`
  margin-left: 8px;
  font-size: 16px;
  color: ${COLORS.gray0};
`

export const LdImagePickerBottomSheet: React.FC<{
  isOpen: boolean
  onClose: () => void
  onImage: (image: string) => void
}> = ({ isOpen, onClose, onImage }) => {
  const ref = useRef<RBSheet>(null)
  useEffect(() => {
    if (isOpen) ref.current?.open()
    else ref.current?.close()
  }, [isOpen])
  return (
    <RBSheet ref={ref} height={140} onClose={onClose}>
      <View style={{ flex: 1, padding: 16 }}>
        <Container
          onPress={() => {
            launchImageLibrary({ mediaType: 'photo' }, (res: any) => {
              if (res.uri) onImage(res.uri)
            })
          }}
        >
          <Image source={GALLERY_ICON} />
          <ItemText>갤러리에서 선택</ItemText>
        </Container>
        <Container
          onPress={() => {
            launchCamera({ mediaType: 'photo' }, (res: any) => {
              if (res.uri) onImage(res.uri)
            })
          }}
        >
          <Image source={CAMERA_ICON} />
          <ItemText>카메라 촬영</ItemText>
        </Container>
      </View>
    </RBSheet>
  )
}
