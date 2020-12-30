import React, { useEffect } from 'react'
import { SafeAreaView, StatusBar, Text, View } from 'react-native'
import { analytics } from './src/infra/Analytics'

const App = () => {
  useEffect(() => {
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
