import React from 'react'
import { Image, View } from 'react-native'
import styled from 'styled-components/native'
import { COLORS } from 'infra/Colors'
import { ARROW_RIGHT, ARROW_RIGHT_PRIMARY, PROFILE_PLACEHOLDER } from 'image'
import { userStore } from 'store/UserStore'

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
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.gray3,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 24,
          paddingVertical: 16,
          marginBottom: 36,
          backgroundColor: COLORS.white,
        }}
      >
        <Image source={PROFILE_PLACEHOLDER} style={{ marginRight: 16 }} />
        <Title>{userStore.user?.email}</Title>
      </View>
      <MenuItemContainer>
        <Title>내가 올린 방</Title>
        <Image source={ARROW_RIGHT} />
      </MenuItemContainer>
      <MenuItemContainer>
        <Title>앱 개선사항 제안</Title>
        <Image source={ARROW_RIGHT} />
      </MenuItemContainer>
      <MenuItemContainer onPress={() => userStore.logout()}>
        <Title style={{ color: COLORS.primary500 }}>로그아웃</Title>
        <Image source={ARROW_RIGHT_PRIMARY} />
      </MenuItemContainer>
    </View>
  )
}
