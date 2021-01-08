import React, { useEffect, useState } from 'react'
import { Image, Modal, ScrollView, TouchableOpacity, View } from 'react-native'
import { NavigationHeader } from 'component/NavigationHeader'
import { useRoute } from '@react-navigation/native'
import { Room, RoomListItem } from 'infra/Types'
import styled from 'styled-components/native'
import { roomApi } from 'api/RoomApi'
import { showError } from 'infra/Util'
import { COLORS } from 'infra/Colors'
import moment from 'moment'
import { IMAGE_SIDE } from 'infra/Constants'
import { BottomRoomActionButtons } from 'component/BottomRoomActionButtons'
import { ScreenSpinner } from 'component/ScreenSpinner'
import { CLOSE_ICON } from 'image'
import ImageViewer from 'react-native-image-zoom-viewer'

const Title = styled.Text`
  font-size: 26px;
  font-weight: bold;
`

const InfoText = styled.Text`
  font-size: 14px;
`

const MainText = styled.Text`
  font-size: 16px;
`

const RoomImage = styled.Image`
  width: ${IMAGE_SIDE}px;
  height: ${IMAGE_SIDE}px;
`

export const RoomItemScreen = () => {
  const route = useRoute()
  const room: RoomListItem = route.params as RoomListItem

  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<Room | null>(null)
  const [imageIndex, setImageIndex] = useState(0)
  const [imageModal, setImageModal] = useState(false)

  const title =
    room.title.length > 12 ? `${room.title.substring(0, 12)}...` : room.title
  const getData = async () => {
    try {
      setLoading(true)
      const res = await roomApi.getRoom(room.id)
      setData(res)
      console.log(res)
    } catch (e) {
      showError(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <NavigationHeader title={title} showBackButton />
      <View
        style={{ flex: 1, position: 'relative', backgroundColor: COLORS.white }}
      >
        {/*post section*/}
        <ScrollView style={{ flex: 1 }}>
          {/*image section*/}
          <View style={{ height: IMAGE_SIDE }}>
            {data && (
              <ScrollView horizontal>
                {data.images?.map((img, index) => {
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
            )}
          </View>
          {/*post section*/}
          <View style={{ padding: 24 }}>
            <Title>{room.title}</Title>
            {data && (
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
                      {data.nickname}
                    </InfoText>
                    <InfoText>{`읽음 ${data.view_count}`}</InfoText>
                  </View>
                  <InfoText>{moment(data.bumped_at).calendar()}</InfoText>
                </View>
                <MainText>{data.content.repeat(80)}</MainText>
              </View>
            )}
          </View>
        </ScrollView>
        {loading && <ScreenSpinner />}
        {data?.is_mine && <BottomRoomActionButtons roomId={room.id} />}
      </View>
      <Modal visible={imageModal} transparent>
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
          imageUrls={data?.images?.map((i) => ({ url: i.url }))}
          onCancel={() => setImageModal(false)}
          enableSwipeDown
          index={imageIndex}
        />
      </Modal>
    </>
  )
}
