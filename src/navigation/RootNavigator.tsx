import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { LdStatusBar } from 'component/LdStatusBar'
import { userStore } from 'store/UserStore'
import { LoginScreen } from 'screen/LoginScreen'
import { Toast } from 'component/Toast'
import { observer } from 'mobx-react'
import { createStackNavigator } from '@react-navigation/stack'
import { screenOptions } from 'navigation/Common'
import { MyRoomScreen } from 'screen/MyRoomScreen'
import { FeedbackScreen } from 'screen/FeedbackScreen'
import { AddRoomScreen } from 'screen/AddRoomScreen'
import { RoomScreen } from 'screen/RoomScreen'
import { TabNavigator } from 'navigation/TabNavigator'

const Stack = createStackNavigator()

export const RootNavigator = observer(() => {
  useEffect(() => {
    userStore.load()
  }, [])
  return (
    <NavigationContainer>
      <LdStatusBar />
      {!userStore.loading && !userStore.hasToken ? (
        <LoginScreen />
      ) : (
        <Stack.Navigator screenOptions={screenOptions}>
          <Stack.Screen name='Main' component={TabNavigator} />
          <Stack.Screen name='AddRoom' component={AddRoomScreen} />
          <Stack.Screen name='Room' component={RoomScreen} />
          <Stack.Screen name='MyRoom' component={MyRoomScreen} />
          <Stack.Screen name='Feedback' component={FeedbackScreen} />
        </Stack.Navigator>
      )}
      <Toast />
    </NavigationContainer>
  )
})
