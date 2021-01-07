import React, { useEffect, useState } from 'react'
import { Image, View } from 'react-native'
import { NavigationHeader } from 'component/NavigationHeader'
import { useRoute } from '@react-navigation/native'
import { Room, RoomListItem } from 'infra/Types'
import styled from 'styled-components/native'
import { ScreenSpinner } from 'component/ScreenSpinner'
import { roomApi } from 'api/RoomApi'
import { showError } from 'infra/Util'
import { COLORS } from 'infra/Colors'
import moment from 'moment'
import { IMAGE_SIDE } from 'infra/Constants'

const PostContainer = styled.View`
  padding: 24px;
`

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

export const RoomScreen = () => {
  const route = useRoute()
  const room: RoomListItem = route.params as RoomListItem
  const title =
    room.title.length > 12 ? `${room.title.substring(0, 12)}...` : room.title
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<Room | null>(null)
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
        {/*image section*/}
        <View style={{ height: IMAGE_SIDE }}>
          {data && (
            <Image
              source={{ uri: data.images[0].url }}
              style={{
                width: IMAGE_SIDE,
                height: IMAGE_SIDE,
              }}
            />
          )}
        </View>
        {/*post section*/}
        <PostContainer>
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
                <InfoText>{moment(data.bumped_at).fromNow()}</InfoText>
              </View>
              <MainText>{data.content}</MainText>
            </View>
          )}
        </PostContainer>
        {loading && <ScreenSpinner />}
      </View>
    </>
  )
}
