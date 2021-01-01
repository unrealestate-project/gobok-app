import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { RoomListScreen } from 'screen/RoomListScreen'
import { headerStyle } from 'navigation/Common'
import { AddRoomScreen } from 'screen/AddRoomScreen'

const Stack = createStackNavigator()

export const RoomStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='RoomList'
        component={RoomListScreen}
        options={{
          ...headerStyle,
          title: '복덕방',
        }}
      />
      <Stack.Screen
        name='AddRoom'
        component={AddRoomScreen}
        options={{
          ...headerStyle,
          title: '방 올리기',
        }}
      />
    </Stack.Navigator>
  )
}
