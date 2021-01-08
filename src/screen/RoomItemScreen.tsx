import React, { useEffect, useState } from 'react'
import { Image, Modal, ScrollView, TouchableOpacity, View } from 'react-native'
import { NavigationHeader } from 'component/NavigationHeader'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Room } from 'infra/Types'
import styled from 'styled-components/native'
import { roomApi } from 'api/RoomApi'
import { showError, toast } from 'infra/Util'
import { COLORS } from 'infra/Colors'
import moment from 'moment'
import { IMAGE_SIDE } from 'infra/Constants'
import { BottomRoomActionButtons } from 'component/BottomRoomActionButtons'
import { ScreenSpinner } from 'component/ScreenSpinner'
import { CLOSE_ICON } from 'image'
import ImageViewer from 'react-native-image-zoom-viewer'
import Autolink from 'react-native-autolink'

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

export const RoomItemScreen = () => {
  const navigation = useNavigation()
  const route = useRoute()
  const { roomId } = route.params
    ? (route.params as { roomId?: number })
    : { roomId: null }

  const [data, setData] = useState<Room | null>(null)
  const [loading, setLoading] = useState(false)
  const [imageIndex, setImageIndex] = useState(0)
  const [imageModal, setImageModal] = useState(false)

  const getData = async () => {
    try {
      setLoading(true)
      const res = await (roomId ? roomApi.getRoom(roomId) : roomApi.getMyRoom())
      if (!roomId && !res) {
        toast('아직 올린 방이 없어요!')
        navigation.goBack()
        return
      }
      setData(res)
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

  const title = data
    ? data.title.length > 12
      ? `${data.title.substring(0, 12)}...`
      : data.title
    : ''

  return (
    <>
      <NavigationHeader title={title} showBackButton />
      <View
        style={{ flex: 1, position: 'relative', backgroundColor: COLORS.white }}
      >
        {data && (
          <ScrollView style={{ flex: 1 }}>
            {/*image section*/}
            <View style={{ height: IMAGE_SIDE }}>
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
            </View>
            {/*post section*/}
            <View style={{ paddingHorizontal: 16, paddingVertical: 24 }}>
              <Title>{data.title}</Title>
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
                <Autolink
                  text={data.content}
                  component={MainText}
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
        {loading && <ScreenSpinner />}
        {data?.is_mine && <BottomRoomActionButtons roomId={data.id} />}
      </View>
    </>
  )
}
