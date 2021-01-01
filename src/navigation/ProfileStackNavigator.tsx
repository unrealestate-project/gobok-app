import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { ProfileScreen } from 'screen/ProfileScreen'
import { headerStyle } from 'navigation/Common'
import { MyRoomScreen } from 'screen/MyRoomScreen'
import { FeedbackScreen } from 'screen/FeedbackScreen'

const Stack = createStackNavigator()

export const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Profile'
        component={ProfileScreen}
        options={{
          ...headerStyle,
          title: '프로필',
        }}
      />
      <Stack.Screen
        name='MyRoom'
        component={MyRoomScreen}
        options={{
          ...headerStyle,
          title: '내가 올린 방',
        }}
      />
      <Stack.Screen
        name='Feedback'
        component={FeedbackScreen}
        options={{
          ...headerStyle,
          title: '앱 개선사항 제안',
        }}
      />
    </Stack.Navigator>
  )
}
