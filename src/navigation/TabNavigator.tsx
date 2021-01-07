import { COLORS } from 'infra/Colors'
import { Image } from 'react-native'
import { getBottomTabIcon } from 'image'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { RoomListScreen } from 'screen/RoomListScreen'
import { ProfileScreen } from 'screen/ProfileScreen'

const Tab = createBottomTabNavigator()

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: { backgroundColor: COLORS.primary500 },
        activeTintColor: COLORS.white,
        inactiveTintColor: COLORS.primary300,
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          return (
            <Image
              style={{ width: 24, height: 24 }}
              source={getBottomTabIcon(route.name, focused)}
            />
          )
        },
      })}
    >
      <Tab.Screen
        name='RoomTab'
        component={RoomListScreen}
        options={{
          title: '복덕방',
        }}
      />
      <Tab.Screen
        name='ProfileTab'
        component={ProfileScreen}
        options={{
          title: '프로필',
        }}
      />
    </Tab.Navigator>
  )
}
