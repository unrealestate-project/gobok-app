import React, { useEffect } from 'react'
import Bugsnag from '@bugsnag/react-native'
import { analytics } from 'infra/Analytics'
import { RootNavigator } from 'navigation/RootNavigator'
import { keyboardStore } from 'store/KeyboardStore'
import 'moment/locale/ko'

const App = () => {
  useEffect(() => {
    if (!__DEV__) {
      Bugsnag.start()
      analytics.init()
    }
    keyboardStore.sub()
    return () => {
      keyboardStore.unsub()
    }
  }, [])
  return <RootNavigator />
}

export default App
