const icons = {
  HOME_FOCUSED: require('./home-focused.png'),
  HOME_UNFOCUSED: require('./home-unfocused.png'),
  PERSON_FOCUSED: require('./person-focused.png'),
  PERSON_UNFOCUSED: require('./person-unfocused.png'),
}

export const getBottomTabIcon = (route: string, focused: boolean) => {
  const routeToIcon = {
    RoomTab: 'HOME',
    ProfileTab: 'PERSON',
  }
  // @ts-ignore
  return icons[`${routeToIcon[route]}_${focused ? 'FOCUSED' : 'UNFOCUSED'}`]
}

export const PROFILE_PLACEHOLDER = require('./profile.png')
export const ARROW_RIGHT = require('./arrow-right.png')
export const ARROW_RIGHT_PRIMARY = require('./arrow-right-primary.png')
export const ARROW_BACK = require('./arrow-back.png')
export const CLOSE_ICON = require('./close.png')
