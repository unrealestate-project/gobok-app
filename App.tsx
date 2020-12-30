import React, { useEffect } from 'react'
import { SafeAreaView, StatusBar, Text, View } from 'react-native'
import Bugsnag from '@bugsnag/react-native'
import { analytics } from 'infra/Analytics'

const App = () => {
  useEffect(() => {
    Bugsnag.start()
    analytics.init()
  }, [])
  return (
    <>
      <StatusBar />
      <SafeAreaView>
        <View>
          <Text>Hello World</Text>
        </View>
      </SafeAreaView>
    </>
  )
}

export default App
