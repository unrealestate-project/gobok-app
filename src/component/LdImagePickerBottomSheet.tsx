import { Image, View } from 'react-native'
import RBSheet from 'react-native-raw-bottom-sheet'
import React, { useEffect, useRef } from 'react'
import styled from 'styled-components/native'
import { CAMERA_ICON, GALLERY_ICON } from 'image'
import { COLORS } from 'infra/Colors'
import ImagePicker, {
  Image as PickerImage,
} from 'react-native-image-crop-picker'

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
  onImages: (images: PickerImage[]) => void
}> = ({ isOpen, onClose, onImages }) => {
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
            ImagePicker.openPicker({
              mediaType: 'photo',
              multiple: true,
            })
              .then((images) => {
                onImages(images)
              })
              .catch(() => {})
          }}
        >
          <Image source={GALLERY_ICON} />
          <ItemText>갤러리에서 선택</ItemText>
        </Container>
        <Container
          onPress={() => {
            ImagePicker.openCamera({
              mediaType: 'photo',
            })
              .then((image) => {
                onImages([image])
              })
              .catch(() => {})
          }}
        >
          <Image source={CAMERA_ICON} />
          <ItemText>카메라 촬영</ItemText>
        </Container>
      </View>
    </RBSheet>
  )
}
