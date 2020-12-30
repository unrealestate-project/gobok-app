// @ts-nocheck
import amplitude, { AmplitudeClient } from 'amplitude-js'

interface AnalyticsClient extends AmplitudeClient {
  init: () => void
}

export const analytics = new Proxy<AnalyticsClient>(
  {
    init: () => {
      amplitude.getInstance().init('5d4a81514bb6486587eb3fb7fc5ed08e')
    },
  },
  {
    get: (target, k) => {
      if (target.hasOwnProperty(k)) {
        return target[k]
      }
      return amplitude.getInstance()[k]
    },
  },
)
