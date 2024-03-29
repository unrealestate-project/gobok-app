import 'react-native-url-polyfill/auto'
import 'react-native-gesture-handler'
import { AppRegistry } from 'react-native'
import App from './App'
import { name as appName } from './app.json'
import codePush from 'react-native-code-push'

AppRegistry.registerComponent(appName, () =>
  __DEV__
    ? App
    : codePush({
        checkFrequency: codePush.CheckFrequency.ON_APP_START,
        installMode: codePush.InstallMode.ON_NEXT_RESTART,
        mandatoryInstallMode: codePush.InstallMode.IMMEDIATE,
      })(App),
)
