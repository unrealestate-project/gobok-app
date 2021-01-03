import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { ProfileStackNavigator } from 'navigation/ProfileStackNavigator'
import { RoomStackNavigator } from 'navigation/RoomStackNavigator'
import { NavigationContainer } from '@react-navigation/native'
import { Image } from 'react-native'
import { getBottomTabIcon } from 'image'
import { COLORS } from 'infra/Colors'
import { LdStatusBar } from 'component/LdStatusBar'

const Tab = createBottomTabNavigator()

export const RootNavigator = () => {
  return (
    <NavigationContainer>
      <LdStatusBar />
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
          component={RoomStackNavigator}
          options={{
            title: '복덕방',
          }}
        />
        <Tab.Screen
          name='ProfileTab'
          component={ProfileStackNavigator}
          options={{
            title: '프로필',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}