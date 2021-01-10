import React from 'react'
import { Alert, Image, View } from 'react-native'
import styled from 'styled-components/native'
import { COLORS } from 'infra/Colors'
import { ARROW_RIGHT, ARROW_RIGHT_PRIMARY } from 'image'
import { userStore } from 'store/UserStore'
import { NavigationHeader } from 'component/NavigationHeader'
import { useNavigation } from '@react-navigation/native'

const Title = styled.Text`
  font-size: 18px;
  color: ${COLORS.gray0};
`

const MenuItemContainer = styled.TouchableOpacity`
  background-color: ${COLORS.white};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 24px 20px 24px 32px;
`

export const ProfileScreen = () => {
  const navigation = useNavigation()
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.gray3,
      }}
    >
      <NavigationHeader title='프로필' />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 32,
          marginBottom: 32,
          backgroundColor: COLORS.white,
        }}
      >
        <Title style={{ fontWeight: 'bold' }}>{userStore.user?.email}</Title>
      </View>
      <MenuItemContainer onPress={() => navigation.navigate('RoomItem')}>
        <Title>내가 올린 방</Title>
        <Image source={ARROW_RIGHT} />
      </MenuItemContainer>
      <MenuItemContainer onPress={() => navigation.navigate('Feedback')}>
        <Title>앱 개선사항 제안</Title>
        <Image source={ARROW_RIGHT} />
      </MenuItemContainer>
      <MenuItemContainer
        onPress={() => {
          Alert.alert(
            '로그아웃',
            '정말 로그아웃할까요?',
            [
              { text: '취소' },
              { text: '로그아웃', onPress: () => userStore.logout() },
            ],
            {
              cancelable: true,
            },
          )
        }}
      >
        <Title style={{ color: COLORS.primary500 }}>로그아웃</Title>
        <Image source={ARROW_RIGHT_PRIMARY} />
      </MenuItemContainer>
    </View>
  )
}
