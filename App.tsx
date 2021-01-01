import React, { useEffect } from 'react'
import Bugsnag from '@bugsnag/react-native'
import { analytics } from 'infra/Analytics'
import { RootNavigator } from 'navigation/RootNavigator'

const App = () => {
  useEffect(() => {
    if (!__DEV__) {
      Bugsnag.start()
      analytics.init()
    }
  }, [])
  return <RootNavigator />
}

export default App
