import React, { useEffect, useRef, useState } from 'react'
import { Image, Modal, ScrollView, TouchableOpacity, View } from 'react-native'
import { NavigationHeader } from 'component/NavigationHeader'
import { useNavigation, useRoute } from '@react-navigation/native'
import styled from 'styled-components/native'
import { COLORS } from 'infra/Colors'
import moment from 'moment'
import { IMAGE_SIDE } from 'infra/Constants'
import { BottomRoomActionButtons } from 'component/BottomRoomActionButtons'
import { ScreenSpinner } from 'component/ScreenSpinner'
import { CLOSE_ICON } from 'image'
import ImageViewer from 'react-native-image-zoom-viewer'
import Autolink from 'react-native-autolink'
import { observer } from 'mobx-react'
import { RoomItemStore } from 'store/RoomItemStore'
import { getBottomSpace } from 'react-native-iphone-x-helper'

const Title = styled.Text`
  font-size: 26px;
  font-weight: bold;
`

const InfoText = styled.Text`
  font-size: 14px;
`

const MainText = styled.Text`
  font-size: 16px;
  line-height: 24px;
`

const RoomImage = styled.Image`
  width: ${IMAGE_SIDE}px;
  height: ${IMAGE_SIDE}px;
`

export const RoomItemScreen = observer(() => {
  const navigation = useNavigation()
  const route = useRoute()
  const { roomId } = route.params
    ? (route.params as { roomId?: number })
    : { roomId: undefined }

  const store = useRef(new RoomItemStore())
  const [imageIndex, setImageIndex] = useState(0)
  const [imageModal, setImageModal] = useState(false)

  useEffect(() => {
    store.current.updateData(roomId).then((res) => {
      if (res === null) navigation.goBack()
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <NavigationHeader title={store.current.title} showBackButton />
      <View
        style={{
          flex: 1,
          position: 'relative',
          backgroundColor: COLORS.white,
          paddingBottom: getBottomSpace(),
        }}
      >
        {store.current.data && (
          <ScrollView style={{ flex: 1 }}>
            {/*image section*/}
            {store.current.data.images?.length > 0 && (
              <View style={{ height: IMAGE_SIDE }}>
                <ScrollView horizontal>
                  {store.current.data.images?.map((img, index) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        onPress={() => {
                          setImageIndex(index)
                          setImageModal(true)
                        }}
                      >
                        <RoomImage source={{ uri: img.url }} />
                      </TouchableOpacity>
                    )
                  })}
                </ScrollView>
              </View>
            )}
            {/*post section*/}
            <View style={{ paddingHorizontal: 16, paddingVertical: 24 }}>
              <Title>{store.current.data.title}</Title>
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 16,
                    marginBottom: 24,
                  }}
                >
                  <View style={{ flexDirection: 'row' }}>
                    <InfoText style={{ marginRight: 16 }}>
                      {store.current.data.nickname}
                    </InfoText>
                    <InfoText>{`읽음 ${store.current.data.view_count}`}</InfoText>
                  </View>
                  <InfoText>
                    {moment(store.current.data.bumped_at).calendar()}
                  </InfoText>
                </View>
                <Autolink
                  text={store.current.data.content}
                  component={({ children }) => (
                    <MainText selectable>{children}</MainText>
                  )}
                  email
                  phone
                  url
                  linkStyle={{
                    textDecorationLine: 'underline',
                    color: COLORS.primary500,
                  }}
                />
              </View>
            </View>
          </ScrollView>
        )}
        <Modal
          visible={imageModal}
          transparent
          onRequestClose={() => setImageModal(false)}
        >
          <TouchableOpacity
            style={{
              position: 'absolute',
              top: 22,
              right: 8,
              width: 54,
              height: 54,
              zIndex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => setImageModal(false)}
          >
            <Image source={CLOSE_ICON} style={{ width: 32, height: 32 }} />
          </TouchableOpacity>
          <ImageViewer
            imageUrls={store.current.data?.images?.map((i) => ({ url: i.url }))}
            onCancel={() => setImageModal(false)}
            enableSwipeDown
            index={imageIndex}
            saveToLocalByLongPress={false}
          />
        </Modal>
        {store.current.loading && <ScreenSpinner />}
        {store.current.data?.is_mine && (
          <BottomRoomActionButtons store={store.current} />
        )}
      </View>
    </>
  )
})
